import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth(); // ✅ await aqui
  console.log("userIDSS", userId);

  if (!userId) throw new Error("Não autorizado");

  return { userId };
};

// FileRouter para sua aplicação
export const ourFileRouter = {
  photo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => handleAuth()) // ✅ await handleAuth dentro do middleware
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

