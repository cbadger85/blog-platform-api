import { BaseError } from './BaseError';

export class BadRequest extends Error implements BaseError {
  public errors?: string[];

  constructor(message: string, public statusCode: number = 400) {
    super(message);

    this.name = 'Bad Request';
  }
}
