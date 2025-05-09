import { ZodError, ZodIssue } from "zod";

export const zodInputErrorHandler = (error: ZodError) => {
  const errors: Record<string, string[]> = {};
  const extraFields: string[] = [];

  error.issues.forEach((issue: ZodIssue) => {
    if (issue.code === "unrecognized_keys") {
      extraFields.push(...(issue as any).keys);
    } else {
      const field = issue.path.join(".");
      const message = issue.message;

      if (!errors[field]) {
        errors[field] = [];
      }
      errors[field].push(message);
    }
  });

  if (extraFields.length > 0) {
    errors["extraFields"] = [
      `These fields are not allowed: ${extraFields.join(", ")}.`,
    ];
  }

  return {
    error: "ValidationError",
    message: "Invalid input data",
    details: errors,
  };
};
