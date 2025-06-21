export interface SkinDiagnosisRequest {
  image: File;
}

export interface SkinDiagnosis {
  disease: string;
  probability: number;
  treatment: string;
  source: string;
  imageUrl: string;
}

export interface SkinDiagnosisResponse {
  success: boolean;
  message: string;
  diagnosis: SkinDiagnosis | null;
}
