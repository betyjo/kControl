import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const getMe = async (req: any, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, name: true, accountNumber: true, role: true, createdAt: true },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export const updateMe = async (req: any, res: Response) => {
  const { name, email, currentPassword, newPassword } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    if (newPassword) {
      if (!currentPassword) return res.status(400).json({ error: 'Current password is required to set a new password.' });
      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) return res.status(401).json({ error: 'Current password is incorrect.' });
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      select: { id: true, email: true, name: true, accountNumber: true, role: true, createdAt: true },
    });
    res.json({ message: 'Profile updated successfully.', user: updated });
  } catch (error: any) {
    if (error.code === 'P2002') return res.status(400).json({ error: 'That email is already in use.' });
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, password, name, accountNumber } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        accountNumber,
      },
    });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET);
    res.status(201).json({ user, token });
  } catch (error: any) {
    console.error('Registration Error:', error);
    if (error.code === 'P2002') {
      const field = error.meta?.target?.[0];
      return res.status(400).json({ error: `The ${field} is already in use by another account.` });
    }
    res.status(400).json({ error: 'User registration failed. Details logged in backend.' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET);
    res.json({ message: 'Login successful', token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: 'Login error' });
  }
};
