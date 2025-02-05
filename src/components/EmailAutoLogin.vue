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
import { delay } from "../util";
export default {
  name: "AutoLoginInEmail",
  data() {
    return {
      directLinkHash: null,
      authLoading: true,
    };
  }, //end of data life cycle hooks
  async created() {
    this.onLogin();
    await delay(12000);
  },
  methods: {
    async onLogin() {
      this.authLoading = true;
      const tokenEncode = this.$route.params.directLinkHash;
      const payload = {
        directLinkHash: tokenEncode,
      };
      const response = this.$store.dispatch("users/EmailAutoLogin", payload);

      if (response) {
        this.$router.push("/");
        this.authLoading = false;
        await delay(12000);
      }

      //  else if (response) {
      this.authLoading = false;
      this.$router.push("/students/ledger");
      // }

      await delay(12000);
    }, //END onLogin METHOD
  },
};
</script>

<style lang="scss" scoped></style>
