import { formatDateToDDMMMYYYY } from "@/assets/util";
import { CustomDialog } from "@/components/common/customPopup";
import { Button } from "@/components/shadcn-ui/button";

interface ViewCompanyModelProps {
  open: boolean;
  data: object;
  closePopup: () => void;
}

const ViewCompanyModel = ({
  closePopup,
  open,
  data,
}: ViewCompanyModelProps) => {
  const cityDetails = Object.entries(data).map(([key, value], _) => ({
    title: key,
    value: value !== null && value !== undefined ? String(value) : "-",
  }));
  return (
    <CustomDialog
      open={open}
      onOpenChange={closePopup}
      title="View Country Details"
      size="md"
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={closePopup}>Close</Button>
        </div>
      }
    >
      <div className={`grid grid-cols-1 sm:grid-cols-${2} gap-6`}>
        <div className="bg-white border rounded-lg shadow p-4">
          <div className="max-h-[400px] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {cityDetails.map((item, index) => (
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
  );
};

export default ViewCompanyModel;
