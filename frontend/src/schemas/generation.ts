import { z } from "zod";

/**
 * Zod schema for generating titles (songs/speeches)
 */
export const titleGenerationSchema = z.object({
  title: z.string().min(1).max(50),
});

/**
 * Inferred type from title generation schema
 */
export type TitleGenerationResult = z.infer<typeof titleGenerationSchema>;
