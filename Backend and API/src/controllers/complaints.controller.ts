import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const submitComplaint = async (req: any, res: Response) => {
  const { category, description } = req.body;
  const userId = req.user.id;

  try {
    const complaint = await prisma.complaint.create({
      data: {
        userId,
        category,
        description,
      },
    });
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit complaint' });
  }
};

export const getMyComplaints = async (req: any, res: Response) => {
  const userId = req.user.id;
  try {
    const complaints = await prisma.complaint.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
};
