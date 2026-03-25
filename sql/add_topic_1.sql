BEGIN;

-- 1️⃣ Ensure widgets exist
INSERT INTO public.widgets (type, name)
VALUES ('quiz', '{"en":"Quiz","ru":"Тест","by":"Тэст"}'),
       ('true-false',
        '{"en":"True / False","ru":"Верно / Неверно","by":"Праўда / Хлусня"}') ON CONFLICT (type) DO NOTHING;

-- 2️⃣ Create topic
WITH new_topic AS (
INSERT
INTO public.topics (name, description)
VALUES (
    '{
      "by": "Асінхронныя паттэрны",
      "en": "Asynchronous Patterns",
      "ru": "Асинхронные паттерны"
    }', '{
      "by": "Праца з Promise і async/await",
      "en": "Working with Promises and async/await",
      "ru": "Работа с Promise и async/await"
    }'
    )
    RETURNING id
    ),

-- 3️⃣ Link widgets
    topic_widgets_insert AS (
INSERT
INTO public.topic_widgets (topic_id, widget_type)
SELECT id, wt
FROM new_topic, (VALUES ('quiz'), ('true-false')) AS w(wt)
    ),

-- 4️⃣ Insert questions
    inserted_questions AS (
INSERT
INTO public.questions (topic_id, widget_type, payload_question, payload_answer)
SELECT
    nt.id, q.widget_type, q.payload_question::jsonb, q.payload_answer::jsonb
FROM new_topic nt
    JOIN (
    VALUES

    -- QUIZ 1
    ('quiz', '{
      "question": {
        "en":"What does Promise.resolve() do?",
        "ru":"Что делает Promise.resolve()?",
        "by":"Што робіць Promise.resolve()?"
      },
      "options": [
        {"en":"Rejects promise","ru":"Отклоняет промис","by":"Адхіляе проміс"},
        {"en":"Creates resolved promise","ru":"Создает выполненный промис","by":"Стварае выкананы проміс"},
        {"en":"Cancels promise","ru":"Отменяет промис","by":"Адмяняе проміс"},
        {"en":"Queues task","ru":"Ставит задачу в очередь","by":"Дадае задачу ў чаргу"}
      ]
    }', '{"correctIndex":1}'
    ),

    -- QUIZ 2
    ('quiz', '{
      "question": {
        "en":"Which queue runs first?",
        "ru":"Какая очередь выполняется первой?",
        "by":"Якая чарга выконваецца першай?"
      },
      "options": [
        {"en":"Macrotask","ru":"Макрозадача","by":"Макразадача"},
        {"en":"Microtask","ru":"Микрозадача","by":"Мікразадача"},
        {"en":"Render","ru":"Рендер","by":"Рэндэр"},
        {"en":"Callback","ru":"Колбэк","by":"Калбэк"}
      ]
    }', '{"correctIndex":1}'
    ),

    -- QUIZ 3
    ('quiz', '{
      "question": {
        "en":"Which keyword pauses async execution?",
        "ru":"Какое ключевое слово приостанавливает async выполнение?",
        "by":"Якое ключавое слова прыпыняе async выкананне?"
      },
      "options": [
        {"en":"pause","ru":"pause","by":"pause"},
        {"en":"await","ru":"await","by":"await"},
        {"en":"stop","ru":"stop","by":"stop"},
        {"en":"yield","ru":"yield","by":"yield"}
      ]
    }', '{"correctIndex":1}'
    ),

    -- QUIZ 4
    ('quiz', '{
      "question": {
        "en":"What does Promise.all return?",
        "ru":"Что возвращает Promise.all?",
        "by":"Што вяртае Promise.all?"
      },
      "options": [
        {"en":"First result","ru":"Первый результат","by":"Першы вынік"},
        {"en":"Array of results","ru":"Массив результатов","by":"Масіў вынікаў"},
        {"en":"Last result","ru":"Последний результат","by":"Апошні вынік"},
        {"en":"Boolean","ru":"Булево значение","by":"Булева значэнне"}
      ]
    }', '{"correctIndex":1}'
    ),

    -- QUIZ 5
    ('quiz', '{
      "question": {
        "en":"What happens if one Promise fails in Promise.all?",
        "ru":"Что происходит если один Promise падает?",
        "by":"Што адбываецца калі адзін Promise падае?"
      },
      "options": [
        {"en":"Ignore","ru":"Игнорируется","by":"Ігнаруецца"},
        {"en":"Retry","ru":"Повторяется","by":"Паўтараецца"},
        {"en":"Reject all","ru":"Отклоняются все","by":"Адхіляюцца ўсе"},
        {"en":"Resolve others","ru":"Остальные выполняются","by":"Іншыя выконваюцца"}
      ]
    }', '{"correctIndex":2}'
    ),

    -- TRUE/FALSE 6
    ('true-false', '{
      "statement": {
        "en":"Async functions always return a Promise",
        "ru":"Async функции всегда возвращают Promise",
        "by":"Async функцыі заўсёды вяртаюць Promise"
      },
      "explanation": {
        "en":"Even return values are wrapped in Promise.resolve",
        "ru":"Даже значения оборачиваются в Promise.resolve",
        "by":"Нават значэнні абгортваюцца ў Promise.resolve"
      }
    }', '{"correct":true}'
    ),

    -- TRUE/FALSE 7
    ('true-false', '{
      "statement": {
        "en":"setTimeout is a microtask",
        "ru":"setTimeout это микрозадача",
        "by":"setTimeout гэта microtask"
      },
      "explanation": {
        "en":"setTimeout is a macrotask",
        "ru":"Это макрозадача",
        "by":"Гэта macrotask"
      }
    }', '{"correct":false}'
    ),

    -- TRUE/FALSE 8
    ('true-false', '{
      "statement": {
        "en":"await blocks the entire thread",
        "ru":"await блокирует поток",
        "by":"await блакуе паток"
      },
      "explanation": {
        "en":"It only pauses async function execution",
        "ru":"Он останавливает только async функцию",
        "by":"Ён спыняе толькі async функцыю"
      }
    }', '{"correct":false}'
    ),

    -- TRUE/FALSE 9
    ('true-false', '{
      "statement": {
        "en":"Promise.race resolves with the first settled promise",
        "ru":"Promise.race возвращает первый завершённый Promise",
        "by":"Promise.race вяртае першы завершаны Promise"
      },
      "explanation": {
        "en":"First resolved or rejected promise wins",
        "ru":"Первый выполненный или отклонённый",
        "by":"Першы завершаны або адхілены"
      }
    }', '{"correct":true}'
    ),

    -- TRUE/FALSE 10
    ('true-false', '{
      "statement": {
        "en":"Promises can be resolved multiple times",
        "ru":"Promise можно завершить несколько раз",
        "by":"Promise можна выканаць некалькі разоў"
      },
      "explanation": {
        "en":"A promise settles only once",
        "ru":"Promise выполняется только один раз",
        "by":"Promise выконваецца толькі адзін раз"
      }
    }', '{"correct":false}'
    )

    ) AS q(widget_type, payload_question, payload_answer)
ON TRUE
    RETURNING id
    )

SELECT COUNT(*)
FROM inserted_questions;

COMMIT;