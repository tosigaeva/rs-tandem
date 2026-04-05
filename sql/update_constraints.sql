    ALTER DOMAIN payload_question
        DROP CONSTRAINT payload_question_check;

    ALTER TABLE questions
    DROP
    CONSTRAINT questions_payload_question_check,
    ADD CONSTRAINT questions_payload_question_check
    CHECK (((
    (widget_type = 'quiz'::text) AND ((payload_question)::jsonb ? 'question'::text) AND ((((payload_question)::jsonb -> 'question'::text))::locale_string IS NOT NULL) AND ((payload_question)::jsonb ? 'options'::text) AND (jsonb_typeof(((payload_question)::jsonb -> 'options'::text)) = 'array'::text)) OR (
    (widget_type = 'true-false'::text) AND ((payload_question)::jsonb ? 'statement'::text) AND ((((payload_question)::jsonb -> 'statement'::text))::locale_string IS NOT NULL)) OR (
    (widget_type = 'flip-card'::text) AND ((payload_question)::jsonb ? 'term'::text) AND ((((payload_question)::jsonb -> 'term'::text))::locale_string IS NOT NULL) AND ((payload_question)::jsonb ? 'definition'::text) AND ((((payload_question)::jsonb -> 'definition'::text))::locale_string IS NOT NULL)) OR (
    (widget_type = 'code-completion'::text) AND ((payload_question)::jsonb ? 'code'::text) AND (jsonb_typeof(((payload_question)::jsonb -> 'code'::text)) = 'string'::text) AND ((payload_question)::jsonb ? 'blanks'::text) AND (jsonb_typeof(((payload_question)::jsonb -> 'blanks'::text)) = 'array'::text)) OR (
    (widget_type = 'big-o'::text) AND ((payload_question)::jsonb ? 'question'::text) AND ((((payload_question)::jsonb -> 'question'::text))::locale_string IS NOT NULL) AND ((payload_question)::jsonb ? 'codeExample'::text) AND (jsonb_typeof(((payload_question)::jsonb -> 'codeExample'::text)) = 'string'::text)) OR (
    (widget_type = 'code-ordering'::text)  AND ((payload_question)::jsonb ? 'description'::text) AND ((((payload_question)::jsonb -> 'description'::text))::locale_string IS NOT NULL) AND ((payload_question)::jsonb ? 'lines'::text) AND (jsonb_typeof(((payload_question)::jsonb -> 'lines'::text)) = 'array'::text))))
