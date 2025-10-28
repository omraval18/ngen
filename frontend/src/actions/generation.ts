"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { inngest } from "~/inngest/client";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "~/env";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { groq } from "~/lib/ai";
import { generateObject } from "ai";
import type { GenerateRequest } from "~/types/music";
import type { GenerateSpeechRequest } from "~/types/tts";
import { titleGenerationSchema } from "~/schemas/generation";

export async function generateSong(generateRequest: GenerateRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/sign-in");

  // await queueSong(generateRequest, 7.5, session.user.id);
  await queueSong(generateRequest, 15, session.user.id);

  revalidatePath("/create");
}

export async function queueSong(
  generateRequest: GenerateRequest,
  guidanceScale: number,
  userId: string,
) {
  let title = "Untitled";
  if (generateRequest.describedLyrics) title = generateRequest.describedLyrics;
  if (generateRequest.fullDescribedSong)
    title = generateRequest.fullDescribedSong;

  title = await generateTitle(title, "song");

  const song = await db.song.create({
    data: {
      userId: userId,
      title: title,
      prompt: generateRequest.prompt,
      lyrics: generateRequest.lyrics,
      describedLyrics: generateRequest.describedLyrics,
      fullDescribedSong: generateRequest.fullDescribedSong,
      instrumental: generateRequest.instrumental,
      guidanceScale: guidanceScale,
      audioDuration: 180,
    },
  });

  await inngest.send({
    name: "generate-song-event",
    data: { songId: song.id, userId: song.userId },
  });
}

export async function getPlayUrl(songId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/sign-in");

  const song = await db.song.findUniqueOrThrow({
    where: {
      id: songId,
      OR: [{ userId: session.user.id }, { published: true }],
      s3Key: {
        not: null,
      },
    },
    select: {
      s3Key: true,
    },
  });

  await db.song.update({
    where: {
      id: songId,
    },
    data: {
      listenCount: {
        increment: 1,
      },
    },
  });

  const res = await getPresignedUrl(song.s3Key!);
  console.log("Presigned URL:", res);

  return res;
}

export async function getPresignedUrl(key: string) {
  const s3Client = new S3Client({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY_ID,
    },
    endpoint: env.AWS_ENDPOINT,
  });

  const command = new GetObjectCommand({
    Bucket: env.S3_BUCKET_NAME,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });
}

export async function generateTitle(
  prompt: string,
  type: "song" | "speech",
): Promise<string> {
  const model = groq("openai/gpt-oss-20b");
  const defaultPrompt = {
    song: "Generate a catchy song title based on the following lyrics or Prompt:\n\n",
    speech:
      "Generate a compelling speech title based on the following text or Prompt:\n\n",
  };

  const { object } = await generateObject({
    model,
    schema: titleGenerationSchema,
    prompt: defaultPrompt[type] + prompt,
  });

  const title = object.title;

  return title;
}

export async function generateSpeech(speechRequest: GenerateSpeechRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/sign-in");

  await queueSpeech(speechRequest, session.user.id);

  revalidatePath("/tts");
}

export async function queueSpeech(
  speechRequest: GenerateSpeechRequest,
  userId: string,
) {
  let title = "Untitled Speech";

  title = await generateTitle(speechRequest.text, "speech");

  const speech = await db.speech.create({
    data: {
      userId: userId,
      title: title,
      text: speechRequest.text,
      voice: speechRequest.voice,
      language: speechRequest.language,
    },
  });

  await inngest.send({
    name: "generate-speech-event",
    data: { speechId: speech.id, userId: speech.userId },
  });
}
