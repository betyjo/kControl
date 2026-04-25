import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getUsageStats = async (req: any, res: Response) => {
  const userId = req.user.id;

  try {
    const readings = await prisma.reading.findMany({
      where: {
        meter: { userId }
      },
      orderBy: { timestamp: 'desc' },
      take: 10 // Last 10 readings
    });
    res.json(readings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch usage stats' });
  }
};
