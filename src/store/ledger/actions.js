export async function getLedger(context, query = {}) {
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
      url: `${apiHost}/ledger/ledger${queryStr}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      // headers: {},
      detailed: true,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        context.commit("studentLedger", data);
      },
    },
    { root: true }
  );
}
