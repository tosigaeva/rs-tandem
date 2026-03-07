BEGIN;

WITH new_topic AS (
INSERT INTO public.topics (title)
VALUES ('JavaScript Advanced')
    RETURNING id
    ),

    questions AS (
INSERT INTO public.question ("topicId", title)
SELECT id, title
FROM new_topic,
    (VALUES
    ('Event loop basics'),
    ('Microtask queue'),
    ('Promise chaining'),
    ('Async function behavior'),
    ('Arrow function this'),
    ('Array reduce'),
    ('Spread operator arrays'),
    ('Spread operator objects'),
    ('Optional chaining'),
    ('Nullish coalescing'),
    ('Destructuring arrays'),
    ('Destructuring objects'),
    ('Rest parameters'),
    ('Map vs Object'),
    ('Set usage'),
    ('Promise.all behavior'),
    ('Promise.race behavior'),
    ('Async error handling'),
    ('Dynamic import'),
    ('Top level await'),
    ('Prototype inheritance'),
    ('Class methods'),
    ('Static methods'),
    ('Getter usage'),
    ('Setter usage'),
    ('Array flat'),
    ('Array find'),
    ('Array some'),
    ('Array every'),
    ('String includes')
    ) AS q(title)
    RETURNING id, title
    )

INSERT INTO public.question_variant (question_id, widget_type, payload, answer)
SELECT
    q.id,
    v.widget_type,
    v.payload::json,
    v.answer::json
FROM questions q
         JOIN (
    VALUES

        ('Event loop basics','quiz',
         '{"question":"Which queue runs first in JavaScript event loop?","options":["Macrotask queue","Microtask queue","Render queue","Timer queue"]}',
         '{"correctIndex":1}'),

        ('Microtask queue','quiz',
         '{"question":"Which of these schedules a microtask?","options":["setTimeout","Promise.then","setInterval","requestAnimationFrame"]}',
         '{"correctIndex":1}'),

        ('Promise chaining','true-false',
         '{"statement":"Each .then() returns a new Promise.","explanation":"Promise chaining works because every .then returns a new promise."}',
         '{"correct":true}'),

        ('Async function behavior','true-false',
         '{"statement":"Async functions always return a Promise.","explanation":"Even when returning a value, it becomes Promise.resolve(value)."}',
         '{"correct":true}'),

        ('Arrow function this','quiz',
         '{"question":"How does arrow function handle this?","options":["Creates new this","Lexically inherits this","Binds to global","Uses call stack"]}',
         '{"correctIndex":1}'),

        ('Array reduce','code-completion',
         '{"code":"const sum = arr.___((a,b)=>a+b,0);","blanks":["reduce"],"hints":["This array method accumulates values"]}',
         '{"answers":["reduce"]}'),

        ('Spread operator arrays','quiz',
         '{"question":"What does [...arr] create?","options":["Reference copy","Deep clone","Shallow copy","Iterator"]}',
         '{"correctIndex":2}'),

        ('Spread operator objects','quiz',
         '{"question":"What does {...obj} create?","options":["Deep clone","Prototype copy","Shallow copy","Class instance"]}',
         '{"correctIndex":2}'),

        ('Optional chaining','code-completion',
         '{"code":"const city = user?.address?.___;","blanks":["city"],"hints":["Access nested property safely"]}',
         '{"answers":["city"]}'),

        ('Nullish coalescing','quiz',
         '{"question":"What does ?? return?","options":["First truthy value","First defined value","First non-nullish value","First boolean"]}',
         '{"correctIndex":2}'),

        ('Destructuring arrays','code-completion',
         '{"code":"const [first, ___] = [1,2];","blanks":["second"],"hints":["Name second variable"]}',
         '{"answers":["second"]}'),

        ('Destructuring objects','code-completion',
         '{"code":"const { name } = ___;","blanks":["user"],"hints":["Object variable name"]}',
         '{"answers":["user"]}'),

        ('Rest parameters','quiz',
         '{"question":"Which syntax collects remaining arguments?","options":["...rest","rest()","collect","spread"]}',
         '{"correctIndex":0}'),

        ('Map vs Object','true-false',
         '{"statement":"Map preserves insertion order.","explanation":"Maps iterate in insertion order."}',
         '{"correct":true}'),

        ('Set usage','quiz',
         '{"question":"What does Set guarantee?","options":["Sorted values","Unique values","Immutable values","Indexed values"]}',
         '{"correctIndex":1}'),

        ('Promise.all behavior','true-false',
         '{"statement":"Promise.all fails if one promise rejects.","explanation":"Promise.all rejects immediately when one promise fails."}',
         '{"correct":true}'),

        ('Promise.race behavior','quiz',
         '{"question":"Promise.race resolves with:","options":["First resolved promise","Last promise","All results","Only successful promises"]}',
         '{"correctIndex":0}'),

        ('Async error handling','code-completion',
         '{"code":"try { await run(); } ___ (e) { console.log(e); }","blanks":["catch"],"hints":["Handles async errors"]}',
         '{"answers":["catch"]}'),

        ('Dynamic import','quiz',
         '{"question":"Which syntax loads modules dynamically?","options":["require()","import()","load()","module()"]}',
         '{"correctIndex":1}'),

        ('Top level await','true-false',
         '{"statement":"Top-level await works only in ES modules.","explanation":"Top-level await requires module context."}',
         '{"correct":true}'),

        ('Prototype inheritance','quiz',
         '{"question":"Objects inherit from which property?","options":["prototype","__proto__","inherit","constructor"]}',
         '{"correctIndex":1}'),

        ('Class methods','true-false',
         '{"statement":"Class methods are stored on the prototype.","explanation":"Methods defined in class syntax go on the prototype."}',
         '{"correct":true}'),

        ('Static methods','quiz',
         '{"question":"Static methods belong to:","options":["Instance","Prototype","Class","Object literal"]}',
         '{"correctIndex":2}'),

        ('Getter usage','code-completion',
         '{"code":"class User { ___ name() { return this._name } }","blanks":["get"],"hints":["Define getter"]}',
         '{"answers":["get"]}'),

        ('Setter usage','code-completion',
         '{"code":"class User { ___ name(v) { this._name = v } }","blanks":["set"],"hints":["Define setter"]}',
         '{"answers":["set"]}'),

        ('Array flat','quiz',
         '{"question":"What does Array.flat() do?","options":["Filters array","Flattens nested arrays","Sorts arrays","Removes duplicates"]}',
         '{"correctIndex":1}'),

        ('Array find','code-completion',
         '{"code":"const item = arr.___(x=>x.id===1);","blanks":["find"],"hints":["Returns first matching element"]}',
         '{"answers":["find"]}'),

        ('Array some','true-false',
         '{"statement":"Array.some() returns true if at least one element passes the test.","explanation":"It stops once a matching element is found."}',
         '{"correct":true}'),

        ('Array every','true-false',
         '{"statement":"Array.every() requires all elements to pass the test.","explanation":"Returns false when first failing element appears."}',
         '{"correct":true}'),

        ('String includes','code-completion',
         '{"code":"const ok = text.___(\"hello\");","blanks":["includes"],"hints":["Checks substring presence"]}',
         '{"answers":["includes"]}')

) AS v(title, widget_type, payload, answer)
              ON q.title = v.title;

COMMIT;