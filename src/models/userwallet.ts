export interface UserWallet {
    id: string;
    userId: string;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}

export interface User {
    f_name: string;
    l_name: string;
    phone_number: string;
    Facility: Facility;
}

export interface Facility {
    name: string;
}
