export async function getGradingSystem(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/grades/gradingsystem`,
      method: "get",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      data: payload,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        context.commit("gradingSystem", data);
      },
    },
    { root: true }
  );
}

export async function getGradeOfStudent(context, query = {}) {
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
      url: `${apiHost}/grades/grades${queryStr}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      detailed: true,
      handler: (data) => {
        context.commit("setGradeOfStudent", data);
      },
    },
    { root: true }
  );
}

export async function getEvalResponse(context, query = {}) {
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
      url: `${apiHost}/grades/eval-response`,
      method: "get",
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      detailed: true,
      handler: (data) => {
        return data;
        // context.commit("setGradeOfStudent", data);
      },
    },
    { root: true }
  );
}
