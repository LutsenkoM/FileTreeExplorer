import type { ValidationResult } from "../../types/validation";

export const parseJson = (value: string): ValidationResult<unknown> => {
  if (value.trim().length === 0) {
    return {
      isValid: false,
      error: "JSON input cannot be empty",
    };
  }

  try {
    return {
      isValid: true,
      data: JSON.parse(value) as unknown,
    };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : "Invalid JSON input",
    };
  }
};
