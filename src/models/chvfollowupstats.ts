export interface Followupstats {
    followups: Followup[];
}

export interface Followup {
    _count: Count;
    status: string;
}

export interface Count {
    status: number;
}
