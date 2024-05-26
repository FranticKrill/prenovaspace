import AdminLayout from "@/layouts/admin.layout";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Table } from "antd/lib";
import axios from "axios";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function Orders() {
  const [dataSource, setDataSource] = useState([]);
  const [edit, setEdit] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/order").then(({ data }) => {
      setDataSource(data.data);
    });
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Toplam tutar",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Masa",
      dataIndex: "tableId",
      key: "tableId",
    },
    {
      title: "Aksiyonlar",
      dataIndex: "actions",
      key: "actions",
      render: (text: any, record: any) => {
        return (
          <svg
            onClick={() => detail(record)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 text-teal-500"
          >
            <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
            <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
          </svg>
        );
      },
    },
  ];

  const detail = (record: any) => {
    axios.get("/api/order/" + record.id).then(({data}) => {
      setEdit(data.data)
    })
  }
  console.log(edit);
  return (
    <AdminLayout>
    <Transition show={!!edit}>
      <Dialog className="relative z-10" onClose={() => setEdit(null)}>
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Ürünler
                      </DialogTitle>
                      {edit?.items?.map((it: any, i: number) => (
                        <li className="flex items-center py-4 px-6">
                        <span className="text-gray-700 text-lg font-medium mr-4">{i + 1}.</span>
                        <img className="w-12 h-12 rounded-full object-cover mr-4" src={it.product?.image}
                            alt="User avatar" />
                        <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-800">{it.product?.title}</h3>
                        </div>
                    </li>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setEdit(null)}
                    data-autofocus
                  >
                    Tamamla
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
      <Table className="w-full" dataSource={dataSource} columns={columns} />
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
