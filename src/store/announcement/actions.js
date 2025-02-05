export async function getAllAnnouncement(context, query = {}) {
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
      url: `${apiHost}/announcements${queryStr}`,
      method: "get",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        context.commit("getAllAnnouncement", data);
      },
    },
    { root: true }
  );
}

export async function acceptTermsOfAgreement(context, query = {}) {
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
      url: `${apiHost}/announcement/accepttermsofagreement${queryStr}`,
      method: "post",
      detailed: true,
      // headers: {
      //   Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      // },
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        context.commit("acceptTermsOfAgreement", data);
      },
    },
    { root: true }
  );
}

export async function checkIfAllAnnouncementAccepted(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/announcement/checkifallannouncementaccepted`,
      method: "get",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      data: payload,
      handler: (data) => {
        // Response data can be modified here before adding it to the store

        context.commit("checkIfAllAnnouncementAccepted", data);
      },
    },
    { root: true }
  );
}
