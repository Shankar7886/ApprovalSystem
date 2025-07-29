// import React, { useState } from "react";
// import { useDrag, useDrop, DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/shadcn-ui/accordion";
// import { Trash, User } from "lucide-react";
// import Section from "@/components/common/Section";
// import { DepartmentListFake } from "@/Pages/Master/ApprovalMatrix/Fake";
// import { generateShade, hexToHSL } from "@/utils/randomColor";
// import { Button } from "@/components/shadcn-ui/button";
// import SingleSelectDropdownFloat from "@/components/common/floatDropdown";

// interface EmployeeType {
//   id: string;
//   name: string;
//   empcode: string;
//   departmentname: string;
//   ismandatory: boolean;
//   type?: string;
//   from?: string;
//   index?: number;
// }

// interface DepartmentType {
//   name: string;
//   color: string;
//   employees: EmployeeType[];
// }

// const Employee: React.FC<{
//   employee: EmployeeType;
//   from: "departments" | "hierarchy";
//   index?: number;
//   onRemove?: (emp: EmployeeType) => void;
//   handleCheckBox?: (emp: EmployeeType) => void;
//   bgColor?: string;
// }> = ({ employee, from, index, onRemove, handleCheckBox, bgColor }) => {
//   const [, drag] = useDrag(() => ({
//     type: "employee",
//     item: { ...employee, type: "employee", from, index },
//   }));

//   return drag(
//     <div
//       className={`flex justify-between items-center bg-white p-2 border shadow rounded-sm h-[120px] w-[160px] flex-col`}
//       style={{ backgroundColor: from === "departments" ? bgColor : "white" }}
//     >
//       <div className={`flex gap-2 items-center justify-between w-full`}>
//         <User size={18} />
//         <small className="bg-purple-100 px-2 py-0.5 rounded">
//           {employee.empcode}
//         </small>
//       </div>

//       <div
//         className={`${
//           from === "hierarchy"
//             ? "flex items-center gap-2 w-full flex-col"
//             : "border-t p-1 w-full"
//         }`}
//       >
//         {from === "hierarchy" && (
//           <div className="flex items-center justify-between gap-2 p-2 w-full">
//             <input
//               type="checkbox"
//               checked={employee.ismandatory}
//               onChange={() => handleCheckBox && handleCheckBox(employee)}
//             />
//             <Trash
//               className="cursor-pointer text-red-600 hover:text-red-700"
//               size={12}
//               onClick={() => onRemove && onRemove(employee)}
//             />
//           </div>
//         )}
//         <p className="m-0 font-medium">{employee.name}</p>
//       </div>
//     </div>
//   );
// };

// const DropWrapper: React.FC<{
//   index: number;
//   children: React.ReactNode;
//   moveEmployee: (fromIndex: number, toIndex: number) => void;
// }> = ({ index, children, moveEmployee }) => {
//   const [, drop] = useDrop({
//     accept: "employee",
//     hover(item: any) {
//       if (item.from === "hierarchy" && item.index !== index) {
//         moveEmployee(item.index, index);
//         item.index = index;
//       }
//     },
//   });

//   return drop(<div>{children}</div>);
// };

// const Department: React.FC<{
//   dept: DepartmentType;
//   onDrop: (
//     item: EmployeeType | { type: "department"; deptName: string },
//     from: string,
//     to: string
//   ) => void;
// }> = ({ dept, onDrop }) => {
//   const [, drop] = useDrop({
//     accept: ["employee", "department"],
//     drop: (item: any) => {
//       if (item.type === "employee") {
//         onDrop(item, item.from || "", dept.name);
//       }
//     },
//   });

//   const [{ isDragging }, drag] = useDrag({
//     type: "department",
//     item: {
//       ...dept,
//       type: "department",
//       deptName: dept.name,
//       from: "departments",
//     },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });
//   const { h, s } = hexToHSL(dept.color);

//   return drop(
//     <div>
//       <AccordionItem
//         value={dept.name}
//         className="data-[state=open]:border data-[state=closed]:border-b"
//         style={{ borderColor: `hsl(${h}, ${s}%, 55%)` }}
//       >
//         <AccordionTrigger
//           ref={drag as any}
//           className={`px-3 rounded-none ${isDragging ? "opacity-50" : ""}`}
//           style={{ backgroundColor: `hsl(${h}, ${s}%, 55%)` }}
//         >
//           {dept.name}
//         </AccordionTrigger>
//         <AccordionContent className="space-y-2 p-2 flex flex-wrap gap-2">
//           {dept.employees.map((emp, id) => (
//             <Employee
//               key={emp.id}
//               employee={emp}
//               from="departments"
//               bgColor={generateShade(h, s, dept.employees.length, id)}
//             />
//           ))}
//           {dept.employees.length === 0 && (
//             <div className="flex items-center justify-center w-full h-20 bg-gray-100 rounded">
//               <p className="text-gray-500">No Employees</p>
//             </div>
//           )}
//         </AccordionContent>
//       </AccordionItem>
//     </div>
//   );
// };

