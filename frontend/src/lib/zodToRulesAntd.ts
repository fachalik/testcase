import { ZodSchema, ZodArray, ZodString, ZodTypeAny } from "zod";

export const zodToAntdRules = (
  schema: ZodSchema | { shape: Record<string, ZodTypeAny> }
): Record<string, unknown[]> => {
  const rules: Record<string, unknown[]> = {};

  if ("shape" in schema) {
    for (const key of Object.keys(schema.shape)) {
      const fieldSchema = schema.shape[key];
      const fieldRules: unknown[] = [];

      // Check if the field is required
      if (!fieldSchema.isNullable() && !fieldSchema.isOptional()) {
        const requiredErrorMessage =
          fieldSchema._def.required_error ||
          `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
        fieldRules.push({
          required: true,
          message: requiredErrorMessage,
        });
      }

      // Check for specific Zod validations
      fieldSchema._def.checks?.forEach(
        (check: {
          kind: string;
          value?: number;
          regex?: RegExp;
          message?: string;
        }) => {
          switch (check.kind) {
            case "min":
              fieldRules.push({
                min: check.value,
                message: `${
                  key.charAt(0).toUpperCase() + key.slice(1)
                } must be at least ${check.value} characters long`,
              });
              break;
            case "max":
              fieldRules.push({
                max: check.value,
                message: `${
                  key.charAt(0).toUpperCase() + key.slice(1)
                } must not exceed ${check.value} characters`,
              });
              break;
            case "email":
              fieldRules.push({
                type: "email",
                message: "Invalid email address",
              });
              break;
            case "regex":
              fieldRules.push({
                pattern: check.regex,
                message: check.message || "Invalid format",
              });
              break;
            default:
              break;
          }
        }
      );

      // Handle specific types such as strings and arrays
      if (fieldSchema instanceof ZodArray) {
        const elementSchema = fieldSchema.element; // Get the schema for the elements of the array

        // Check if the array should be non-empty
        const arrayChecks = fieldSchema._def.minLength;
        if (arrayChecks && arrayChecks.value === 1) {
          fieldRules.push({
            required: true,
            message: "At least one item is required",
          });
        }

        // If the elements are strings, check for min length
        if (elementSchema instanceof ZodString) {
          const minCheck = elementSchema._def.checks?.find(
            (check: { kind: string }) => check.kind === "min"
          );
          if (minCheck) {
            fieldRules.push({
              validator: (_: unknown, value: unknown) => {
                if (!value || !Array.isArray(value)) {
                  return Promise.reject(
                    new Error("At least one item is required")
                  );
                }
                const isValid = value.every((item) => item.length >= minCheck);
                return isValid
                  ? Promise.resolve()
                  : Promise.reject(new Error(minCheck.message));
              },
            });
          }
        }
      }

      // If there are any rules for the field, assign them to the rules object
      if (fieldRules.length > 0) {
        rules[key] = fieldRules;
      }
    }
  }
  return rules;
};
