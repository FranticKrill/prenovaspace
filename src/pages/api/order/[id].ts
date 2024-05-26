// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: any, res: NextApiResponse<any>) {
  const where: any = {
    id: Number(req.query?.id),
  };

  const order = await prisma.order.findUnique({ where });

  if (order) {
    for (const item of order.items) {
        {/* @ts-ignore */}
        item.product = await prisma.product.findUnique({ where: { id: item.productId } })
    }
  }

  res.status(200).json({
    data: order,
  });
}
