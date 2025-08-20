"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listProducts, addProduct, deleteProduct } from "@/mocks/services";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function StorefrontPage(){
  const qc = useQueryClient();
  const { data: products = [] } = useQuery({ queryKey: ["products"], queryFn: listProducts });
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(500);
  const create = useMutation({ mutationFn: () => addProduct(name, price), onSuccess: ()=> qc.invalidateQueries({ queryKey: ["products"] }) });
  const del = useMutation({ mutationFn: (id: string)=> deleteProduct(id), onSuccess: ()=> qc.invalidateQueries({ queryKey: ["products"] }) });
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-white p-4">
        <h3 className="mb-2 font-semibold">Add Product</h3>
        <div className="grid max-w-lg grid-cols-3 gap-2">
          <input aria-label="Name" placeholder="Name" className="col-span-2 h-10 rounded-xl border px-3 text-sm" value={name} onChange={(e)=> setName(e.target.value)} />
          <input aria-label="Price" type="number" className="h-10 rounded-xl border px-3 text-sm" value={price} onChange={(e)=> setPrice(Number(e.target.value))} />
          <Button variant="primary" className="col-span-3" onClick={()=> name && create.mutate()}>Create</Button>
        </div>
      </div>
      <DataTable rows={products} columns={[
        { key: "name", header: "Product" },
        { key: "description", header: "Description" },
        { key: "id", header: "Actions", render: (_, row)=> <Button variant="outline" onClick={()=> del.mutate((row as any).id)}>Delete</Button> }
      ]} />
    </div>
  );
}
