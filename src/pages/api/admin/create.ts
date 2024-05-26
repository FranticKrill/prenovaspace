// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  req.body.password = await hash(req.body.password, 12)
  await prisma.admin.create({ data: req.body });
  res.status(201).json({ status: "ok" })
}
