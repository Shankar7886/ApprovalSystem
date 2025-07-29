import { Button } from "@/components/shadcn-ui/button";
import { CustomDialog } from "@/components/common/customPopup";
import { Employee } from "@/Store/features/Master/EmployeeMaster";
import { formatDateToDDMMMYYYY } from "@/assets/util";

type DemoDialogProps = {
  openViewPopup: boolean;
  handlePopup: () => void;
  viewValue: Employee;
};

export default function DemoDialog({
  openViewPopup,
  handlePopup,
  viewValue,
}: DemoDialogProps) {
  const employeeDetails = Object.entries(viewValue).map(([key, value]) => ({
    title: key,
    value: value !== null && value !== undefined ? String(value) : "-",
  }));
  return (
    <>
      <CustomDialog
        key="viewEmployeeDetailsID"
        open={openViewPopup}
        onOpenChange={handlePopup}
        title="View Employee Details"
        size="md"
        footer={
          <div className="flex justify-end gap-2">
            <Button onClick={handlePopup}>Close</Button>
          </div>
        }
      >
        <div className={`grid grid-cols-1 sm:grid-cols-${2} gap-6`}>
          <div className="bg-white border rounded-lg shadow p-4">
            <div className="max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {employeeDetails.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between gap-4 border-b py-1"
                  >
                    <span className="text-sm text-gray-500 min-w-[150px]">
                      {item.title}
                    </span>
                    <span className="text-base font-medium text-gray-800 break-words">
                      {["DOB", "DOJ"].indexOf(item.title) > -1
                        ? formatDateToDDMMMYYYY(item.value)
                        : item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CustomDialog>
    </>
  );
}
