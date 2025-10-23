"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Control, type Resolver } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

import { UploadButton } from "@/utils/uploadthing";
import { formSchema } from "./FormAddCar.form";
import { FormAddCarProps } from "./FormAddCar.types";

export function FormAddCar({ setOpenDialog }: FormAddCarProps) {
  const router = useRouter();
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as unknown as Resolver<z.infer<typeof formSchema>>,
    defaultValues: {
      name: "",
      cv: "",
      transmission: "",
      people: "",
      photo: "",
      priceDay: "",
      engine: "",
      type: "",
      isPublish: false,
    },
    mode: "onChange", // ✅ garante validação em tempo real
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/car", values);
      toast.success("🚗 Veículo criado com sucesso!");
      setOpenDialog(false);
      router.refresh(); // ✅ preferível ao reload()
    } catch (error) {
      console.error(error);
      toast.error("❌ Erro ao criar o veículo. Tente novamente.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Nome */}
          <FormField
            control={form.control as unknown as Control<z.infer<typeof formSchema>>}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carro</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tesla Model S Plaid"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Potência */}
          <FormField
            control={form.control as unknown as Control<z.infer<typeof formSchema>>}
            name="cv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Potência (CV)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="150"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Transmissão */}
          <FormField
            control={form.control as unknown as Control<z.infer<typeof formSchema>>}
            name="transmission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transmissão</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de transmissão" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="automatic">Automático</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Ocupantes */}
          <FormField
            control={form.control as unknown as Control<z.infer<typeof formSchema>>}
            name="people"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ocupantes</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o número de ocupantes" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[2, 4, 5, 7].map((num) => (
                      <SelectItem key={num} value={String(num)}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Combustível */}
          <FormField
            control={form.control as unknown as Control<z.infer<typeof formSchema>>}
            name="engine"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Combustível</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o combustível" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="gasoline">Gasolina</SelectItem>
                    <SelectItem value="flex">Flex</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="hybrid">Híbrido</SelectItem>
                    <SelectItem value="electric">Elétrico</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tipo */}
          <FormField
            control={form.control as unknown as Control<z.infer<typeof formSchema>>}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="hatch">Hatch</SelectItem>
                    <SelectItem value="familia">Familiar</SelectItem>
                    <SelectItem value="sport">Esportivo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Foto */}
          <FormField
            control={form.control as unknown as Control<z.infer<typeof formSchema>>}
            name="photo"
            render={() => (
              <FormItem>
                <FormLabel>Foto do veículo</FormLabel>
                <FormControl>
                  {photoUploaded ? (
                    <p className="text-sm text-green-500">
                      ✅ Imagem enviada com sucesso!
                    </p>
                  ) : (
                    <UploadButton
                      endpoint="photo"
                      className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-2"
                      onClientUploadComplete={(res) => {
                        const url = res?.[0]?.ufsUrl;
                        if (url) {
                          form.setValue("photo", url, { shouldValidate: true });
                          setPhotoUploaded(true);
                        }
                      }}
                      onUploadError={(error: Error) => {
                        console.error(error);
                        toast.error("Erro ao enviar imagem");
                      }}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Preço */}
          <FormField
            control={form.control as unknown as Control<z.infer<typeof formSchema>>}
            name="priceDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço da diária</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="120.00"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full mt-5"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "Criando..." : "Criar veículo"}
        </Button>
      </form>
    </Form>
  );
}
