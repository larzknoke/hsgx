import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";

export default function SummaryDialog({
  isOpen,
  onClose,
  formData,
  finalEvents,
}) {
  const trainerOptions = {
    user_1: "Johannes Wellmann",
    user_2: "Lars Knoke",
    user_3: "Kirsten Gronstedt",
  };

  const stammvereinOptions = {
    hol: "MTV Holzminden",
    sdorf: "TV Stadtoldendorf",
    bevern: "MTV Bevern",
  };

  const mannschaftOptions = {
    mD: "männlich D",
    wC: "weiblich C",
    herren1: "Herren 1",
    herren2: "Herren 2",
  };

  // Map formData to use label values
  const mappedFormData = {
    ...formData,
    trainer: trainerOptions[formData.trainer] || formData.trainer,
    stammverein:
      stammvereinOptions[formData.stammverein] || formData.stammverein,
    mannschaft: mannschaftOptions[formData.mannschaft] || formData.mannschaft,
  };

  // Group events by location
  const groupedEvents = finalEvents.reduce((acc, event) => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    const durationInHours = (end - start) / (1000 * 60 * 60); // Convert milliseconds to hours
    const cost = durationInHours * 5; // 5€ per hour

    if (!acc[event.location]) {
      acc[event.location] = { count: 0, totalHours: 0, totalCost: 0 };
    }

    acc[event.location].count += 1; // Increment event count
    acc[event.location].totalHours += durationInHours; // Add event duration
    acc[event.location].totalCost += cost; // Add event cost

    return acc;
  }, {});

  // Calculate overall total cost
  const totalCost = Object.values(groupedEvents).reduce(
    (sum, group) => sum + group.totalCost,
    0
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full lg:max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className={"text-xl"}>Zusammenfassung</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Form Data Summary */}
          <div>
            {/* <h3 className="text-lg font-semibold mb-1">Stammdaten</h3> */}
            <ul className="list-none">
              {Object.entries(mappedFormData).map(([key, value]) => (
                <li key={key}>
                  <strong className="capitalize inline-block w-32">
                    {key}
                  </strong>{" "}
                  {value || "-"}
                </li>
              ))}
            </ul>
          </div>
          <Separator />

          {/* Grouped Events Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-1">Trainingszeiten</h3>
            <table className="w-full border-collapse border-b border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border-b border-gray-300 px-4 py-2 text-left">
                    Ort
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2 text-left">
                    Anzahl
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2 text-left">
                    Stunden
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2 text-right">
                    Kosten
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedEvents).map(
                  ([location, group], index) => (
                    <tr key={index}>
                      <td className="border-b border-gray-300 px-4 py-2">
                        {location}
                      </td>
                      <td className="border-b border-gray-300 px-4 py-2">
                        {group.count}
                      </td>
                      <td className="border-b border-gray-300 px-4 py-2">
                        {group.totalHours.toFixed(2)}
                      </td>
                      <td className="border-b border-gray-300 px-4 py-2 text-right">
                        {group.totalCost.toFixed(2)}€
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Total Costs */}
          <div className="text-right font-bold">
            Gesamtkosten: {totalCost.toFixed(2)}€
          </div>
        </div>
        <DialogFooter>
          <Button variant={"outline"} onClick={onClose}>
            Abbrechen
          </Button>
          <Button onClick={onClose} variant={"success"}>
            Speichern
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
