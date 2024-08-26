export interface Contact {
    id: string;
    facilityId: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    facility: Facility;
}

export interface Facility {
    name: string;
}