"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function TrainerDeleteDialog({ open, trainer, onClose }) {
  if (!trainer) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Trainer löschen</DialogTitle>
          <DialogDescription>
            Möchtest du <strong>{trainer.trainer}</strong> wirklich löschen?{" "}
            <br />
            Diese Aktion kann nicht rückgängig gemacht werden.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Abbrechen
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              console.log("Deleting trainer:", trainer.id);
              // TODO: API-Call hier einbauen
              onClose();
            }}
          >
            Löschen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
