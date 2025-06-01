export interface FacilityWallet {
    id: string;
    facilityId: string;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
    facility: Facility;
}

export interface Facility {
    name: string;
}
