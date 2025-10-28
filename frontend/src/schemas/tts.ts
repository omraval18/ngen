import { z } from "zod";

export const ttsFormSchema = z.object({
  text: z
    .string()
    .min(1, { message: "Please enter text to convert to speech." }),
  language: z.string().min(1, { message: "Please select a language." }),
  voice: z.string().min(1, { message: "Please select a voice." }),
});

export type TTSFormValues = z.infer<typeof ttsFormSchema>;
