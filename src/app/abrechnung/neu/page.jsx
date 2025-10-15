import BillForm from "@/components/bill-form";

function NewBill() {
  return (
    <div className="flex flex-col gap-6">
      <h1>Neue Abrechnungen</h1>
      <div className="w-1/2">
        <BillForm />
      </div>
    </div>
  );
}

export default NewBill;
