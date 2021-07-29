
export interface UserForAuthenticationDto {
    email: string;
    password: string;
}



export interface LoginResponse
{
    token: string

    isAuthenticationSuccesfull:boolean
}

