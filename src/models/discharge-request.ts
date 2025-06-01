export interface DischargeRequest {
    id: string;
    admissionId: string;
    files: string[];
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    status: string;
    processedById: null;
    admission: Admission;
    requestedBy: RequestedBy;
    processedBy: null;
}

export interface Admission {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    facilityId: string;
    admittedById: string;
    status: string;
    user: RequestedBy;
}

export interface RequestedBy {
    f_name: string;
    l_name: string;
    phone_number: string;
}


