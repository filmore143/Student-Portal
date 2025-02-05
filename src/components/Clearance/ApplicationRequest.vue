<template>
  <div>
    <q-card v-if="!loading">
      <q-card-section>
        <q-input outlined v-model="search" label="Search documents..." />
      </q-card-section>

      <q-separator />
      <q-form @submit.prevent="submitOrder()" method="post" class="q-gutter-md">
        <q-card-section>
          <q-list bordered separator>
            <q-item
              class="row"
              v-for="(document, index) in filteredDocuments"
              :key="index"
            >
              <q-item-section class="col-12 col-md">
                <q-item-label
                  class="text-weight-bold text-uppercase text-subtitle2"
                  >{{ document.name }}</q-item-label
                >
                <q-item-label caption
                  >₱{{ formatPrice(document.price) }}</q-item-label
                >
              </q-item-section>
              <q-item-section side class="col-12 col-md">
                <q-input
                  outlined
                  type="number"
                  v-model="document.quantity"
                  @input="calculateTotal"
                  min="0"
                  max="10"
                  class="centered-text"
                  style="width: 100px"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-separator />

        <!-- <q-card-section class="row justify-end q-gutter-md">
          <div class="col-12 col-md text-h6">
            Total: ₱ {{ formatPrice(calculateTotal()) }}
          </div>
          <div>
            <q-btn
              label="SUBMIT"
              color="primary"
              class="text-yellow-8"
              type="submit"
            />
          </div>
        </q-card-section> -->

        <q-card class="fixed-bottom-card text-black text-h6">
          <q-card-section class="row justify-end q-mr-lg items-center">
            <div class="text-caption q-mr-md">total:</div>
            <div class="text-h5 q-mr-md text-weight-bold">
              ₱ {{ formatPrice(calculateTotal()) }}
            </div>
            <q-btn
              label="PROCEED"
              color="yellow-8"
              class="text-black q-py-sm text-weight-bold q-px-md"
              type="submit"
              size="15px"
            />
          </q-card-section>
        </q-card>
      </q-form>
    </q-card>

    <div class="fit flex flex-center" v-if="loading">
      <q-spinner-hourglass color="primary" size="150px" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ApplicationRequest",
  emits: ["nextStep"],
  emits: ["documentRequestSubmitted"],
  data() {
    return {
      loading: true,
      search: "",
      documents: [
        {
          name: "OFFICIAL TRANSCRIPT OF RECORDS (PER SET)",
          price: 450,
          quantity: 2,
        },
        {
          name: "ORIGINAL DIPLOMA (ISSUED ONLY ONCE)",
          price: 500,
          quantity: 1,
        },
        {
          name: "CERTIFIED TRUE COPY OF OFFICIAL TRANSCRIPT (PER SET)",
          price: 200,
          quantity: 1,
        },
        {
          name: "CERTIFIED TRUE COPY OF DIPLOMA (PER COPY)",
          price: 50,
          quantity: 1,
        },
        {
          name: "CERTIFIED TRUE COPY OF NATIONAL MEDICAL ADMISSION TEST (NMAT)",
          price: 50,
          quantity: 1,
        },
        {
          name: "CERTIFICATE OF GRADUATION (PER COPY)",
          price: 150,
          quantity: 1,
        },
        {
          name: "CERTIFICATE OF GOOD MORAL CHARACTER (PER COPY)",
          price: 50,
          quantity: 1,
        },
        {
          name: "CERTIFICATE OF CLASS RANKING AND GENERAL WEIGHTED AVERAGE (PER COPY)",
          price: 50,
          quantity: 1,
        },
        { name: "RECOMMENDATION LETTER (PER COPY)", price: 50, quantity: 1 },
        // {
        //   name: "Mailing fee (Within the Philippines)",
        //   price: 300,
        //   quantity: 0,
        // },
        // {
        //   name: "Mailing fee (Outside the Philippines)",
        //   price: 2250,
        //   quantity: 0,
        // },
      ],
      orderForPrinting: null,
    };
  },
  computed: {
    filteredDocuments() {
      return this.documents.filter((document) =>
        document.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    async submitOrder() {
      // this.$q
      //   .dialog({
      //     title: "Confirmation",
      //     message: "Are you sure would you like to continue?",
      //     ok: {
      //       color: "primary",
      //       label: "SUBMIT",
      //       buttonProps: {
      //         color: "red",
      //       },
      //     },
      //     cancel: {
      //       flat: true,
      //       color: "primary",
      //     },
      //     persistent: true,
      //   })
      //   .onOk(async () => {
      //     const selectedDocuments = this.documents
      //       .filter((document) => document.quantity > 0)
      //       .map((doc) => ({
      //         ...doc,
      //         originalPrice: doc.price,
      //         priceBasedOnQuantity: doc.price * doc.quantity,
      //       }));

      //     const order = selectedDocuments.map((document) => ({
      //       name: document.name,
      //       originalPrice: document.originalPrice,
      //       priceBasedOnQuantity: document.priceBasedOnQuantity,
      //       quantity: parseInt(document.quantity),
      //     }));

      //     this.orderForPrinting = order;

      //     const response = await this.$store.dispatch(
      //       "clearance/documentsOrder",
      //       order
      //     );

      //     console.log(response);
      //     if (response.error) {
      //       this.$router.push("/");
      //       localStorage.removeItem("access_token");
      //       this.$q.notify({
      //         message: "Session Expired!",
      //         position: "top",
      //         type: "negative",
      //       });
      //     }

      //     if (response[0].id !== 0) {
      //       this.timer = setTimeout(() => {
      //         this.$q.notify({
      //           message: "Successfully registered",
      //           position: "top",
      //           type: "positive",
      //         });
      //         this.$emit("documentRequestSubmitted", order);
      //       }, 3000);
      //     } else {
      //       this.$q.notify({
      //         message: "Did not successfully submitted",
      //         position: "top",
      //         type: "negative",
      //       });
      //     }
      //   });

      const selectedDocuments = this.documents
        .filter((document) => document.quantity > 0)
        .map((doc) => ({
          ...doc,
          originalPrice: doc.price,
          priceBasedOnQuantity: doc.price * doc.quantity,
        }));

      const order = selectedDocuments.map((document) => ({
        name: document.name,
        originalPrice: document.originalPrice,
        priceBasedOnQuantity: document.priceBasedOnQuantity,
        quantity: parseInt(document.quantity),
      }));

      this.$emit("documentRequestSubmitted", order);
    },

    calculateTotal() {
      return this.documents.reduce((acc, curr) => {
        return parseInt(acc + curr.price * curr.quantity);
      }, 0);
    },
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
    },
  },
  filters: {
    currency(value) {
      return `$${value.toFixed(2)}`;
    },
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000); // Simulate loading for 1 second
  },
};
</script>
<style scoped>
.centered-text {
  text-align: center;
}

.fixed-bottom-card {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 130;
}
</style>
