import axios from "axios";
import { Cookies } from "quasar";
import { LocalStorage } from "quasar";
export function isEmpty(context, arg) {
  if (
    arg === null ||
    arg === undefined ||
    arg === "" ||
    (Array.isArray(arg) && arg.length === 0) ||
    (typeof arg === "object" && Object.keys(arg).length === 0)
  )
    return true;

  return false;
}

// Simple Query String builder
export function queryToStr(context, query) {
  return `?${Object.entries(query)
    .map((entry) => `${entry[0]}=${entry[1]}`)
    .join("&")}`;
}

export async function request(context, arg) {
  const { url, method, headers, data, handler, detailed } = arg;

  const config = {
    timeout: process.env.HTTP_REQ_TIMEOUT,
  };

  if (headers) config["headers"] = headers;
  const args = [config];

  if (!["get", "delete"].includes(method)) args.unshift(data);

  // `process.env` vars which evaluate to `true` are tree-shaked during build/compilation
  if (process.env.DEV) console.log(`[${method.toUpperCase()}] ${url} :`, data);

  try {
    const response = await axios[method](url, ...args);

    // HTTP payload is automatically parsed by axios into JS object
    // HTTP Status Code 400 and up are error codes
    if (response.status >= 400)
      throw `HTTP Error code received: ${response.status}`;

    if (process.env.DEV) console.log("Response data: ", response.data);

    if (handler.constructor.name === "AsyncFunction") {
      await handler(response.data);
    } else {
      handler(response.data);
    }
    if (detailed) {
      return response.data;
    }
  } catch (err) {
    if (process.env.DEV) console.log(err);
    if (detailed) {
      if (err.response !== undefined) {
        return err.response.data;
      } else {
        return err;
      }
    }
    return false;
  }

  return true;
}

export async function getOTP(context, query = {}) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }

  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/otp/get-otp?auth=${process.env.AUTH_KEY}`,
      method: "get",
      detailed: true,
      // headers: {},
      handler: (data) => {},
    },
    { root: true }
  );
}

export async function verifyOTP(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }
  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/otp/verify-otp?auth=${process.env.AUTH_KEY}`,
      method: "post",
      detailed: true,
      // headers: {},
      data: payload,
      handler: (data) => {},
    },
    { root: true }
  );
}

export async function sendSMS(context, smsMessage) {
  const currentToken = LocalStorage.getItem("smartAccessToken");
  if (currentToken === null) {
    const authToken = await context.dispatch("setTextMessagingAuthentication");
    if (authToken.accessToken.length > 0) {
      const sendText = await context.dispatch("sendTextMessage", smsMessage);
      if (sendText.message.name === "Error") {
        return { message: "error" };
      } else {
        return { message: "success" };
      }
    } else {
      const refreshToken = await context.dispatch("refreshTextToken");
      if (refreshToken.accessToken.length > 0) {
        const sendText = await context.dispatch("sendTextMessage", smsMessage);
        if (sendText.message.name === "Error") {
          return { message: "error" };
        } else {
          return { message: "success" };
        }
      }
    }
  } else {
    const send = await context.dispatch("sendTextMessage", smsMessage);
    if (send.message.name === "Error") {
      const refreshToken = await context.dispatch("refreshTextToken");
      const authAgain = await context.dispatch(
        "setTextMessagingAuthentication"
      );
      const sendSMSAgain = await context.dispatch(
        "sendTextMessage",
        smsMessage
      );
      if (sendSMSAgain.message.name === "Error") {
        return { message: "error" };
      } else {
        return { message: "success" };
      }
    } else {
      return { message: "success" };
    }
  }
}

export async function setTextMessagingAuthentication(context) {
  try {
    let apiHost = process.env.API_HOST;
    if (process.env.DEV) {
      apiHost = process.env.DEV_HOST;
    }

    const responseToken = await fetch(
      `${apiHost}/sms/get-token-bearer?auth=${process.env.AUTH_KEY}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then((response) => response.json());

    LocalStorage.set("smartAccessToken", responseToken.accessToken);
    LocalStorage.set("smartTokenType", responseToken.tokenType);
    LocalStorage.set("smartRefreshToken", responseToken.refreshToken);
    return responseToken;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function refreshTextToken(context) {
  try {
    let apiHost = process.env.API_HOST;
    if (process.env.DEV) {
      apiHost = process.env.DEV_HOST;
    }

    const tokenInfo = {
      tokenType: LocalStorage.getItem("smartTokenType"),
      accessToken: LocalStorage.getItem("smartAccessToken"),
      refreshToken: LocalStorage.getItem("smartRefreshToken"),
    };
    const responseToken = await fetch(
      `${apiHost}/sms/get-refresh-token-bearer?auth=${process.env.AUTH_KEY}&accessToken=${tokenInfo.accessToken}&refreshToken=${tokenInfo.refreshToken}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then((response) => response.json());

    if (responseToken.name === "Error") {
      return responseToken;
    } else {
      LocalStorage.set("smartAccessToken", responseToken.accessToken);
      return responseToken.accessToken;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function sendTextMessage(context, message) {
  const tokenInfo = {
    tokenType: LocalStorage.getItem("smartTokenType"),
    accessToken: LocalStorage.getItem("smartAccessToken"),
    refreshToken: LocalStorage.getItem("smartRefreshToken"),
  };
  try {
    let apiHost = process.env.API_HOST;
    if (process.env.DEV) {
      apiHost = process.env.DEV_HOST;
    }

    const responseToken = await fetch(
      `${apiHost}/sms/send-text-message?auth=${process.env.AUTH_KEY}&accessToken=${tokenInfo.accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      }
    ).then((response) => response.json());

    return {
      message: responseToken,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}

export function jwtDecrypt(token) {
  var base64Url = token.split(".")[1];
  var base64 = decodeURIComponent(
    atob(base64Url)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(base64);
}

export function lastDayOfMonth() {
  // const lastDayOfMonth = () => {
  return new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
  // };
}
