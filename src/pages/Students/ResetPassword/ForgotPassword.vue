<template>
  <div class="body">
    <div class="row justify-between q-gutter-xl">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4">
        <q-card class="forgot">
          <q-form
            @submit.prevent="forgotPassword()"
            method="posts"
            class="q-gutter-md"
          >
            <q-card-section
              class="bg-primary text-white text-center text-6 text-weight-bold"
            >
              FORGOT PASSWORD
            </q-card-section>
            <q-card-section>
              UERM E-mail
              <q-input
                v-model="posts.uermEmail"
                outlined
                :rules="[requiredValidation]"
              />
              <!-- </q-card-section>
            <q-card-section class="text-center"> -->
              <q-btn
                color="primary"
                icon="lock"
                label="Forgot Password"
                class="full-width"
                type="submit"
              />
            </q-card-section>
          </q-form>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  data() {
    return {
      posts: {
        uermEmail: "",
      },
    };
  }, //end of data
  methods: {
    async forgotPassword() {
      const response = await this.$store.dispatch(
        "users/forgotPassword",
        this.posts
      );
      if (response.message === "NO STUDENT FOUND") {
        this.$q.notify({
          message: "NO STUDENT FOUND",
          position: "top",
          type: "negative",
        });
        return;
      }

      if (response.otp !== null || response.otp !== undefined) {
        this.$q.notify({
          message: "We sent you an OTP in your mobile number",
          position: "top",
          type: "positive",
        });

        // setTimeout(() => {
        // this.$router.push("/reset-password");

        this.$router.push(`/reset-password/${this.posts.studentno}`);

        // this.$router.push({
        //   name: "ResetPassword",
        //   params: {
        //     studentno: this.posts.studentno,
        //     mobileno: this.posts.mobileNo,
        //     hash: response.hash,
        //   },
        // });
        // }, 2000);
      }
      console.log("HEREEEE", response);
    },
    requiredValidation(value) {
      return !!value || "This field is required";
    },
  }, //end of method
};
</script>

<style lang="scss" scoped>
.body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* background: #1f1f47; */

  background-image: url("../../../assets//uerm-background.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;

  margin: 0;
  padding-left: 0;
  box-sizing: border-box;
}

.forgot {
  min-width: 300px;
}
</style>
