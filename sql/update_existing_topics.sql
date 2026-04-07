BEGIN;

-- 1️⃣ Ensure allowed widgets for topic 4
INSERT INTO public.topic_widgets (topic_id, widget_type)
VALUES
    (4, 'quiz'),
    (4, 'true-false')
    ON CONFLICT (topic_id, widget_type) DO NOTHING;

-- 2️⃣ Insert questions
INSERT INTO public.questions (topic_id, widget_type, payload_question, payload_answer)
VALUES

-- QUIZ 1
(
    4,
    'quiz',
    '{
      "question": {
        "en":"Which keyword declares a block-scoped variable?",
        "ru":"Какое ключевое слово объявляет переменную с блочной областью видимости?",
        "by":"Якое ключавое слова абʼяўляе пераменную з блочнай вобласцю бачнасці?"
      },
      "options": [
        {"en":"var","ru":"var","by":"var"},
        {"en":"let","ru":"let","by":"let"},
        {"en":"const","ru":"const","by":"const"},
        {"en":"define","ru":"define","by":"define"}
      ]
    }',
    '{"correctIndex":1}'
),

-- QUIZ 2
(
    4,
    'quiz',
    '{
      "question": {
        "en":"Which of these is NOT a primitive type?",
        "ru":"Что из этого НЕ является примитивным типом?",
        "by":"Што з гэтага НЕ зʼяўляецца прымітыўным тыпам?"
      },
      "options": [
        {"en":"string","ru":"строка","by":"радок"},
        {"en":"number","ru":"число","by":"лік"},
        {"en":"object","ru":"объект","by":"абʼект"},
        {"en":"boolean","ru":"булево","by":"булева"}
      ]
    }',
    '{"correctIndex":2}'
),

-- QUIZ 3
(
    4,
    'quiz',
    '{
      "question": {
        "en":"What does typeof null return?",
        "ru":"Что возвращает typeof null?",
        "by":"Што вяртае typeof null?"
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

-- TRUE/FALSE 4
(
    4,
    'true-false',
    '{
      "statement": {
        "en":"Variables declared with const cannot be reassigned",
        "ru":"Переменные, объявленные через const, нельзя переназначить",
        "by":"Пераменныя, абʼяўленыя праз const, нельга пераназначыць"
      },
      "explanation": {
        "en":"const prevents reassignment but allows object mutation",
        "ru":"const запрещает переназначение, но не изменение объекта",
        "by":"const забараняе пераназначэнне, але не змяненне абʼекта"
      }
    }',
    '{"correct":true}'
),

-- TRUE/FALSE 5
(
    4,
    'true-false',
    '{
      "statement": {
        "en":"undefined and null are the same",
        "ru":"undefined и null — это одно и то же",
        "by":"undefined і null — гэта адно і тое ж"
      },
      "explanation": {
        "en":"They are different types in JavaScript",
        "ru":"Это разные типы в JavaScript",
        "by":"Гэта розныя тыпы ў JavaScript"
      }
    }',
    '{"correct":false}'
),

-- TRUE/FALSE 6
(
    4,
    'true-false',
    '{
      "statement": {
        "en":"let variables are block-scoped",
        "ru":"Переменные let имеют блочную область видимости",
        "by":"Пераменныя let маюць блочную вобласць бачнасці"
      },
      "explanation": {
        "en":"They exist only inside the block they are defined in",
        "ru":"Они существуют только внутри блока, где объявлены",
        "by":"Яны існуюць толькі ўнутры блока, дзе абʼяўлены"
      }
    }',
    '{"correct":true}'
);

COMMIT;

BEGIN;

-- 1️⃣ Ensure allowed widgets
INSERT INTO public.topic_widgets (topic_id, widget_type)
VALUES
    (5, 'quiz'),
    (5, 'true-false')
    ON CONFLICT (topic_id, widget_type) DO NOTHING;

-- 2️⃣ Insert questions
INSERT INTO public.questions (topic_id, widget_type, payload_question, payload_answer)
VALUES

