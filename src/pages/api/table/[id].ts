// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: any, res: NextApiResponse<any>) {
  const where: any = {
    id: Number(req.query?.id),
  };

  const order = await prisma.table.findUnique({ where });

  if (req.method === "DELETE") await prisma.table.delete({ where })
    else if (req.method === "PUT") await prisma.table.update({ where, data: req.body })

  res.status(200).json({
    data: order,
  });
}
