export interface ZeroVisists {
    count: number;
    users: UserElement[];
}

export interface UserElement {
    id: string;
    userId: string;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
    user: UserUser;
}

export interface UserUser {
    f_name: string;
    l_name: string;
    phone_number: string;
    BioData: BioData;
}

export interface BioData {
    _count: Count;
}

export interface Count {
    ClinicVisit: number;
}