-- QUIZ 1
(
    5,
    'quiz',
    '{
      "question": {
        "en":"How do you access an object property?",
        "ru":"Как получить доступ к свойству объекта?",
        "by":"Як атрымаць доступ да ўласцівасці абʼекта?"
      },
      "options": [
        {"en":"obj->prop","ru":"obj->prop","by":"obj->prop"},
        {"en":"obj.prop","ru":"obj.prop","by":"obj.prop"},
        {"en":"obj[prop]()","ru":"obj[prop]()","by":"obj[prop]()"},
        {"en":"prop(obj)","ru":"prop(obj)","by":"prop(obj)"}
      ]
    }',
    '{"correctIndex":1}'
),

-- QUIZ 2
(
    5,
    'quiz',
    '{
      "question": {
        "en":"Which method returns object keys?",
        "ru":"Какой метод возвращает ключи объекта?",
        "by":"Які метад вяртае ключы абʼекта?"
      },
      "options": [
        {"en":"Object.values","ru":"Object.values","by":"Object.values"},
        {"en":"Object.keys","ru":"Object.keys","by":"Object.keys"},
        {"en":"Object.entries","ru":"Object.entries","by":"Object.entries"},
        {"en":"Object.get","ru":"Object.get","by":"Object.get"}
      ]
    }',
    '{"correctIndex":1}'
),

-- QUIZ 3
(
    5,
    'quiz',
    '{
      "question": {
        "en":"What does Object.assign() do?",
        "ru":"Что делает Object.assign()?",
        "by":"Што робіць Object.assign()?"
      },
      "options": [
        {"en":"Deletes properties","ru":"Удаляет свойства","by":"Выдаляе ўласцівасці"},
        {"en":"Copies properties","ru":"Копирует свойства","by":"Капіруе ўласцівасці"},
        {"en":"Freezes object","ru":"Замораживает объект","by":"Замарожвае абʼект"},
        {"en":"Creates class","ru":"Создает класс","by":"Стварае клас"}
      ]
    }',
    '{"correctIndex":1}'
),

-- TRUE/FALSE 4
(
    5,
    'true-false',
    '{
      "statement": {
        "en":"Objects are reference types",
        "ru":"Объекты являются ссылочными типами",
        "by":"Абʼекты зʼяўляюцца спасылкавымі тыпамі"
      },
      "explanation": {
        "en":"Variables store references, not actual object data",
        "ru":"Переменные хранят ссылку, а не сам объект",
        "by":"Пераменныя захоўваюць спасылку, а не сам абʼект"
      }
    }',
    '{"correct":true}'
),

-- TRUE/FALSE 5
(
    5,
    'true-false',
    '{
      "statement": {
        "en":"Object.freeze() makes object immutable",
        "ru":"Object.freeze() делает объект полностью неизменяемым",
        "by":"Object.freeze() робіць абʼект поўнасцю нязменным"
      },
      "explanation": {
        "en":"It prevents adding, deleting, or modifying properties",
        "ru":"Он запрещает добавление, удаление и изменение свойств",
        "by":"Ён забараняе дадаванне, выдаленне і змяненне ўласцівасцей"
      }
    }',
    '{"correct":true}'
),

-- TRUE/FALSE 6
(
    5,
    'true-false',
    '{
      "statement": {
        "en":"Two objects are equal if they have the same properties",
        "ru":"Два объекта равны, если у них одинаковые свойства",
        "by":"Два абʼекты роўныя, калі ў іх аднолькавыя ўласцівасці"
      },
      "explanation": {
        "en":"Objects are compared by reference, not by value",
        "ru":"Объекты сравниваются по ссылке, а не по значению",
        "by":"Абʼекты параўноўваюцца па спасылцы, а не па значэнні"
      }
    }',
    '{"correct":false}'
);

COMMIT;

BEGIN;

-- 1️⃣ Ensure allowed widgets
INSERT INTO public.topic_widgets (topic_id, widget_type)
VALUES
    (6, 'quiz'),
    (6, 'true-false')
    ON CONFLICT (topic_id, widget_type) DO NOTHING;

