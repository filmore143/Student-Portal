export async function getEvalQuestion(context, query = {}) {
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
      url: `${apiHost}/students/evaluation-question${queryStr}`,
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

export async function studentServiceQuestion(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }
  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/students/student-service-question`,
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

export async function evalResponse(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/students/evaluation-response`,
      method: "post",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      data: payload,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        return data;
      },
    },
    { root: true }
  );
}

export async function getEvaluation(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/students/evaluation`,
      method: "get",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      data: payload,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        return data;
      },
    },
    { root: true }
  );
}

export async function getSSEvaluation(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/students/student-service-evaluation`,
      method: "get",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      data: payload,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        return data;
      },
    },
    { root: true }
  );
}

export async function nurseFacultyList(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/students/nurse-faculty-list`,
      method: "get",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      data: payload,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        return data;
      },
    },
    { root: true }
  );
}

export async function newToOld(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/students/new-to-old`,
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

export async function getEvaluationTimeFrame(context, query = {}) {
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
      url: `${apiHost}/students/evaluation-timeframe${queryStr}`,
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

export async function getStudentServiceTimeFrame(context, query = {}) {
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
      url: `${apiHost}/students/studentservice-timeframe${queryStr}`,
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

export async function getEnrollmentEvaluationQuestion(context, query = {}) {
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
      url: `${apiHost}/students/enrollment-evaluation-question${queryStr}`,
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

export async function enrollmentSurveyResponse(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/students/enrollment-survey-response`,
      method: "post",
      detailed: true,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      data: payload,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        return data;
      },
    },
    { root: true }
  );
}

export async function checkIfAlreadySubmittedSurvey(context, query = {}) {
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
      url: `${apiHost}/students/validate-survey${queryStr}`,
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
