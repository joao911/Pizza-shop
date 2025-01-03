import React from "react";
import { Helmet } from "react-helmet-async";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Link, useNavigate } from "react-router-dom";
import { handlePhoneChange } from "@/ultils/masks";
import { useMutation } from "@tanstack/react-query";
import { registerRestaurant } from "@/api/register-restaurant";

export const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const userSchema = z.object({
    restaurantName: z.string().min(1, "Nome do restaurante é obrigatório"),
    managerName: z.string().min(1, "Nome do gerente é obrigatório"),
    phoneNumber: z.string().min(1, "Telefone é obrigatório"),
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  });
  type NewCycleFormData = z.infer<typeof userSchema>;

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<NewCycleFormData>({
    resolver: zodResolver(userSchema),
  });
  const { mutateAsync: registerCompany } = useMutation({
    mutationFn: registerRestaurant,
  });

  const onSubmit = async (data: NewCycleFormData) => {
    const { email, managerName, restaurantName } = data;
    try {
      await registerCompany({
        restaurantName,
        managerName,
        email,
        phone: data.phoneNumber,
      });
      toast.success("Cadastrado com sucesso", {
        action: {
          label: "Login",
          onClick: () => navigate(`/login?email=${data.email}`),
        },
      });
    } catch (error) {
      console.log("error", error);
      toast.error("Erro ao cadastrar");
    }
  };

  return (
    <>
      <Helmet title="Login" />
      <Button variant="ghost" asChild className="absolute right-8 top-8">
        <Link to="/login">Ir para login</Link>
      </Button>
      <div className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <Label htmlFor="restaurantName">Nome do restaurante</Label>
              <Input
                id="restaurantName"
                placeholder="Nome do restaurante"
                {...register("restaurantName")}
                className={`${errors.restaurantName && "border-red-500"}`}
              />
              <p className="text-sm text-red-500">
                {errors.restaurantName?.message}
              </p>
            </div>
            <div className="space-y-4">
              <Label htmlFor="userName">Seu nome</Label>
              <Input
                id="userName"
                placeholder="Seu nome"
                {...register("managerName")}
                className={`${errors.managerName && "border-red-500"}`}
              />
              <p className="text-sm text-red-500">
                {errors.managerName?.message}
              </p>
            </div>
            <div className="space-y-4">
              <Label htmlFor="phoneNumber">Telefone</Label>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Input
                    id="phoneNumber"
                    placeholder="Seu telefone"
                    onChange={(e) => onChange(handlePhoneChange(e))}
                    value={value}
                    ref={ref}
                    onBlur={onBlur}
                    className={`${errors.phoneNumber && "border-red-500"}`}
                  />
                )}
              />

              <p className="text-sm text-red-500">
                {errors.phoneNumber?.message}
              </p>
            </div>
            <div className="space-y-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Nome do restaurante"
                {...register("email")}
                className={`${errors.email && "border-red-500"}`}
              />
              <p className="text-sm text-red-500">{errors.email?.message}</p>
            </div>

            <Button className="w-full" type="submit">
              Finalizar cadastro
            </Button>
            <p>
              Ao continuar, você concorda com os{" "}
              <a href="#" className="underline underline-offset-0">
                Termos de serviço{" "}
              </a>{" "}
              e
              <a className="underline underline-offset-0">
                politica de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
