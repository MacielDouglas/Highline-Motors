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

export const formFields = [
  {
    name: "name",
    label: "Carro",
    placeholder: "Tesla Model S Plaid",
    type: "text",
  },
 {
    name: "cv",
    label: "Potência (CV)",
    placeholder: "150",
    type: "number",
  },
  {
    name: "transmission",
    label: "Transmissão",
    type: "select",
    options: [
      { value: "manual", label: "Manual" },
      { value: "automatic", label: "Automático" },
    ],
    placeholder: "Selecione o tipo de transmissão",
  },
  {
    name: "people",
    label: "Ocupantes",
    type: "select",
    options: [2, 4, 5, 7].map((n) => ({ value: String(n), label: `${n}` })),
    placeholder: "Selecione o número de ocupantes",
  },
  {
    name: "engine",
    label: "Combustível",
    type: "select",
    options: [
      { value: "gasoline", label: "Gasolina" },
      { value: "flex", label: "Flex" },
      { value: "diesel", label: "Diesel" },
      { value: "hybrid", label: "Híbrido" },
      { value: "electric", label: "Elétrico" },
    ],
    placeholder: "Selecione o combustível",
  },
  {
    name: "type",
    label: "Tipo",
    type: "select",
    options: [
      { value: "sedan", label: "Sedan" },
      { value: "suv", label: "SUV" },
      { value: "hatch", label: "Hatch" },
      { value: "familia", label: "Familiar" },
      { value: "sport", label: "Esportivo" },
    ],
    placeholder: "Selecione o tipo",
  },
  {
    name: "photo",
    label: "Foto do veículo",
    type: "upload",
  },
  {
    name: "priceDay",
    label: "Preço da diária",
    placeholder: "120.00",
    type: "number",
  },
] as const;