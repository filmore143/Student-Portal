<template>
  <q-dialog v-model="dialogVisible" maximized persistent>
    <q-card>
      <q-card-section align="right" class="bg-primary">
        <router-link to="/students/ledger">
          <q-btn icon="close" color="red-8" text-color="white" />
        </router-link>
      </q-card-section>
      <!-- <q-card-section> -->
      <div id="iframeContainer" v-if="this.paymentDetails !== 0"></div>
      <!-- </q-card-section> -->
    </q-card>
  </q-dialog>
</template>

<script>
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

export default {
  name: "PrintStudentOR",
  data() {
    const date = new Date();
    return {
      paymentDetails: [],
      dialogVisible: true,
      imageBase64: "",
      date,
      boolData: 0.0,
    };
  },
  created() {
    this.studentOR();
  },
  methods: {
    async studentOR() {
      const response = await this.$store.dispatch("payments/printStudentOR");
      this.paymentDetails = response;

      this.renderDocument();
    }, //end of studentOR

    async renderDocument() {
      let img = await this.$store.dispatch("documents/viewImages");

      if (!img) {
        alert("invalid image");
        return;
      }

      var documentDefinition = {
        pageSize: {
          width: 10 * 72,
          height: 6 * 60,
        },
        info: {
          title: "UERM Offical Receipt",
          author: "IT-Filmore",
        },

        header: [
          {
            stack: [
              {
                // columns: [
                //   {
                //     image: `data:image/png;base64, ${img}`,
                //     width: 55,
                //     height: 55,
                //     margin: [0, 10, 0, 0],
                //   },
                //   [
                //     {
                //       alignment: "left",
                //       text: "UNIVERSITY OF THE EAST \n ",
                //       fontSize: 13,
                //       margin: [-20, 10, 0, 0],
                //       bold: true,
                //     },
                //   ],
                // ],
                columnGap: 10,
                margin: [70, 10, 25, 10],
                style: ["headerStyle", "fontNormal"],
                columns: [
                  {
                    width: "10%",
                    alignment: "left",
                    stack: [
                      {
                        image: `data:image/png;base64, ${img}`, // Replace with your Base64 encoded image
                        width: 50,
                        height: 50,
                        alignment: "left",
                        margin: [-20, -5, 0, 0], // Margin to space out from the text
                      },
                    ],
                  },
                  {
                    width: "40%",
                    alignment: "left",
                    stack: [
                      {
                        text: "UNIVERSITY OF THE EAST\nRAMON MAGSAYSAY MEMORIAL MEDICAL CENTER, INC.\n64 Aurora Blvd. Brgy. Doña Imelda, Quezon City, Philippines\nTel. No.: 715-0861 loc. 360",
                        fontSize: 8,
                        bold: true,

                        margin: [-30, 1, 0, 0], // Margin to ensure space between image and text
                      },
                    ],
                    alignment: "left",
                    text: [
                      {
                        text: "64 Aurora Blvd. Brgy. Doña Imelda, Quezon City, Philippines\nTel. No.: 715-0861 loc. 360",
                        fontSize: 6,
                        bold: true,
                        margin: [0, 10, 0, 0],
                      },
                    ],
                  },

                  {
                    width: "50%",
                    alignment: "right",
                    text: [
                      {
                        text: "Service Invoice  ",
                        fontSize: 10,

                        margin: [0, 30, 0, 0],
                      },
                      {
                        text: `${this.paymentDetails[0].oRNO}`,
                        fontSize: 15,
                        bold: true,
                        margin: [-50, 80, 0, 0], // Adjust margin to add space if needed
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ], //end of header
        content: [
          {
            text: ``,
            margin: [0, 20, 0, 5],
            fontSize: 10,
          },
          {
            style: "tableExample",
            table: {
              widths: [100, "*", "*", "*", "*"], // Adjust column widths
              body: [
                [
                  { text: "", border: [false, false, false, false] }, // All borders
                  { text: "", border: [false, false, false, false] }, // Top and bottom borders only
                  { text: "", border: [false, false, false, false] }, // Top border only
                  { text: "", border: [false, false, false, false] }, // No left border
                  {
                    text: [
                      {
                        text: "Date: ",
                        fontSize: 6,
                        alignment: "left",
                        margin: [0, 0, 60, 0],
                      }, // Smaller font size for label
                      {
                        text: `                  ${this.formatDateTime(
                          this.paymentDetails[0].tDATE
                        )}`,
                        fontSize: 7,
                        margin: [40, 0, 60, 0],
                        alignment: "right",
                      },
                    ],
                    border: [true, true, true, true], // Borders on all sides
                  },
                ], // Header row
                [
                  {
                    text: [
                      { text: "RECEIVED FROM ", fontSize: 6, colSpan: 2 }, // Smaller font size for label

                      {
                        text: ` ${this.paymentDetails[0].pAYEE}`,
                        fontSize: 9,
                        bold: true,
                      },
                    ],
                    border: [true, true, true, true], // Borders on all sides..
                    colSpan: 4,
                  },
                  { text: "", border: [false, false, false, false] },
                  { text: "", border: [false, false, false, false] },
                  { text: "", border: [false, false, false, false] },
                  {
                    text: [
                      { text: `Ref No:`, fontSize: 6, margin: [0, 0, 60, 0] }, // Smaller font size for label
                      {
                        text: `        ${this.paymentDetails[0].rEFNO}`,
                        fontSize: 7,
                        margin: [40, 0, 60, 0],
                      },
                    ],
                    border: [true, true, true, true], // Borders on all sides..
                  },
                ], //end
                [
                  {
                    text: [
                      {
                        text: "THE SUM OF ",
                        fontSize: 6,
                        margin: [50, 0, 0, 0],
                        width: "30%",
                      },
                      {
                        text: `      ${this.paymentDetails[0].aMOUNTWORDS}`,
                        margin: [50, 0, 0, 0],
                        fontSize: 9,
                      },
                    ],
                    border: [true, true, true, true], // Borders on all sides..
                    colSpan: 5,
                  },
                  { text: "", border: [false, false, false, false] },
                  { text: "", border: [false, false, false, false] },
                  { text: "", border: [false, false, false, false] },
                  { text: "", border: [false, false, true, false] },
                ], //end
                [
                  {
                    text: `${this.paymentDetails[0].dESCRIPTION}`,
                    fontSize: 8,
                    colSpan: 5,
                    margin: [40, 10, 0, 0],
                    border: [true, false, true, false],
                  },
                  { text: "", border: [false, false, false, false] },
                  { text: "", border: [false, false, false, false] },
                  { text: "", border: [false, false, false, false] },
                  { text: "", border: [false, false, true, false] },
                ], //end
                ...this.paymentDetails.map((details) => [
                  {
                    text: "Total Fees: ",
                    fontSize: 7,
                    margin: [0, 0, 0, -10],
                    border: [true, false, false, false],
                  },
                  {
                    text: this.formatCurrency(parseFloat(details.aMOUNT || 0)),
                    fontSize: 8,
                    margin: [0, 0, 0, -10],
                    border: [false, false, false, false],
                  },
                  {
                    text: details.accountName || "",
                    fontSize: 8,
                    margin: [0, 0, 0, -10],
                    border: [false, false, false, false],
                  },
                  {
                    text: "",
                    margin: [0, 0, 0, -10],
                    border: [false, false, false, false],
                  },
                  {
                    text: this.formatCurrency(
                      parseFloat(details.pdAmount || 0)
                    ),
                    fontSize: 8,
                    margin: [0, 0, 0, -50],
                    alignment: "right",
                    border: [false, false, true, false],
                  },
                ]),

                [
                  {
                    text: "Less Discount: ",
                    fontSize: 7,
                    margin: [0, 0, 0, 0],
                    border: [true, false, false, false],
                  },
                  {
                    text: `${
                      this.paymentDetails[0].dISCOUNT === 0
                        ? "-"
                        : this.formatCurrency(this.paymentDetails[0].dISCOUNT)
                    }`,
                    fontSize: 8,
                    margin: this.getDiscountMargin(),
                    border: [false, false, false, false],
                  },
                  { text: "", border: [false, false, false, false] },
                  { text: "", border: [false, false, false, false] },
                  { text: "", border: [false, false, true, false] },
                ], //end
                [
                  {
                    text: "Total Due",
                    fontSize: 7,
                    margin: [0, -10, 0, 0],
                    border: [true, false, false, false],
                  },
                  {
                    text: `${this.formatCurrency(
                      this.paymentDetails[0].aMOUNT
                    )}`,
                    fontSize: 8,
                    margin: [0, -10, 0, 0],
                    border: [false, false, false, false],
                  },
                  { text: "", border: [false, false, false, false] },
                  { text: "", border: [false, false, false, false] },
                  { text: "", border: [false, false, true, false] },
                ], //end
                [
                  { text: "", border: [true, true, false, false] },
                  { text: "", border: [false, true, true, false] },
                  { text: "", border: [false, true, false, false] },
                  { text: "", border: [false, true, true, false] },
                  { text: "", border: [false, true, true, false] },
                ], //end
                [
                  {
                    text: "CASH",
                    fontSize: 7,
                    margin: [7, -10, 0, 0],
                    border: [true, false, false, true],
                  },
                  {
                    text: `${this.getFormattedCashAmount()}`,
                    alignment: "left",
                    fontSize: 8,
                    margin: [0, -10, 0, 0],
                    border: [false, false, true, true],
                  },
                  {
                    text: "Sr. Citizen TIN:",
                    fontSize: 8,
                    margin: [0, -10, 0, 0],
                    border: [true, false, false, true],
                  },
                  { text: "", border: [false, false, true, true] },
                  { text: "", border: [false, false, true, false] },
                ], //end
                [
                  {
                    text: "CARD",
                    fontSize: 7,
                    margin: [7, 0, 0, 0],
                    border: [true, false, false, true],
                  },
                  {
                    // text: "30, 000. 6213 BDO VISA",
                    text: `${this.getFormattedCardDetails()}`,
                    alignment: "left",
                    fontSize: 8,
                    margin: [0, 0, 0, 0],
                    border: [false, false, true, true],
                  },
                  { text: "", border: [false, false, false, false] },
                  { text: "", border: [true, false, true, false] },
                  { text: "", border: [false, false, true, false] },
                ], //end
                [
                  {
                    text: "CHECK",
                    fontSize: 7,
                    margin: [7, 0, 0, 0],
                    border: [true, false, false, true],
                  },
                  {
                    text: `${this.getFormattedPayment()}`,
                    alignment: "left",
                    fontSize: 8,
                    margin:
                      this.getFormattedPayment() === "-"
                        ? [0, 10, 0, 0]
                        : [0, 0, 0, 0],
                    border: [false, false, true, true],
                  },
                  {
                    text: "OSCA/PWSA ID NO.",
                    fontSize: 7,
                    margin: [0, -10, 0, 0],
                    border: [false, false, false, true],
                  },
                  {
                    text: "Signature",
                    fontSize: 7,
                    margin: [0, -10, 0, 0],
                    border: [true, false, true, true],
                  },
                  {
                    text: [
                      {
                        text: `---------------------------------- \n ${this.paymentDetails[0].fUSERNAME}\n`,
                        alignment: "center",
                        fontSize: 9,
                      },
                      {
                        text: " Cashier/Authorized Representative",
                        alignment: "center",
                        fontSize: 6,
                        bold: true,
                      },
                    ],
                    border: [true, false, true, true], // Borders on all sides..
                  },
                ], //end
              ],
            },

            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 0.5; // Thicker border for the top and bottom lines
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 1 : 0.5; // Thicker border for the left and right lines
              },
              hLineColor: function (i, node) {
                return "#000000"; // Color of horizontal lines
              },
              vLineColor: function (i, node) {
                return "#000000"; // Color of vertical lines
              },
              paddingLeft: function (i, node) {
                return 4;
              },
              paddingRight: function (i, node) {
                return 4;
              },
              paddingTop: function (i, node) {
                return 3;
              },
              paddingBottom: function (i, node) {
                return 6;
              },
            },
          },
          {
            columns: [
              {
                text: "BIR CAS PERMIT NO. 0315-039-CAS-0001",
                width: "30%",
                fontSize: 7,
                margin: [0, 0, 0, 0], // Margin: [left, top, right, bottom]
              },
              {
                text: "RANGE: 03470000-99999999",
                width: "30%",
                fontSize: 7,
                margin: [-30, 0, 0, 0],
              },
              {
                text: `Date Time Period: ${this.generateDateTime(this.date)}`,
                width: "30%",
                fontSize: 7,
                margin: [-120, 0, 0, 0],
              },
            ],
          },
        ], //end of content

        styles: {
          tableExample: {
            margin: [0, 5, 0, 5],
          },
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
    }, //end of renderDocument
    formatDateTime(dateTime) {
      // Parse the input date-time string
      const date = new Date(dateTime);

      // Extract date components
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Months are zero-based, so add 1
      const day = date.getDate();

      // Format date
      const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`;

      // Extract time components
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      // Determine AM or PM
      const period = hours >= 12 ? "PM" : "AM";

      // Convert hours from 24-hour format to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'

      // Format minutes and seconds
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

      // Construct the formatted time string
      const formattedTime = `${hours}:${formattedMinutes}:${formattedSeconds} ${period}`;

      // Return combined date and time
      return `${formattedDate} ${formattedTime}`;
    }, //end of format date
    formatCurrency(number) {
      // Convert the number to a float and format to two decimal places
      const formattedNumber = parseFloat(number).toFixed(2);

      // Split the number into integer and decimal parts
      const [integerPart, decimalPart] = formattedNumber.split(".");

      // Add commas to the integer part
      const integerWithCommas = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      );

      // Combine integer and decimal parts
      return `${integerWithCommas}.${decimalPart}`;
    },
    getFormattedPayment() {
      const amount = this.paymentDetails[0].cHECK_AMOUNT;
      const formattedAmount =
        amount === 0.0 ? "-" : this.formatCurrency(amount);
      return `${formattedAmount} ${this.paymentDetails[0].cHECK_BANK} ${this.paymentDetails[0].cHECK_NO}`;
    },
    getFormattedCardDetails() {
      const amount = this.paymentDetails[0].cARD_AMOUNT;
      // Handle both 0 and 0.00 as '-'
      const formattedAmount =
        amount === 0 || amount === 0.0 ? "-" : this.formatCurrency(amount);
      return `${formattedAmount}      ${this.paymentDetails[0].cARD_NO}`;
    },
    getFormattedCashAmount() {
      const amount = this.paymentDetails[0].cASH_AMOUNT;
      // Handle both 0 and 0.00 as '-'
      const formattedAmount =
        amount === 0 || amount === 0.0 ? "-" : this.formatCurrency(amount);
      return formattedAmount;
    },

    generateDateTime(date) {
      // Create a Date object from the input string or timestamp
      const d = new Date(date);

      // Get the components of the date
      const month = ("0" + (d.getMonth() + 1)).slice(-2); // Months are zero-based
      const day = ("0" + d.getDate()).slice(-2);
      const year = d.getFullYear();
      const hours = d.getHours();
      const minutes = ("0" + d.getMinutes()).slice(-2);
      const seconds = ("0" + d.getSeconds()).slice(-2);

      // Determine AM/PM
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12; // Convert to 12-hour format

      // Return the formatted string
      return `${month}/${day}/${year} ${formattedHours}:${minutes}:${seconds}${ampm}`;
    },
    getDiscountMargin() {
      return this.paymentDetails[0].dISCOUNT === 0
        ? [30, 0, 0, 0]
        : [0, 0, 0, 0];
    },
    formatCashMargin() {
      return this.paymentDetails[0].cARD_AMOUNT === 0 ||
        this.paymentDetails[0].cARD_AMOUNT === 0.0
        ? [30, -10, 0, 0]
        : [0, 0, 0, 0];
    },
    convertToInt(data) {
      let number = data | 0; // 0;
      return number;
    },
  },
};
</script>

<style lang="scss" scoped>
#iframeContainer {
  height: 100%;
  width: 90%;
}
</style>
