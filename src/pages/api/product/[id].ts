// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

export default async function handler(req: any, res: NextApiResponse<any>) {
  const where: any = {
    id: Number(req.query?.id),
  };

  const product = await prisma.product.findUnique({
    where,
  });

  if (req.method === "DELETE") await prisma.product.update({ where, data: { status: 2 } });
  else if (req.method === "PUT") {
    await prisma.product.update({ where, data: { ...req.body, categoryId: Number(req.body.categoryId) } });
  }

  res.status(200).json({
    data: product,
  });
}
