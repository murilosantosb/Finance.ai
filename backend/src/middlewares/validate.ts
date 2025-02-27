import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';

export const validateDataSchema = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body); 
      console.log("Dados recebidos para validação:", req.body);
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
