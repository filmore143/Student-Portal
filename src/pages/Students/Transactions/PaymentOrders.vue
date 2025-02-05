<template>
  <div class="fit flex flex-center" v-if="loading">
    <q-spinner-hourglass color="primary" size="150px" />
  </div>
  <div class="row justify-center" v-else>
    <q-markup-table class="my-sticky-header-table">
      <thead class="text-primary">
        <tr>
          <th class="text-center"></th>
          <th class="text-center">TRANSACTiON ID</th>
          <th class="text-center">AMOUNT</th>
          <th class="text-center">CURRENCY</th>
          <th class="text-center">TRANSACTION DATE</th>
          <th class="text-center">VALID UNTIL</th>
          <th class="text-center">PAYMENT FOR</th>
          <th class="text-center">STATUS</th>
          <!-- <th class="text-center">REMARKS</th> -->
        </tr>
      </thead>
      <tbody>
        <template v-if="paymentOrderHistory != 0">
          <tr v-for="(payment, i) in paymentOrderHistory" :key="i">
            <td class="text-left">
              <!--PAY AND CANCEL BUTTON-->

              <q-btn-group
                push
                v-if="payment.decision == null && payment.status == ''"
              >
                <a
                  :href="`https://uerm.edu.ph/apps/rampay/payments/index/${payment.transactionid}`"
                >
                  <q-btn
                    color="green-6"
                    outline
                    label="Pay"
                    style="width: 90px"
                  />
                </a>
                <q-btn
                  color="red-6"
                  outline
                  label="Cancel"
                  style="width: 90px"
                  @click="cancelOrderList(payment.transactionid)"
                />
              </q-btn-group>

              <!-- <router-link
                :to="paymentOrderDetails(payment.transaction_UUID)"
                target="_blank"
                v-else
              > -->
              <!--PRINT BUTTON-->
              <q-btn
                color="blue-6"
                label="Print"
                icon="print"
                style="width: 178px"
                @click="paymentOrderDetails(payment.transaction_UUID)"
                v-else
              />
              <!-- </router-link> -->
            </td>
            <td class="text-center">
              {{ payment.transactionid }}
            </td>
            <td class="text-right">
              {{ formatNumber(payment.amount) }}
            </td>
            <td class="text-center">
              {{ payment.currency }}
            </td>
            <td class="text-center">
              {{ formatDate(payment.transdate) }}
            </td>
            <td class="text-center">{{ isExpired(payment.transdate) }}</td>
            <td class="text-left">{{ payment.paymentFor }}</td>
            <td class="text-center">
              {{ payment.decision }}
            </td>
            <!-- <td class="text-center">{{ payment.message }}</td> -->
          </tr>
        </template>
        <template v-else>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="row justify-center text-h4 q-pl-xl q-my-xl">
              NO PAYMENT FOUND
            </td>
            <td></td>
            <td></td>
          </tr>
        </template>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { LocalStorage } from "quasar";
export default {
  name: "PaymentOrderHistory",
  data() {
    var paymentOrderHistory = "";
    return {
      paymentOrderHistory,
      loading: true,
    };
  }, //END OF DATA LIFE CYCLE HOOKS
  methods: {
    async getPaymentOrderList() {
      const response = await this.$store.dispatch(
        "payments/getPaymentOrderList"
      );
      setTimeout(() => {
        this.loading = false;
        this.paymentOrderHistory = response;
      }, 1000);
    }, ///END OF getPaymentOrderList METHOD

    async cancelOrderList(transid) {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Are you sure you would like to cancel your order?",
          ok: {
            push: true,
            color: "primary",
            label: "Continue",
          },
          cancel: {
            flat: true,
            color: "primary",
          },
          persistent: true,
        })
        .onOk(async () => {
          this.loading = true;
          const transactid = transid;
          const payload = {
            transactid,
          };

          const response = await this.$store.dispatch(
            "payments/cancelPaymentOrder",
            payload
          );
          if (response.length !== 0) {
            setTimeout(() => {
              this.loading = false;
              this.$q.notify({
                message: "Successfully cancelled",
                position: "top",
                type: "positive",
              });
              this.getPaymentOrderList();
            }, 1000);
          } else if (
            response.error === "Access token is not whitelisted." ||
            response.error === "Access token is required." ||
            response.error === "Access token is invalid or expired."
          ) {
            setTimeout(() => {
              this.loading = false;
              // this.$q.notify({
              //   message: "Session Expired!",
              //   position: "top",
              //   type: "negative",
              // });
              localStorage.removeItem("access_token");
              this.$router.push("/");
            }, 1000);
          } else {
            setTimeout(() => {
              this.loading = false;
              this.$q.notify({
                message: "Something went wrong!",
                position: "top",
                type: "negative",
              });
            }, 1000);
          }
        });
    }, //end of cancel Order
    formatDate(dateString) {
      const date = new Date(dateString);

      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    }, //END OF formateDate METHOD
    isExpired(dateString) {
      const now = new Date(dateString);
      var expireDate;
      expireDate = new Date(now.setDate(now.getDate() + 30));
      return (
        expireDate.toLocaleDateString() + " " + expireDate.toLocaleTimeString()
      );
    },
    async paymentOrderDetails(transactUID) {
      this.$router.push(`/paymentorderdetails/${transactUID}`);
    }, //END OF paymentOrderDetails METHOD

    formatNumber(number) {
      return number.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
  }, ///END OF METHODS LIFE CYCLE HOOKS
  created() {
    this.getPaymentOrderList();
  }, //END OF CREATED HOOK
};
</script>

<style lang="scss" scoped>
thead tr:first-child th {
  background-color: #0e4296;
  color: #ffffff;
}

thead tr th {
  position: sticky;
  z-index: 1;
}

thead tr:first-child th {
  top: 0;
}

tbody {
  scroll-margin-top: 48px;
}

.my-sticky-header-table {
  /* height or max-height is important */
  height: 100%;
  width: auto;
}
// .my-sticky-header-table td {
//   white-space: normal !important;
//   word-wrap: break-word !important;
// }
</style>
