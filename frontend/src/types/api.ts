export interface SongGenerationRequest {
  guidance_scale?: number;
  infer_step?: number;
  audio_duration?: number;
  seed?: number;
  full_described_song?: string;
  prompt?: string;
  lyrics?: string;
  described_lyrics?: string;
  instrumental?: boolean;
}

export interface SongGenerationResponse {
  s3_key: string;
  cover_image_s3_key: string;
  categories: string[];
}

export interface SpeechGenerationRequest {
  text?: string;
  voice?: string;
  lang_code?: string;
  speed?: number;
}

export interface SpeechGenerationResponse {
  s3_key: string;
}
