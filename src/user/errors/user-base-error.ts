export abstract class UserBaseError extends Error {
    abstract statusCode: number;
  
    constructor(message: string) {
      super(message);
      Object.setPrototypeOf(this, UserBaseError.prototype);
    }
  
    abstract serializeErrors(): { message: string; field?: string }[];
  }
  