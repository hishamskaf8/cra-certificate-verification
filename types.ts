
export interface Certificate {
  id: string;
  recipientName: string;
  nationalId: string;
  courseName: string;
  issueDate: string;
  expiryDate?: string;
  grade?: string;
  status: 'valid' | 'expired' | 'revoked';
  issuedBy: string;
}

export interface VerificationResult {
  found: boolean;
  certificate?: Certificate;
  error?: string;
}
