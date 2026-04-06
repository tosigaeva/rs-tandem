BEGIN;

-- 1️⃣ Ensure widget exists
INSERT INTO public.widgets (type, name)
VALUES (
           'async-sorter',
           '{
             "en":"Async Sorter",
             "ru":"Асинхронный порядок",
             "by":"Асінхронны парадак"
           }'
       )
    ON CONFLICT (type) DO NOTHING;

-- 2️⃣ Create topic
WITH new_topic AS (
INSERT INTO public.topics (name, description, level)
VALUES (
    '{
      "en": "Event Loop & Async Ordering",
      "ru": "Event Loop и порядок выполнения",
      "by": "Event Loop і парадак выканання"
    }',
    '{
      "en": "Understand execution order of synchronous, microtasks and macrotasks",
      "ru": "Понимание порядка выполнения sync, microtask и macrotask",
      "by": "Разуменне парадку выканання sync, microtask і macrotask"
    }',
    'intermediate'
    )
    RETURNING id
    ),

-- 3️⃣ Link widget
    topic_widgets_insert AS (
INSERT INTO public.topic_widgets (topic_id, widget_type)
SELECT id, 'async-sorter'
FROM new_topic
    ),

-- 4️⃣ Insert questions
    inserted_questions AS (
INSERT INTO public.questions (topic_id, widget_type, payload_question, payload_answer)
SELECT
    nt.id,
    'async-sorter',
    q.payload_question::jsonb,
    q.payload_answer::jsonb
FROM new_topic nt
    JOIN (
    VALUES

    -- QUESTION 1
    (
    '{
      "codeSnippet": "<code>console.log(\"1\");\nsetTimeout(() => console.log(\"2\"), 0);\nPromise.resolve().then(() => console.log(\"3\"));\nconsole.log(\"4\");",
      "blocks": [
        { "id": "b1", "code": "console.log(1)", "label": "1" },
        { "id": "b2", "code": "setTimeout callback", "label": "2" },
        { "id": "b3", "code": "Promise.then callback", "label": "3" },
        { "id": "b4", "code": "console.log(4)", "label": "4" }
      ]
    }',
    '{
      "callStack": ["b1", "b4"],
      "microtasks": ["b3"],
      "macrotasks": ["b2"],
      "outputOrder": ["b1", "b4", "b3", "b2"]
    }'
    ),

    -- QUESTION 2
    (
    '{
      "codeSnippet": "console.log(\"A\");\nPromise.resolve().then(() => console.log(\"B\"));\nconsole.log(\"C\");",
      "blocks": [
        { "id": "b1", "code": "console.log(A)", "label": "A" },
        { "id": "b2", "code": "Promise.then callback", "label": "B" },
        { "id": "b3", "code": "console.log(C)", "label": "C" }
      ]
    }',
    '{
      "callStack": ["b1", "b3"],
      "microtasks": ["b2"],
      "macrotasks": [],
      "outputOrder": ["b1", "b3", "b2"]
    }'
    ),

    -- QUESTION 3
    (
    '{
      "codeSnippet": "setTimeout(() => console.log(\"X\"), 0);\nPromise.resolve().then(() => console.log(\"Y\"));\nconsole.log(\"Z\");",
      "blocks": [
        { "id": "b1", "code": "setTimeout callback", "label": "X" },
        { "id": "b2", "code": "Promise.then callback", "label": "Y" },
        { "id": "b3", "code": "console.log(Z)", "label": "Z" }
      ]
    }',
    '{
      "callStack": ["b3"],
      "microtasks": ["b2"],
      "macrotasks": ["b1"],
      "outputOrder": ["b3", "b2", "b1"]
    }'
    )

    ) AS q(payload_question, payload_answer)
ON TRUE
    RETURNING id
    )

SELECT COUNT(*) FROM inserted_questions;

COMMIT;