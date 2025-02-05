<template>
  <div class="row justify-center">
    <div class="col-12 col-md-4 q-ml-xs q-mb-lg">
      <q-card class="my-card">
        <q-card-section
          class="bg-primary text-weight-bold text-center text-white text-h6"
        >
          We'd love your feedback!
        </q-card-section>

        <q-card-section>
          <q-form
            @submit.prevent="sendFeedback()"
            method="post"
            class="q-gutter-md"
            enctype="multipart/form-data"
            name="file"
          >
            <p>How easy is it to find information on the site?</p>
            <q-input
              v-model="easyToFindInfo"
              autogrow
              lazy-rules
              square
              outlined
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
            <p>What did you love about your experience?</p>
            <q-input
              v-model="loveAboutExperience"
              autogrow
              lazy-rules
              square
              outlined
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
            <p>How would you rate the speed of our website?</p>
            <q-rating
              name="quality"
              v-model="quality"
              max="5"
              size="3.5em"
              color="yellow-8"
              icon="star_border"
              icon-selected="star"
              no-dimming
            />
            <p>Do you have any suggestion to improve our website?</p>
            <q-input
              v-model="improveWebsite"
              autogrow
              lazy-rules
              square
              outlined
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
            <div class="">
              <q-btn
                class="btn full-width text-white"
                label="Submit"
                type="submit"
                color="primary"
              >
              </q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "WebsiteFeedBack",
  data() {
    return {
      easyToFindInfo: "",
      loveAboutExperience: "",
      quality: 3,
      improveWebsite: "",
    };
  }, //END OF DATA LIFE CYCLE HOOKS
  methods: {
    async sendFeedback() {
      const payload = [
        this.easyToFindInfo,
        this.loveAboutExperience,
        this.quality,
        this.improveWebsite,
      ];

      const response = await this.$store.dispatch(
        "users/websiteFeedback",
        payload
      );

      if (response.message !== "You already responded!") {
        this.$q.notify({
          message: "Successfully sent your feedback!",
          position: "top",
          type: "positive",
        });
      } else if (response.message === "You already responded!") {
        this.$q.notify({
          message: "You already responded",
          position: "top",
          type: "negative",
        });
      } else {
        this.$q.notify({
          message: "Something went wrong :(",
          position: "top",
          type: "negative",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
