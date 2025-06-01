export interface Registered {
    mothers: RegisteredUser[];
    count: number;
}

export interface RegisteredUser {
    id: string;
    f_name: string;
    l_name: string;
    gender: string;
    email: null;
    phone_number: string;
    national_id: string;
    active: boolean;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    facilityAdmin: null;
    facilityId: string;
    createdById: string;
    Facility: Facility
}
export interface Facility {
    name: string;
}

