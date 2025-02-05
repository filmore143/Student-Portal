<template>
  <div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        color="yellow-8"
        icon="arrow_upward"
        ref="appButton"
        class="app-button text-black"
        @click="scrollToTop"
      >
        <q-tooltip class="bg-amber text-black shadow-4" :offset="[10, 10]">
          CLICK TO GO TO TOP
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
// import { onMounted, ref, onBeforeMount } from "vue";

import { ref } from "vue";
export default {
  name: "UpButtonPage",
  data() {
    const appButton = ref();
    return { appButton };
  }, //END OF DATA LIFE CYCLE HOOKS
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 20, behavior: "smooth" });
    },
  }, //END OF METHODS LIFE CYCLE HOOKS
};
</script>
