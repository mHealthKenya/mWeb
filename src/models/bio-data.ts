export interface UserBioData {
    id:                     string;
    userId:                 string;
    height:                 number;
    weight:                 number;
    active:                 boolean;
    age:                    number;
    last_monthly_period:    Date;
    expected_delivery_date: Date;
    pregnancy_period:       number;
    last_clinic_visit:      Date;
    facilityId:             string;
    previous_pregnancies:   number;
    createdById:            string;
    updatedById:            string;
    createdAt:              Date;
    updatedAt:              Date;
    user:                   User;
}

export interface User {
    f_name:       string;
    l_name:       string;
    phone_number: string;
    national_id:  string;
}
