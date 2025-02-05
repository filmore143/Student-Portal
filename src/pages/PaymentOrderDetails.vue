<template>
  <q-dialog v-model="dialogVisible" full-width full-height persistent>
    <q-card>
      <q-card-section align="right" class="bg-dark">
        <router-link to="/students/transactions/payment-orders">
          <q-btn icon="close" color="red-8" text-color="white" />
        </router-link>
      </q-card-section>
      <q-card-section>
        <div id="iframeContainer" v-if="this.paymentDetails !== 0"></div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
export default {
  name: "PaymentOrderDetails",
  data() {
    return {
      paymentDetails: [],
      paymentHistoryData: [],
      dialogVisible: true,
    };
  }, //END OF DATA LIFE CYCLE HOOKS
  methods: {
    async paymentOrderDetails() {
      // const itemId = this.$route.params.transactid;
      const payload = {
        transactionid: this.$route.params.transactid,
      };
      const response = await this.$store.dispatch(
        "payments/getPaymentOrderDetails",
        payload
      );
      this.paymentDetails = response[0];
      this.renderDocument();
    }, //END OF paymentOrderDetails METHOD
    currencyFormatter(value) {
      var formatter = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      });
      return formatter.format(value);
    }, //END OF currencyFormatter METHOD
    renderDocument() {
      var documentDefinition = {
        info: {
          title: "UERM Payment Order",
          author: "UERM IT Department",
        },
        header: [
          {
            stack: [
              {
                columns: [
                  // {
                  //   image: "sampleImage.jpg",
                  //   width: 55,
                  //   height: 55,
                  // },
                  [
                    {
                      alignment: "center",
                      text: "UNIVERSITY OF THE EAST \n RAMON MAGSAYSAY MEMORIAL MEDICAL CENTER, INC. \n 64 Aurora Blvd. Brgy. Doña Imelda  Quezon City, Philippines \n Tel. No.: 715-0861 loc. 360",
                      fontSize: 12,
                      bold: true,
                    },
                  ],
                ],

                columnGap: 10,
                margin: [10, 10, 25, 10],
                style: ["headerStyle", "fontNormal"],
              },
            ],
          },
        ],

        content: [
          {
            text: `Order Number: ${this.$route.params.transactid}`,
            margin: [0, 90, 0, 5],
            fontSize: 10,
          },
          {
            text: `Order Date ${
              this.paymentDetails.auth_time !== null
                ? this.paymentDetails.auth_time
                : ""
            }`,
            margin: [0, 0, 0, 45],
            fontSize: 10,
          },
          {
            text: `${
              this.paymentDetails.message !==
              "Request was processed successfully."
                ? this.paymentDetails.message
                : ""
            }`,
            margin: [100, 0, 0, 45],
            fontSize: 10,
            color: "#ff5500",
          },
          {
            columns: [
              {
                width: "50%",
                text: "Payment Details",
                margin: [20, 0, 0, 0],
                fontSize: 12,
                bold: true,
              },

              {
                width: "50%",
                text: "Billing Information",
                margin: [40, 0, 0, 0],
                fontSize: 12,
                bold: true,
              },
            ],
          }, //end of column

          {
            columns: [
              {
                width: "50%",
                text: `${
                  this.paymentDetails.req_card_number !== null
                    ? this.paymentDetails.req_card_number
                    : ""
                }`,
                margin: [80, 10, 0, 0],
                fontSize: 15,
              },
              {
                width: "50%",
                text: `Payee : ${
                  (this.paymentDetails.req_card_number !== null
                    ? this.paymentDetails.req_bill_to_forename
                    : "") +
                  " " +
                  (this.paymentDetails.req_bill_to_surname !== null
                    ? this.paymentDetails.req_bill_to_surname
                    : "")
                }`,
                margin: [60, 20, 0, 0],
                fontSize: 10,
              },
            ],
          }, //end of column for payee
          {
            columns: [
              {
                width: "30%",
                text: `Expiry Date: ${
                  this.paymentDetails.req_card_expiry_date !== null
                    ? this.paymentDetails.req_card_expiry_date
                    : ""
                }`,
                margin: [30, 10, 0, 0],
                fontSize: 10,
              },
              {
                width: "30%",
                text: `Name: ${
                  this.paymentDetails.req_bill_to_forename !== null
                    ? this.paymentDetails.req_bill_to_forename
                    : ""
                }`,
                margin: [10, 10, 0, 0],
                fontSize: 10,
              },

              {
                width: "70%",
                text: `Address : ${
                  this.paymentDetails.req_bill_to_address_line2 !== null
                    ? this.paymentDetails.req_bill_to_address_line2
                    : ""
                }`,
                margin: [8, 10, 0, 0],
                fontSize: 10,
              },
            ],
          }, //end of column for address
          {
            columns: [
              {
                width: "50%",
                text: `${this.currencyFormatter(
                  this.paymentDetails.auth_amount
                )}`,
                margin: [90, 20, 0, 0],
                fontSize: 15,
              },
              {
                width: "50%",
                text: `City : ${
                  this.paymentDetails.req_bill_to_address_city !== null
                    ? this.paymentDetails.req_bill_to_address_city
                    : ""
                }`,
                margin: [60, 10, 0, 0],
                fontSize: 10,
              },
            ],
          }, //end of column for City
          {
            columns: [
              {
                width: "50%",
                text: `Total Amount Paid`,
                margin: [100, 0, 0, 0],
                fontSize: 8,
              },
              {
                width: "100%",
                text: `State : ${
                  this.paymentDetails.req_bill_to_address_state !== null
                    ? this.paymentDetails.req_bill_to_address_state
                    : ""
                }`,
                margin: [60, 0, 0, 0],
                fontSize: 10,
              },
            ],
          }, //end of column for State
          {
            columns: [
              {
                width: "100%",
                text: `Postal Code : ${
                  this.paymentDetails.req_bill_to_address_postal_code !== null
                    ? this.paymentDetails.req_bill_to_address_postal_code
                    : ""
                }`,
                margin: [317, 10, 0, 0],
                fontSize: 10,
              },
            ],
          }, //end of column for Postal Code
          {
            columns: [
              {
                width: "100%",
                text: `Country: ${
                  this.paymentDetails.req_bill_to_address_country !== null
                    ? this.paymentDetails.req_bill_to_address_country
                    : ""
                }`,
                margin: [317, 10, 0, 0],
                fontSize: 10,
              },
            ],
          }, //end of column for State
          {
            text: "Note: All payments will be posted to your ledger by the end of the day",
            margin: [20, 50, 0, 5],
            fontSize: 8,
            bold: true,
          },
          {
            text: "Please keep a copy of this receipt for your record.",
            margin: [20, 20, 0, 5],
            fontSize: 8,
          },
        ],

        styles: {
          headerStyle: {
            bold: true,
          },
          fontHeader: {
            fontSize: 51,
            bold: true,
            margin: [0, 10, 0, 10],
          },
        },
        defaultStyle: {
          fontSize: 8,
        },
      };
      pdfMake.vfs = pdfFonts.pdfMake.vfs;

      const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

      pdfDocGenerator.getDataUrl((dataUrl) => {
        const targetElement = document.querySelector("#iframeContainer");
        const iframe = document.createElement("iframe");
        iframe.src = dataUrl;
        iframe.height = "100%";
        iframe.width = "100%";
        iframe.style.cssText = "z-index: 1; position: absolute; border: 0;";
        targetElement.appendChild(iframe);
      });
    }, //END OF renderDocument METHOD
  }, //END OF METHOD LIFE CYCLE HOOKS
  created() {
    this.paymentOrderDetails();
  }, //END OF CREATED LIFE CYCLE HOOKS
  mounted() {
    // this.renderDocument();
  }, //END OF MOUNTED LIFE CYCLE HOOKS
  computed: {
    ...mapGetters({
      payments: "payments/getPaymentOrderDetails",
    }),
  }, //END OF COMPUTED LIFE CYCLE HOOKS
};
</script>

<style lang="scss" scoped>
.mainbody {
  background-image: url("../assets/uerm-background.jpg"); /* The image used */
  background-color: #cccccc; /* Used if the image is unavailable */
  height: 100%; /* You must set a specified height */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
}

#iframeContainer {
  height: 900px;
  width: 700vh;
}

// @media print { for winodw.print() to remove the button
//   #button {
//     display: none;
//   }
// }
</style>
