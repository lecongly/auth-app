export interface IRegister {
  name: string;
  email: string;
  password: string;
  cf_password: string;
  err: string;
  success: string;
}

export interface ILogin {
  email: string;
  password: string;
  err: string;
  success: string;
}
