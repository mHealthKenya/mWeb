export interface UserByRole {
  id:            string;
  f_name:        string;
  l_name:        string;
  gender:        string;
  email:         string;
  phone_number:  string;
  national_id:   string;
  password:      string;
  role:          string;
  createdAt:     Date;
  updatedAt:     Date;
  facilityAdmin: null;
  facilityId:    string;
  Facility:      Facility;
  BioData:       BioDatum[];
  BirthPlan:     BirthPlan[];
}

export interface BioDatum {
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

export interface BirthPlan {
  id:                             string;
  motherId:                       string;
  facilityId:                     string;
  alternative_facility_id:        string;
  delivery_mode:                  string;
  support_person_name:            string;
  support_person_phone:           string;
  preferred_transport:            string;
  preferred_attendant_name:       string;
  preferred_attendant_phone:      string;
  blood_donor_name:               string;
  blood_donor_phone:              string;
  emergency_decision_maker_phone: string;
  emergency_decision_maker_name:  string;
  delivery_bag:                   boolean;
  emergency_cs_plan:              string;
  savings_plan:                   string;
  createdAt:                      Date;
  updatedAr:                      Date;
}

export interface Facility {
  name: string;
  id:   string;
}
