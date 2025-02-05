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
// import { delay } from "../util";
// import { Loading } from "quasar";
export default {
  name: "AutoLoginInEmail",
  data() {
    return {
      authLoading: true,
    };
  }, //end of data life cycle hooks
  created() {
    setTimeout(async () => {
      await this.onLogin();
    }, 3000);
  },
  methods: {
    async onLogin() {
      let tokenEncode = this.$route.params.directLinkHash;
      // const payload = {
      //   directLinkHash: tokenEncode,
      // };

      try {
        const response = await this.$store.dispatch("users/EmailAutoLogin", {
          directLinkHash: tokenEncode,
        });

        if (response.message === "The link has expired.") {
          this.authLoading = false;
          this.$router.push("/");
          this.$q.notify({
            message: "The link has expired.",
            position: "bottom",
            type: "negative",
          });
          return;
        }

        if (response) {
          // await delay(2000);
          this.authLoading = false;
          this.$router.push("/students/ledger");
        } else {
          setTimeout(async () => {
            this.$q.notify({
              message: "The link has expired.",
              position: "bottom",
              type: "negative",
            });
            this.authLoading = false;
            this.$router.push("/");
          }, 3000);
        }
      } catch (error) {
        console.error("Login error:", error); // Debugging
        this.$q.notify({
          message: "An error occurred during authentication.",
          position: "bottom",
          type: "negative",
        });
        this.authLoading = false;
        this.$router.push("/");
      }

      // await delay(2000);
    }, //END onLogin METHOD
  },
};
</script>

<style lang="scss" scoped></style>
