<template>
  <div>
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
      done-color="green-7"
      :contracted="$q.platform.is.mobile"
    >
      <q-step :name="1" title="REGISTER CLEARANCE" prefix="1" :done="step > 1">
        <Register @nextStep="triggerNextStep()" />
      </q-step>

      <q-step :name="2" title="CLEARANCE TRACKING" prefix="2" :done="step > 2">
        <ClearanceTracking />
      </q-step>

      <q-step :name="3" title="APPLICATION REQUEST" prefix="3" :done="step > 3">
        <ApplicationRequest @documentRequestSubmitted="handleDocumentRequest" />
      </q-step>

      <q-step :name="4" title="SUMMARY ORDER" prefix="4" :done="step > 4">
        <Summary :order="order" @nextStep="triggerNextStep" />
      </q-step>

      <q-step
        :name="5"
        title="UPLOAD PROOF OF PAYMENT"
        prefix="5"
        :done="step > 5"
      >
        <ProofOfPayment @nextStep="triggerNextStep" />
      </q-step>

      <q-step :name="6" title="STATUS" prefix="6">
        <div class="text-center text-primary text-weight-bold text-h6 q-my-xl">
          WE ARE NOW READY TO PROCESS YOUR DOCUMENT REQUEST. <br />
          PLEASE ALWAYS CHECK YOUR UERM STUDENT PORTAL FOR THE STATUS OF YOUR
          REQUEST.
        </div>
      </q-step>
    </q-stepper>

    <!-- <div>
      <q-btn @click="triggerNextStep" label="next" />
    </div> -->
  </div>
</template>

<script>
import ClearanceTracking from "../components/Clearance/ClearanceTracking.vue";
import Register from "../components/Clearance/Register.vue";
import ApplicationRequest from "../components/Clearance/ApplicationRequest";
import Summary from "../components/Clearance/Summary.vue";
import ProofOfPayment from "../components/Clearance/ProofOfPayment.vue";

import { LocalStorage } from "quasar";
export default {
  components: {
    ClearanceTracking,
    Register,
    ApplicationRequest,
    Summary,
    ProofOfPayment,
  },
  data() {
    return {
      step: 1,
      order: null,
    };
  },
  methods: {
    triggerNextStep() {
      this.step += 1;
    },
    handleDocumentRequest(order) {
      this.order = order;
      this.step += 1;
    },
    async checkExistingClearance() {
      const result = await this.$store.dispatch(
        "clearance/checkIfClearanceExist"
      );
      // this.validateClearanceIfExist = result[0].status;

      if (
        LocalStorage.getItem("access_token") &&
        result[0].status === undefined
      ) {
        this.step = 1;
      } else if (
        LocalStorage.getItem("access_token") &&
        result[0].status === 1
      ) {
        this.step = 2;
      } else if (
        LocalStorage.getItem("access_token") &&
        result[0].status === 2
      ) {
        this.step = 3;
      } else if (
        LocalStorage.getItem("access_token") &&
        result[0].status === 3
      ) {
        this.step = 5;
      } else if (
        LocalStorage.getItem("access_token") &&
        result[0].status === 4
      ) {
        this.step = 6;
      } else {
        LocalStorage.removeItem("access_token");
        // this.$q.notify({
        //   message: "Session Expired!",
        //   position: "bottom",
        //   type: "negative",
        // });
        this.$router.push("/");
        // window.location.href = "https://uerm.edu.ph/apps/portal/login/";
      }
    },
  }, //END OF METHOD
  created() {
    this.checkExistingClearance();
  },
};
</script>
<style scoped>
.q-stepper__header {
  font-size: 164px; /* Set the font size to 24px */
  height: 164px;
}

.focus-helper {
  font-size: 164px; /* Set the font size to 24px */
  height: 164px;
}
</style>
