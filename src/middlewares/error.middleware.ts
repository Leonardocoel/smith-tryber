import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { Errors, IError } from '../interfaces/error.interface';

const errorMidleware: 
ErrorRequestHandler = async (error: IError, _req: Request, res: Response, _next: NextFunction) => {
  const { name, message } = error;
  const status: number = Errors[name];

  if (!status) return res.status(Errors.InternalServerError).end();

  res.status(status).json({ message });
};

export default errorMidleware;