import type { Voice, Language } from "~/types/tts";

export const languages: Language[] = [
  { code: "a", name: "American English", flag: "🇺🇸" },
  { code: "b", name: "British English", flag: "🇬🇧" },
  { code: "j", name: "Japanese", flag: "🇯🇵" },
  { code: "z", name: "Mandarin Chinese", flag: "🇨🇳" },
  { code: "e", name: "Spanish", flag: "🇪🇸" },
  { code: "f", name: "French", flag: "🇫🇷" },
  { code: "h", name: "Hindi", flag: "🇮🇳" },
  { code: "i", name: "Italian", flag: "🇮🇹" },
  { code: "p", name: "Brazilian Portuguese", flag: "🇧🇷" },
];

export const voices: Voice[] = [
  // American English
  { id: "af_heart", name: "Heart", gender: "Female", langCode: "a" },
  { id: "af_alloy", name: "Alloy", gender: "Female", langCode: "a" },
  { id: "af_aoede", name: "Aoede", gender: "Female", langCode: "a" },
  { id: "af_bella", name: "Bella", gender: "Female", langCode: "a" },
  { id: "af_jessica", name: "Jessica", gender: "Female", langCode: "a" },
  { id: "af_kore", name: "Kore", gender: "Female", langCode: "a" },
  { id: "af_nicole", name: "Nicole", gender: "Female", langCode: "a" },
  { id: "af_nova", name: "Nova", gender: "Female", langCode: "a" },
  { id: "af_river", name: "River", gender: "Female", langCode: "a" },
  { id: "af_sarah", name: "Sarah", gender: "Female", langCode: "a" },
  { id: "af_sky", name: "Sky", gender: "Female", langCode: "a" },
  { id: "am_adam", name: "Adam", gender: "Male", langCode: "a" },
  { id: "am_echo", name: "Echo", gender: "Male", langCode: "a" },
  { id: "am_eric", name: "Eric", gender: "Male", langCode: "a" },
  { id: "am_fenrir", name: "Fenrir", gender: "Male", langCode: "a" },
  { id: "am_liam", name: "Liam", gender: "Male", langCode: "a" },
  { id: "am_michael", name: "Michael", gender: "Male", langCode: "a" },
  { id: "am_onyx", name: "Onyx", gender: "Male", langCode: "a" },
  { id: "am_puck", name: "Puck", gender: "Male", langCode: "a" },
  { id: "am_santa", name: "Santa", gender: "Male", langCode: "a" },

  // British English
  { id: "bf_alice", name: "Alice", gender: "Female", langCode: "b" },
  { id: "bf_emma", name: "Emma", gender: "Female", langCode: "b" },
  { id: "bf_isabella", name: "Isabella", gender: "Female", langCode: "b" },
  { id: "bf_lily", name: "Lily", gender: "Female", langCode: "b" },
  { id: "bm_daniel", name: "Daniel", gender: "Male", langCode: "b" },
  { id: "bm_fable", name: "Fable", gender: "Male", langCode: "b" },
  { id: "bm_george", name: "George", gender: "Male", langCode: "b" },
  { id: "bm_lewis", name: "Lewis", gender: "Male", langCode: "b" },

  // Japanese
  { id: "jf_alpha", name: "Alpha", gender: "Female", langCode: "j" },
  { id: "jf_gongitsune", name: "Gongitsune", gender: "Female", langCode: "j" },
  { id: "jf_nezumi", name: "Nezumi", gender: "Female", langCode: "j" },
  { id: "jf_tebukuro", name: "Tebukuro", gender: "Female", langCode: "j" },
  { id: "jm_kumo", name: "Kumo", gender: "Male", langCode: "j" },

  // Mandarin Chinese
  { id: "zf_xiaobei", name: "Xiaobei", gender: "Female", langCode: "z" },
  { id: "zf_xiaoni", name: "Xiaoni", gender: "Female", langCode: "z" },
  { id: "zf_xiaoxiao", name: "Xiaoxiao", gender: "Female", langCode: "z" },
  { id: "zf_xiaoyi", name: "Xiaoyi", gender: "Female", langCode: "z" },
  { id: "zm_yunjian", name: "Yunjian", gender: "Male", langCode: "z" },
  { id: "zm_yunxi", name: "Yunxi", gender: "Male", langCode: "z" },
  { id: "zm_yunxia", name: "Yunxia", gender: "Male", langCode: "z" },
  { id: "zm_yunyang", name: "Yunyang", gender: "Male", langCode: "z" },

  // Spanish
  { id: "ef_dora", name: "Dora", gender: "Female", langCode: "e" },
  { id: "em_alex", name: "Alex", gender: "Male", langCode: "e" },
  { id: "em_santa", name: "Santa", gender: "Male", langCode: "e" },

  // French
  { id: "ff_siwis", name: "Siwis", gender: "Female", langCode: "f" },

  // Hindi
  { id: "hf_alpha", name: "Alpha", gender: "Female", langCode: "h" },
  { id: "hf_beta", name: "Beta", gender: "Female", langCode: "h" },
  { id: "hm_omega", name: "Omega", gender: "Male", langCode: "h" },
  { id: "hm_psi", name: "Psi", gender: "Male", langCode: "h" },

  // Italian
  { id: "if_sara", name: "Sara", gender: "Female", langCode: "i" },
  { id: "im_nicola", name: "Nicola", gender: "Male", langCode: "i" },

  // Brazilian Portuguese
  { id: "pf_dora", name: "Dora", gender: "Female", langCode: "p" },
  { id: "pm_alex", name: "Alex", gender: "Male", langCode: "p" },
  { id: "pm_santa", name: "Santa", gender: "Male", langCode: "p" },
];

export function getVoicesByLanguage(langCode: string): Voice[] {
  return voices.filter((voice) => voice.langCode === langCode);
}
