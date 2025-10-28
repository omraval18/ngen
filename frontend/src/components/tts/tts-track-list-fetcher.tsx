"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPresignedUrl } from "~/actions/generation";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { TTSTrackList } from "./tts-track-list";

export default async function TTSTrackListFetcher() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  const speeches = await db.speech.findMany({
    where: { userId: session?.user?.id },
    orderBy: {
      createdAt: "desc",
    },
  });

  const speechesWithUrls = await Promise.all(
    speeches.map(async (speech) => {
      const playUrl = speech.s3Key ? await getPresignedUrl(speech.s3Key) : null;

      return {
        id: speech.id,
        title: speech.title,
        createdAt: speech.createdAt,
        text: speech.text,
        language: speech.language,
        voice: speech.voice,
        playUrl,
        status: speech.status,
      };
    }),
  );

  return <TTSTrackList tracks={speechesWithUrls} />;
}
