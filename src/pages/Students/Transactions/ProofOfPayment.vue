<template>
  <div class="row justify-center">
    <div class="col-12 col-md-4 q-ml-xs q-mb-lg">
      <q-card class="my-card">
        <q-card-section
          class="bg-primary text-weight-bold text-center text-white text-h6"
        >
          UPLOAD PAYMENT
        </q-card-section>
        <q-card-section>
          <q-form
            @submit.prevent="uploadProofOfPayment()"
            method="post"
            class="q-gutter-md"
            enctype="multipart/form-data"
            name="file"
          >
            <q-file
              v-model="file"
              label="Upload payment receipt"
              accept=".jpg, .jpeg, .png"
              hint="Only .jpg, .jpeg, .png, and 5mb are required"
              max-file-size="5000000"
              @rejected="onRejected"
              clearable
              name="file"
              counter
              :counter-label="sizeLabelFile"
              square
              outlined
              class="InputToUpper"
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>

              <template #file="{ file }">
                <q-chip class="full-width q-my-xs" rounded>
                  {{ file.name }}
                </q-chip>
              </template>
            </q-file>

            <q-select
              square
              outlined
              v-model.trim="paymentMethod"
              :options="paymentMethodoOptions"
              label="SELECT PAYMENT METHOD"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Payment Method is required!',
              ]"
            />

            <!-- <q-input
              v-model.trim="paymentMethod"
              label="Enter your payment method"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Payment Method is required!',
              ]"
              square
              outlined
            >
              <template v-slot:append>
                <q-icon name="credit_card" class="cursor-pointer" />
              </template>
            </q-input> -->

            <q-input
              type="number"
              v-model.trim="amount"
              label="Enter amount paid"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Amount is required!',
              ]"
              square
              outlined
              class="InputToUpper"
            >
              <template v-slot:append>
                <q-icon name="payments" class="cursor-pointer" />
              </template>
            </q-input>

            <q-input
              v-model.trim="remarks"
              label="Enter remarks"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Remarks is required!',
              ]"
              square
              outlined
              class="InputToUpper"
            >
              <template v-slot:append>
                <q-icon name="receipt_long" class="cursor-pointer" />
              </template>
            </q-input>

            <q-input
              v-model="date"
              mask="date"
              :rules="[(val) => (val && val.length > 0) || 'Date is required!']"
              label="Transaction date"
              square
              outlined
              class="InputToUpper"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <div class="">
              <q-btn
                class="btn full-width text-white"
                label="Submit"
                type="submit"
                color="primary"
                :loading="progress.loading"
                :percentage="progress.percentage"
              >
                <template v-slot:loading>
                  <q-spinner-gears class="on-left" />
                  Uploading...
                </template>
              </q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 col-md-7 q-ml-md">
      <q-markup-table class="proof-of-payment-header-table text-uppercase">
        <thead class="bg-primary">
          <tr>
            <th class="text-left text-white">Payment Method</th>
            <th class="text-center text-white">Transaction Date</th>
            <th class="text-center text-white">Amount</th>
            <th class="text-left text-white">Uploaded File</th>
            <th class="text-center text-white">View Image</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="proofOfPaymentData != 0">
            <tr
              v-for="(payment, i) in proofOfPaymentData"
              :key="i"
              class="text-capitalize"
            >
              <td class="text-left">{{ payment.paymentMethod }}</td>
              <td class="text-center">{{ payment.transactionDate }}</td>
              <td class="text-right">
                {{ formatNumber(payment.amount) }}
              </td>
              <td class="text-left">{{ payment.uploadedFile }}</td>
              <td class="text-center">
                <q-btn
                  color="yellow-8"
                  text-color="primary"
                  icon="image"
                  @click="viewProofOfPaymentImage(payment.iD)"
                />
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td></td>
              <td></td>
              <td class="row justify-left text-h4 q-ml-xl q-pl-xl q-my-xl">
                NO TRANSACTION FOUND
              </td>
              <td></td>
              <td></td>
            </tr>
          </template>
        </tbody>
      </q-markup-table>

      <q-dialog
        v-model="bools.paymentImageDialog"
        full-height
        full-width
        maximized
      >
        <q-card class="fit">
          <q-card-section class="bg-primary text-white text-weight-bold">
            <div class="row justify-between items-center">
              <span class="text-body1 text-uppercase"> IMAGE UPLOADED </span>
              <span>
                <q-btn icon="fa fa-times" color="red" v-close-popup></q-btn>
              </span>
            </div>
          </q-card-section>

          <q-card-section
            class="full-width q-pa-none flex flex-center"
            style="height: 92.9vh"
          >
            <img
              class="avatar-image"
              :src="'data:image/jpeg;base64,' + paymentImage"
              style="max-width: 100%; max-height: 100%"
            />
          </q-card-section>

          <q-inner-loading :showing="this.bools.paymentImageLoading">
            <q-spinner-puff size="100px" color="primary" />
            <span class="q-pt-md text-overline">FETCHING DATA ...</span>
          </q-inner-loading>
        </q-card>
      </q-dialog>
      <!-- <img
        class="avatar-image"
        :src="'data:image/jpeg;base64,' + paymentImage"
      /> -->
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { LocalStorage } from "quasar";
import { jwtDecrypt } from "src/shared/jwtHelper";
import { mapGetters } from "vuex";
export default {
  name: "TransactionPage",
  created() {
    this.getProofOfPayment();
  }, //END OF MOUNTED LIFE CYCLE HOOKS
  // mounted() {
  //   this.getPicture();
  // },
  data() {
    const studentData = LocalStorage.getItem("access_token");
    if (studentData != null) {
      var studentDecryptData = jwtDecrypt(studentData);
      var studentnumber = studentDecryptData.sn;
    }
    const proofOfPaymentData = [];
    const progress = ref({ loading: false, percentage: 0 });
    const intervals = null;
    return {
      studentnumber,
      studentData,
      date: "",
      file: null,
      paymentMethod: null,
      paymentMethodoOptions: [
        "Credit card payment via RAMPAY",
        "Bank Transfer",
        "Gcash",
      ],
      amount: "",
      remarks: "",
      proofOfPaymentData,
      progress,
      intervals,
      error: false,
      bools: {
        paymentImageLoading: true,
        paymentImageDialog: false,
      },
      paymentImage: "",
    };
  }, //END OF DATA LIFE CYCLE HOOKS
  methods: {
    validateDate(value) {
      // Validation function to check if the date is empty
      this.error = value === null;
      return !this.error;
    },
    sizeLabelFile({ totalSize }) {
      return `size(${totalSize})`;
    },
    async viewProofOfPaymentImage(id) {
      this.bools.paymentImageDialog = true;
      const payload = {
        paymentid: id,
      };

      const response = await this.$store.dispatch(
        "payments/getViewProofOfPayment",
        payload
      );
      setTimeout(() => {
        this.paymentImage = response;
        this.bools.paymentImageLoading = false;
      }, 2000);

      // console.log("PAYLOAD", response);
    },
    async uploadProofOfPayment() {
      const fileData = new FormData();

      fileData.append("file", this.file, this.file.name);
      fileData.append("studentno", this.studentnumber);
      fileData.append("paymentmethod", this.paymentMethod);
      fileData.append("date", this.date);
      fileData.append("amount", this.amount);
      fileData.append("remarks", this.remarks);
      this.progress.loading = true;
      this.progress.percentage = 0;
      try {
        const resultUpload = await this.$store.dispatch(
          "payments/uploadPayment",
          fileData
        );

        if (resultUpload.error) {
          this.progress.loading = true;
          this.progress.percentage = 0;
          this.intervals = setInterval(() => {
            this.progress.percentage += Math.floor(Math.random() * 8 + 10);
            if (this.progress.percentage >= 100) {
              clearInterval(this.intervals);
              this.progress.loading = false;
              this.$q.notify({
                message: "Something went wrong :( ",
                position: "bottom",
                type: "negative",
              });
              this.getProofOfPayment();
            }
          }, 400);
        } else if (resultUpload != 0) {
          this.progress.loading = true;
          this.progress.percentage = 0;
          this.intervals = setInterval(() => {
            this.progress.percentage += Math.floor(Math.random() * 8 + 10);
            if (this.progress.percentage >= 100) {
              clearInterval(this.intervals);
              this.progress.loading = false;
              this.$q.notify({
                message: "Succesfully Uploaded!",
                position: "bottom",
                type: "positive",
              });
              this.getProofOfPayment();
              // this.file = null;
              // this.paymentMethod = null;
              // this.amount = "";
              // this.remarks = "";
            }
          }, 400);
        } else {
          this.progress.loading = true;
          this.progress.percentage = 0;
          this.intervals = setInterval(() => {
            this.progress.percentage += Math.floor(Math.random() * 8 + 10);
            if (this.progress.percentage >= 100) {
              clearInterval(this.intervals);
              this.progress.loading = false;
              this.$q.notify({
                message: "Something went wrong :( ",
                position: "bottom",
                type: "negative",
              });
              this.getProofOfPayment();
            }
          }, 400);
        }
      } catch (error) {
        console.log(error);
      }
    }, //END OF uploadProofOfPayment
    onRejected(entries) {
      if (entries.length > 0) {
        switch (entries[0].failedPropValidation) {
          case "max-file-size":
            this.$q.notify({
              position: "bottom",
              type: "negative",
              message: "File exceeds 5MB.",
            });

            break;

          // case "max-files":
          //   this.$q.notify({
          //     position: "bottom",
          //     type: "negative",
          //     message: "You can upload up to 3 files.",
          //   });

          //   break;
        }
      }
    }, //END OF onRejected METHOD

    async getProofOfPayment() {
      const payload = {
        studentno: this.studentnumber,
      };

      const result = await this.$store.dispatch(
        "payments/getProofOfPayment",
        payload
      );

      if (
        result.error === "Access token is not whitelisted." ||
        result.error === "Access token is required." ||
        result.error === "Access token is invalid or expired."
      ) {
        this.$q.notify({
          message: `${result.error}`,
          position: "top",
          type: "negative",
        });
      } else {
        this.proofOfPaymentData = result;
      }
    }, //END OF getProofOfPayment METHOD
    formatNumber(number) {
      return number.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    // async getPicture() {
    //   const payload = {
    //     studentno: this.studentInfo.sn,
    //   };
    //   const result = await this.$store.dispatch("users/getPicture", payload);
    //   this.paymentImage = result; //token pala result neto
    // }, //END OF getPicture METHOD
  }, //END OF METHODS LIFE CYCLE HOOKS
  computed: {
    ...mapGetters({
      studentInfo: "users/userAccount",
    }),
  },
};
</script>

<style lang="scss" scoped>
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

.InputToUpper {
  text-transform: uppercase;
}
</style>
