-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

-- 1. Types
CREATE TYPE role AS ENUM ('user', 'admin');
CREATE TYPE level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE subject AS ENUM ('JavaScript', 'TypeScript');

-- 2. Independent Tables
CREATE TABLE public.profiles
(
    id       uuid NOT NULL DEFAULT auth.uid() UNIQUE,
    username text NOT NULL UNIQUE,
    role role DEFAULT 'user'::role,
    CONSTRAINT profiles_pkey PRIMARY KEY (id)
);

CREATE TABLE public.widgets
(
    type        text                     NOT NULL,
    created_at  timestamp with time zone NOT NULL DEFAULT now(),
    name        jsonb                             DEFAULT NULL::jsonb,
    description jsonb,
    icon        text,
    CONSTRAINT widgets_pkey PRIMARY KEY (type)
);

CREATE TABLE public.topics
(
    id          bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
    created_at  timestamp with time zone            NOT NULL DEFAULT now(),
    level level NOT NULL DEFAULT 'beginner'::level,
    subject subject DEFAULT 'JavaScript'::subject,
    name        jsonb                                        DEFAULT NULL::jsonb,
    description jsonb                                        DEFAULT NULL::jsonb,
    CONSTRAINT topics_pkey PRIMARY KEY (id)
);

-- 3. Dependent Tables
CREATE TABLE public.topic_widgets
(
    topic_id    bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    widget_type text                                NOT NULL,
    created_at  timestamp with time zone            NOT NULL DEFAULT now(),
    CONSTRAINT topic_widgets_pkey PRIMARY KEY (topic_id, widget_type),
    CONSTRAINT topic_widgets_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topics (id),
    CONSTRAINT topic_widgets_widget_type_fkey FOREIGN KEY (widget_type) REFERENCES public.widgets (type)
);

CREATE TABLE public.questions
(
    id               bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
    created_at       timestamp with time zone            NOT NULL DEFAULT now(),
    topic_id         bigint                              NOT NULL,
    widget_type      text                                NOT NULL,
    payload_answer   jsonb                               NOT NULL DEFAULT '{}'::jsonb,
    payload_question jsonb                               NOT NULL DEFAULT '{}'::jsonb,
    CONSTRAINT questions_pkey PRIMARY KEY (id),
    CONSTRAINT questions_topic_id_widget_type_fkey FOREIGN KEY (topic_id, widget_type) REFERENCES public.topic_widgets (topic_id, widget_type)
);

CREATE TABLE public.profile_questions
(
    user_id     uuid                     NOT NULL,
    question_id bigint                   NOT NULL,
    created_at  timestamp with time zone NOT NULL DEFAULT now(),
    is_success  boolean                  NOT NULL DEFAULT false,
    updated_at  timestamp without time zone DEFAULT now(),
    CONSTRAINT profile_questions_pkey PRIMARY KEY (user_id, question_id),
    CONSTRAINT profile_questions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles (id),
    CONSTRAINT profile_questions_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions (id)
);

-- 4. Views
CREATE
OR REPLACE VIEW public.question_admin_list AS
SELECT q.id,
       q.topic_id,
       t.name AS topic_name,
       q.widget_type,
       q.created_at,
       q.payload_question,
       q.payload_answer
FROM ((questions q
    LEFT JOIN topic_widgets tw ON (((tw.widget_type = q.widget_type) AND (tw.topic_id = q.topic_id))))
    LEFT JOIN topics t ON ((t.id = q.topic_id)));;


CREATE
OR REPLACE VIEW public.topic_admin_list AS
SELECT t.id,
       t.created_at,
       t.level,
       t.subject,
       t.name,
       t.description,
       sum(widget_questions.total_questions) AS sum_questions
FROM (topics t
    LEFT JOIN LATERAL ( SELECT count(q.id) AS total_questions
                        FROM questions q
                        WHERE (q.topic_id = t.id)) widget_questions ON (true))
GROUP BY t.id;;


CREATE
OR REPLACE VIEW public.questions_info AS
SELECT q.id,
       q.widget_type,
       q.topic_id,
       q.payload_question,
       pq.is_success,
       pq.updated_at
FROM (questions q
    LEFT JOIN profile_questions pq ON ((q.id = pq.question_id)))
GROUP BY q.id, pq.is_success, pq.updated_at
ORDER BY q.id;;


CREATE
OR REPLACE VIEW public.profile_questions_daily_activity AS
SELECT user_id,
       (created_at) ::date AS day,
    (count(*))::integer AS count
FROM profile_questions
GROUP BY user_id, ((created_at):: date);;


CREATE
OR REPLACE VIEW public.widget_admin_list AS
SELECT w.type,
       w.created_at,
       w.name,
       w.description,
       w.icon,
       sum(topic_questions.total_questions) AS sum_questions
FROM (widgets w
    LEFT JOIN LATERAL ( SELECT count(q.id) AS total_questions
                        FROM questions q
                        WHERE (q.widget_type = w.type)) topic_questions ON (true))
GROUP BY w.type;;


CREATE
OR REPLACE VIEW public.topic_widget_summary AS
SELECT t.id,
       t.name,
       t.description,
       t.level,
       t.subject,
       t.created_at,
       max(widget_stats.last_accessed_at)                                                                     AS last_accessed_at,
       COALESCE(json_agg(json_build_object('type', w.type, 'name', w.name, 'description', w.description, 'created_at',
                                           w.created_at, 'last_accessed_at', widget_stats.last_accessed_at,
                                           'total_questions', widget_stats.total_count, 'correct_answers',
                                           widget_stats.correct_count))
                FILTER(WHERE ((tw.widget_type IS NOT NULL) AND (widget_stats.total_count > 0))), '[]' ::json) AS widgets
FROM (((topics t
    LEFT JOIN topic_widgets tw ON ((t.id = tw.topic_id)))
    LEFT JOIN widgets w ON ((tw.widget_type = w.type)))
    LEFT JOIN LATERAL ( SELECT count(q.id) AS        total_count,
                               count(pq.question_id) FILTER (WHERE (pq.is_success = true)) AS correct_count, max(pq.updated_at) AS last_accessed_at
                        FROM (questions q
                            LEFT JOIN profile_questions pq ON (((pq.question_id = q.id) AND (pq.user_id = auth.uid()))))
                        WHERE ((q.topic_id = t.id) AND (q.widget_type = tw.widget_type))) widget_stats ON (true))
GROUP BY t.id;;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updated_at" = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profile_questions_updated_at
    BEFORE UPDATE OF "is_success" ON "profile_questions"
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();



create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id, 
    new.raw_user_meta_data->>'username'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.handle_sync_user_role()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  update auth.users
  set raw_app_meta_data = 
    coalesce(raw_app_meta_data, '{}'::jsonb) || jsonb_build_object('role', new.role)
  where id = new.id;
  return new;
end;
$$;

create or replace trigger on_profile_role_update
  after insert or update of role on public.profiles
  for each row
  execute function public.handle_sync_user_role();