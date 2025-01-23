export interface Policy {
    id?: string;
    name: string;
    action: string;
    traffic: string;
    schedule?: Schedule;
  }
  
  export interface Schedule {
    mon?: string;
    tue?: string;
    wed?: string;
    thu?: string;
    fri?: string;
    sat?: string;
    sun?: string;
    time_zone?: string;
  }
  