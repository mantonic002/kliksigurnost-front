import create from "./http-service";

export interface Policy {
    id: string;
    name: string;
    action: string;
    traffic: string;
  }

export default create("/api/policies");
