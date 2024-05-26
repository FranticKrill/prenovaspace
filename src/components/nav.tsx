import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useLocalStorageState from "use-local-storage-state";

export default function Nav() {
  const [cart, setCart] = useLocalStorageState<any>("cart", {
    defaultValue: [],
  });

  const [open, setOpen] = useState(false);

  const removeFromCart = (ci: any) => {
    setCart(cart.filter((c: any) => c.id !== ci.id));
  };

  useEffect(() => {
    if (cart.length === 0) setOpen(false);
  }, [cart]);

  const getCartTotal = () => {
    return cart.reduce(
      (total: any, item: any) => total + item.price * item.quantity,
      0
    );
  };

  const changeQuantity = (ci: any, newQ: any) => {
    const item = cart.find((c: any) => c.id === ci.id);
    if (!item || (item.quantity === 1 && newQ === -1))
      setCart(cart.filter((c: any) => c.id !== ci.id));
    else {
      setCart(
        cart.map((c: any) =>
          c.id === ci.id ? { ...c, quantity: ci.quantity + newQ } : c
        )
      );
    }

    toast.success("Sepet başarıyla güncellendi!")
  };

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
        </div>
        <li
          onClick={() => cart.length > 0 && setOpen(true)}
          className="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-white"
        >
          <a href="#" role="button" className="relative flex items-center">
            <svg className="flex-1 w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
            </svg>
            <span className="absolute right-0 top-0 rounded-full bg-red-600 w-3.5 h-3.5 top right p-0 m-0 text-white font-mono text-xs leading-tight text-center">
              {cart.length}
            </span>
          </a>
        </li>
      </nav>
      {open && (
        <div>
          <div
            className="relative z-10"
            aria-labelledby="slide-over-title"
            role="dialog"
            aria-modal="true"
          >
            <div
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            ></div>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <div className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <h2
                            className="text-lg font-medium text-gray-900"
                            id="slide-over-title"
                          >
                            Sepet
                          </h2>
                          <div
                            onClick={() => setOpen(false)}
                            className="ml-3 flex h-7 items-center"
                          >
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            >
                              <span className="absolute -inset-0.5"></span>
                              <span className="sr-only">Close panel</span>
                              <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cart.map((ci: any) => (
                                <li key={ci.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={ci.image}
                                      alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href="#">{ci.title}</a>
                                        </h3>
                                        <p className="ml-4">{ci.price} TL</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {ci.category?.name}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center">
                                        <button
                                          onClick={() => changeQuantity(ci, -1)}
                                          type="button"
                                          id="decrement-button"
                                          data-input-counter-decrement="counter-input"
                                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-teal-600 bg-teal-700 hover:bg-teal-600"
                                        >
                                          <svg
                                            className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 18 2"
                                          >
                                            <path
                                              stroke="currentColor"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M1 1h16"
                                            />
                                          </svg>
                                        </button>
                                        <input
                                          type="text"
                                          id="counter-input"
                                          value={ci.quantity}
                                          disabled
                                          className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium outline-none"
                                          placeholder=""
                                        />
                                        <button
                                          onClick={() => changeQuantity(ci, 1)}
                                          type="button"
                                          id="increment-button"
                                          data-input-counter-increment="counter-input"
                                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-teal-600 bg-teal-700 hover:bg-teal-600 "
                                        >
                                          <svg
                                            className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 18 18"
                                          >
                                            <path
                                              stroke="currentColor"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M9 1v16M1 9h16"
                                            />
                                          </svg>
                                        </button>
                                      </div>

                                      <div
                                        className="flex"
                                        onClick={() => removeFromCart(ci)}
                                      >
                                        <button
                                          type="button"
                                          className="font-medium text-teal-600 hover:text-teal-500"
                                        >
                                          Sepetten kaldır
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Toplam</p>
                          <p>{getCartTotal()} TL</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Vergi dahil edilmiştir.
                        </p>
                        <div className="mt-6">
                          <Link
                            href="/payment"
                            className="flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700"
                          >
                            Ödemeye Geç
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            yada&nbsp;
                            <button
                              onClick={() => setOpen(false)}
                              type="button"
                              className="font-medium text-teal-600 hover:text-teal-500"
                            >
                              Siparişe devam et
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
