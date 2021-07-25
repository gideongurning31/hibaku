import { Users } from './Users.model';

export interface TokenPayload extends Users {
  exp: any;
}
