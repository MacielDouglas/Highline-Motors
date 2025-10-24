// import { auth } from "@clerk/nextjs/server";
// import { createUploadthing, type FileRouter } from "uploadthing/next";

// const f = createUploadthing();

// const handleAuth = async () => {
//   const { userId } = await auth();

//   if (!userId) throw new Error("Não autorizado");
//   return { userId };
// };

// // FileRouter para sua aplicação
// export const ourFileRouter = {
//   photo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
//     .middleware(async () => handleAuth())
//     .onUploadComplete(({ file }) => {
//       // 🔧 Normaliza a URL final
//       const normalizedUrl = file.url.replace(
//         /^https:\/\/[a-z0-9-]+\.ufs\.sh\//i,
//         "https://utfs.io/"
//       );

//       console.log("✅ Upload concluído:", normalizedUrl);

//       return { url: normalizedUrl };
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;


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

