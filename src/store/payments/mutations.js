// import { LocalStorage } from "quasar";
// import { jwtDecrypt } from "src/shared/jwtHelper";

export function uploadPayment(state, data) {
  state.uploadPayment = data;
}

export function getProofOfPayment(state, data) {
  state.getProofOfPayment = data;
}

export function savePaymentOrder(state, data) {
  state.savePaymentOrder = data;
}

export function getPaymentOrderHistory(state, data) {
  state.getPaymentOrderHistory = data;
}

export function getPaymentOrderList(state, data) {
  state.getPaymentOrderList = data;
}

export function getOnlineRegistration(state, data) {
  state.getOnlineRegistration = data;
}

export function getPaymentOrderDetails(state, data) {
  state.getPaymentOrderDetails = data;
}
