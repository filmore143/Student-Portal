<template>
  <div class="body">
    <div class="wrapper">
      <q-img class="uermlogo" src="../assets/uerm-logo.png" alt="UERM logo" />

      <q-form @submit="onSubmit" method="post" class="q-gutter-md">
        <div class="text-h5 text-weight-bold text-primary text-center">
          STUDENT PORTAL
        </div>

        <q-input
          v-model.trim="posts.studentno"
          label="STUDENT NUMBER"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Student Number is required!',
          ]"
        >
          <template v-slot:append>
            <q-icon name="person" class="cursor-pointer" />
          </template>
        </q-input>

        <q-input
          v-model.trim="posts.password"
          label="PASSWORD"
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Password is required!']"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <vue-recaptcha
          v-show="showRecaptcha"
          sitekey="6LdSHowfAAAAAOXR-5MttqSHXxXn2weyiKpS5vg_"
          size="normal"
          theme="light"
          @verify="recaptchaVerified"
          @expire="recaptchaExpired"
          @fail="recaptchaFailed"
          @error="recaptchaError"
          ref="vueRecaptcha"
          v-model="captchaResponse"
        ></vue-recaptcha>
        <div class="text-center">
          <a
            href="https://uerm.edu.ph/apps/portal/login/forgotpassword"
            target="_blank"
            >Forgot Password?</a
          >
          <!-- <q-btn
            label="Forgot Password"
            @click="forgotPassword"
            text-color="primary"
            flat
          /> -->
        </div>
        <div class="">
          <q-btn
            class="btn"
            data-callback="onSubmit"
            label="LOGIN"
            type="submit"
            color="primary"
            :disable="disableButton"
          />
        </div>

        <p id="or">OR</p>
        <!-- <div id="buttonDiv"></div> -->
        <div id="buttonDiv"></div>
      </q-form>
    </div>
  </div>
</template>

<script>
import QSpinnerFacebook from "quasar/src/components/spinner/QSpinnerFacebook.js";
import vueRecaptcha from "vue3-recaptcha2";
import { LocalStorage } from "quasar";

import { jwtDecrypt } from "../helpers";

export default {
  name: "LoginPage",
  components: {
    vueRecaptcha,
  },
  data() {
    let timer;
    return {
      posts: {
        studentno: null,
        password: null,
      },
      login: [],
      isPwd: true, //eto para kapag yung user gusto nya makita yung tinype nyang password
      showRecaptcha: true,
      loadingTimeout: 30000, // 30 seconds
      captchaResponse: null,
      disableButton: true,
      timer,
      loading: true,
    };
  },
  methods: {
    async onSubmit() {
      const response = await this.$store.dispatch(
        "users/loginUsers",
        this.posts
      );

      if (response.error) {
        this.$q.notify({
          message:
            "Invalid Credentials! Please input correct username and password",
          position: "top",
          type: "negative",
        });
      } else if (response.length !== 0 || response.length !== undefined) {
        this.$q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: "primary",
          spinnerSize: 140,
          backgroundColor: "grey",
          message: "WELCOME TO UERM STUDENT PORTAL",
          messageColor: "primary",
        });
        // hiding in 2s
        this.timer = setTimeout(() => {
          this.$q.loading.hide();
          this.timer = void 0;
          this.$router.push("/students");
        }, 2000);
      } else {
        this.$q.notify({
          message:
            "Invalid Credentials! Please input correct username and password",
          position: "top",
          type: "negative",
        });
      }
    }, //end of onSubmit methods
    async recaptchaVerified(response) {
      // const payload = {
      //   token: token,
      // };
      // const response = await this.$store.dispatch("users/recaptcha", payload);
      if (response) {
        this.disableButton = false;
      } else {
        this.disableButton = true;
      }
    },
    recaptchaExpired() {
      this.$refs.vueRecaptcha.reset();
      this.disableButton = true;
    },
    recaptchaFailed() {
      this.disableButton = true;
    },
    recaptchaError(reason) {
      this.disableButton = true;
    }, //END OF recaptchaError

    //THIS IS FOR GOOGLE AUTH
    async loginViaGoogle(student) {
      let firstName = "";
      let lastName = "";
      let email = "";
      let decodedToken = jwtDecrypt(student.credential);

      const userEmail = decodedToken?.email || "";
      const validEmailDomain = "@uerm.edu.ph";

      if (!userEmail.endsWith(validEmailDomain)) {
        this.$q.notify({
          message: "Invalid email domain",
          position: "top",
          type: "negative",
        });
      }

      const getFirstWordInEmail = userEmail.split("@");

      firstName = decodedToken.given_name;
      lastName = decodedToken.family_name;
      email = getFirstWordInEmail[0];
      // email = decodedToken.email;

      const payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
      };

      const response = await this.$store.dispatch(
        "users/loginViaGoogle",
        payload
      );

      if (response) {
        this.$q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: "primary",
          spinnerSize: 140,
          backgroundColor: "warning",
          message: "Welcome to UERM Student Portal",
          messageColor: "primary",
        });
        // hiding in 2s
        this.timer = setTimeout(() => {
          this.$q.loading.hide();
          this.timer = void 0;
          this.$router.push("/students");
        }, 2000);
      }
    },
    initializeGoogleSignIn() {
      google.accounts.id.initialize({
        client_id:
          "629822413811-280f891bie6vmjvddbo5n9ovsjme6u53.apps.googleusercontent.com",
        callback: this.loginViaGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
        theme: "dark",
        size: "large",
        shape: "rectangular",
        width: "311px",
        color: "standard",
      });
    },
    forgotPassword() {
      this.$router.push("/forgot-password");
    },
    // checkForDataChange() {
    //   const accessToken = LocalStorage.getItem("access_token");
    //   if (!accessToken) {
    //     console.log("No access token found");
    //     this.$q.notify({
    //       message: "No access token found",
    //       position: "top",
    //       type: "negative",
    //     });
    //   }
    //   this.$router.push("/");
    // },
  }, //END OF METHOD
  mounted() {
    this.initializeGoogleSignIn();
  }, //END OF MOUNTED
  // watch: {
  //   $route: "checkForDataChange",
  // },
};
</script>

<style lang="scss" scoped>
.body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* background: #1f1f47; */

  background-image: url("../assets/uerm-background.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;

  margin: 0;
  padding-left: 0;
  box-sizing: border-box;
}

.uermlogo {
  width: 120px;
  height: 120px;
  margin-left: 31%;
  margin-top: -90px;
  margin-bottom: 50px;
}

.wrapper {
  position: relative;
  width: 370px;
  height: 650px;
  align-items: center;
  padding: 40px 30px 30px 30px;
  background-color: #ecf0f3;
  border-radius: 15px;
  margin-top: 20px;
}

.wrapper .btn {
  box-shadow: none;
  width: 100%;
  height: 40px;
  background-color: #054266;
  color: #fff;
  // border-radius: 25px;
  letter-spacing: 1.3px;
  margin-top: 12px;
}

.wrapper .btn:hover {
  background-color: #041c47;
}

#or {
  color: #054266;
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
  font-size: 15px;
}
</style>
