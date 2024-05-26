import useLocalStorageState from "use-local-storage-state";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Select from "@/components/select";
import Nav from "@/components/nav";
import useDebounce from "@/hooks/useDebounce";
import TableLayout from "@/layouts/table.layout";

export default function Home() {
  const [cart, setCart] = useLocalStorageState<any>("cart", { defaultValue: [] });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [loading, setLoading] = useState(false)

  const addToBasket = (product: any) => {
    const isItemInCart = cart.find((cart: any) => cart.id === product.id);

    if (isItemInCart) {
      setCart(
        cart.map((ci: any) =>
          ci.id === product.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    toast.success("Sepet başarıyla güncellendi!");
  };

  const removeFromBasket = (product: any) => {
    // const isItemInCart = cart.find((ci: any) => ci.id === product.id);

    // if (isItemInCart.quantity === 1) {
    setCart(cart.filter((ci: any) => ci.id !== product.id));
    // } else {
    //   setCart(
    //     cart.map((ci: any) =>
    //       ci.id === product.id ? { ...ci, quantity: ci.quantity - 1 } : ci
    //     )
    //   );
    // }

    toast.success("Sepet başarıyla güncellendi!");
  };

  const onCartClicked = (product: any) => {
    const isItemInCart = cart.find((cart: any) => cart.id === product.id);
    if (!isItemInCart) addToBasket(product);
    else removeFromBasket(product);
  };

  useEffect(() => {
    setLoading(true)
    getProducts();
  }, [selectedCategory, debouncedSearch]);

  useEffect(() => {
    getCategories();
  }, []);

  const getProducts = () => {
    axios
      .get(
        `/api/product?catId=${selectedCategory?.id ?? ""}&search=${
          search ?? ""
        }`
      )
      .then((res) => {
        setProducts(res.data.data)
        setLoading(false)
      }).catch(()=> {
        setLoading(false)
      });
  };

  const getCategories = () => {
    axios.get("/api/category").then((res) => setCategories(res.data.data));
  };

  return (
   <TableLayout>
     <div className="bg-white">
      <Nav />
      {loading &&(
        <div className="flex w-full items-center justify-center pt-6 gap-2">
        <div className="w-5 h-5 rounded-full animate-pulse bg-teal-600"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-teal-600"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-teal-600"></div>
      </div>
      )}
      <div className="mx-auto flex items-center justify-between max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="relative w-1/2 flex items-center justify-between mr-6 my-2">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm bg-purple-white shadow focus:outline-none rounded border-0 p-3"
            placeholder="İsme göre ara..."
          />
          {!search && (
            <div className="absolute top-4.5 right-4 text-purple-lighter">
              <svg
                version="1.1"
                className="h-4 text-dark"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 52.966 52.966"
                style={{}}
                xmlSpace="preserve"
              >
                <path
                  d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21
        c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279
        C52.074,52.304,52.086,51.671,51.704,51.273z M21.983,40c-10.477,0-19-8.523-19-19s8.523-19,19-19s19,8.523,19,19
        S32.459,40,21.983,40z"
                />
              </svg>
            </div>
          )}
        </div>
        <Select
          selected={selectedCategory}
          setSelected={setSelectedCategory}
          items={categories}
        />
      </div>
      {products.length === 0 ? (
        <div className="flex items-center mt-6 text-center rounded-lg h-96">
          <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
            {(selectedCategory || !!search) && (
              <div className="p-3 mx-auto text-teal-600 bg-teal-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
            )}
            {!(selectedCategory || !!search) && (
            <h1 className="mt-3 text-lg text-gray-500">Menü Bulunamadı</h1>
            )}
            {(selectedCategory || !!search) && (
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Filtremelerinizi uyguladık ancak uygun menü bulamadık...
              </p>
            )}
            <div className="flex items-center mt-4 sm:mx-auto gap-x-3">
              {(selectedCategory || !!search) && (
                <button
                onClick={() => {
                  setSelectedCategory(null)
                  setSearch("")
                }}
                className="w-1/2 px-5 py-2 text-sm text-teal-100 transition-colors duration-200 border rounded-lg sm:w-auto bg-teal-600 hover:text-teal-600 hover:bg-white">
                  Filtrelemeyi Temizle
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid gap-x-6 gap-y-10 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((prod: any) => (
              <div key={prod.id} className="group relative">
                <div
                  onClick={() => onCartClicked(prod)}
                  className={`center absolute group-hover:z-50 z-0 right-2 top-2 inline-block select-none whitespace-nowrap rounded-lg hover:opacity-90 cursor-pointer py-2.5 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white 
                  ${
                    cart.find((c: any) => c.id === prod.id)
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {cart.find((c: any) => c.id === prod.id)
                    ? "Sepetten Kaldır"
                    : "Sepete Ekle"}
                </div>
                <div className="aspect-h-1 h-[250px] aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-90">
                  <img
                    src={prod.image}
                    alt="Front of men&#039;s Basic Tee in black."
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                      ></span>
                      {prod.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {prod.category?.name}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-900">35 TL</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
   </TableLayout>
  );
}
