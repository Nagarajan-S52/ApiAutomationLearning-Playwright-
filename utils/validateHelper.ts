import { expect } from "@playwright/test";


export function validateSchema(
  json: Record<string, any>,
  expectedSchema: Record<string, any>,
  parentKey?: string,
): void {
  Object.entries(expectedSchema).forEach(([field, expectedType]) => {
    const label = parentKey ? `${parentKey}.${field}` : field;

    if (typeof expectedType === "object") {
    
      expect(typeof json[field], `${label} should be object`).toBe("object");

      validateSchema(json[field], expectedType, label); 
    } else {
     
      expect(typeof json[field], `${label} should be ${expectedType}`).toBe(
        expectedType,
      );
    }
  });
}
