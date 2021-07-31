import { User } from 'src/app/registrasi/User.model';
import { Roles } from './Roles.model';

export interface Accounts {
  userId: string;
  displayName: string;
  verified: boolean;
  info?: User;
  role?: Roles;
}
