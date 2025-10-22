
import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
    .max(50, { message: "O nome pode ter no máximo 50 caracteres" }),

     cv: z.coerce
 .string()
    .min(2, { message: "Os cavalos devem ter pelo menos 2 caracteres" })
    .max(50, { message: "Os cavalos podem ter no máximo 50 caracteres" }),

  transmission: z
    .string()
    .min(2, { message: "Informe o tipo de transmissão" })
    .max(50, { message: "Tipo de transmissão muito longo" }),

  people: z
    .string()
    .min(1, { message: "A quantidade de pessoas deve ter pelo menos 1 caracter" }),

  photo: z
    .string()
    .min(2)
    .max(100),

  priceDay: z
    .string()
    .min(2)
    .max(50),

  engine: z
    .string()
    .min(2, { message: "Informe o tipo de motor" })
    .max(50),

  type: z
    .string()
    .min(2, { message: "Informe o tipo do carro (ex: SUV, Sedan, etc)" })
    .max(50),

  isPublish: z.boolean().default(false),
});
