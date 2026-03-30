ALTER DOMAIN payload_question
    DROP CONSTRAINT payload_question_check;

ALTER TABLE questions
DROP CONSTRAINT questions_payload_question_check,
ADD CONSTRAINT questions_payload_question_check
CHECK (
  (
    widget_type = 'quiz' AND
    (payload_question::jsonb ? 'question') AND
    (payload_question->'question')::locale_string IS NOT NULL and
    (payload_question::jsonb ? 'options') and
    (jsonb_typeof(payload_question->'options') = 'array')
  )
  OR
  (
    widget_type = 'true-false' AND
    (payload_question::jsonb ? 'statement') AND
    (payload_question->'statement')::locale_string IS NOT NULL
  )
  OR
  (
    widget_type = 'flip-card' AND
    (payload_question::jsonb ? 'term') AND
    (payload_question->'term')::locale_string IS NOT NULL and
    (payload_question::jsonb ? 'definition') and
    (payload_question->'definition')::locale_string is not NULL
  )
  OR
  (
    widget_type = 'code-completion' AND
    (payload_question::jsonb ? 'code') AND
    (jsonb_typeof(payload_question->'code') = 'string') and
    (payload_question::jsonb ? 'blanks') and
    (jsonb_typeof(payload_question->'blanks') = 'array')
  )
  OR
  (
    widget_type = 'big-o' AND
    (payload_question::jsonb ? 'question') AND
    (payload_question->'question')::locale_string IS NOT NULL and
    (payload_question::jsonb ? 'codeExample') and
    (jsonb_typeof(payload_question->'codeExample') = 'string')
  )
)