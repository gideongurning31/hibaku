import { Roles } from './Roles.model';

export interface Users {
  userId: string;
  displayName: string;
  verified: boolean;
  role: Roles;
}
