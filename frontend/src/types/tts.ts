/**
 * Represents a text-to-speech track
 */
export interface TTSTrack {
  id: string;
  title: string | null;
  createdAt: Date;
  text: string | null;
  language: string | null;
  voice: string | null;
  playUrl: string | null;
  status: string | null;
}

/**
 * Voice configuration for TTS
 */
export interface Voice {
  id: string;
  name: string;
  gender: "Female" | "Male";
  langCode: string;
}

/**
 * Language configuration for TTS
 */
export interface Language {
  code: string;
  name: string;
  flag: string;
}

/**
 * Request payload for generating speech
 */
export interface GenerateSpeechRequest {
  text: string;
  voice: string;
  language: string;
}
