// export interface AddBioData {
//     userId:                 string;
//     facilityId:             string;
//     height:                 string;
//     weight:                 string;
//     last_clinic_visit:      Date;
//     last_monthly_period:    Date;
//     pregnancy_period:       string;
//     age:                    string;
//     expected_delivery_date: Date;
// }
    
export interface AddBioData {
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
}