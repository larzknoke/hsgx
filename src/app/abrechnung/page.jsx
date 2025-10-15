import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon, SquarePlusIcon } from "lucide-react";
import Link from "next/link";

function Abrechnung() {
  return (
    <div className="flex flex-col gap-6">
      <h1>Abrechnungen</h1>
      <div className="w-full flex flex-row gap-6 justify-between">
        <InputGroup className="max-w-sm">
          <InputGroupInput placeholder="Suche..." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="secondary">Suche</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <Button variant="success" asChild>
          <Link href="/abrechnung/neu">
            <PlusIcon /> Neue Abrechnung
          </Link>
        </Button>
      </div>
      <Table>
        <TableCaption>Alle Abrechnungen - Update 14.10.2025</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Übungsleiter</TableHead>
            <TableHead>Mannschaft</TableHead>
            <TableHead>Quartal</TableHead>
            <TableHead className="text-right">Betrag</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell className="font-medium">Kerstin Gronstedt</TableCell>
            <TableCell>Weibl. C</TableCell>
            <TableCell>Q3</TableCell>
            <TableCell className="text-right">128,00 €</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">2</TableCell>
            <TableCell className="font-medium">Johannes Wellmann</TableCell>
            <TableCell>Männl. D</TableCell>
            <TableCell>Q3</TableCell>
            <TableCell className="text-right">112,00 €</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default Abrechnung;
