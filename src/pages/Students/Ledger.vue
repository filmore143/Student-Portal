<template>
  <div class="row">
    <div class="col-12 col-md q-ml-md q-mb-xl">
      <div class="fit flex flex-center" v-if="loading">
        <q-spinner-hourglass color="primary" size="150px" />
      </div>
      <template v-else>
        <template v-if="this.ledgerData == 0">
          <q-card class="text-primary q-pa-xl">
            <q-card-section
              class="text-h4 text-weight-bold text-uppercase text-center"
            >
              No Ledger available
            </q-card-section>
          </q-card>
        </template>
        <div v-else>
          <!-- <div class="text-weight-bold q-mb-md">
            Records and information issued by Accounting Department shall be
            final and official. Please coordinate with our Accounting Department
            at 715-8162 or 715-0861 loc. 339 before payment
          </div> -->

          <!-- <q-card
            class="col-12 bg-yellow-8 text-black text-weight-bold balances q-mb-md"
            style="cursor: pointer; transition: transform 0.2s"
            clickable
            @click="openPaymentDetails()"
          >
            <q-card-section> OUTSTANDING BALANCE </q-card-section>
            <q-card-section class="row justify-end text-h5">
              {{ outstandingBalance() }}
            </q-card-section>
            <q-tooltip
              class="bg-primary text-yellow-8 text-body2"
              anchor="top middle"
              self="bottom middle"
            >
              Click to view payment details
            </q-tooltip>
          </q-card> -->

          <q-markup-table class="my-sticky-header-table">
            <thead class="bg-primary">
              <tr class="text-uppercase">
                <th class="text-white">School Year</th>
                <th class="text-white">Semester</th>
                <th class="text-white">Transaction Date</th>
                <th class="text-white">Particular</th>
                <th class="text-white">Reference</th>
                <th class="text-white">Debit</th>
                <th class="text-white">Credit</th>
                <th class="text-white">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ledger, i) in ledgerData" :key="i">
                <td class="text-center">{{ ledger.sY }}</td>
                <td class="text-center">{{ ledger.semster }}</td>
                <td class="text-center">{{ ledger.dateTrans }}</td>
                <td class="text-center">{{ ledger.item }}</td>
                <td class="text-center">{{ ledger.reference }}</td>
                <td class="text-right">
                  {{ formatLedgerCurrency(ledger.debit) }}
                </td>
                <td class="text-right">
                  {{ formatLedgerCurrency(ledger.credit) }}
                </td>
                <td class="text-right">
                  {{
                    formatLedgerCurrency(
                      (this.remainingBalance = ledger.balance)
                    )
                  }}
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </template>
    </div>

    <div class="col-12 col-md-3 q-ml-md">
      <q-card>
        <q-card-section>
          <q-card
            class="col-12 bg-yellow-8 text-black text-weight-bold balances"
          >
            <q-card-section> OUTSTANDING BALANCE </q-card-section>
            <q-card-section class="row justify-end text-h5">
              {{ outstandingBalance() }}
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-card-section>
          <q-btn
            color="green-8"
            icon="payments"
            label="PAYMENT ORDERS"
            class="payment-fixed-width full-width"
            @click="paymentOrderPrompt = true"
          />
        </q-card-section>

        <q-card class="bg-blue-grey-2 q-ma-md" v-if="schedule.length !== 0">
          <q-card-section>
            <q-card-section class="text-center bg-primary text-white">
              PAYMENT SCHEDULE
            </q-card-section>
            <q-card-section>
              <q-markup-table>
                <thead class="bg-yellow-8 text-black">
                  <tr class="text-uppercase">
                    <th>SCHEDULE</th>
                    <th class="text-right">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(sched, i) in schedule" :key="i">
                    <td class="text-center">{{ sched.month }}</td>
                    <td class="text-right">
                      {{ formatCurrency(sched.sCHED_TOTAL) }}
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-card-section>
          </q-card-section>
        </q-card>
        <q-card-section>
          Now Available, <b>CREDIT CARD</b> payment option for tuition fees.
          <div>
            <div class="row q-mt-md text-primary text-weight-bold">
              INSTRUCTION:
            </div>
            <ol type="1">
              <li>Click <b>PAYMENT ORDER</b> button</li>
              <li>
                In the <b>NEW PAYMENT ORDER</b> box, enter the amount to pay
              </li>
              <li>
                Click the <b>SAVE PAYMENT ORDER</b> to create Transaction ID.
              </li>
              <li>Click <b>Proceed to Payment Portal.</b></li>
            </ol>
            <div class="row text-primary text-weight-bold">
              RAMPAY PORTAL link:
              <a href="https://uerm.edu.ph/apps/rampay/">
                htts://bit.ly/3AF97vi</a
              >
            </div>

            <router-link to="/students/transactions/payment-orders">
              <q-btn
                label="Payment Order History"
                color="primary"
                class="q-mt-md full-width text-white"
              />
            </router-link>

            <q-btn
              label="Other Payment Option"
              color="white"
              text-color="primary"
              class="q-mt-md text-weight-bold full-width"
              @click="openPaymentOption()"
            />

            <q-btn
              label="VIEW OR"
              color="yellow-8"
              text-color="black"
              class="q-mt-md full-width"
              @click="openStudentOR()"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <q-dialog v-model="paymentOption" full-height full-width maximized>
    <q-card class="fit">
      <q-card-section class="bg-primary text-white">
        <div class="row justify-between items-center">
          <span class="text-body1 text-uppercase"> OTHER PAYMENT OPTION </span>
          <span>
            <q-btn icon="fa fa-times" color="red" v-close-popup></q-btn>
          </span>
        </div>
      </q-card-section>
      <div
        v-if="!paymentLoading"
        class="row justify-center items-center bg-blue-4"
      >
        <q-card-section
          class="q-pa-none"
          style="height: 92.4vh"
          v-if="paymentOption"
        >
          <img src="../../assets//payment.jpeg" style="height: 92.4vh" />
        </q-card-section>
      </div>
      <q-inner-loading :showing="paymentLoading">
        <q-spinner-puff size="100px" color="primary" />
        <span class="q-pt-md text-overline">FETCHING DATA ...</span>
      </q-inner-loading>
    </q-card>
  </q-dialog>

  <q-dialog v-model="paymentDetailsDialog" full-width>
    <q-card class="fit">
      <q-card-section class="bg-primary text-white text-weight-bold">
        <div class="row justify-between items-center">
          <span class="text-body1 text-uppercase"> PAYMENT DETAILS </span>
          <span>
            <q-btn icon="fa fa-times" color="red" v-close-popup></q-btn>
          </span>
        </div>
      </q-card-section>
      <div v-if="!paymentDetailsLoading">
        <q-card-section class="full-width q-pa-none">
          <div class="row q-ma-xl">
            <div class="col-12 col-md-8">
              <q-markup-table>
                <thead class="bg-yellow-8 text-black">
                  <tr class="text-uppercase">
                    <th>SCHEDULE</th>
                    <th class="text-right">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(sched, i) in schedule" :key="i">
                    <td class="text-center">{{ sched.month }}</td>
                    <td class="text-right">
                      {{ formatCurrency(sched.sCHED_TOTAL) }}
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>

            <div class="col-12 col-md-2 q-ml-md">
              Now Available, <b>CREDIT CARD</b> payment option for tuition fees.
              <div>
                <div class="row q-mt-md text-primary text-weight-bold">
                  INSTRUCTION:
                </div>
                <ol type="1">
                  <li>Click <b>PAYMENT ORDER</b> button</li>
                  <li>
                    In the <b>NEW PAYMENT ORDER</b> box, enter the amount to pay
                  </li>
                  <li>
                    Click the <b>SAVE PAYMENT ORDER</b> to create Transaction
                    ID.
                  </li>
                  <li>Click <b>Proceed to Payment Portal.</b></li>
                </ol>
                <div class="row text-primary text-weight-bold">
                  RAMPAY PORTAL link:
                  <a href="https://uerm.edu.ph/apps/rampay/">
                    https://bit.ly/3AF97vi</a
                  >
                </div>

                <router-link to="/students/transactions/payment-orders">
                  <q-btn
                    label="Payment Order History"
                    color="primary"
                    class="q-mt-md full-width text-white"
                  />
                </router-link>

                <q-btn
                  label="Other Payment Option"
                  color="white"
                  text-color="primary"
                  class="q-mt-md text-weight-bold full-width"
                  @click="openPaymentOption()"
                />

                <q-btn
                  label="VIEW OR"
                  color="yellow-8"
                  text-color="black"
                  class="q-mt-md full-width"
                  @click="openStudentOR()"
                />
              </div>
            </div>
          </div>
        </q-card-section>
        <!-- <q-card-section>
          Now Available, <b>CREDIT CARD</b> payment option for tuition fees.
          <div>
            <div class="row q-mt-md text-primary text-weight-bold">
              INSTRUCTION:
            </div>
            <ol type="1">
              <li>Click <b>PAYMENT ORDER</b> button</li>
              <li>
                In the <b>NEW PAYMENT ORDER</b> box, enter the amount to pay
              </li>
              <li>
                Click the <b>SAVE PAYMENT ORDER</b> to create Transaction ID.
              </li>
              <li>Click <b>Proceed to Payment Portal.</b></li>
            </ol>
            <div class="row text-primary text-weight-bold">
              RAMPAY PORTAL link:
              <a href="https://uerm.edu.ph/apps/rampay/">
                https://bit.ly/3AF97vi</a
              >
            </div>
          </div>
        </q-card-section> -->
      </div>
      <div v-else>
        <q-card-section></q-card-section>
      </div>
      <q-inner-loading :showing="paymentDetailsLoading">
        <q-spinner-puff size="100px" color="primary" />
        <span class="q-pt-md text-overline">FETCHING DATA ...</span>
      </q-inner-loading>
    </q-card>
  </q-dialog>

  <!--DIALOG FOR NEW PAYMENT ORDER-->
  <q-dialog
    v-model="paymentOrderPrompt"
    persistent
    transition-show="slide-down"
    transition-duration="500"
  >
    <q-card style="min-width: 350px">
      <q-card-section class="bg-green-9 text-white">
        <div class="text-h6">NEW PAYMENT ORDER</div>
      </q-card-section>

      <q-card-section class="q-pt-md">
        <q-form
          @submit.prevent="savePaymentOrder()"
          method="posts"
          class="q-gutter-md"
        >
          <q-input
            type="text"
            square
            outlined
            v-model="paymentOrder"
            label="Please enter amount to pay"
            class="q-mt-md"
            color="green-9"
            :rules="[validateNumber]"
            required
          />
          <q-card class="relative-position card-example" flat>
            <q-card-section>
              <transition
                appear
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
              >
                <div
                  v-show="showSimulatedReturnData"
                  class="text-green-9 text-weight-bold"
                >
                  <!-- <div v-for="order in this.savePaymentOrderData" :key="order"> -->
                  YOUR TRANSACTION ID:
                  {{ this.savePaymentOrderData.transactionid }} <br />
                  <br />
                  <!-- </div> -->
                  <div class="text-black">
                    <b>NOTE: </b> Click
                    <a
                      :href="`https://uerm.edu.ph/apps/rampay/payments/index/${this.savePaymentOrderData.transactionid}`"
                      >here</a
                    >
                    to Proceed to Payment Portal
                  </div>
                </div>
              </transition>
            </q-card-section>

            <q-inner-loading :showing="visible">
              <q-spinner-gears size="80px" color="green-9" />
            </q-inner-loading>
          </q-card>
          <div class="row justify-end">
            <q-btn
              flat
              label="Close"
              :showing="(showSimulatedReturnData = false)"
              v-close-popup
            />
            <q-btn type="submit" color="green-9" label="Save Payment Order" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { LocalStorage } from "quasar";
