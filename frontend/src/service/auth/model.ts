interface IDataSignIn {
  access_token: string;
}

export interface SignInResponse {
  data: IDataSignIn;
  status: number;
  message: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
}

// ---

export interface GetProfileResponse {
  data: DataProfile | null;
  status: number;
  message: string;
}

interface DataProfile {
  id: string;
  email: string;
  name: string;

  createdAt: Date;
}
