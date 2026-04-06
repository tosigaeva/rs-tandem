export type CodeCompletionValidationDetails = {
  blankResults: boolean[];
};

export type ValidationResult = {
  isCorrect: boolean | undefined;
  details?: CodeCompletionValidationDetails;
};
