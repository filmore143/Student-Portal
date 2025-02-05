// import AutoLoginInEmail from "../components/EmailAutoLogin.vue";

const routes = [
  {
    path: "/auth/payment-ledger/:directLinkHash",

    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        name: "AutoLoginInEmail",
        component: () => import("pages/EmailAutoLogin.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      { path: "", name: "login", component: () => import("pages/Login.vue") },
    ],

    meta: {
      isAuthenticated: false,
    },
  },
  {
    path: "/auth/student/:studentno/:studentpass",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        name: "autologin",
        component: () => import("pages/AutoLogin.vue"),
      },
    ],
    meta: {
      isAuthenticated: false,
    },
  },

  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "/forgot-password",

        component: () =>
          // import("pages/Students/ResetPassword/ForgotPassword.vue"),
          import("pages/ForgotPassword.vue"),
      },
    ],
    meta: {
      isAuthenticated: false,
    },
  },
  {
    path: "/reset-password/:studentno",
    name: "ResetPassword",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "/reset-password/:studentno",

        component: () => import("pages/ResetPassword.vue"),
      },
    ],
    meta: {
      isAuthenticated: false,
    },
  },
  {
    path: "/auth/student/:studentno",

    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "", name: "auth", component: () => import("pages/Auth.vue") },
    ],
  },

  {
    path: "/students/",
    name: "Students",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      isAuthenticated: true, // Add this meta field to specify that authentication is required
    },
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("pages/Students/Home.vue"),
      },
      {
        path: "grades",
        name: "Grades",
        component: () => import("pages/Students/Grades.vue"),
      },
      {
        path: "ledger",
        name: "Ledger",
        component: () => import("pages/Students/Ledger.vue"),
      },
      {
        path: "transactions/online-registration",
        name: "Online Registration",
        component: () =>
          import("pages/Students/Transactions/OnlineRegistration.vue"),
      },
      {
        path: "transactions/proof-payment",
        name: "Proof of Payments",
        component: () =>
          import("pages/Students/Transactions/ProofOfPayment.vue"),
      },
      {
        path: "transactions/payment-orders",
        name: "Payment Orders",
        component: () =>
          import("pages/Students/Transactions/PaymentOrders.vue"),
      },
      {
        path: "upload-documents",
        name: "Upload Documents",
        component: () => import("pages/Students/Uploading/Documents.vue"),
      },
      {
        path: "register-clearance",
        name: "Register Clearance",
        component: () => import("src/pages/RegisterClearance.vue"),
      },
      {
        path: "clearance-tracking",
        name: "Clearance Tracking",
        component: () => import("pages/ClearanceTracking.vue"),
      },
      {
        path: "app-clear",
        name: "Application For Academic Records & Clearance Portal",
        component: () => import("pages/AppClear.vue"),
      },
      {
        path: "evaluation",
        name: "Students Evaluation",
        component: () => import("src/pages/Evaluation.vue"),
      },
      {
        path: "online-resources/gmail",
        name: "Google Mail",
        component: () =>
          import("pages/Students/OnlineResources/GoogleMail.vue"),
      },
      {
        path: "online-resources/canvas",
        name: "Canvas LMS",
        component: () => import("pages/Students/OnlineResources/Canvas.vue"),
      },
      {
        path: "online-resources/ms-office",
        name: "MS OFFICE 365",
        component: () => import("pages/Students/OnlineResources/MsOffice.vue"),
      },
      {
        path: "online-resources/electronic-materials",
        name: "Electronic Materials",
        component: () =>
          import("pages/Students/OnlineResources/ElectronicResources.vue"),
      },
      // {
      //   path: "vaccine-records",
      //   name: "Vaccine Records",
      //   component: () => import("src/pages/Vaccine.vue"),
      // },
      // {
      //   path: "vaccine-records",
      //   name: "Vaccine Records",
      //   component: () => import("src/pages/VaccineSurvey.vue"),
      // },
      // {
      //   path: "vaccine-records",
      //   name: "Vaccine Records",
      //   component: () => import("src/pages/VaccineSurveyFinal.vue"),
      // },
      // {
      //   path: "vaccine-records",
      //   name: "Vaccine Records",
      //   component: () => import("src/pages/VacSurvey.vue"),
      // },
      {
        path: "feedback",
        name: "Feedback",
        component: () => import("pages/Students/Feedback.vue"),
      },
      {
        path: "student-or",
        name: "Print Student OR",
        component: () => import("pages/PrintStudentOR.vue"),
      },
      // {
      //   path: "update-profile",
      //   name: "UpdateProfile",
      //   component: () => import("pages/UpdateProfile.vue"),
      // },
      // {
      //   path: "portalv1",
      //   name: "portalV1",
      //   beforeEnter() {
      //     window.location.href = "https://www.uerm.edu.ph/apps/portal/student";
      //   },
      // },
    ],
  },

  {
    path: "/donthaveaccess",

    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "donthaveaccess",
        component: () => import("pages/DontHaveAccess.vue"),
      },
    ],
    meta: {
      isAuthenticated: true,
    },
  },

  {
    path: "/paymentorderdetails/:transactid",

    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        name: "paymentorderdetails",
        component: () => import("pages/PaymentOrderDetails.vue"),
      },
    ],
    meta: {
      isAuthenticated: true,
    },
  },

  {
    path: "/register-clearance",

    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "registerclearance",
        component: () => import("src/pages/RegisterClearance.vue"),
      },
    ],
    meta: {
      isAuthenticated: true,
    },
  },

  {
    path: "/clearance-tracking",

    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "clearancetracking",
        component: () => import("src/pages/ClearanceTracking.vue"),
      },
    ],
    meta: {
      isAuthenticated: true,
    },
  },

  // {
  //   path: "/online-resources",
  //   name: "onlineresources",
  //   component: () => import("layouts/MainLayout.vue"),
  //   children: [
  //     {
  //       path: "",
  //       component: () => import("src/pages/ElectronicResources.vue"),
  //     },
  //   ],
  //   meta: {
  //     isAuthenticated: true,
  //   },
  // },

  {
    path: "/students-evaluation",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "studentsevaluation",
        component: () => import("src/pages/Evaluation.vue"),
      },
    ],
    meta: {
      isAuthenticated: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
