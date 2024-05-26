// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const tables = await prisma.table.findMany({ orderBy: { createdAt: "desc" } });
  res.status(200).json({
    data: tables,
  });
}