import { jwtDecrypt } from "src/shared/jwtHelper";
// import { ref } from "vue";
import { mapGetters } from "vuex";
export default {
  name: "LedgerPage",
  data() {
    var studentData = LocalStorage.getItem("access_token");
    if (studentData != null) {
      var studentDecryptData = jwtDecrypt(studentData);
    }
    const ledgerData = [];
    let remainingBalance;
    const visible = false;
    const showSimulatedReturnData = false;
    return {
      studentDecryptData,
      ledgerData,
      paymentOrderPrompt: false,
      paymentDetailsDialog: false,
      paymentDetailsLoading: false,
      paymentOrder: "",
      remainingBalance,
      visible,
      loading: true, // Initial loading state,
      showSimulatedReturnData,
      savePaymentOrderData: "",
      paymentOption: false,
      paymentLoading: false,
      isValid: true,
      schedule: [],
    };
  }, //END OF DATA LIFE CYCLE HOOKSP
  methods: {
    async getLedger() {
      const response = await this.$store.dispatch("ledger/getLedger");
      if (
        response.error === "Access token is not whitelisted." ||
        response.error === "Access token is required." ||
        response.error === "Access token is invalid or expired."
      ) {
        localStorage.removeItem("access_token");
        this.$router.push("/");
      } else {
        setTimeout(() => {
          this.ledgerData = response;
          this.loading = false;
        }, 1000);
      }
    }, //END OF getLedger METHOD

    openPaymentDetails() {
      this.paymentDetailsDialog = true;
      this.paymentDetailsLoading = true;
      setTimeout(() => {
        this.paymentDetailsLoading = false;
      }, 3000);
    },

    async paymentSchedule() {
      const response = await this.$store.dispatch("payments/paymentSchedule");

      this.schedule = response;
    },

    async savePaymentOrder() {
      const payload = {
        amount: this.paymentOrder,
      };
      const response = await this.$store.dispatch(
        "payments/savePaymentOrder",
        payload
      );

      if (response !== 0) {
        this.getPaymentOrderHistory();
      }
    },

    formatDate(dateString) {
      // Create a new Date object from the date string
      const date = new Date(dateString);

      // Format the date as 'YYYY-MM-DD'
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    },
    formatLedgerCurrency(amount) {
      return `${Number(amount)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    },
    formatCurrency(amount) {
      return `₱${Number(amount)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    },
    async getPaymentOrderHistory() {
      const payload = {
        studentno: this.student.sn,
      };
      const response = await this.$store.dispatch(
        "payments/getPaymentOrderHistory",
        payload
      );

      this.visible = true;

      setTimeout(() => {
        this.visible = false;
        this.showSimulatedReturnData = true;
        this.savePaymentOrderData = response[0];
      }, 2000);
    }, //END OF getPaymentOrderHistory METHODS
    openPaymentOption() {
      this.paymentOption = true;
      this.paymentLoading = true;

      setTimeout(() => {
        this.paymentLoading = false;
      }, 1000);
    }, //end of paymentOption
    openStudentOR() {
      this.$router.push("/students/student-or");
    },
    // formatNumber(number) {
    //   return number.toLocaleString("en-US", {
    //     minimumFractionDigits: 2,
    //     maximumFractionDigits: 2,
    //   });
    // },
    outstandingBalance() {
      if (
        this.remainingBalance === undefined ||
        this.remainingBalance === null
      ) {
        return "0.00"; // or any default value you prefer
      }
      return this.remainingBalance.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    validateNumber(value) {
      const pattern = /^(\d+|\d+\.\d*|\.\d+)$/;
      if (!pattern.test(value)) {
        return "Please enter a valid number.";
      }
      return true; // Return true to indicate validation success
    },
  }, //END OF METHODS LIFE CYCLE HOOKS
  created() {
    this.getLedger();
    this.paymentSchedule();
  }, //END OF CREATED LIFE CYCLE HOOKS
  computed: {
    ...mapGetters({
      student: ["users/userAccount"],
    }),
  },
};
</script>

<style scoped>
/* .my-sticky-header-table { */
/* height or max-height is important */
/* height: 350px;
} */

/* thead tr:first-child th {
  background-color: #0e429e;
  color: #fdfdfb;
} */

.hover-card {
  transition: background-color 0.3s, color 0.3s; /* Smooth transition */
}

.hover-card:hover {
  background-color: #090908; /* Change to your desired hover background color */
  color: #ffffff; /* Change to your desired hover text color */
}

thead tr th {
  position: sticky;
  z-index: 1;
}

thead tr:first-child th {
  top: 0;
}

tbody {
  /* height of all previous header rows */
  scroll-margin-top: 48px;
}

.payment-fixed-width {
  width: auto;
}

.my-sticky-header-table td {
  border: solid 1px rgb(219, 219, 219);
  white-space: normal !important;
  word-wrap: break-word !important;
}
</style>
