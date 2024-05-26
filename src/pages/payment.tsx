import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useLocalStorageState from "use-local-storage-state";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TableLayout from "@/layouts/table.layout";

export default function Payment() {
  const router = useRouter();
  const [cart, setCart] = useLocalStorageState<any>("cart", { defaultValue: [] });
  const [loading, setLoading] = useState(false);
  const [tableId] = useLocalStorageState<any>("tableId", { defaultValue: "" });

  const schema = yup.object().shape({
    cardNumber: yup
      .string()
      .required("Kart numarası zorunlu")
      .length(16, "Geçerli bir kart numarası giriniz."),
    month: yup.string().required("Ay zorunlu"),
    year: yup.string().required("Yıl zorunlu"),
    cvv: yup.string().required("CVV zorunlu").length(3, "CVV 3 karakterli olmalıdır"),
    name: yup.string().required("İsim alanı zorunlu")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { month: "01", year: "2024" },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (cart.length === 0) router.push("/");
    }, 1000);

    return () => clearTimeout(timeout);
  }, [cart]);

  const getCartTotal = () => {
    return cart.reduce(
      (total: any, item: any) => total + item.price * item.quantity,
      0
    );
  };

  const pay = (data: any) => {
    setLoading(true);
    axios
      .post("/api/pay", { ...data, tableId, cart })
      .then(() => {
        setLoading(false);
        toast.success("Siparişiniz başarıyla alındı");
        setCart([])
        router.push("/")
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message)
      });
  };

  return (
    <TableLayout>
      <div className="relative mx-auto w-full bg-white">
      <div className="grid min-h-screen grid-cols-10">
        <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
          <form
            onSubmit={handleSubmit(pay, (e) => console.log(e))}
            className="mx-auto w-full max-w-lg"
          >
            <button
              onClick={() => router.push("/")}
              type="button"
              className="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-red-700 hover:text-white px-3"
            >
              <div className="flex flex-row align-middle">
                <svg
                  className="w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="ml-2">Alışverişe Devam Et</p>
              </div>
            </button>
            <h1 className="relative mt-10 text-2xl font-medium text-gray-700 sm:text-3xl">
              Güvenli Ödeme
              <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
            </h1>
            <div className="mt-4 flex flex-col space-y-4">
              <div className="relative">
                <label
                  htmlFor="card-number"
                  className="text-xs font-semibold text-gray-500"
                >
                  Kart numarası
                </label>
                <input
                  type="text"
                  id="card-number"
                  {...register("cardNumber")}
                  placeholder="1234-5678-XXXX-XXXX"
                  className={`block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500
                    ${errors["cardNumber"] && "!ring-red-600"}
                  `}
                />
                {errors["cardNumber"] && (
                  <span className="text-red-600 text-[12px]">
                    {errors["cardNumber"].message}
                  </span>
                )}
                <img
                  src="/images/uQUFIfCYVYcLK0qVJF5Yw.png"
                  alt=""
                  className="absolute bottom-3 right-3 max-h-4"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">
                  Son Kullanım Tarihi
                </p>
                <div className="mr-6 flex flex-wrap">
                  <div className="my-1">
                    <label htmlFor="month" className="sr-only">
                      Ay seçin
                    </label>
                    <select
                      {...register("month")}
                      id="month"
                      className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="01">01</option>
                    </select>
                  </div>
                  <div className="my-1 ml-3 mr-6">
                    <label htmlFor="year" className="sr-only">
                      Yıl seçin
                    </label>
                    <select
                      {...register("year")}
                      id="year"
                      className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="2024">2024</option>
                    </select>
                  </div>
                  <div className="relative my-1">
                    <label htmlFor="security-code" className="sr-only">
                      CVV
                    </label>
                    <input
                      {...register("cvv")}
                      type="text"
                      id="security-code"
                      placeholder="CVV"
                      className={`block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500
                        ${errors["cvv"] && '!ring-red-600'}
                      `}
                    />
                      {errors["cvv"] && (
                  <span className="text-red-600 text-[12px]">
                    {errors["cvv"].message}
                  </span>
                )}
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="card-name" className="sr-only">
                  Kart üzerindeki isim
                </label>
                <input
                      {...register("name")}
                      type="text"
                  id="card-name"
                  placeholder="Kart üzerindeki isim"
                  className={`mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500
                  ${errors["name"] && '!ring-red-600'}
                  `}
                />
                {errors["name"] && (
                  <span className="text-red-600 text-[12px]">
                    {errors["name"].message}
                  </span>
                )}
              </div>
            </div>
            <p className="mt-10 text-center text-sm font-semibold text-gray-500">
              Bu siparişi vererek şunları kabul etmiş olursunuz:{" "}
              <a
                href="#"
                className="whitespace-nowrap text-teal-400 underline hover:text-teal-600"
              >
                Şartlar ve koşullar
              </a>
            </p>
            <button
              type="submit"
              disabled={loading}
              className={`mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg
                ${loading ? "opacity-50" : "opacity-95"}
              `}
            >
              Siparişi tamamla
            </button>
          </form>
        </div>
        <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
          <h2 className="sr-only">Sipariş Özeti</h2>
          <div>
            <img
              src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=htmlFormat&fit=crop&w=880&q=80"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
          </div>
          <div className="relative">
            <ul className="space-y-5">
              {cart.map((c: any) => (
                <li key={c.id} className="flex justify-between">
                  <div className="inline-flex">
                    <img
                      src={c.image}
                      alt=""
                      className="max-h-20 mix-blend-multiply"
                    />
                    <div className="ml-3">
                      <p className="text-base font-semibold text-white">
                        {c.title}
                      </p>
                      <p className="text-sm font-medium text-white text-opacity-80">
                        {c.category?.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {c.price} TL
                  </p>
                </li>
              ))}
            </ul>
            <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
            <div className="space-y-2">
              <p className="flex justify-between text-lg font-bold text-white">
                <span>Toplam fiyat:</span>
                <span>{getCartTotal()} TL</span>
              </p>
            </div>
          </div>
          <div className="relative mt-10 text-white">
            <h3 className="mb-5 text-lg font-bold">Destek</h3>
            <p className="text-sm font-semibold">
              +90 212 653 235 21 <span className="font-light">(Telefon)</span>
            </p>
            <p className="mt-1 text-sm font-semibold">
              destek@restaurant.com <span className="font-light">(Email)</span>
            </p>
            <p className="mt-2 text-xs font-medium">
              restaurant ödeme ile ilgili sorunlar için hemen bizi arayın
            </p>
          </div>
          <div className="relative mt-10 flex">
            <p className="flex flex-col">
              <span className="text-sm font-bold text-white">
                100% MÜŞTERİ MEMNUNİYETİ
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    </TableLayout>
  );
}
