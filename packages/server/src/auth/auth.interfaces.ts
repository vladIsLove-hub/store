export type JwtPayload = string;

export interface RegistrationStatus {
  success: boolean;
  message: string;
}

export interface LoginStatus {
  username: string;
  accessToken: string;
  expiresIn: string;
}

export type CookieStatus = string;
export interface CreateTokenReturnedValue {
  expiresIn: string;
  accessToken: string;
}
