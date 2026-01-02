
import { Certificate } from '../types';

// Mock database for official certificates
const MOCK_CERTIFICATES: Record<string, Certificate> = {
  "ARC-SBA-2024-001": {
    id: "ARC-SBA-2024-001",
    recipientName: "أحمد بن محمد",
    nationalId: "123456789",
    courseName: "دورة الإسعافات الأولية الأساسية",
    issueDate: "2024-01-15",
    expiryDate: "2026-01-15",
    status: 'valid',
    issuedBy: "اللجنة الولائية لسيدي بلعباس"
  },
  "ARC-SBA-2023-999": {
    id: "ARC-SBA-2023-999",
    recipientName: "سارة محمود",
    nationalId: "987654321",
    courseName: "التدريب المتقدم للتدخل الاستعجالي",
    issueDate: "2023-05-10",
    status: 'expired',
    issuedBy: "اللجنة الولائية لسيدي بلعباس"
  }
};

export const getCertificateById = async (id: string): Promise<Certificate | null> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CERTIFICATES[id] || null);
    }, 800);
  });
};
