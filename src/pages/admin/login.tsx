import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email zorunlu")
      .email("Lütfen geçerli bir email giriniz"),
    password: yup.string().required("Şifre zorunlu"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const save = async (data: any) => {
    setLoading(true)
    await signIn("credentials", {
      redirect: false,
      ...data,
    })
      .then((response: any) => {
        setTimeout(() => {
          if (response.ok) router.push("/admin/orders")
            else toast.error("Geçersiz email yada şifre")
          setLoading(false)
        }, 500)
      })
      .catch((error) => {
      setLoading(false)
        toast.error("Geçersiz email yada şifre")
      });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=teal&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Admin Panel
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit(save)}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                id="email"
                {...register("email")}
                placeholder="Email"
                className={`block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500
                    ${errors["email"] && "!ring-red-600"}
                  `}
              />
              {errors["email"] && (
                <span className="text-red-600 text-[12px]">
                  {errors["email"].message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Şifre
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="password"
                {...register("password")}
                placeholder="Şifre"
                className={`block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500
                    ${errors["password"] && "!ring-red-600"}
                  `}
              />
              {errors["password"] && (
                <span className="text-red-600 text-[12px]">
                  {errors["password"].message}
                </span>
              )}
            </div>
          </div>

          <div>
            <button
            disabled={loading}
              type="submit"
              className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              Giriş
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