-- 2️⃣ Insert questions
INSERT INTO public.questions (topic_id, widget_type, payload_question, payload_answer)
VALUES

-- QUIZ 1
(
    6,
    'quiz',
    '{
      "question": {
        "en":"Which method selects an element by id?",
        "ru":"Какой метод выбирает элемент по id?",
        "by":"Які метад выбірае элемент па id?"
      },
      "options": [
        {"en":"querySelector","ru":"querySelector","by":"querySelector"},
        {"en":"getElementById","ru":"getElementById","by":"getElementById"},
        {"en":"getElementsByClass","ru":"getElementsByClass","by":"getElementsByClass"},
        {"en":"selectById","ru":"selectById","by":"selectById"}
      ]
    }',
    '{"correctIndex":1}'
),

-- QUIZ 2
(
    6,
    'quiz',
    '{
      "question": {
        "en":"What does querySelector return?",
        "ru":"Что возвращает querySelector?",
        "by":"Што вяртае querySelector?"
      },
      "options": [
        {"en":"All matching elements","ru":"Все подходящие элементы","by":"Усе адпаведныя элементы"},
        {"en":"First matching element","ru":"Первый подходящий элемент","by":"Першы адпаведны элемент"},
        {"en":"Array of elements","ru":"Массив элементов","by":"Масіў элементаў"},
        {"en":"Boolean","ru":"Булево значение","by":"Булева значэнне"}
      ]
    }',
    '{"correctIndex":1}'
),

-- QUIZ 3
(
    6,
    'quiz',
    '{
      "question": {
        "en":"How do you change text inside an element?",
        "ru":"Как изменить текст внутри элемента?",
        "by":"Як змяніць тэкст унутры элемента?"
      },
      "options": [
        {"en":"element.text","ru":"element.text","by":"element.text"},
        {"en":"element.innerText","ru":"element.innerText","by":"element.innerText"},
        {"en":"element.value","ru":"element.value","by":"element.value"},
        {"en":"element.setText()","ru":"element.setText()","by":"element.setText()"}
      ]
    }',
    '{"correctIndex":1}'
),

-- TRUE/FALSE 4
(
    6,
    'true-false',
    '{
      "statement": {
        "en":"document.querySelector can select elements using CSS selectors",
        "ru":"document.querySelector может выбирать элементы с помощью CSS-селекторов",
        "by":"document.querySelector можа выбіраць элементы з дапамогай CSS-селектараў"
      },
      "explanation": {
        "en":"It supports any valid CSS selector",
        "ru":"Он поддерживает любые корректные CSS-селекторы",
        "by":"Ён падтрымлівае любыя карэктныя CSS-селектары"
      }
    }',
    '{"correct":true}'
),

-- TRUE/FALSE 5
(
    6,
    'true-false',
    '{
      "statement": {
        "en":"getElementById returns multiple elements",
        "ru":"getElementById возвращает несколько элементов",
        "by":"getElementById вяртае некалькі элементаў"
      },
      "explanation": {
        "en":"It always returns a single element or null",
        "ru":"Он возвращает только один элемент или null",
        "by":"Ён вяртае толькі адзін элемент або null"
      }
    }',
    '{"correct":false}'
),

-- TRUE/FALSE 6
(
    6,
    'true-false',
    '{
      "statement": {
        "en":"innerHTML allows inserting HTML content",
        "ru":"innerHTML позволяет вставлять HTML-контент",
        "by":"innerHTML дазваляе ўстаўляць HTML-кантэнт"
      },
      "explanation": {
        "en":"It parses and renders HTML inside the element",
        "ru":"Он парсит и отображает HTML внутри элемента",
        "by":"Ён парсіць і адлюстроўвае HTML унутры элемента"
      }
    }',
    '{"correct":true}'
);

COMMIT;

BEGIN;

-- 1️⃣ Ensure allowed widgets
INSERT INTO public.topic_widgets (topic_id, widget_type)
VALUES
    (9, 'quiz'),
    (9, 'true-false')
    ON CONFLICT (topic_id, widget_type) DO NOTHING;

