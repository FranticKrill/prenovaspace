// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const categories = await prisma.category.findMany({ where: { status: 1 }, orderBy: {createdAt: "desc"} });
  res.status(200).json({
    data: categories,
  });
}
