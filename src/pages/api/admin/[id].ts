// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

export default async function handler(req: any, res: NextApiResponse<any>) {
  const where: any = {
    id: Number(req.query?.id),
  };

  const admin = await prisma.admin.findUnique({
    where,
    select: { password: req.method === "PUT", id: true, email: true },
  });

  if (req.method === "DELETE") await prisma.admin.delete({ where });
  else if (req.method === "PUT") {
    let updtObj: any = { email: req.body.email }
    if (req.body.password?.length > 0) updtObj.password = await hash(req.body.password, 12);
    await prisma.admin.update({ where, data: updtObj });
  }

  res.status(200).json({
    data: admin,
  });
}