// const HierarchyLevel: React.FC<{
//   level: number;
//   employees: EmployeeType[];
//   onDrop: (item: any, from: string, to: string, level: number) => void;
//   handleRemove: (employee: EmployeeType) => void;
//   handleCheckBox: (employee: EmployeeType) => void;
//   moveEmployee: (fromIndex: number, toIndex: number, level: number) => void;
//   selectedLevels?: string | number;
// }> = ({
//   level,
//   employees,
//   onDrop,
//   handleRemove,
//   handleCheckBox,
//   moveEmployee,
//   selectedLevels,
// }) => {
//   const [, drop] = useDrop({
//     accept: ["employee", "department"],
//     drop: (item: any) => onDrop(item, item.from || "", "hierarchy", level),
//   });
//   return drop(
//     <div
//       className={`p-3 rounded-xl h-full overflow-y-auto bg-[#fbf9f9] block flex-shrink-0 ${
//         selectedLevels !== "1" ? "w-[200px]" : "w-full"
//       }`}
//     >
//       <h4 className="text-lg font-semibold mb-2">Hierarchy Level {level}</h4>
//       <div className="space-y-2 px-3 mt-3">
//         {employees.map((emp, index) => (
//           <DropWrapper
//             key={emp.id}
//             index={index}
//             moveEmployee={(from, to) => moveEmployee(from, to, level)}
//           >
//             <Employee
//               employee={emp}
//               from="hierarchy"
//               index={index}
//               onRemove={handleRemove}
//               handleCheckBox={handleCheckBox}
//             />
//           </DropWrapper>
//         ))}
//       </div>
//     </div>
//   );
// };

// const Index: React.FC = () => {
//   const [departments, setDepartments] =
//     useState<DepartmentType[]>(DepartmentListFake);
//   const [hierarchyLevels, setHierarchyLevels] = useState<{
//     [key: number]: EmployeeType[];
//   }>({ 1: [] });
//   const [openItems, setOpenItems] = useState<string[]>([]);
//   const [selectedLevels, setSelectedLevels] = useState<string>("1");

//   const levelOptions = Array.from({ length: 10 }, (_, i) => ({
//     label: `Level ${i + 1}`,
//     value: String(i + 1),
//   }));

//   const handleExpandAll = () =>
//     setOpenItems(departments.map((dept) => dept.name));
//   const handleCollapseAll = () => setOpenItems([]);

//   const onDrop = (item: any, from: string, to: string, level: number) => {
//     console.log({
//       item,
//       from,
//       to,
//       level,
//       hierarchyLevels,
//     });
//     if (item.type === "employee") {
//       setHierarchyLevels((prev) => {
//         const newLevels = { ...prev };
//         Object.keys(newLevels).forEach((lvl) => {
//           newLevels[+lvl] = newLevels[+lvl].filter((emp) => emp.id !== item.id);
//         });

//         const currentLevel = newLevels[level] || [];
//         newLevels[level] = currentLevel.find((e) => e.id === item.id)
//           ? currentLevel
//           : [...currentLevel, item];

//         return newLevels;
//       });

//       if (from === "departments") {
//         const updatedDepts = departments.map((dept) => ({
//           ...dept,
//           employees: dept.employees.filter((e) => e.id !== item.id),
//         }));
//         setDepartments(updatedDepts);
//       }
//     }

//     // 🧩 Fix: Handle department drop
//     else if (item.type === "department") {
//       setHierarchyLevels((prev) => {
//         const newLevels = { ...prev };
//         const currentLevel = newLevels[level] || [];

//         // Flatten list of new employees from department
//         const newEmployees = item.employees.filter(
//           (e: EmployeeType) => !currentLevel.find((emp) => emp.id === e.id)
//         );

//         // Remove them from all levels
//         Object.keys(newLevels).forEach((lvl) => {
//           newLevels[+lvl] = newLevels[+lvl].filter(
//             (emp) => !newEmployees.some((e: any) => e.id === emp.id)
//           );
//         });

//         // Add to current level
//         newLevels[level] = [...currentLevel, ...newEmployees];
//         return newLevels;
//       });

//       // Remove from department
//       setDepartments((prev) =>
//         prev.map((dept) =>
//           dept.name === item.deptName ? { ...dept, employees: [] } : dept
//         )
//       );
//     }
//   };

