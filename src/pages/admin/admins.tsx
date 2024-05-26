import AdminLayout from "@/layouts/admin.layout";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Table } from "antd/lib";
import axios from "axios";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const EditModal = ({ edit, setEdit, save }: any) => {
  const schema = yup.object().shape({
    email: yup.string().required("Email zorunlu").email("Lütfen geçerli bir email giriniz"),
    password: yup.string().notRequired()
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: edit,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  return (
    <Transition show={!!edit}>
      <Dialog className="relative z-10" onClose={() => setEdit(null)}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <form onSubmit={handleSubmit(save)} className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base mb-4 font-semibold leading-6 text-gray-900"
                      >
                        {edit?.id ? "Güncelle" : "Ekle"}
                      </DialogTitle>
                      <div className="relative mt-4">
                        <label
                          htmlFor="card-number"
                          className="text-xs font-semibold text-gray-500"
                        >
                          Email
                        </label>
                        <input
                          autoFocus
                          type="text"
                          id="card-number"
                          {...register("email")}
                          placeholder="Email"
                          className={`block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition ring-2 ring-teal-500
                          ${errors["email"] && "!ring-red-600"}
                          `}
                        />
                        {errors["email"] && (
                          <span className="text-red-600 text-[12px]">
                            {/* @ts-ignore */}
                            {errors["email"].message}
                          </span>
                        )}
                      </div>
                      <div className="relative mt-4">
                        <label
                          htmlFor="card-number"
                          className="text-xs font-semibold text-gray-500"
                        >
                          Şifre (Değiştirmek istemiyorsanız boş bırakın)
                        </label>
                        <input
                          autoFocus
                          type="text"
                          id="card-number"
                          {...register("password")}
                          placeholder="Şifre"
                          className={`block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition ring-2 ring-teal-500
                          ${errors["password"] && "!ring-red-600"}
                          `}
                        />
                        {errors["password"] && (
                          <span className="text-red-600 text-[12px]">
                            {/* @ts-ignore */}
                            {errors["password"].message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-teal-300 hover:bg-teal-500 sm:mt-0 sm:w-auto"
                    data-autofocus
                  >
                    Kaydet
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </form>
        </div>
      </Dialog>
    </Transition>
  );
};

export default function Orders() {
  const [dataSource, setDataSource] = useState([]);
  const [edit, setEdit] = useState<any>(null);
  const { data } = useSession()

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("/api/admin").then(({ data }) => {
      setDataSource(data.data);
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Aksiyonlar",
      dataIndex: "actions",
      key: "actions",
      render: (text: any, record: any) => {
        return (
          <div className="flex items-center gap-2">
            <svg
              onClick={() => detail(record)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-teal-500"
            >
              <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
              <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
            </svg>
            {(record.email !== data?.user?.email) && (record.email !== "admin@admin.com") && (
              <svg
              onClick={() => deleteRecord(record)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-red-600"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                clipRule="evenodd"
              />
            </svg>
            )}
          </div>
        );
      },
    },
  ];

  const detail = (record: any) => {
    axios.get("/api/admin/" + record.id).then(({ data }) => {
      setEdit(data.data);
    }).catch(() => {
      
    });;
  };

  const deleteRecord = (record: any) => {
    axios.delete("/api/admin/" + record.id).then(({ data }) => {
      getData();
      toast.success("Kayıt başarıyla silindi");
    }).catch(() => {
      
    });;
  };

  const save = (data: any) => {
    if (!edit.id) {
      axios.post("/api/admin/create", data).then(({ data }) => {
        getData();
        setEdit(null);
        if (edit.id) toast.success("Kayıt başarıyla güncellendi");
        else toast.success("Kayıt başarıyla eklendi");
      }).catch(() => {
  
      });
    } else {
      axios.put("/api/admin/" + edit.id, data).then(({ data }) => {
        getData();
        setEdit(null);
        if (edit.id) toast.success("Kayıt başarıyla güncellendi");
        else toast.success("Kayıt başarıyla eklendi");
      }).catch(() => {
  
      });
    }
  };

  return (
    <AdminLayout>
      {!!edit && 
      <EditModal save={save} edit={edit} setEdit={setEdit} />
    }
      <div className="flex flex-col gap-3 justify-end w-full">
        <button
          onClick={() => setEdit({})}
          className="duration-300 transition-all w-full max-w-sm ml-auto hover:bg-white bg-teal-500 hover:text-teal-700 font-semibold text-white py-2 px-4 border hover:border-teal-500 border-transparent rounded"
        >
          Yeni Admin Ekle
        </button>
        <Table className="w-full" dataSource={dataSource} columns={columns} />
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
