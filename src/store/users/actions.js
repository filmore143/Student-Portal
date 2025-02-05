import { LocalStorage, Cookies } from "quasar";

export async function loginUsers(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }
  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/login`,
      method: "post",
      // headers: {},
      detailed: true,
      data: payload,
      handler: async (data) => {
        // Response data can be modified here before adding it to the store

        const decodeToken = await context.dispatch("jwtDecode", data);
        LocalStorage.set("access_token", data, 1);

        const studentData = decodeToken;
        studentData.token = data;

        const studentNo = decodeToken.sn;
        Cookies.set("student_no", studentNo);
        context.commit("userLogin", studentData);
      },
    },
    { root: true }
  );
}

export async function loginViaGoogle(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/login-via-google`,
      method: "post",
      // headers: {},
      data: payload,
      handler: async (data) => {
        const decodeToken = await context.dispatch("jwtDecode", data);
        LocalStorage.set("access_token", data);

        const studentData = decodeToken;
        studentData.token = data;

        const studentNo = decodeToken.sn;
        Cookies.set("student_no", studentNo);
        context.commit("userLogin", studentData);
      },
    },
    { root: true }
  );
}

export async function logout(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }
  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/logout`,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      method: "post",
      // headers: {},
      handler: async (data) => {
        LocalStorage.clear();
        Cookies.remove("student_no");
        context.commit("userLogin", {});
        // context.commit("studentPicture", {});
      },
    },
    { root: true }
  );
}

//FOR DECODE OF JWT TOKEN
// export async function jwtDecode(context, token) {
//   var base64Url = token.split(".")[1];
//   var base64 = decodeURIComponent(
//     atob(base64Url)
//       .split("")
//       .map((c) => {
//         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//       })
//       .join("")
//   );
//   return JSON.parse(base64);
// }

export async function jwtDecode(context, token) {
  var base64Url = token.split(".")[1];

  // Palitan ang mga character para sa base64url
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  // Idagdag ang padding kung kinakailangan
  while (base64.length % 4) {
    base64 += "=";
  }

  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

// export async function jwtDecode(context, token) {
//   const base64Url = token.split(".")[1];
//   const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//   const padding = "=".repeat((4 - (base64.length % 4)) % 4);
//   const base64WithPadding = base64 + padding;
//   const jsonString = atob(base64WithPadding);
//   return JSON.parse(jsonString);
// }

//I DISPATCH TO SA APP.VUE PARA KAHIT I RELOAD YUN PAGE NANDON PARIN SA STATE YUNG DATA
export async function setUserData(context) {
  const token = LocalStorage.getItem("access_token");
  const decodeToken = await context.dispatch("jwtDecode", token);
  const studentData = decodeToken;
  studentData.token = token;
  context.commit("userLogin", studentData);
}

export async function getPicture(context, query = {}) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  const queryStr = await context.dispatch("helpers/queryToStr", query, {
    root: true,
  });
  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/pictures${queryStr}`,
      method: "get",
      detailed: true,
      handler: (data) => {
        context.commit("studentPicture", data);
      },
    },
    { root: true }
  );
}

///RECAPTCHA
export async function recaptcha(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  // const queryStr = await context.dispatch("helpers/queryToStr", query, {
  //   root: true,
  // });
  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/recaptcha`,
      method: "post",
      // headers: {},
      detailed: true,
      data: payload,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        // return data;

        return data;
      },
    },
    { root: true }
  );
}

export async function websiteFeedback(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/websitefeedback`,
      method: "post",
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      detailed: true,
      data: payload,
      handler: (data) => {
        return data;
      },
    },
    { root: true }
  );
}

export async function AuthPass(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }
  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/auth`,
      method: "post",
      // headers: {},
      data: payload,
      handler: async (data) => {
        // Response data can be modified here before adding it to the store

        const decodeToken = await context.dispatch("jwtDecode", data);
        LocalStorage.set("access_token", data);

        const studentData = decodeToken;
        studentData.token = data;

        const studentNo = decodeToken.sn;
        Cookies.set("student_no", studentNo);
        context.commit("userLogin", studentData);
      },
    },
    { root: true }
  );
}

export async function AutoLogin(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/students/auto-login`,
      method: "post",
      // headers: {},
      data: payload,
      handler: async (data) => {
        const decodeToken = await context.dispatch("jwtDecode", data);
        LocalStorage.set("access_token", data);

        const studentData = decodeToken;

        studentData.token = data;

        const studentNo = decodeToken.sn;
        Cookies.set("student_no", studentNo);
        context.commit("userLogin", studentData);
      },
    },
    { root: true }
  );
}

export async function EmailAutoLogin(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  // const queryStr = await context.dispatch("helpers/queryToStr", query, {
  //   root: true,
  // });

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/students/email-notification`,
      method: "post",
      detailed: true,
      data: payload,
      handler: async (data) => {
        const decodeToken = await context.dispatch("jwtDecode", data);
        LocalStorage.set("access_token", data);

        const studentData = decodeToken;

        studentData.token = data;

        const studentNo = decodeToken.sn;
        Cookies.set("student_no", studentNo);
        context.commit("userLogin", studentData);
      },
    },
    { root: true }
  );
}

export async function sendMessage(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/messages`,
      method: "post",
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      data: payload,
      handler: async (data) => {
        context.commit("messages", data);
      },
    },
    { root: true }
  );
}

export async function downloadStudentHandbook(context, query = {}) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  const queryStr = await context.dispatch("helpers/queryToStr", query, {
    root: true,
  });

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/download-handbook${queryStr}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      detailed: true,
      handler: async (data) => {
        return data;
      },
    },
    { root: true }
  );
}

export async function forgotPassword(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/forgot-password`,
      method: "post",
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      detailed: true,
      data: payload,
      handler: async (data) => {
        context.commit("forgotpassword", data);
        return data;
      },
    },
    { root: true }
  );
}

export async function resetPassword(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/reset-password`,
      method: "put",
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      detailed: true,
      data: payload,
      handler: async (data) => {
        return data;
      },
    },
    { root: true }
  );
}

export async function personalInformatiom(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/submit-personal-information`,
      method: "post",
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      detailed: true,
      data: payload,
      handler: async (data) => {
        return data;
      },
    },
    { root: true }
  );
}

export async function checkIfAlreadySubmittedPersonalInformation(
  context,
  query = {}
) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  const queryStr = await context.dispatch("helpers/queryToStr", query, {
    root: true,
  });

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/validate-personal-info${queryStr}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      detailed: true,
      handler: async (data) => {
        return data;
      },
    },
    { root: true }
  );
}

export async function getPersonalInformatiom(context, query = {}) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  const queryStr = await context.dispatch("helpers/queryToStr", query, {
    root: true,
  });

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/get-student-info${queryStr}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      detailed: true,
      handler: async (data) => {
        return data;
      },
    },
    { root: true }
  );
}

export async function getStudentCity(context, query = {}) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  const queryStr = await context.dispatch("helpers/queryToStr", query, {
    root: true,
  });

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/get-student-city`,
      method: "get",
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      detailed: true,
      handler: async (data) => {
        return data;
      },
    },
    { root: true }
  );
}
