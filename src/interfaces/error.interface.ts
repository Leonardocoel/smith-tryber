import { CLIENT_ERROR, SERVER_ERROR } from '../httpStatusCodes';

export enum Errors {
  ValidationError = CLIENT_ERROR.BAD_REQUEST,
  UnauthorizedError = CLIENT_ERROR.UNAUTHORIZED,
  NotFoundError = CLIENT_ERROR.NOT_FOUND,
  ConflictError = CLIENT_ERROR.CONFLICT,
  InternalServerError = SERVER_ERROR.INTERNAL_SERVER_ERROR,
}

export interface IError {
  name: keyof typeof Errors,
  message: string;
}