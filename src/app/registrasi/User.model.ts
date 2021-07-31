import { Accounts } from '../utils/model/Accounts.model';

export interface User {
  nik: string;
  userId?: string;
  firstName: string;
  lastName?: string;
  birthPlace: string;
  birthDate: string;
  city: string;
  address: string;
  zipCode: string;
  accountType: string;
  account?: Accounts;
}

export interface RegistrasiAkun {
  nik: string;
  userId: string;
  pass: string;
}
