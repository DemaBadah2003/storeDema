export interface LocationPayload {
  country: string;
  city?: string;
}

export interface LocationResponse {
  success: boolean;
  country: string;
  city?: string;
  message?: string;
}