import { Button } from "@/components/ui/button";
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
import { CheckCircle2, OctagonAlertIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

function Abrechnung() {
  // Dummy data for testing
  const dummyData = [
    {
      id: 1,
      trainer: "Kerstin Gronstedt",
      mannschaft: "Weibl. C",
      quartal: "Q3",
      bezahlt: true,
      betrag: "128,00 €",
    },
    {
      id: 2,
      trainer: "Johannes Wellmann",
      mannschaft: "Männl. D",
      quartal: "Q3",
      bezahlt: false,
      betrag: "112,00 €",
    },
    {
      id: 3,
      trainer: "Lars Knoke",
      mannschaft: "Herren 1",
      quartal: "Q2",
      bezahlt: true,
      betrag: "150,00 €",
    },
  ];

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
            <TableHead>Bezahlt</TableHead>
            <TableHead className="text-right">Betrag</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyData.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">{entry.id}</TableCell>
              <TableCell className="font-medium">{entry.trainer}</TableCell>
              <TableCell>{entry.mannschaft}</TableCell>
              <TableCell>{entry.quartal}</TableCell>
              <TableCell>
                {entry.bezahlt ? (
                  <CheckCircle2 className="text-green-700" size={"22px"} />
                ) : (
                  <OctagonAlertIcon className="text-red-600" size={"22px"} />
                )}
              </TableCell>
              <TableCell className="text-right">{entry.betrag}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Abrechnung;
