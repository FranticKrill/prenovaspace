// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: any,
  res: NextApiResponse<any>
) {
  const where: any = { status: 1 }
  if (!!req.query?.catId) where["categoryId"] = Number(req.query.catId)
  if (!!req.query?.search) where["title"] = { contains: req.query.search }
  const products = await prisma.product.findMany({ where, include: { category: true }, orderBy: { createdAt: "desc" } });
  res.status(200).json({
    data: products,
  });
}
