"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function createBillAction(billData) {
  try {
    // Validate required fields
    if (!billData.trainerId || !billData.teamId || !billData.quarter || !billData.year) {
      throw new Error("Pflichtfelder fehlen: Trainer, Mannschaft, Quartal und Jahr sind erforderlich");
    }

    if (!billData.events || billData.events.length === 0) {
      throw new Error("Keine Trainingstermine vorhanden");
    }

    // Check for duplicate bill
    const existingBill = await prisma.bill.findUnique({
      where: {
        trainerId_teamId_quarter_year: {
          trainerId: billData.trainerId,
          teamId: billData.teamId,
          quarter: billData.quarter,
          year: billData.year,
        },
      },
    });

    if (existingBill) {
      throw new Error(
        `Eine Abrechnung für diesen Trainer, diese Mannschaft und Q${billData.quarter}/${billData.year} existiert bereits`
      );
    }

    // Create bill with events
    const bill = await prisma.bill.create({
      data: {
        trainerId: billData.trainerId,
        teamId: billData.teamId,
        iban: billData.iban || null,
        quarter: billData.quarter,
        year: billData.year,
        hourlyRate: billData.hourlyRate,
        totalCost: billData.totalCost,
        status: "draft",
        events: {
          create: billData.events,
        },
      },
      include: {
        trainer: true,
        team: true,
        events: true,
      },
    });

    revalidatePath("/abrechnung");
    
    return { success: true, bill };
  } catch (error) {
    console.error("Error creating bill:", error);
    return { success: false, error: error.message };
  }
}
