export async function getDocuments(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/documents/getdocuments`,
      method: "get",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      data: payload,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        // context.commit("gradingSystem", data);
        return data;
      },
    },
    { root: true }
  );
}

export async function uploadDocuments(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/documents/upload-documents`,
      method: "post",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      data: payload,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        // context.commit("gradingSystem", data);
        return data;
      },
    },
    { root: true }
  );
}

export async function editDocuments(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/documents/edit-documents`,
      method: "put",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      data: payload,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        // context.commit("gradingSystem", data);
        return data;
      },
    },
    { root: true }
  );
}

export async function deleteDocuments(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/documents/delete-documents`,
      method: "put",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      data: payload,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        // context.commit("gradingSystem", data);
        return data;
      },
    },
    { root: true }
  );
}

export async function viewImages(context) {
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
      url: `${apiHost}/documents/pictures`,
      method: "get",
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      detailed: true,
      handler: (data) => {
        return data;
        // context.commit("studentPicture", data);
      },
    },
    { root: true }
  );
}

export async function checkIfDocumentsAreCleared(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/documents/verify-documents`,
      method: "get",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      data: payload,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        // context.commit("gradingSystem", data);
        return data;
      },
    },
    { root: true }
  );
}
