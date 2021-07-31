import { Accounts } from './Accounts.model';

export interface TokenPayload extends Accounts {
  exp: any;
}
