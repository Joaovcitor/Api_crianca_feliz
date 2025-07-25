interface UserPayload {
  id: string;
  name: string;
}

declare namespace Express {
  export interface Request {
    user?: UserPayload;
  }
}
