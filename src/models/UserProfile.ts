import { Policy } from "./Policy";

export interface UserProfile {
  id: number;
  email: string;
  isSetUp: Boolean;
  cloudflareAccount: CloudflareAccount;
  policies: Policy[];
  role: string;
  locked: Boolean;
  enabled: Boolean;
  authProvider: string;
}

interface CloudflareAccount {
  accountId: string;
  email: string;
  authorizationToken: string;
  enrollmentApplicationId: string;
  enrollmentPolicyId: string;
  userNum: number;
}
