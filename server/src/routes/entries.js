import { Router } from "express";
import { prisma } from "../db.js";

export const entriesRouter = Router();

entriesRouter.get("/", async (req, res) => {
  const entries = await prisma.entry.findMany();
  res.json(entries);
});

entriesRouter.get("/:id", async (req, res) => {
  const entry = await prisma.entry.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!entry) {
    return res.status(404).json({ error: "Entry not found" });
  }
  res.json(entry);
});

entriesRouter.post("/", async (req, res) => {
  const { body } = req.body;
  const newEntry = await prisma.entry.create({
    data: { body },
  });
  res.status(201).json(newEntry);
});

entriesRouter.put("/:id", async (req, res) => {
  const { body } = req.body;
  const updatedEntry = await prisma.entry.update({
    where: { id: Number(req.params.id) },
    data: { body },
  });
  res.json(updatedEntry);
});

entriesRouter.delete("/:id", async (req, res) => {
  await prisma.entry.delete({
    where: { id: Number(req.params.id) },
  });
  res.status(204).send();
});