-- 2️⃣ Insert questions
INSERT INTO public.questions (topic_id, widget_type, payload_question, payload_answer)
VALUES

-- QUIZ 1
(
    9,
    'quiz',
    '{
      "question": {
        "en":"What is the state of a Promise after it is fulfilled?",
        "ru":"Какое состояние у Promise после выполнения?",
        "by":"Які стан у Promise пасля выканання?"
      },
      "options": [
        {"en":"pending","ru":"pending","by":"pending"},
        {"en":"resolved","ru":"resolved","by":"resolved"},
        {"en":"rejected","ru":"rejected","by":"rejected"},
        {"en":"paused","ru":"paused","by":"paused"}
      ]
    }',
    '{"correctIndex":1}'
),

-- QUIZ 2
(
    9,
    'quiz',
    '{
      "question": {
        "en":"Which method handles successful Promise result?",
        "ru":"Какой метод обрабатывает успешный результат Promise?",
        "by":"Які метад апрацоўвае паспяховы вынік Promise?"
      },
      "options": [
        {"en":"catch","ru":"catch","by":"catch"},
        {"en":"then","ru":"then","by":"then"},
        {"en":"finally","ru":"finally","by":"finally"},
        {"en":"resolve","ru":"resolve","by":"resolve"}
      ]
    }',
    '{"correctIndex":1}'
),

-- QUIZ 3
(
    9,
    'quiz',
    '{
      "question": {
        "en":"What does Promise.all() return?",
        "ru":"Что возвращает Promise.all()?",
        "by":"Што вяртае Promise.all()?"
      },
      "options": [
        {"en":"First resolved value","ru":"Первое выполненное значение","by":"Першае выкананае значэнне"},
        {"en":"Array of results","ru":"Массив результатов","by":"Масіў вынікаў"},
        {"en":"Single error only","ru":"Только одну ошибку","by":"Толькі адну памылку"},
        {"en":"Boolean","ru":"Булево значение","by":"Булева значэнне"}
      ]
    }',
    '{"correctIndex":1}'
),

-- TRUE/FALSE 4
(
    9,
    'true-false',
    '{
      "statement": {
        "en":"A Promise can be pending, fulfilled, or rejected",
        "ru":"Promise может быть в состоянии pending, fulfilled или rejected",
        "by":"Promise можа быць у стане pending, fulfilled або rejected"
      },
      "explanation": {
        "en":"These are the three core Promise states",
        "ru":"Это три основных состояния Promise",
        "by":"Гэта тры асноўныя станы Promise"
      }
    }',
    '{"correct":true}'
),

-- TRUE/FALSE 5
(
    9,
    'true-false',
    '{
      "statement": {
        "en":"catch handles successful results",
        "ru":"catch обрабатывает успешные результаты",
        "by":"catch апрацоўвае паспяховыя вынікі"
      },
      "explanation": {
        "en":"catch is used for errors only",
        "ru":"catch используется только для ошибок",
        "by":"catch выкарыстоўваецца толькі для памылак"
      }
    }',
    '{"correct":false}'
),

-- TRUE/FALSE 6
(
    9,
    'true-false',
    '{
      "statement": {
        "en":"finally runs regardless of Promise outcome",
        "ru":"finally выполняется независимо от результата Promise",
        "by":"finally выконваецца незалежна ад выніку Promise"
      },
      "explanation": {
        "en":"It runs after resolve or reject",
        "ru":"Он выполняется после resolve или reject",
        "by":"Ён выконваецца пасля resolve або reject"
      }
    }',
    '{"correct":true}'
);

COMMIT;

BEGIN;

-- 1️⃣ Ensure allowed widgets
INSERT INTO public.topic_widgets (topic_id, widget_type)
VALUES
    (11, 'quiz'),
    (11, 'true-false')
    ON CONFLICT (topic_id, widget_type) DO NOTHING;

-- 2️⃣ Insert questions
INSERT INTO public.questions (topic_id, widget_type, payload_question, payload_answer)
VALUES

