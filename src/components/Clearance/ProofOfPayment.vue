<!-- UploadProofOfPayment.vue -->
<template>
  <div>
    <div class="fit flex flex-center" v-if="bool.loading">
      <q-spinner-hourglass color="primary" size="150px" />
    </div>
    <div class="row upload-proof-container q-my-lg" v-else>
      <div class="row justify-end full-width q-mb-lg">
        <q-btn
          label="payment instruction"
          color="yellow-8"
          class="text-black"
          @click="paymentInstruction"
        />
      </div>

      <q-card>
        <q-card-section
          class="bg-primary text-white text-center text-body1 text-weight-bold"
        >
          UPLOAD PROOF OF PAYMENT
        </q-card-section>
        <q-card-section>
          <q-form
            @submit.prevent="uploadProofOfPayment"
            enctype="multipart/form-data"
            name="file"
          >
            <div class="row q-gutter-md q-mb-lg">
              <div class="col-12 col-md">
                PAYMENT METHOD
                <q-select
                  outlined
                  v-model="posts.paymentMethod"
                  :options="paymentMethodOptions"
                  :rules="[requiredValidation]"
                  label=""
                />
              </div>
              <!-- <div class="col-12 col-md">
                Reference no
                <q-input
                  outlined
                  v-model="posts.referenceNo"
                  :rules="[requiredValidation]"
                />
              </div> -->
              <div class="col-12 col-md">
                TRANSACTION DATE
                <q-input
                  stack-label
                  outlined
                  v-model="posts.transactionDate"
                  mask="date"
                  label-slot
                  :rules="['date']"
                  hide-bottom-space
                  square
                >
                  <template v-slot:label> (YYYY/MM/DD) </template>
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="posts.transactionDate">
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
              </div>
            </div>

            <div class="row q-gutter-md q-mb-lg">
              <div class="col-12 col-md">
                AMOUNT
                <q-input
                  outlined
                  v-model="posts.amount"
                  :rules="[requiredValidation]"
                />
              </div>
              <div class="col-12 col-md">
                UPLOAD PROOF OF PAYMENT
                <q-file
                  accept=".jpg, .jpeg, .png"
                  outlined
                  hint="Only .jpg, .jpeg, .png, and 5mb are required"
                  max-file-size="5000000"
                  @rejected="onRejected"
                  v-model="posts.file"
                  :rules="[requiredValidation]"
                >
                  <template v-slot:append>
                    <q-avatar size="44px">
                      <img src="../../assets/upload.jpg" alt="upload icon" />
                    </q-avatar>
                  </template>
                </q-file>
              </div>
            </div>

            <!-- <div class="row q-gutter-md q-mb-lg">
              <div class="col-12 col-md">
                Upload proof of payment
                <q-file
                  outlined
                  v-model="posts.file"
                  :rules="[requiredValidation]"
                >
                  <template v-slot:append>
                    <q-avatar size="44px">
                      <img src="../../assets/upload.jpg" />
                    </q-avatar>
                  </template>
                </q-file>
              </div>
            </div> -->

            <div class="row justify-end">
              <!-- <div class="col-12 col-md"> -->
              <q-btn
                class="upload-action-button text-white text-weight-bold"
                color="primary"
                label="Upload"
                type="submit"
              />
              <!-- </div> -->
            </div>
          </q-form>
        </q-card-section>
      </q-card>

      <!--PAYMENT INSTRUCTION DIALOG-->
      <q-dialog v-model="bool.openPDFDialog" full-height full-width maximized>
        <q-card class="fit">
          <q-card-section class="bg-primary text-yellow-8">
            <div class="row justify-between items-center">
              <span> PAYMENT INSTRUCTION </span>
              <span>
                <q-btn icon="fa fa-times" color="red" v-close-popup></q-btn>
              </span>
            </div>
          </q-card-section>
          <div v-if="!bool.pdfLoading">
            <q-card-section
              class="full-width q-pa-none"
              style="height: 92.9vh"
              v-if="bool.openPDFDialog"
            >
              <q-pdfviewer
                v-model="bool.show"
                type="html5"
                src="https://drive.google.com/file/d/1XyiycT6yg9bc5EZq0OKXv3Hl0sD8JpW_/preview"
                content-class="absolute"
              />
            </q-card-section>
          </div>
          <div v-else>
            <q-card-section style="height: 92.9vh"></q-card-section>
          </div>
          <q-inner-loading :showing="this.bool.pdfLoading">
            <q-spinner-puff size="100px" color="primary" />
            <span class="q-pt-md text-overline">FETCHING DATA ...</span>
          </q-inner-loading>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["nextStep"],
  data() {
    return {
      bool: {
        loading: true,
        openPDFDialog: false,
        show: true,
        pdfLoading: false,
      },
      posts: {
        paymentMethod: "",
        referenceNo: "",
        transactionDate: "",
        amount: null,
        file: null,
      },
      paymentMethodOptions: ["BANK TRANSFER", "GCASH PAYMENT", "UERM CASHIER"],
      // selectedFile: null,
    };
  },
  methods: {
    async uploadProofOfPayment() {
      this.bool.loading = true;
      const fileData = new FormData();
      fileData.append("file", this.posts.file, this.posts.file.name);
      fileData.append("paymentMethod", this.posts.paymentMethod);
      fileData.append("referenceNo", this.posts.referenceNo);
      fileData.append("transactionDate", this.posts.transactionDate);
      fileData.append("amount", this.posts.amount);

      try {
        const resultUpload = await this.$store.dispatch(
          "clearance/uploadPayment",
          fileData
        );

        if (resultUpload.error) {
          setTimeout(() => {
            this.$q.notify({
              message: `${resultUpload.error}`,
              position: "top",
              type: "negative",
            });
            this.bool.loading = false;
            return;
          }, 2000);
        }

        if (resultUpload.sN) {
          setTimeout(() => {
            this.$q.notify({
              message: "Succesfully Uploaded!",
              position: "top",
              type: "positive",
            });
            this.$emit("nextStep");
            this.bool.loading = false;
          }, 2000);
        }
      } catch (error) {
        this.$q.notify({
          message: `${error}`,
          position: "bottom",
          type: "negative",
        });
      }
    },
    paymentInstruction() {
      this.bool.pdfLoading = true;
      this.bool.openPDFDialog = true;

      setTimeout(() => {
        this.bool.pdfLoading = false;
      }, 1000);
    },
    requiredValidation(value) {
      return !!value || "This field is required";
    },
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
        }
      }
    },
  }, //end of method life cycle hooks
  created() {
    setTimeout(() => {
      this.bool.loading = false;
    }, 1000); // Simulate loading for 1 second
  },
};
</script>

<style scoped>
.upload-proof-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.upload-button {
  margin-bottom: 20px;
}
.selected-file-info {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.upload-action-button {
  margin-top: 20px;
}

.payment {
  width: 350px; /* Set the desired width */
  min-height: 220px; /* Set the desired height */
}
</style>
