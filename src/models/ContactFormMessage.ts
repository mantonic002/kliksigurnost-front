export enum ContactFormStatus {
  PENDING = "PENDING",
  RESOLVED = "RESOLVED",
}

export interface ContactFormMessage {
  id: number;
  name: string;
  userEmail: string;
  phoneNumber: string;
  message: string;
  status: ContactFormStatus;
  submissionDate: string;
}
