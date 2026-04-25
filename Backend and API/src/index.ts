import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './lib/prisma';

import authRoutes from './routes/auth.routes';
import complaintsRoutes from './routes/complaints.routes';
import usageRoutes from './routes/usage.routes';
import billingRoutes from './routes/billing.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintsRoutes);
app.use('/api/usage', usageRoutes);
app.use('/api/billing', billingRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'Kora Control API', version: '1.0.0' });
});

// SCADA Ingestion Endpoint
app.post('/api/scada/reading', async (req, res) => {
  const { serialNumber, consumption } = req.body;

  if (!serialNumber || consumption === undefined) {
    return res.status(400).json({ error: 'serialNumber and consumption are required' });
  }

  try {
    // Find meter by serial number
    const meter = await prisma.meter.findUnique({
      where: { serialNumber },
    });

    if (!meter) {
      return res.status(404).json({ error: 'Meter not found' });
    }

    // Create reading
    const reading = await prisma.reading.create({
      data: {
        meterId: meter.id,
        consumption: parseFloat(consumption),
      },
    });

    res.status(201).json({ message: 'Reading recorded', reading });
  } catch (error) {
    console.error('SCADA Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
