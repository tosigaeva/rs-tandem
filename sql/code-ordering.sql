BEGIN;

-- 1️⃣ Ensure widget exists
INSERT INTO public.widgets (type, name)
VALUES (
           'code-ordering',
           '{
             "en":"Code Ordering",
             "ru":"Упорядочивание кода",
             "by":"Упарадкаванне кода"
           }'
       )
    ON CONFLICT (type) DO NOTHING;

-- 2️⃣ Create topic
WITH new_topic AS (
INSERT INTO public.topics (name, description, level)
VALUES (
    '{
      "en": "Code Ordering",
      "ru": "Упорядочивание кода",
      "by": "Упарадкаванне кода"
    }',
    '{
      "en": "Arrange the code lines in the correct execution order.",
      "ru": "Расположите строки кода в правильном порядке выполнения.",
      "by": "Размясціце радкі кода ў правільным парадку выканання."
    }',
    'intermediate'
    )
    RETURNING id
    ),

-- 3️⃣ Link widget
    topic_widgets_insert AS (
INSERT INTO public.topic_widgets (topic_id, widget_type)
SELECT id, 'code-ordering'
FROM new_topic
    ),

-- 4️⃣ Insert questions
    inserted_questions AS (
INSERT INTO public.questions (topic_id, widget_type, payload_question, payload_answer)
SELECT
    nt.id,
    'code-ordering',
    q.payload_question::jsonb,
    q.payload_answer::jsonb
FROM new_topic nt
    JOIN (
    VALUES

    -- QUESTION 1 (debounce)
    (
    '{
      "description": {
        "en":"Implement debounce function",
        "ru":"Реализуйте debounce функцию",
        "by":"Рэалізуйце debounce функцыю"
      },
      "lines": [
        "return function(...args) {",
        "let timeout;",
        "clearTimeout(timeout);",
        "timeout = setTimeout(() => fn(...args), delay);",
        "};"
      ]
    }',
    '{
      "answers": [1, 0, 2, 3, 4]
    }'
    ),

    -- QUESTION 2 (async fetch)
    (
    '{
      "description": {
        "en":"Fetch data and return JSON",
        "ru":"Получить данные и вернуть JSON",
        "by":"Атрымаць дадзеныя і вярнуць JSON"
      },
      "lines": [
        "return data;",
        "const res = await fetch(url);",
        "const data = await res.json();",
        "async function fetchData() {",
        "}"
      ]
    }',
    '{
      "answers": [3, 1, 2, 0, 4]
    }'
    ),

    -- QUESTION 3 (array processing)
    (
    '{
      "description": {
        "en":"Filter and map array values",
        "ru":"Отфильтровать и преобразовать массив",
        "by":"Адфільтраваць і пераўтварыць масіў"
      },
      "lines": [
        "return result;",
        "const result = arr.filter(x => x > 0).map(x => x * 2);",
        "function process(arr) {",
        "}"
      ]
    }',
    '{
      "answers": [2, 1, 0, 3]
    }'
    )

    ) AS q(payload_question, payload_answer)
ON TRUE
    RETURNING id
    )

SELECT COUNT(*) FROM inserted_questions;

COMMIT;