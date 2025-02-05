// export function jwtDecrypt(token) {
//   var base64Url = token.split(".")[1];
//   var base64 = decodeURIComponent(
//     atob(base64Url)
//       .split("")
//       .map((c) => {
//         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//       })
//       .join("")
//   );
//   return JSON.parse(base64);
// }
export async function jwtDecrypt(context, token) {
  var base64Url = token.split(".")[1];

  // Palitan ang mga character para sa base64url
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  // Idagdag ang padding kung kinakailangan
  while (base64.length % 4) {
    base64 += "=";
  }

  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
