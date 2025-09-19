import "dotenv/config";
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send({ ok: true, msg: "Calendar Sync Demo running 🚀" });
});

// Dummy Google OAuth endpoint for demo
app.get("/auth/google", async (_req, res) => {
  res.send({
    msg: "Pretend this starts Google OAuth. Store tokens in DB after success."
  });
});

// Example route to create a sync rule
app.post("/rules", async (req, res) => {
  const { userId, sourceCalId, destCalIds, privacyMode, placeholder } = req.body;
  const rule = await prisma.syncRule.create({
    data: { userId, sourceCalId, destCalIds, privacyMode, placeholder }
  });
  res.json(rule);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
