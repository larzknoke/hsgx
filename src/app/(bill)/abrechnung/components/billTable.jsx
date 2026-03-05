"use client";
import { useState, useTransition } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { CheckCircle2, PlusIcon, CircleAlert, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatQuarter } from "@/lib/utils";
import { hasRole } from "@/lib/roles";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import BillDetailsDialog from "./billDetailsDialog";
import { toast } from "sonner";
import { deleteBillAction } from "../actions/delete-bill";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function BillTable({ bills, session }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBillId, setSelectedBillId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [billToDelete, setBillToDelete] = useState(null);
  const [isDeleting, startDeleteTransition] = useTransition();

  const isAdminOrKassenwart =
    hasRole(session, "admin") || hasRole(session, "kassenwart");

  const handleRowClick = (billId) => {
    setSelectedBillId(billId);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedBillId(null);
  };

  const handleDeleteClick = (event, bill) => {
    event.stopPropagation();
    setBillToDelete(bill);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setBillToDelete(null);
  };

  const handleDeleteBill = () => {
    if (!billToDelete) return;

    startDeleteTransition(async () => {
      try {
        await deleteBillAction(billToDelete.id);
        toast.success(`Abrechnung ${billToDelete.id} gelöscht`);
        handleCloseDeleteDialog();
      } catch (error) {
        toast.error(error.message || "Fehler beim Löschen der Abrechnung");
      }
    });
  };

  const filteredBills = bills.filter((bill) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      bill.trainer.name.toLowerCase().includes(searchLower) ||
      bill.team.name.toLowerCase().includes(searchLower) ||
      `q${bill.quarter}`.includes(searchLower)
    );
  });

  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-6 justify-between">
        <InputGroup className="w-full md:max-w-sm">
          <InputGroupInput
            placeholder="Suche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              variant="secondary"
              onClick={() => setSearchTerm("")}
            >
              {searchTerm ? "Zurücksetzen" : "Suche"}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <Button variant="success" asChild>
          <Link href="/abrechnung/neu">
            <PlusIcon /> Neue Abrechnung
          </Link>
        </Button>
      </div>
      <Table>
        <TableCaption>
          {isAdminOrKassenwart
            ? "Alle Abrechnungen"
            : `Alle Abrechnungen von ${session?.user?.name || "dir"}`}{" "}
          - {new Date().toLocaleDateString("de-DE")}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Übungsleiter</TableHead>
            <TableHead>Mannschaft</TableHead>
            <TableHead>Quartal</TableHead>
            <TableHead>Erstellt am</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Betrag</TableHead>
            {isAdminOrKassenwart && (
              <TableHead className="text-right"></TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBills.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={isAdminOrKassenwart ? 8 : 7}
                className="text-center text-muted-foreground"
              >
                {searchTerm
                  ? "Keine Ergebnisse gefunden"
                  : "Keine Abrechnungen vorhanden"}
              </TableCell>
            </TableRow>
          ) : (
            filteredBills.map((bill) => (
              <TableRow
                key={bill.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(bill.id)}
              >
                <TableCell className="font-medium">{bill.id}</TableCell>
                <TableCell className="font-medium">
                  {bill.trainer.name}
                </TableCell>
                <TableCell>{bill.team.name}</TableCell>
                <TableCell>{formatQuarter(bill.quarter, bill.year)}</TableCell>
                <TableCell>
                  {new Date(bill.createdAt).toLocaleDateString("de-DE")}
                </TableCell>
                <TableCell>
                  {bill.status === "paid" ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CheckCircle2
                          className="text-green-700"
                          size={"22px"}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Bezahlt</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CircleAlert
                          className="text-yellow-600"
                          size={"22px"}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ausstehend</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(bill.totalCost)}
                </TableCell>
                {isAdminOrKassenwart && (
                  <TableCell className="text-right">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          size="icon-sm"
                          variant="ghost"
                          aria-label="Abrechnung löschen"
                          onClick={(event) => handleDeleteClick(event, bill)}
                        >
                          <Trash2 className="text-destructive" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Löschen</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Bill Details Dialog */}
      <BillDetailsDialog
        isOpen={dialogOpen}
        onClose={handleCloseDialog}
        billId={selectedBillId}
        session={session}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={handleCloseDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Löschen bestätigen</DialogTitle>
          </DialogHeader>
          <p>
            Möchtest du die Abrechnung <strong>{billToDelete?.id}</strong>{" "}
            wirklich löschen?
          </p>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleCloseDeleteDialog}
              disabled={isDeleting}
            >
              Abbrechen
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteBill}
              disabled={isDeleting || !billToDelete}
            >
              {isDeleting ? "Löschen..." : "Löschen"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BillTable;