//   const handleRemove = (employee: EmployeeType) => {
//     setHierarchyLevels((prev) => {
//       const updated = { ...prev };
//       Object.keys(updated).forEach((lvl) => {
//         updated[+lvl] = updated[+lvl].filter((emp) => emp.id !== employee.id);
//       });
//       return updated;
//     });
//     setDepartments((prev) =>
//       prev.map((dept) =>
//         dept.name === employee.departmentname
//           ? {
//               ...dept,
//               employees: [
//                 ...dept.employees,
//                 { ...employee, ismandatory: false },
//               ],
//             }
//           : dept
//       )
//     );
//   };

//   const handleCheckBox = (employee: EmployeeType) => {
//     setHierarchyLevels((prev) => {
//       const updated = { ...prev };
//       Object.keys(updated).forEach((lvl) => {
//         updated[+lvl] = updated[+lvl].map((emp) =>
//           emp.id === employee.id
//             ? { ...emp, ismandatory: !emp.ismandatory }
//             : emp
//         );
//       });
//       return updated;
//     });
//   };

//   const moveEmployee = (fromIndex: number, toIndex: number, level: number) => {
//     console.log({
//       fromIndex,
//       toIndex,
//       level,
//       hierarchyLevels,
//     });
//     setHierarchyLevels((prev) => {
//       const updated = [...(prev[level] || [])];
//       const [moved] = updated.splice(fromIndex, 1);
//       updated.splice(toIndex, 0, moved);
//       return { ...prev, [level]: updated };
//     });
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <Section>
//         <div className="flex items-center justify-between gap-2 ps-4 pt-2">
//           <div className="flex gap-2">
//             <Button
//               onClick={handleExpandAll}
//               variant="outline"
//               className="saveButtonCss"
//             >
//               Expand
//             </Button>
//             <Button
//               onClick={handleCollapseAll}
//               variant="outline"
//               className="saveButtonCss"
//             >
//               Collapse
//             </Button>
//             <SingleSelectDropdownFloat
//               className="max-w-[180px]"
//               options={levelOptions}
//               fields={{ label: "label", value: "value" }}
//               label="Levels"
//               placeholder="Select levels"
//               onChange={(val) => {
//                 setSelectedLevels(val);
//                 setHierarchyLevels({ 1: [] });
//                 setDepartments(DepartmentListFake);
//                 setOpenItems([]);
//                 // const num = +val;
//                 // const updated: { [key: number]: EmployeeType[] } = {};
//                 // for (let i = 1; i <= num; i++)
//                 //   updated[i] = hierarchyLevels[i] || [];
//                 // setHierarchyLevels(updated);
//               }}
//               value={selectedLevels}
//               id=""
//             />
//           </div>
//           <div className="me-4">
//             <Button
//               onClick={() => {
//                 setHierarchyLevels({ 1: [] });
//                 setDepartments(DepartmentListFake);
//                 setSelectedLevels("1");
//                 setOpenItems([]);
//               }}
//               variant="outline"
//               className="saveButtonCss"
//             >
//               Reset
//             </Button>
//             <Button
//               onClick={() => console.log(hierarchyLevels, "hierarchyLevels")}
//               variant="outline"
//               className="saveButtonCss ms-2"
//             >
//               Save
//             </Button>
//           </div>
//         </div>
//         <div className="flex justify-between gap-6 h-[calc(100vh-130px)] p-2">
//           <div className="overflow-y-auto p-2 [&::-webkit-scrollbar]:[width:0px] w-full max-w-[530px]">
//             <Accordion
//               type="multiple"
//               className="w-full space-y-2"
//               value={openItems}
//               onValueChange={setOpenItems}
//             >
//               {departments.map((dept) => (
//                 <Department
//                   key={dept.name}
//                   dept={dept}
//                   onDrop={(item, from, to) => onDrop(item, from, to, 1)}
//                 />
//               ))}
//             </Accordion>
//           </div>
//           <div className="w-px bg-gray-100 mx-2" />
//           {/* grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 */}
//           <div className="grow flex gap-5 overflow-x-scroll">
//             {Array.from({ length: +selectedLevels }, (_, i) => i + 1).map(
//               (level) => (
//                 <HierarchyLevel
//                   key={level}
//                   level={level}
//                   employees={hierarchyLevels[level] || []}
//                   onDrop={onDrop}
//                   handleRemove={handleRemove}
//                   handleCheckBox={handleCheckBox}
//                   moveEmployee={moveEmployee}
//                   selectedLevels={selectedLevels}
//                 />
//               )
//             )}
//           </div>
//         </div>
//       </Section>
//     </DndProvider>
//   );
// };

// export default Index;
