<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="row justify-end full-width q-mb-lg">
          <!-- <q-btn
            label="payment instruction"
            color="yellow-8"
            class="text-black"
            @click="paymentInstruction"
          /> -->
        </div>
        <div class="row text-h5 text-weight-bold text-uppercase">
          <div class="col-12 col-md q-mb-md">Request Summary</div>
        </div>
      </q-card-section>
      <q-separator color="yellow-8" inset size="3px" />
      <q-card-section>
        <!-- <div class="row q-mt-md">
          <div class="col-12 col-md">Request Summary</div>
        </div> -->
      </q-card-section>
      <q-card class="row">
        <q-card-section class="col-12 col-md">
          <div class="text-weight-bold text-subtitle1 q-mb-md items-center">
            <q-icon name="person" size="2em" />PERSONAL INFORMATION
          </div>
          <div class="q-mb-md">
            <div class="row q-gutter-md">
              <div class="col text-weight-bold">Last Name:</div>
              <div class="col">
                {{ studentInformation.lastName }}
              </div>
            </div>
          </div>
          <div class="q-mb-md">
            <div class="row q-gutter-md">
              <div class="col text-weight-bold">First Name:</div>
              <div class="col">
                {{ studentInformation.firstName }}
              </div>
            </div>
          </div>
          <div class="q-mb-md">
            <div class="row q-gutter-md">
              <div class="col text-weight-bold">Middle Name:</div>
              <div class="col">
                {{ studentInformation.middleName }}
              </div>
            </div>
          </div>
          <div class="q-mb-md">
            <div class="row q-gutter-md">
              <div class="col text-weight-bold">Last School Attended:</div>
              <div class="col">
                {{ studentInformation.lastSchoolAttended }}
              </div>
            </div>
          </div>
          <div class="q-mb-md">
            <div class="row q-gutter-md">
              <div class="col text-weight-bold">Degree Program Obtained:</div>
              <div class="col">
                {{ studentInformation.degreeProgramObtained }}
              </div>
            </div>
          </div>
          <div class="q-mb-md">
            <div class="row q-gutter-md">
              <div class="col text-weight-bold">
                Date of College Graduation:
              </div>
              <div class="col">
                {{ studentInformation.dateOfGraduation }}
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="col-12 col-md">
          <div class="text-weight-bold text-subtitle1 q-mb-md items-center">
            <q-icon name="call" size="2em" />Contact Information
          </div>
          <div class="q-mb-md">
            <div class="row q-gutter-md">
              <div class="col text-weight-bold">Email:</div>
              <div class="col">
                {{ studentInformation.email }}
              </div>
            </div>
          </div>
          <div class="q-mb-md">
            <div class="row q-gutter-md">
              <div class="col text-weight-bold">Mobile No:</div>
              <div class="col">
                {{ studentInformation.mobileNo }}
              </div>
            </div>
          </div>
          <div class="q-mb-md">
            <div class="row q-gutter-md">
              <div class="col text-weight-bold">Landline No:</div>
              <div class="col">
                {{ studentInformation.landlineNo }}
              </div>
            </div>
          </div>
          <div class="q-mb-md">
            <div class="row q-gutter-md">
              <div class="col text-weight-bold">Address:</div>
              <div class="col">
                {{ studentInformation.fullAddress }}
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-separator color="yellow-8" inset size="3px" />

      <q-card class="full-width">
        <q-card-section class="full-width">
          <div class="text-weight-bold text-subtitle1 q-mb-md">
            <q-icon name="folder" size="2em" /> DOCUMENT REQUEST
          </div>
          <div>
            <q-table
              :rows="order"
              :columns="columns"
              :pagination="pagination"
              row-key="name"
            />
          </div>
        </q-card-section>
      </q-card>

      <q-separator color="yellow-8" inset size="3px" />

      <q-card-section>
        <div class="text-weight-bold text-subtitle1 q-mb-md">
          <q-icon name="payments" size="2em" /> HOW TO PAY
        </div>
        <!-- <q-list>
          <q-item>
            <q-item-section class="text-weight-bold text-h6">
              Total: ₱ {{ formatPrice(calculateTotal()) }}
            </q-item-section>
            <q-item-section avatar>
              <q-btn
                label="SUBMIT"
                color="yellow-8"
                class="text-black q-py-sm text-weight-bold q-px-md"
                @click="submitOrder()"
                size="15px"
              />
            </q-item-section>
          </q-item>
        </q-list> -->
        <q-card-section class="row justify-center">
          <q-img
            src="../../assets/paymentOption.png"
            style="width: 750px; height: 960px"
          />
        </q-card-section>
        <q-card-section class="row justify-end q-mr-lg items-center">
          <div class="text-caption q-mr-md">total:</div>
          <div class="text-h5 q-mr-md text-weight-bold">
            ₱ {{ formatPrice(calculateTotal()) }}
          </div>
          <q-btn
            label="SUBMIT"
            color="yellow-8"
            class="text-black q-py-sm text-weight-bold q-px-md"
            @click="submitOrder()"
            size="15px"
          />
        </q-card-section>
      </q-card-section>
    </q-card>
    <!-- <p>Order details:</p>
    <pre>{{ order }}</pre> -->

    <!--PAYMENT INSTRUCTION DIALOG-->
    <q-dialog v-model="bool.openPDFDialog" full-height full-width maximized>
      <q-card class="fit">
        <q-card-section class="bg-primary text-white">
          <div class="row justify-between items-center text-weight-bold">
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
</template>

