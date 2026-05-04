"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  registerSchema,
  RegisterSchemaType,
} from "@/src/modules/user/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function SignUpPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(
      registerSchema.refine((data) => data.password === data.passwordRepeat, {
        message: "Passwords do not match",
        path: ["passwordRepeat"],
      }),
    ),
  });

  const onSubmit = (data: RegisterSchemaType) => {
    console.log(data);
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2">
      <Card className="min-w-87.5">
        <CardHeader>
          <h1 className="text-2xl text-center">Sign Up</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div>
              <Input {...register("email")} type="email" placeholder="Email" />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Input
                {...register("password")}
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <Input
                {...register("passwordRepeat")}
                type="password"
                placeholder="Repeat password"
              />
              {errors.passwordRepeat && (
                <p className="text-red-600">{errors.passwordRepeat.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
