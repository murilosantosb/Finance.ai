import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError, ZodType } from 'zod';

export const validateDataSchema = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.safeParse(req.body); 
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          errors: error.errors.map(err => ({
            path: err.path,
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
};
