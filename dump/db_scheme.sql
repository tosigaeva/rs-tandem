BEGIN;

-- 1️⃣ Ensure all widgets exist
INSERT INTO public.widgets (type, name)
VALUES
    ('quiz', '{"en":"Quiz","ru":"Тест","by":"Тэст"}'),
    ('true-false', '{"en":"True / False","ru":"Верно / Неверно","by":"Праўда / Хлусня"}'),
    ('code-completion', '{"en":"Code Completion","ru":"Дополнение кода","by":"Дапаўненне кода"}'),
    ('code-ordering', '{"en":"Code Ordering","ru":"Упорядочивание кода","by":"Упарадкаванне кода"}'),
    ('flip-card', '{"en":"Flip Card","ru":"Карточка","by":"Картка"}'),
    ('big-o', '{"en":"Big O","ru":"Сложность","by":"Складанасць"}'),
    ('async-sorter', '{"en":"Async Sorter","ru":"Асинхронный порядок","by":"Асінхронны парадак"}')
    ON CONFLICT (type) DO NOTHING;

-- 2️⃣ Create topic
WITH new_topic AS (
INSERT INTO public.topics (name, description, level)
VALUES (
    '{
      "en": "Demo: All Widgets",
      "ru": "Демо: все виджеты",
      "by": "Дэма: усе віджэты"
    }',
    '{
      "en": "Test all available widget types",
      "ru": "Тест всех типов виджетов",
      "by": "Тэст усіх тыпаў віджэтаў"
    }',
    'beginner'
    )
    RETURNING id
    ),

-- 3️⃣ Link all widgets
    topic_widgets_insert AS (
INSERT INTO public.topic_widgets (topic_id, widget_type)
SELECT id, wt
FROM new_topic,
    (VALUES
    ('quiz'),
    ('true-false'),
    ('code-completion'),
    ('code-ordering'),
    ('flip-card'),
    ('big-o'),
    ('async-sorter')
    ) AS w(wt)
    ),

-- 4️⃣ Insert questions
    inserted_questions AS (
INSERT INTO public.questions (topic_id, widget_type, payload_question, payload_answer)
SELECT
    nt.id,
    q.widget_type,
    q.payload_question::jsonb,
    q.payload_answer::jsonb
FROM new_topic nt
    JOIN (
    VALUES

-- QUIZ
    ('quiz',
    '{
      "question": {
        "en":"What is typeof null?",
        "ru":"Что такое typeof null?",
        "by":"Што такое typeof null?"
      },
      "options": [
        {"en":"null","ru":"null","by":"null"},
        {"en":"object","ru":"object","by":"object"},
        {"en":"undefined","ru":"undefined","by":"undefined"},
        {"en":"number","ru":"number","by":"number"}
      ]
    }',
    '{"correctIndex":1}'
    ),

-- TRUE FALSE
    ('true-false',
    '{
      "statement": {
        "en":"JavaScript is single-threaded",
        "ru":"JavaScript однопоточный",
        "by":"JavaScript аднапаточны"
      }
    }',
    '{"correct":true}'
    ),

-- CODE COMPLETION
    ('code-completion',
    '{
      "code":"const result = arr.___(x => x > 0);",
      "blanks":["___"]
    }',
    '{"answers":["filter"]}'
    ),

-- CODE ORDERING
    ('code-ordering',
    '{
      "description":{
        "en":"Arrange function",
        "ru":"Arrange function",
        "by":"Arrange function"
      },
      "lines":[
        "return a + b;",
        "function sum(a, b) {",
        "}"
      ]
    }',
    '{"answers":[1,0,2]}'
    ),

-- FLIP CARD
    ('flip-card',
    '{
      "term": {
        "en":"Closure",
        "ru":"Замыкание",
        "by":"Замыканне"
      },
      "definition": {
        "en":"Function with access to outer scope",
        "ru":"Функция с доступом к внешней области",
        "by":"Функцыя з доступам да знешняй вобласці"
      }
    }',
    '{}'
    ),

-- BIG-O
    ('big-o',
    '{
      "question": {
        "en":"What is complexity of linear search?",
        "ru":"Какая сложность линейного поиска?",
        "by":"Якая складанасць лінейнага пошуку?"
      },
      "codeExample":"for(let i=0;i<n;i++){ if(arr[i]===x) return i; }"
    }',
    '{"correct":"O(n)"}'
    ),

-- ASYNC SORTER
    ('async-sorter',
    '{
      "codeSnippet":"console.log(1); Promise.resolve().then(()=>console.log(2)); console.log(3);",
      "blocks":[
        {"id":"b1","code":"console.log(1)","label":"1"},
        {"id":"b2","code":"Promise.then","label":"2"},
        {"id":"b3","code":"console.log(3)","label":"3"}
      ]
    }',
    '{
      "callStack":["b1","b3"],
      "microtasks":["b2"],
      "macrotasks":[],
      "outputOrder":["b1","b3","b2"]
    }'
    )

    ) AS q(widget_type, payload_question, payload_answer)
ON TRUE
    RETURNING id
    )

SELECT COUNT(*) FROM inserted_questions;

COMMIT;