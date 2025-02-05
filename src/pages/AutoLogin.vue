<template>
  <div class="row items-center justify-center full-height full-width">
    <div class="col-6">
      <q-card v-if="authLoading">
        <q-card-section align="center">
          <q-spinner-facebook color="primary" size="15em" />
        </q-card-section>
        <q-card-section class="text-overline" align="center">
          AUTHENTICATING ...
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { QSpinnerFacebook } from "quasar";
export default {
  name: "AutoLogin",
  data() {
    return {
      studentNo: "",
      studentPassword: "",
      authLoading: false,
    };
  }, //END OF DATA LIFE CYCLE HOOKS
  mounted() {
    // setTimeout(() => {
    this.authLoading = true;
    setTimeout(async () => {
      const studentno = this.$route.params.studentno;
      const studentpass = this.$route.params.studentpass;
      this.studentNo = atob(studentno);
      this.studentPassword = atob(studentpass);
      await this.onLogin();
    }, 3000);
  },
  methods: {
    async onLogin() {
      const payload = {
        studentno: this.studentNo,
        studentpass: this.studentPassword,
      };
      const response = await this.$store.dispatch("users/AutoLogin", payload);
      if (response) {
        this.$router.push("/students");
      } else {
        this.$q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: "yellow",
          spinnerSize: 140,
          backgroundColor: "white",
          message: "Your are not authorized in this site",
          messageColor: "black",
        });
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      }
    }, //END onLogin METHOD
  }, //END OF METHOD HOOKS
};
</script>

<style lang="scss" scoped></style>