-- QUIZ 1
(
    11,
    'quiz',
    '{
      "question": {
        "en":"What is a closure in JavaScript?",
        "ru":"Что такое замыкание в JavaScript?",
        "by":"Што такое замыканне ў JavaScript?"
      },
      "options": [
        {"en":"A function with its lexical scope","ru":"Функция с лексическим окружением","by":"Функцыя з лексічным асяроддзем"},
        {"en":"A loop inside function","ru":"Цикл внутри функции","by":"Цыкл унутры функцыі"},
        {"en":"A class method","ru":"Метод класса","by":"Метад класа"},
        {"en":"A Promise wrapper","ru":"Обертка Promise","by":"Абгортка Promise"}
      ]
    }',
    '{"correctIndex":0}'
),

-- QUIZ 2
(
    11,
    'quiz',
    '{
      "question": {
        "en":"What does currying do?",
        "ru":"Что делает каррирование?",
        "by":"Што робіць карынг?"
      },
      "options": [
        {"en":"Combines objects","ru":"Объединяет объекты","by":"Абʼядноўвае абʼекты"},
        {"en":"Transforms function into sequence of functions","ru":"Преобразует функцию в цепочку функций","by":"Ператварае функцыю ў ланцужок функцый"},
        {"en":"Deletes arguments","ru":"Удаляет аргументы","by":"Выдаляе аргументы"},
        {"en":"Stops execution","ru":"Останавливает выполнение","by":"Спыняе выкананне"}
      ]
    }',
    '{"correctIndex":1}'
),

-- QUIZ 3
(
    11,
    'quiz',
    '{
      "question": {
        "en":"What will a curried function return when partially applied?",
        "ru":"Что возвращает каррированная функция при частичном применении?",
        "by":"Што вяртае карынг-функцыя пры частковым ужыванні?"
      },
      "options": [
        {"en":"undefined","ru":"undefined","by":"undefined"},
        {"en":"A new function","ru":"Новая функция","by":"Новая функцыя"},
        {"en":"null","ru":"null","by":"null"},
        {"en":"Boolean","ru":"Булево значение","by":"Булева значэнне"}
      ]
    }',
    '{"correctIndex":1}'
),

-- TRUE/FALSE 4
(
    11,
    'true-false',
    '{
      "statement": {
        "en":"Closures can access variables from outer scope",
        "ru":"Замыкания могут обращаться к переменным внешней области",
        "by":"Замыканні могуць атрымліваць доступ да знешніх пераменных"
      },
      "explanation": {
        "en":"They preserve lexical scope even after outer function returns",
        "ru":"Они сохраняют лексическое окружение после выполнения функции",
        "by":"Яны захоўваюць лексічнае асяроддзе пасля выканання функцыі"
      }
    }',
    '{"correct":true}'
),

-- TRUE/FALSE 5
(
    11,
    'true-false',
    '{
      "statement": {
        "en":"Currying executes all arguments at once",
        "ru":"Каррирование выполняет все аргументы сразу",
        "by":"Карынг выконвае ўсе аргументы адразу"
      },
      "explanation": {
        "en":"Currying breaks function into multiple unary functions",
        "ru":"Каррирование разбивает функцию на цепочку функций",
        "by":"Карынг разбівае функцыю на ланцужок функцый"
      }
    }',
    '{"correct":false}'
),

-- TRUE/FALSE 6
(
    11,
    'true-false',
    '{
      "statement": {
        "en":"Closures can lead to memory leaks if misused",
        "ru":"Замыкания могут приводить к утечкам памяти",
        "by":"Замыканні могуць выклікаць уцечкі памяці"
      },
      "explanation": {
        "en":"Holding references prevents garbage collection",
        "ru":"Ссылки могут мешать сборке мусора",
        "by":"Спасылкі могуць перашкаджаць збору смецця"
      }
    }',
    '{"correct":true}'
);

COMMIT;

BEGIN;

