export interface BillVisit {
    id: string;
    facilityId: string;
    createdAt: Date;
    billed: boolean;
    WalletTransaction: WalletTransaction[];
    bioData: BioData;
}

export interface WalletTransaction {
    points: number;
}

export interface BioData {
    user: User;
}

export interface User {
    id: string;
    f_name: string;
    l_name: string;
    phone_number: string;
    Wallet: Wallet[];
}

export interface Wallet {
    id: string;
    balance: number;
}
