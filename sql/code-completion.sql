BEGIN;

-- 1️⃣ Ensure widget exists
INSERT INTO public.widgets (type, name)
VALUES
    (
        'code-completion',
        '{"en":"Code Completion","ru":"Дополнение кода","by":"Дапаўненне кода"}'
    )
    ON CONFLICT (type) DO NOTHING;

-- 2️⃣ Create topic
WITH new_topic AS (
INSERT INTO public.topics (name, description)
VALUES (
    '{
      "en": "Code Completion Basics",
      "ru": "Основы дополнения кода",
      "by": "Асновы дапаўнення кода"
    }',
    '{
      "en": "Fill missing parts of JavaScript code",
      "ru": "Заполнение пропущенных частей кода JavaScript",
      "by": "Запаўненне прапушчаных частак кода JavaScript"
    }'
    )
    RETURNING id
    ),

-- 3️⃣ Link widget
    topic_widgets_insert AS (
INSERT INTO public.topic_widgets (topic_id, widget_type)
SELECT id, 'code-completion'
FROM new_topic
    ),

-- 4️⃣ Insert questions
    inserted_questions AS (
INSERT INTO public.questions (topic_id, widget_type, payload_question, payload_answer)
SELECT
    nt.id,
    'code-completion',
    q.payload_question::jsonb,
    q.payload_answer::jsonb
FROM new_topic nt
    JOIN (
    VALUES

    -- CODE 1
    (
    '{
      "code": "const sum = (a, b) => a ___ b;",
      "blanks": ["___"]
    }',
    '{"answers": ["+"]}'
    ),

    -- CODE 2
    (
    '{
      "code": "const result = arr.___(x => x > 0);",
      "blanks": ["___"]
    }',
    '{"answers": ["filter"]}'
    ),

    -- CODE 3
    (
    '{
      "code": "const value = obj.___;",
      "blanks": ["___"]
    }',
    '{"answers": ["prop"]}'
    ),

    -- CODE 4
    (
    '{
      "code": "const promise = new Promise((resolve, reject) => { resolve(___); });",
      "blanks": ["___"]
    }',
    '{"answers": ["value"]}'
    ),

    -- CODE 5
    (
    '{
      "code": "const fn = () => { return ___; };",
      "blanks": ["___"]
    }',
    '{"answers": ["true"]}'
    ),

    -- CODE 6
    (
    '{
      "code": "const merged = { ...obj1, ___ };",
      "blanks": ["___"]
    }',
    '{"answers": ["...obj2"]}'
    )

    ) AS q(payload_question, payload_answer)
ON TRUE
    RETURNING id
    )

SELECT COUNT(*) FROM inserted_questions;

COMMIT;

BEGIN;

-- 1️⃣ Ensure widget exists
INSERT INTO public.widgets (type, name)
VALUES
    (
        'code-completion',
        '{"en":"Code Completion","ru":"Дополнение кода","by":"Дапаўненне кода"}'
    )
    ON CONFLICT (type) DO NOTHING;

-- 2️⃣ Create topic
WITH new_topic AS (
INSERT INTO public.topics (name, description, level)
VALUES (
    '{
      "en": "Intermediate Code Completion",
      "ru": "Средний уровень: дополнение кода",
      "by": "Сярэдні ўзровень: дапаўненне кода"
    }',
    '{
      "en": "Fill multiple blanks in real JavaScript scenarios",
      "ru": "Заполнение нескольких пропусков в реальных сценариях JavaScript",
      "by": "Запаўненне некалькіх пропускаў у рэальных сцэнарыях JavaScript"
    }',
    'intermediate'
    )
    RETURNING id
    ),

-- 3️⃣ Link widget
    topic_widgets_insert AS (
INSERT INTO public.topic_widgets (topic_id, widget_type)
SELECT id, 'code-completion'
FROM new_topic
    ),

-- 4️⃣ Insert questions
    inserted_questions AS (
INSERT INTO public.questions (topic_id, widget_type, payload_question, payload_answer)
SELECT
    nt.id,
    'code-completion',
    q.payload_question::jsonb,
    q.payload_answer::jsonb
FROM new_topic nt
    JOIN (
    VALUES

    -- QUESTION 1
    (
    '{
      "code": "const result = arr.___(x => x > 10).___(x => x * 2);",
      "blanks": ["___", "___"],
      "hints": [
        {
          "en":"Filters elements",
          "ru":"Фильтрует элементы",
          "by":"Фільтруе элементы"
        },
        {
          "en":"Transforms elements",
          "ru":"Преобразует элементы",
          "by":"Пераўтварае элементы"
        }
      ]
    }',
    '{
      "answers": ["filter", "map"]
    }'
    ),

    -- QUESTION 2
    (
    '{
      "code": "const sum = arr.___((acc, val) => acc + val, ___);",
      "blanks": ["___", "___"],
      "hints": [
        {
          "en":"Used to reduce array to single value",
          "ru":"Используется для свёртки массива",
          "by":"Выкарыстоўваецца для згортвання масіва"
        },
        {
          "en":"Initial value",
          "ru":"Начальное значение",
          "by":"Пачатковае значэнне"
        }
      ]
    }',
    '{
      "answers": ["reduce", "0"]
    }'
    ),

    -- QUESTION 3
    (
    '{
      "code": "const user = { name: \"John\" }; const { ___ } = user; console.log(___);",
      "blanks": ["___", "___"],
      "hints": [
        {
          "en":"Extract property name",
          "ru":"Извлечь имя свойства",
          "by":"Атрымаць імя ўласцівасці"
        },
        {
          "en":"Log extracted variable",
          "ru":"Вывести переменную",
          "by":"Вывесці пераменную"
        }
      ]
    }',
    '{
      "answers": ["name", "name"]
    }'
    ),

    -- QUESTION 4
    (
    '{
      "code": "const fetchData = async () => { const res = await fetch(url); const data = await res.___(); return ___; };",
      "blanks": ["___", "___"],
      "hints": [
        {
          "en":"Convert response to JSON",
          "ru":"Преобразовать ответ в JSON",
          "by":"Пераўтварыць адказ у JSON"
        },
        {
          "en":"Return parsed data",
          "ru":"Вернуть данные",
          "by":"Вярнуць дадзеныя"
        }
      ]
    }',
    '{
      "answers": ["json", "data"]
    }'
    ),

    -- QUESTION 5
    (
    '{
      "code": "const merged = { ...obj1, ___ }; const keys = Object.___(merged);",
      "blanks": ["___", "___"],
      "hints": [
        {
          "en":"Spread second object",
          "ru":"Развернуть второй объект",
          "by":"Разгарнуць другі абʼект"
        },
        {
          "en":"Get object keys",
          "ru":"Получить ключи объекта",
          "by":"Атрымаць ключы абʼекта"
        }
      ]
    }',
    '{
      "answers": ["...obj2", "keys"]
    }'
    )

    ) AS q(payload_question, payload_answer)
ON TRUE
    RETURNING id
    )

SELECT COUNT(*) FROM inserted_questions;

COMMIT;