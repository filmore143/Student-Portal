import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

import GoogleIdentity from "vue-google-identity";

app.use(GoogleIdentity, {
  clientId:
    "694828115640-mh15c4al9hnns37bs55e7481apqtdq13.apps.googleusercontent.com",
});

app.mount("#app");
