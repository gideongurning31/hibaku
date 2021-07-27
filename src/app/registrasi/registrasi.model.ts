export interface RegistrasiUser {
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
}

export interface RegistrasiAkun {
  nik: string;
  userId: string;
  pass: string;
}
