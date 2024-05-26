// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await prisma.product.create({ data: { ...req.body, categoryId: Number(req.body.categoryId) } });
  res.status(201).json({ status: "ok" })
}
