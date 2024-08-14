import React from "react";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { getManagerRestaurant } from "../AccountMenu/useAccountMenu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "./useUpdateProfile";
import { toast } from "sonner";
import { DialogClose } from "@radix-ui/react-dialog";

export const ProfileDialog: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: managedRestaurant } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagerRestaurant,
    staleTime: Infinity,
  });

  const userSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatório"),
  });
  type NewCycleFormData = z.infer<typeof userSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<NewCycleFormData>({
    resolver: zodResolver(userSchema),
    values: {
      name: managedRestaurant?.name ?? "",
      description: managedRestaurant?.description ?? "",
    },
  });
  function UpdateManagerResturantCache({
    name,
    description,
  }: NewCycleFormData) {
    const cached = queryClient.getQueryData<any>(["managed-restaurant"]);
    if (cached) {
      queryClient.setQueryData<any>(["managed-restaurant"], {
        ...cached,
        name,
        description,
      });
    }
    return {
      cached,
    };
  }

  const { mutateAsync: updateProfileFN } = useMutation({
    mutationFn: updateProfile,
    onMutate: ({ name, description }) => {
      const { cached } = UpdateManagerResturantCache({ name, description });
      return { previousProfile: cached };
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        UpdateManagerResturantCache(context.previousProfile);
      }
    },
  });
  const onSubmit = async (data: NewCycleFormData) => {
    try {
      updateProfileFN({ name: data.name, description: data.description });
      toast.success("Informações atualizadas com sucesso");
    } catch (error) {
      console.log("error", error);
      toast.error("Erro ao atualizar as informações");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input {...register("name")} id="name" className="col-span-3" />
            <p className="text-sm text-red-500">{errors.name?.message}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              {...register("description")}
              id="description"
              className="col-span-3"
            />
            <p className="text-sm text-red-500">
              {errors.description?.message}
            </p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
