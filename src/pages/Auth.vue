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
import { useQuasar, QSpinnerFacebook } from "quasar";
import { onBeforeUnmount } from "vue";
export default {
  name: "AuthPage",
  data() {
    const $q = useQuasar();
    let timer;

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer);
        $q.loading.hide();
      }
    });
    return {
      studentno: "",
      validateClearanceIfExist: "",
      authLoading: false,
    };
  },
  created() {
    this.authLoading = true;
    let studentbase64 = this.$route.params.studentno;
    this.studentno = atob(studentbase64);

    this.onLogin();
  },
  methods: {
    async onLogin() {
      const payload = {
        studentno: this.studentno,
      };
      const response = await this.$store.dispatch("users/AuthPass", payload);

      if (response) {
        // // hiding in 3s
        this.timer = setTimeout(() => {
          this.$q.loading.hide();
          this.timer = void 0;
          this.$router.push("/students");
        }, 3000);
      } else {
        this.$q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: "yellow",
          spinnerSize: 140,
          backgroundColor: "white",
          message: "Your are not authorized in this site",
          messageColor: "black",
        });

        // hiding in 2s
        this.timer = setTimeout(() => {
          this.$q.loading.hide();
          this.timer = void 0;
          // window.location.href = "https://www.uerm.edu.ph/apps/portal/student";
          this.$router.push("/");
        }, 2000);
      }
    }, //END onLogin METHOD
  }, //END OF METHOD HOOKS
};
</script>

<style lang="scss" scoped></style>
