export interface FacilityTransactions {
    id: string;
    createdAt: Date;
    points: number;
    user: User;
    approvedBy: User | null;
    createdBy: User;
}

export interface User {
    f_name: string;
    l_name: string;
    phone_number: string;
}
