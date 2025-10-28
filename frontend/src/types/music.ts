import type { Song, Category, Like } from "@prisma/client";

/**
 * Represents a music track/song in the generation interface
 */
export interface Track {
  id: string;
  title: string | null;
  createdAt: Date;
  instrumental: boolean;
  prompt: string | null;
  lyrics: string | null;
  describedLyrics: string | null;
  fullDescribedSong: string | null;
  thumbnailUrl: string | null;
  playUrl: string | null;
  status: string | null;
  createdByUserName: string | null;
  published: boolean;
}

/**
 * Song with user and category relations, used in the home page
 */
export type SongWithRelation = Song & {
  user: { name: string | null };
  _count: { likes: number };
  categories: Category[];
  thumbnailUrl?: string | null;
  likes?: Like[];
};

export interface GenerateRequest {
  prompt?: string;
  lyrics?: string;
  fullDescribedSong?: string;
  describedLyrics?: string;
  instrumental?: boolean;
}
