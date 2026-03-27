ALTER DOMAIN payload_question
    DROP CONSTRAINT payload_question_check;

ALTER TABLE public.questions
    ADD CONSTRAINT questions_payload_question_check
        CHECK (
            (
                widget_type = 'quiz'
                    AND payload_question ? 'question'
    AND (payload_question -> 'question')::locale_string IS NOT NULL
                )
                OR
            (
                widget_type = 'true-false'
                    AND payload_question ? 'statement'
    AND (payload_question -> 'statement')::locale_string IS NOT NULL
                )
                OR
            (
                widget_type = 'flip-card'
                    AND payload_question ? 'question'
    AND (payload_question -> 'question')::locale_string IS NOT NULL
                )
            );