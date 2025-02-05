<template>
  <div class="body">
    <div class="row justify-between q-gutter-xl">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4">
        <q-card class="forgot">
          <q-form
            @submit.prevent="resetPassword()"
            method="posts"
            class="q-gutter-md"
          >
            <q-card-section
              class="bg-primary text-white text-center text-6 text-weight-bold"
            >
              RESET PASSWORD
            </q-card-section>
            <q-card-section>
              OTP
              <q-input
                v-model="posts.otp"
                outlined
                :rules="[requiredValidation]"
              />
              New password
              <q-input
                v-model="posts.newPassword"
                outlined
                :type="isPwd ? 'password' : 'text'"
                lazy-rules
                :rules="[requiredValidation]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              Confirm Password
              <q-input
                v-model="posts.confirmPassword"
                outlined
                :type="isPwd2 ? 'password' : 'text'"
                lazy-rules
                :rules="[requiredValidation, matchPasswords]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd2 ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd2 = !isPwd2"
                  />
                </template>
              </q-input>
              <!-- <q-input
              v-model="posts.confirmPassword"
              outlined
              @input="validatePasswords"
              :rules="[requiredValidation, matchPasswords]"
            /> -->
            </q-card-section>
            <q-card-section class="text-center">
              <q-btn
                type="submit"
                color="primary"
                icon="key"
                label="RESET PASSWORD"
                class="full-width"
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
  name: "ResetPassword",
  data() {
    return {
      isPwd: true,
      isPwd2: true,
      posts: {
        studentno: "",
        otp: null,
        newPassword: "",
        confirmPassword: "",
        passwordsMatch: true,
        hash: "",
        mobileno: null,
      },
    };
  }, //END OF DATA LIFE CYCLE HOOKS
  mounted() {
    const studentNumber = this.$route.params.studentno;
    this.posts.studentno = studentNumber;
    // const hash = this.$route.params.hash;
    // const mobileno = this.$route.params.mobile;
    // this.posts.studentno = studentNumber;
    // this.posts.hash = hash;
    // this.posts.mobileno = mobileno;
  },
  methods: {
    async resetPassword() {
      const response = await this.$store.dispatch(
        "users/resetPassword",
        this.posts
      );
      console.log("CHANGE PASS: ", response);

      if (response.otpAuth === "success") {
        this.$q.notify({
          message: "Successfully changed password",
          position: "top",
          type: "positive",
        });
        setTimeout(() => {
          this.$router.push("/");
        }, 3000);
      }
    },

    ///SIMULA DITO ETO YUNG MGA PANG VALIDATION KO
    matchPasswords(value) {
      return value === this.posts.newPassword || "Passwords do not match";
    },
    requiredValidation(value) {
      return !!value || "This field is required";
    },
  }, //END OF METHODS LIFE CYCLE HOOKS
};
</script>

<style lang="scss" scoped>
.body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* background: #1f1f47; */

  background-image: url("../assets/uerm-background.jpg");
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
