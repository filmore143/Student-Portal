<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container style="height: 100vh">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Login_Layout",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      studentInfo: "users/userAccount",
    }),
  },
  mounted() {
    if (Object.keys(this.studentInfo).length > 0) {
      this.$router.push("/students");
    }
  },
};
</script>

<style lang="scss" scoped></style>
