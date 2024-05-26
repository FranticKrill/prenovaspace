// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const tableId = req.body.tableId ?? "";
    const cart = req.body.cart ?? [];
    if (!tableId)
      return res.status(400).json({ message: "Masa seçimi zorunlu" });
    await prisma.order.create({
      data: {
        form: req.body,
        tableId: Number(tableId),
        items: cart.map((c: any) => ({ productId: c.id, quantity: c.quantity })),
        total: cart.reduce(
          (total: any, item: any) => total + item.price * item.quantity,
          0
        ),
      },
    });
    res.status(200).json({ message: "Sipariş başarıyla alındı." });
  } else {
    res.status(404).json({ message: "Route not found." });
  }
}
