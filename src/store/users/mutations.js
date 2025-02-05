import { LocalStorage } from "quasar";

export function userLogin(state, data) {
  state.userAccount = data;
}

// export function studentPicture(state, data) {
//   LocalStorage.set("picture", data);
//   state.studentPicture = data;
// }

export function messages(state, data) {
  state.messages = data;
}

export function forgotpassword(state, data) {
  state.forgotpassword = data;
}
