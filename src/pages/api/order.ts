// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: any,
  res: NextApiResponse<any>
) {
  const where: any = {}
  const orders = await prisma.order.findMany({ where, orderBy: { createdAt: "desc" } });

  res.status(200).json({
    data: orders,
  });
}
