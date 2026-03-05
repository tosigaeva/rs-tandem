BEGIN;

-- 1️⃣ Insert topic
WITH new_topic AS (
INSERT
INTO public.topics (title)
VALUES ('JavaScript Basics')
    RETURNING id
    ),

-- 2️⃣ Insert questions
    questions AS (
INSERT
INTO public.question ("topicId", title)
SELECT id, title
FROM new_topic, (VALUES
    ('Closures and async behavior'), ('Array methods'), ('Equality comparison'), ('ES Modules'), ('Var hoisting'), ('Const reassignment'), ('Promise behavior'), ('Array map usage'), ('Object destructuring'), ('Async await usage')
    ) AS q(title)
    RETURNING id, title
    )

-- 3️⃣ Insert question variants
INSERT
INTO public.question_variant (question_id, widget_type, payload, answer)
SELECT q.id,
       v.widget_type,
       v.payload::json, v.answer::json
FROM questions q
         JOIN (VALUES ('Closures and async behavior',
                       'quiz',
                       '{
                         "question": "What will be logged to the console?\n\nfor (var i = 0; i < 3; i++) {\n setTimeout(() => console.log(i), 0);\n}",
                         "options": ["0 1 2", "3 3 3", "undefined undefined undefined"]
                       }',
                       '{"correctIndex":1}'),

                      ('Array methods',
                       'quiz',
                       '{
                         "question": "Which array method returns a new array with transformed elements?",
                         "options": ["forEach", "map", "filter"]
                       }',
                       '{"correctIndex":1}'),

                      ('Equality comparison',
                       'quiz',
                       '{
                         "question": "What is the result of: ''5'' == 5 ?",
                         "options": ["true", "false", "TypeError"]
                       }',
                       '{"correctIndex":0}'),

                      ('ES Modules',
                       'quiz',
                       '{
                         "question": "Which keyword is used to export a value in ES Modules?",
                         "options": ["module.exports", "export", "require"]
                       }',
                       '{"correctIndex":1}'),

                      ('Var hoisting',
                       'true-false',
                       '{
                         "statement": "Variables declared with ''var'' are hoisted.",
                         "explanation": "''var'' declarations are hoisted and initialized with undefined."
                       }',
                       '{"correct":true}'),

                      ('Const reassignment',
                       'true-false',
                       '{
                         "statement": "Variables declared with ''const'' can be reassigned.",
                         "explanation": "''const'' prevents reassignment but does not make objects immutable."
                       }',
                       '{"correct":false}'),

                      ('Promise behavior',
                       'true-false',
                       '{
                         "statement": "A Promise can only be resolved once.",
                         "explanation": "Once fulfilled or rejected, the state cannot change."
                       }',
                       '{"correct":true}'),

                      ('Array map usage',
                       'code-completion',
                       '{
                         "code": "const numbers = [1,2,3];\\nconst doubled = numbers.____(n => n * 2);\\nconsole.log(doubled);",
                         "blanks": ["map"],
                         "hints": ["This method creates a new array by transforming each element"]
                       }',
                       '{"answers":["map"]}'),

                      ('Object destructuring',
                       'code-completion',
                       '{
                         "code": "const user = { name: \"John\", age: 30 };\\nconst { ____ } = user;\\nconsole.log(name);",
                         "blanks": ["name"],
                         "hints": ["Extract the name property using destructuring"]
                       }',
                       '{"answers":["name"]}'),

                      ('Async await usage',
                       'code-completion',
                       '{
                         "code": "async function fetchData() {\\n const response = ____ fetch(\"/api/data\");\\n return response.json();\\n}",
                         "blanks": ["await"],
                         "hints": ["Use this keyword to wait for a Promise"]
                       }',
                       '{"answers":["await"]}')) AS v(title, widget_type, payload, answer)
              ON q.title = v.title;

COMMIT;