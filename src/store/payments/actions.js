export async function uploadPayment(context, fileData) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/transaction/submitproofofpayment`,
      method: "post",
      data: fileData,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      detailed: true,
      handler: (data) => {
        context.commit("uploadPayment", data);
      },
    },
    { root: true }
  );
}

export async function getProofOfPayment(context, query = {}) {
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
      url: `${apiHost}/transaction/getproofofpayment${queryStr}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      detailed: true,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        context.commit("getProofOfPayment", data);
      },
    },
    { root: true }
  );
}

export async function savePaymentOrder(context, query = {}) {
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
      url: `${apiHost}/transaction/savepaymentorder${queryStr}`,
      method: "post",
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      detailed: true,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        context.commit("savePaymentOrder", data);
      },
    },
    { root: true }
  );
}

export async function getPaymentOrderHistory(context) {
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
      url: `${apiHost}/transaction/getpaymentorderhistory`,
      method: "get",
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      detailed: true,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        context.commit("getPaymentOrderHistory", data);
      },
    },
    { root: true }
  );
}

export async function getPaymentOrderList(context) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/transaction/getpaymentorderlist`,
      method: "get",
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      detailed: true,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        context.commit("getPaymentOrderList", data);
      },
    },
    { root: true }
  );
}

export async function paymentSchedule(context) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/transaction/payment-schedule`,
      method: "get",
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      detailed: true,
      handler: (data) => {
        return data;
      },
    },
    { root: true }
  );
}

export async function getOnlineRegistration(context) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }
  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/transaction/getonlineregistration`,
      method: "get",
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      detailed: true,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        context.commit("getOnlineRegistration", data);
      },
    },
    { root: true }
  );
}

export async function getOnlineAssessmentForm(context) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }
  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/transaction/online-accessment-form`,
      method: "get",
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      detailed: true,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        return data;
      },
    },
    { root: true }
  );
}

export async function getPaymentOrderDetails(context, query = {}) {
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
      url: `${apiHost}/transaction/getpaymentorderdetails${queryStr}`,
      method: "get",
      // headers: {
      //   Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      // },
      detailed: true,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        context.commit("getPaymentOrderDetails", data);
      },
    },
    { root: true }
  );
}

export async function cancelPaymentOrder(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/transaction/cancel-payment-order`,
      method: "post",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      data: payload,
      handler: (data) => {
        return data;
      },
    },
    { root: true }
  );
}

export async function printStudentOR(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/transaction/print-student-or`,
      method: "get",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      data: payload,
      handler: (data) => {
        return data;
      },
    },
    { root: true }
  );
}

export async function getViewProofOfPayment(context, query = {}) {
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
      url: `${apiHost}/transaction/view-proofs-payment${queryStr}`,
      method: "get",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      handler: (data) => {
        return data;
      },
    },
    { root: true }
  );
}
