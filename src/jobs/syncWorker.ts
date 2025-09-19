import { Worker } from "bullmq";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const worker = new Worker("sync-queue", async job => {
  console.log("Processing job:", job.name, job.data);

  // Demo: mark mirrored event with placeholder if private
  if (job.data.privacyMode === "private") {
    console.log("Creating mirrored event:", job.data.placeholder);
  } else {
    console.log("Creating mirrored event:", job.data.title);
  }
});

worker.on("completed", job => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err);
});
