import BillForm from "@/components/bill-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function NewBill() {
  return (
    <div className="flex flex-col gap-6">
      <h1>Neue Abrechnungen</h1>
      <div className="w-1/2">
        <Card>
          <CardHeader>
            <CardTitle>Stammdaten</CardTitle>
          </CardHeader>
          <CardContent>
            <BillForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default NewBill;
