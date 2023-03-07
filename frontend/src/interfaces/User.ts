export interface IReturn {
  profile: {
    fname: string;
    lname: string;
    _id: string;
    email: string;
    address: string;
  };
  token: string;
}

export interface User {
  profile: {
    id: string | null;
    fName: string | null;
    lName: string | null;
    email: string;
    address: string;
  };
  token: string;
  isAuthenticated: boolean;
}

export interface UserState {
  data: any | null;
  loading: boolean;
  token: string | null;
  profile: {
    id?: string | null;
    fName?: string | null;
    lName?: string | null;
    email?: string | null;
    address?: string | null;
    password?: string | null;
  };
  errors: any;
  isAuthenticated: boolean;
}
