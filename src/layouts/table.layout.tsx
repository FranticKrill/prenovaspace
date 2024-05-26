import Select from "@/components/select";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

export default function TableLayout({ children }: any) {
  const [tableId, setTableId] = useLocalStorageState<any>("tableId", { defaultValue: "" });

  const [tables, setTables] = useState<any>([]);

  useEffect(() => {
    axios.get("/api/table").then(({ data }) => {
      setTables(data.data);
    });
  }, [tableId]);

  if (!tableId)
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <Select
        placeholder="Masa seçin"
        selected={tables.find((t: any) => t.id === tableId)}
        setSelected={(e: any) => setTableId(e.id)}
        items={tables}
      />
      </div>
    );
  return <>{children}</>;
}
