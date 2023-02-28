export interface IReturn
{ 
    profile: {
        fname: string,
        lname: string,
        _id: string,
    }
    token:string
}

export interface User { 
    profile: {
        id: string | null;
        fName: string | null;
        lName: string | null;
    }
    address: string;
    token: string;
    email: string;
    isAuthenticated:boolean
}

export interface UserState {
    data: any | null;
    loading: boolean; 
    token: string | null;
    profile: {
        id: string | null;
        fName: string | null;
        lName: string | null;
    }
    errors: any;
    isAuthenticated: boolean;
}