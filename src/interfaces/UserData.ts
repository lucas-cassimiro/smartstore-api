export interface UserData {
  email: string;
  password_hash: string;
  newPassword: string;
  cpf: string;
  cellphone: string;
  first_name: string;
  last_name: string;
  date_birth: Date | string;
}