-- 1️⃣ Ensure allowed widgets
INSERT INTO public.topic_widgets (topic_id, widget_type)
VALUES
    (12, 'quiz'),
    (12, 'true-false')
    ON CONFLICT (topic_id, widget_type) DO NOTHING;

-- 2️⃣ Insert questions
INSERT INTO public.questions (topic_id, widget_type, payload_question, payload_answer)
VALUES

-- QUIZ 1
(
    12,
    'quiz',
    '{
      "question": {
        "en":"Which feature allows unpacking values from arrays or objects?",
        "ru":"Какая возможность позволяет распаковывать значения из массивов и объектов?",
        "by":"Якая магчымасць дазваляе распакоўваць значэнні з масіваў і абʼектаў?"
      },
      "options": [
        {"en":"Destructuring","ru":"Деструктуризация","by":"Дэструктывізацыя"},
        {"en":"Mapping","ru":"Маппинг","by":"Мапінг"},
        {"en":"Binding","ru":"Биндинг","by":"Біндынг"},
        {"en":"Compilation","ru":"Компиляция","by":"Кампіляцыя"}
      ]
    }',
    '{"correctIndex":0}'
),

-- QUIZ 2
(
    12,
    'quiz',
    '{
      "question": {
        "en":"What does the spread operator (...) do?",
        "ru":"Что делает оператор spread (...)?",
        "by":"Што робіць аператар spread (...)?"
      },
      "options": [
        {"en":"Removes elements","ru":"Удаляет элементы","by":"Выдаляе элементы"},
        {"en":"Expands iterable into elements","ru":"Разворачивает итерируемый объект","by":"Разгортвае ітэраваны абʼект"},
        {"en":"Freezes object","ru":"Замораживает объект","by":"Замарожвае абʼект"},
        {"en":"Creates loop","ru":"Создает цикл","by":"Стварае цыкл"}
      ]
    }',
    '{"correctIndex":1}'
),

-- QUIZ 3
(
    12,
    'quiz',
    '{
      "question": {
        "en":"Which keyword is used for block-scoped constants?",
        "ru":"Какое ключевое слово используется для констант с блочной областью?",
        "by":"Якое ключавое слова выкарыстоўваецца для канстант з блочнай вобласцю?"
      },
      "options": [
        {"en":"var","ru":"var","by":"var"},
        {"en":"let","ru":"let","by":"let"},
        {"en":"const","ru":"const","by":"const"},
        {"en":"define","ru":"define","by":"define"}
      ]
    }',
    '{"correctIndex":2}'
),

-- TRUE/FALSE 4
(
    12,
    'true-false',
    '{
      "statement": {
        "en":"Arrow functions have their own this context",
        "ru":"У стрелочных функций есть собственный this",
        "by":"У стрэлачных функцый ёсць уласны this"
      },
      "explanation": {
        "en":"Arrow functions inherit this from lexical scope",
        "ru":"Стрелочные функции наследуют this из окружения",
        "by":"Стрэлачныя функцыі ўспадкоўваюць this з асяроддзя"
      }
    }',
    '{"correct":false}'
),

-- TRUE/FALSE 5
(
    12,
    'true-false',
    '{
      "statement": {
        "en":"Template literals allow embedded expressions",
        "ru":"Шаблонные строки позволяют вставлять выражения",
        "by":"Шаблонныя радкі дазваляюць устаўляць выразы"
      },
      "explanation": {
        "en":"They use backticks and ${} syntax",
        "ru":"Они используют обратные кавычки и ${}",
        "by":"Яны выкарыстоўваюць зваротныя кавычкі і ${}"
      }
    }',
    '{"correct":true}'
),

-- TRUE/FALSE 6
(
    12,
    'true-false',
    '{
      "statement": {
        "en":"const makes objects immutable",
        "ru":"const делает объекты неизменяемыми",
        "by":"const робіць абʼекты нязменнымі"
      },
      "explanation": {
        "en":"const prevents reassignment, not mutation",
        "ru":"const запрещает переназначение, но не изменение объекта",
        "by":"const забараняе пераназначэнне, але не змяненне абʼекта"
      }
    }',
    '{"correct":false}'
);

