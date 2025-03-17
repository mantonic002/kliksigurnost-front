import { Policy } from "./Policy";

export interface UserProfile {
  id: number;
  email: string;
  isSetUp: Boolean;
  organizationName: string;
  policies: Policy[];
  role: string;
  locked: Boolean;
  enabled: Boolean;
  authProvider: string;
}

export interface CloudflareAccount {
  accountId: string;
  email: string;
  organizationName: string;
  authorizationToken: string;
  enrollmentApplicationId: string;
  enrollmentPolicyId: string;
  userNum: number;
}
