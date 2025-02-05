export async function getUniversityClearanceTracking(context, query = {}) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }
  // const queryStr = await context.dispatch("helpers/queryToStr", query, {
  //   root: true,
  // });

  // console.log(context, "this");

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/university-level-clearance`,
      method: "get",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      handler: (data) => {
        // Response data can be modified here before setting it to the store
        context.commit("setUniversityClearanceList", data);
      },
    },
    { root: true }
  );
}

export async function getCollegeClearanceTracking(context, query = {}) {
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
      url: `${apiHost}/student/college-level-clearance`,
      method: "get",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      handler: (data) => {
        // Response data can be modified here before setting it to the store
        context.commit("setCollegeClearanceList", data);
      },
    },
    { root: true }
  );
}

export async function getCountry(context, query = {}) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/country`,
      method: "get",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      handler: (data) => {
        // Response data can be modified here before setting it to the store
        // context.commit("setCountry", data);
        return data;
      },
    },
    { root: true }
  );
}

export async function getDeansApprovalSequenceOne(context, query = {}) {
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
      url: `${apiHost}/student/deans-sequence-one-clearance`,
      method: "get",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      handler: (data) => {
        // Response data can be modified here before setting it to the store
        context.commit("setDeansApprovalSequenceOne", data);
      },
    },
    { root: true }
  );
}

export async function getDeansApprovalSequenceFour(context, query = {}) {
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
      url: `${apiHost}/student/deans-sequence-four-clearance`,
      method: "get",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      handler: (data) => {
        // Response data can be modified here before setting it to the store
        context.commit("setDeansApprovalSequenceFour", data);
      },
    },
    { root: true }
  );
}

export async function registerClearance(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/register-clearance`,
      method: "post",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      data: payload,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        // context.commit("add", data);
        return data;
      },
    },
    { root: true }
  );
}

export async function checkIfClearanceExist(context, query = {}) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }
  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/existing-clearance`,
      method: "get",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        // context.commit("existClearance", data);
        return data;
      },
    },
    { root: true }
  );
}

export async function withdrawClearance(context, fileData) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  console.log("FILE DATA: ", fileData);

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/withdraw-clearance`,
      method: "post",
      data: fileData,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      detailed: true,
      handler: async (data) => {
        // Response data can be modified here before adding it to the store

        context.commit("withdrawclearance", data);
      },
    },
    { root: true }
  );
}

export async function getRegion(context, query = {}) {
  return await context.dispatch(
    "helpers/request",
    {
      url: `https://api.uerm.edu.ph/geography/regions`,
      method: "get",
      detailed: true,
      // headers: {
      //   Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      // },
      handler: (data) => {
        return data;
      },
    },
    { root: true }
  );
}

export async function getProvinces(context, query = {}) {
  return await context.dispatch(
    "helpers/request",
    {
      url: `https://api.uerm.edu.ph/geography/provinces`,
      method: "get",
      detailed: true,
      // headers: {
      //   Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      // },
      handler: (data) => {
        return data;
      },
    },
    { root: true }
  );
}

export async function getCities(context, query = {}) {
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
      url: `https://api.uerm.edu.ph/geography/city-municipalities${queryStr}`,
      method: "get",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        return data;
      },
    },
    { root: true }
  );
}

export async function getSchools(context, query = {}) {
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
      url: `${apiHost}/student/school-suggestion${queryStr}`,
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

export async function documentsOrder(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/document-order`,
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

export async function getClearancePersonalInfo(context, query = {}) {
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
      url: `${apiHost}/student/personal-information${queryStr}`,
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

export async function uploadPayment(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/student/upload-payment`,
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

export async function verifyIfGraduating(context, query = {}) {
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
      url: `${apiHost}/student/graduate${queryStr}`,
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

export async function clearanceStatus(context, query = {}) {
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
      url: `${apiHost}/student/clearance-status${queryStr}`,
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
