//ETO YUNG LUMA NA UPLOADING NG VACCINE
export async function uploadVaccineRecord(context, fileData) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/vaccine/upload-vaccine`,
      method: "post",
      data: fileData,
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

//ETO YUNG BAGO NA UPLOADING NG VACCINE
export async function submitVaccine(context, fileData) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/vaccine/submit-vaccine`,
      method: "post",
      data: fileData,
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

export async function getVaccineList(context) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/vaccine/vaccine-list`,
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

export async function getVaccineName(context) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/vaccine/vaccine-name`,
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

export async function getVaccineRecord(context) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/vaccine/vaccine-record`,
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

export async function getDoses(context, query = {}) {
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
      url: `${apiHost}/vaccine/vaccine-dose${queryStr}`,
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
