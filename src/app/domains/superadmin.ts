export interface Superadmin {
  uid?: string,
  name?: string,
  email?: string,
  telephone?: string,
  entreprise?: string,
  password?: string,
  detail_entreprise?: string,
  nui?: string,
  logo?: string,
  sigle?: string,
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}
