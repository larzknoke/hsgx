import BillForm from "@/components/bill-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function NewBill() {
  return (
    <div className="flex flex-col gap-6">
      <h1>Neue Abrechnungen</h1>
      <BillForm />
    </div>
  );
}

export default NewBill;
