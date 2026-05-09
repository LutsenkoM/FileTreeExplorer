export type ValidationResult<T> =
  | {
      isValid: true;
      data: T;
    }
  | {
      isValid: false;
      error: string;
    };
