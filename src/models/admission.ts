export interface Admission {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    facilityId: string;
    admittedById: string;
    admittedBy: AdmittedBy;
    user: AdmittedBy;
}

export interface AdmittedBy {
    f_name: string;
    l_name: string;
    phone_number: string;
    Wallet?: Wallet;
}

export interface Wallet {
    balance: number;
}
