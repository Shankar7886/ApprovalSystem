import { CustomDialog } from "@/components/common/customPopup";
import { useEffect, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
interface ViewHierarchyProps {
  open: boolean;
  close: () => void;
  hierarchy?: any[];
}
type hierarchyType = {
  name: string;
  hierarchy: any[];
};
export default function ViewHierarchy({
  open,
  close,
  hierarchy = [],
}: ViewHierarchyProps) {
  const [selectedHierarchy, setSelectedHierarchy] = useState<hierarchyType>();
  useEffect(() => {
    hierarchy.length > 0 && setSelectedHierarchy(hierarchy[0]);
  }, [hierarchy]);
  return (
    <CustomDialog title="Hierarchy" open={open} onOpenChange={close}>
      {hierarchy?.length > 0 ? (
        <div>
          <div>
            {hierarchy?.map((el: any) => (
              <span
                className="saveButtonCss px-3 rounded py-1 me-2"
                onClick={() => setSelectedHierarchy(el)}
              >
                {el.name}
              </span>
            ))}
          </div>
          <hr className="my-3 block" />
          <div>
            {selectedHierarchy && (
              <Tree
                label={<div>{selectedHierarchy?.name}</div>}
                lineWidth={"2px"}
                lineColor={"green"}
                lineBorderRadius={"10px"}
              >
                {selectedHierarchy?.hierarchy?.map((el: any) => (
                  <TreeNode label={<div>{el?.level}</div>}>
                    {el?.employees?.map((emp: any) => (
                      <TreeNode label={<div>{emp.name}</div>} />
                    ))}
                  </TreeNode>
                ))}
              </Tree>
            )}
            {/* {hierarchy &&
          hierarchy.length > 0 &&
          hierarchy.map((el) => (
            <Tree
              label={<div>{el?.name}</div>}
              lineWidth={"2px"}
              lineColor={"green"}
              lineBorderRadius={"10px"}
            >
              {el?.hierarchy?.map((tree: any) => (
                <TreeNode label={<div>{tree?.level}</div>}>
                  {tree?.employees?.map((emp: any) => (
                    <TreeNode label={<div>{emp.name}</div>} />
                  ))}
                </TreeNode>
              ))}
            </Tree>
          ))} */}
          </div>
        </div>
      ) : (
        <div>
          <h6 className="text-center">No Records Found!</h6>
        </div>
      )}
    </CustomDialog>
  );
}
