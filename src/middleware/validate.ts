import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

// validate.js
export const validate = (schema : ZodObject<any>) => (req : Request, res : Response, next: NextFunction) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    const { fieldErrors, formErrors } = parsed.error.flatten();
    return res.status(400).json({ 
      message: "Validation failed",
      errors: { ...fieldErrors, _errors: formErrors }
    });
  }
  // normalized, trimmed data vaapis req.body me daal do
  req.body = parsed.data;
  next();
};