<script>
export default {
  name: "SummaryPage",
  // props: ["order"],
  emits: ["nextStep"],
  props: {
    order: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      bool: {
        loading: false,
        openPDFDialog: false,
        show: true,
        pdfLoading: false,
      },
      studentInformation: [],
      columns: [
        {
          name: "name",
          label: "Document Name",
          align: "left",
          field: (row) => row.name,
          headerStyle: "background-color: #f0f0f0; font-weight: bold",
        },
        {
          name: "priceBasedOnQuantity",
          label: "Price",
          align: "right",
          field: (row) => row.priceBasedOnQuantity,
          headerStyle: "background-color: #f0f0f0; font-weight: bold",
        },
        {
          name: "quantity",
          label: "Quantity",
          align: "center",
          field: (row) => row.quantity,
          headerStyle: " background-color: #f0f0f0;font-weight: bold",
        },
      ], //end of columns
      pagination: {
        page: 1,
        rowsPerPage: 0, // set to 0 to show all rows
      },
    };
  },
  methods: {
    async getPersonalInformation() {
      this.bool.loading = true;
      const response = await this.$store.dispatch(
        "clearance/getClearancePersonalInfo"
      );

      if (response.error) {
        this.bool.loading = false;
        this.$q.notify({
          message: `response.error`,
          position: "top",
          type: "negative",
        });
      }

      if (response.length !== 0) {
        this.bool.loading = false;
        this.studentInformation = response[0];
      }

      // console.log("Personal Information", response[0]);
    }, //end of getPersonalInformation
    async submitOrder() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Are you sure would you like to continue?",
          ok: {
            color: "primary",
            label: "SUBMIT",
            buttonProps: {
              color: "red",
            },
          },
          cancel: {
            flat: true,
            color: "primary",
          },
          persistent: true,
        })
        .onOk(async () => {
          const response = await this.$store.dispatch(
            "clearance/documentsOrder",
            this.order
          );

          if (response.error) {
            this.$router.push("/");
            localStorage.removeItem("access_token");
            this.$q.notify({
              message: "Session Expired!",
              position: "top",
              type: "negative",
            });
            return;
          }

          if (response.length !== 0) {
            this.timer = setTimeout(() => {
              this.$q.notify({
                message: "Successfully registered",
                position: "top",
                type: "positive",
              });
              this.$emit("nextStep");
            }, 3000);
          } else {
            this.$q.notify({
              message: "Did not successfully submitted",
              position: "top",
              type: "negative",
            });
          }
        });
    },
    paymentInstruction() {
      this.bool.pdfLoading = true;
      this.bool.openPDFDialog = true;

      setTimeout(() => {
        this.bool.pdfLoading = false;
      }, 1000);
    },
    calculateTotal() {
      return this.order.reduce((acc, curr) => {
        return parseInt(acc + curr.originalPrice * curr.quantity);
      }, 0);
    }, //end of calculate
    formatPrice(price) {
      // return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      let formattedPrice = price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      if (formattedPrice.indexOf(".") === -1) {
        formattedPrice += ".00";
      } else {
        formattedPrice = parseFloat(formattedPrice).toFixed(2);
      }

      return formattedPrice;
    }, //end of formatPrice
  }, //end of method
  created() {
    this.getPersonalInformation();
  }, //end of created
};
</script>

<style scoped></style>
