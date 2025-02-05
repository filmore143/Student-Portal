<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <!-- <div style="font-size: 30vh">404</div> -->

      <div class="text-h2" style="opacity: 0.4">
        Oops. You don't have access here... you need to settle your balance to
        view your grades
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DontHaveAccess",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
