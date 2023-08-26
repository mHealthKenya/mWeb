export interface Schedule {
    id:          string;
    title:       string;
    description: string;
    facilityId:  string;
    date:        Date;
    status:      string;
    motherId:    string;
    createdById: string;
    updatedById: string;
    createdAt:   Date;
    updatedAt:   Date;
}