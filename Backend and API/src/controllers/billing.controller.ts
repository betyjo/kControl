import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getMyBills = async (req: any, res: Response) => {
  const userId = req.user.id;

  try {
    const bills = await prisma.bill.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bills' });
  }
};
