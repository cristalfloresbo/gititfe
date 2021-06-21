export interface Login {
    password: string;
    email: string;
}

export interface LoginSuccess {
    token: string;
    id: number;
}
