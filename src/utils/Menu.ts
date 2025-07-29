import { Frame, GalleryVerticalEnd } from "lucide-react";

export const Menu = {
  user: {
    name: "Admin",
    email: "user@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Admin",
      logo: GalleryVerticalEnd,
      plan: "Instawebs",
    },
  ],
  navMain: [
    {
      menuid: 1,
      formid: 1,
      menuname: "Dashboard",
      formname: "Dashboard",
      haschild: false,
      parentid: 0,
      seqno: 1,
      SubMenus: [
      ],
    },
    {
      menuid: 2,
      formid: 2,
      menuname: "Master",
      formname: "Master",
      haschild: true,
      parentid: 0,
      seqno: 1,
      iconpath: "",
      SubMenus: [
      
   
       
      
      
        
        {
          menuid: 1039,
          formid: 1030,
          menuname: "ApprovalMatrix",
          formname: "Approval Matrix",
          haschild: false,
          parentid: 2,
          seqno: 5,
          iconpath: "",
        },
        {
          menuid: 1053,
          formid: 10345,
          menuname: "ApprovalMatrixUI",
          formname: "Approval Settings",
          haschild: false,
          parentid: 2,
          seqno: 5,
          iconpath: "",
        },
    
        {
          menuid: 1038,
          formid: 1,
          menuname: "ApprovalGroup",
          formname: "Approval Group",
          haschild: false,
          parentid: 2,
          seqno: 10,
          iconpath: "",
        },
    
      ],
    },
   
    {
      menuid: 1035,
      formid: 1,
      menuname: "Pages",
      formname: "Pages",
      haschild: true,
      parentid: 0,
      seqno: 1,
      iconpath: "",
      SubMenus: [
        {
          menuid: 1036,
          formid: 1,
          formname: "Approval Category",
          menuname: "ApprovalCategory",
          haschild: false,
          parentid: 1035,
          seqno: 1,
          iconpath: "",
        },
        {
          menuid: 1037,
          formid: 1,
          formname: "Approval Reason",
          menuname: "ApprovalReason",
          haschild: false,
          parentid: 1035,
          seqno: 1,
          iconpath: "",
        },
        {
          menuid: 1038,
          formid: 1,
          formname: "Customer Group",
          menuname: "CustomerGroup",
          haschild: false,
          parentid: 1035,
          seqno: 1,
          iconpath: "",
        },
        {
          menuid: 1039,
          formid: 1,
          formname: "Customer Master",
          menuname: "CustomerMaster",
          haschild: false,
          parentid: 1035,
          seqno: 1,
          iconpath: "",
        },
        {
          menuid: 1040,
          formid: 1,
          formname: "Mode of Payment",
          menuname: "ModeOfPayment",
          haschild: false,
          parentid: 1035,
          seqno: 1,
          iconpath: "",
        },
        {
          menuid: 1041,
          formid: 1,
          formname: "Bank Master",
          menuname: "BankMaster",
          haschild: false,
          parentid: 1035,
          seqno: 1,
          iconpath: "",
        },
        {
          menuid: 1042,
          formid: 1,
          formname: "Divison",
          menuname: "Divison",
          haschild: false,
          parentid: 1035,
          seqno: 1,
          iconpath: "",
        },
      ],
    },
    {
      menuid: 24,
      formid: 0,
      menuname: "Admin Setting",
      formname: "Admin Setting",
      haschild: true,
      parentid: 0,
      seqno: 1,
      SubMenus: [
        {
          menuid: 25,
          formid: 20,
          menuname: "role",
          formname: "Role",
          haschild: false,
          parentid: 24,
          seqno: 1,
        },
        {
          menuid: 26,
          formid: 21,
          menuname: "userManagement",
          formname: "User Management",
          haschild: false,
          parentid: 24,
          seqno: 1,
        },
        
      
      
        
        {
          menuid: 1031,
          formid: 23,
          menuname: "formAttribute",
          formname: "Form Builder",
          haschild: false,
          parentid: 24,
          seqno: 2,
          iconpath: "",
        },
        {
          menuid: 37,
          formid: 22,
          menuname: "settings",
          formname: "Settings",
          haschild: false,
          parentid: 24,
          seqno: 2,
          iconpath: "",
        }
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
  ],
};