COMMIT;

BEGIN;

-- 1️⃣ Ensure allowed widgets
INSERT INTO public.topic_widgets (topic_id, widget_type)
VALUES
    (7, 'quiz'),
    (7, 'true-false')
    ON CONFLICT (topic_id, widget_type) DO NOTHING;

-- 2️⃣ Insert questions
INSERT INTO public.questions (topic_id, widget_type, payload_question, payload_answer)
VALUES

-- QUIZ 1
(
    7,
    'quiz',
    '{
      "question": {
        "en":"Which method prints output to the console?",
        "ru":"Какой метод выводит данные в консоль?",
        "by":"Які метад выводзіць дадзеныя ў кансоль?"
      },
      "options": [
        {"en":"console.print","ru":"console.print","by":"console.print"},
        {"en":"console.log","ru":"console.log","by":"console.log"},
        {"en":"log.console","ru":"log.console","by":"log.console"},
        {"en":"print()","ru":"print()","by":"print()"}
      ]
    }',
    '{"correctIndex":1}'
),

-- QUIZ 2
(
    7,
    'quiz',
    '{
      "question": {
        "en":"Which method logs an error message?",
        "ru":"Какой метод выводит сообщение об ошибке?",
        "by":"Які метад выводзіць паведамленне пра памылку?"
      },
      "options": [
        {"en":"console.warn","ru":"console.warn","by":"console.warn"},
        {"en":"console.error","ru":"console.error","by":"console.error"},
        {"en":"console.info","ru":"console.info","by":"console.info"},
        {"en":"console.debug","ru":"console.debug","by":"console.debug"}
      ]
    }',
    '{"correctIndex":1}'
),

-- QUIZ 3
(
    7,
    'quiz',
    '{
      "question": {
        "en":"What does console.table() do?",
        "ru":"Что делает console.table()?",
        "by":"Што робіць console.table()?"
      },
      "options": [
        {"en":"Logs error","ru":"Выводит ошибку","by":"Выводзіць памылку"},
        {"en":"Displays data as table","ru":"Показывает данные в виде таблицы","by":"Паказвае дадзеныя ў выглядзе табліцы"},
        {"en":"Stops execution","ru":"Останавливает выполнение","by":"Спыняе выкананне"},
        {"en":"Clears console","ru":"Очищает консоль","by":"Ачышчае кансоль"}
      ]
    }',
    '{"correctIndex":1}'
),

-- TRUE/FALSE 4
(
    7,
    'true-false',
    '{
      "statement": {
        "en":"console.warn displays a warning message",
        "ru":"console.warn выводит предупреждение",
        "by":"console.warn выводзіць папярэджанне"
      },
      "explanation": {
        "en":"It highlights messages differently from console.log",
        "ru":"Он выделяет сообщения иначе, чем console.log",
        "by":"Ён адрозніваецца ад console.log у адлюстраванні"
      }
    }',
    '{"correct":true}'
),

-- TRUE/FALSE 5
(
    7,
    'true-false',
    '{
      "statement": {
        "en":"console.log stops JavaScript execution",
        "ru":"console.log останавливает выполнение JavaScript",
        "by":"console.log спыняе выкананне JavaScript"
      },
      "explanation": {
        "en":"It only prints data, it does not affect execution",
        "ru":"Он только выводит данные и не влияет на выполнение",
        "by":"Ён толькі выводзіць дадзеныя і не ўплывае на выкананне"
      }
    }',
    '{"correct":false}'
),

-- TRUE/FALSE 6
(
    7,
    'true-false',
    '{
      "statement": {
        "en":"You can log objects in the console",
        "ru":"Можно выводить объекты в консоль",
        "by":"Можна выводзіць абʼекты ў кансоль"
      },
      "explanation": {
        "en":"Console can display objects interactively",
        "ru":"Консоль может отображать объекты интерактивно",
        "by":"Кансоль можа адлюстроўваць абʼекты інтэрактыўна"
      }
    }',
    '{"correct":true}'
);

COMMIT;
