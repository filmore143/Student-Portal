import { Screen } from "quasar";
import { Dark } from "quasar";
export default function () {
  return {
    currentScreen: Screen.name,
    currentScreenProperty: Screen,
    navLinks: [
      {
        title: "DASHBOARD",
        icon: "leaderboard",
        link: "/students",
        children: [],
      },
      {
        title: "GRADES",
        icon: "person",
        link: "/students/grades",
        children: [],
      },
      // {
      //   title: "LEDGER",
      //   icon: "folder",
      //   link: "/students/ledger",
      //   children: [],
      // },
      {
        title: "TRANSACTIONS",
        icon: "payments",
        link: "",
        children: [
          {
            title: "LEDGER",
            icon: "folder",
            link: "/students/ledger",
            children: [],
          },
          {
            title: "ONLINE REGISTRATION",
            icon: "payments",
            link: "/students/transactions/online-registration",
            children: [],
          },

          {
            title: "PROOFS OF PAYMENT",
            icon: "savings",
            link: "/students/transactions/proof-payment",
            children: [],
          },
          {
            title: "PAYMENT ORDERS",
            icon: "account_balance",
            link: "/students/transactions/payment-orders",
            children: [],
          },
        ],
      },
      {
        title: "ONLINE SERVICES",
        icon: "fa fa-handshake",
        link: "",
        children: [
          // {
          //   title: "CLEARANCE",
          //   icon: "assignment_turned_in",
          //   link: "/students/register-clearance",
          //   children: [],
          // },
          {
            title: "CLEARANCE",
            icon: "assignment_turned_in",
            link: "/students/app-clear",
            children: [],
          },
          // {
          //   title: "ENTRANCE CREDENTIALS",
          //   icon: "upload_file",
          //   link: "/students/upload-documents",
          //   children: [],
          // },
          {
            title: "EVALUATION",
            icon: "border_color",
            link: "/students/evaluation",
            children: [],
          },
          // {
          //   title: "CLEARANCE",
          //   icon: "star_half",
          //   link: "/students/app-clear",
          //   children: [],
          // },
        ],
      },
      {
        title: "ONLINE RESOURCES",
        icon: "book",
        link: "",
        children: [
          {
            title: "LIBRARY E-RESOURCES",
            icon: "library_books",
            link: "/students/online-resources/electronic-materials",
            children: [],
          },
          {
            title: "GOOGLE MAIL",
            icon: "fab fa-google",
            link: "/students/online-resources/gmail",
            children: [],
          },
          {
            title: "CANVAS LMS",
            icon: "co_present",
            link: "/students/online-resources/canvas",
            children: [],
          },
          {
            title: "MS OFFICE 365",
            icon: "fab fa-microsoft",
            link: "/students/online-resources/ms-office",
            children: [],
          },
        ],
      },
      // {
      //   title: "VACCINE STATUS",
      //   icon: "vaccines",
      //   link: "/students/vaccine-records",
      //   children: [],
      // },
      // {
      //   title: "PERSONAL INFORMATION",
      //   icon: "person",
      //   link: "/students/update-profile",
      //   children: [],
      // },
      {
        title: "FEEDBACK",
        icon: "thumb_up",
        link: "/students/feedback",
        children: [],
      },
      // {
      //   title: "STUDENT PORTAL v1",
      //   icon: "360",
      //   link: "/students/portalv1",
      //   children: [],
      // },
    ],
  };
}
