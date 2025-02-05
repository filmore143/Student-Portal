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
              <!-- <div class="rowq-gutter-md">
              <div class="col-12 col-md"> -->
              UERM E-mail
              <q-input
                v-model="posts.uermEmail"
                outlined
                placeholder="sample@uerm.edu.ph"
                :rules="[requiredValidation]"
              />
              <!-- </div>
              <div class="col-12 col-md"> -->
              Personal E-mail
              <q-input
                v-model="posts.personalEmail"
                outlined
                placeholder="sample@gmail.com"
                :rules="[requiredValidation]"
              />
              Mobile No
              <q-input
                v-model="posts.mobileNo"
                outlined
                placeholder="Ex. 0975*******"
                :rules="[requiredValidation]"
              />
              Student Number
              <q-input
                v-model="posts.studentno"
                outlined
                :rules="[requiredValidation]"
              />

              Birth Date
              <q-input
                stack-label
                outlined
                v-model="posts.birthDate"
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
                      <q-date v-model="posts.birthDate">
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
              <!-- </div>
            </div> -->
            </q-card-section>
            <q-card-section class="text-center">
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
      <!-- <div class="col-12 col-sm-8 col-md-6 col-lg-4">
        <q-card class="forgot">
          <q-card-section
            class="bg-primary text-white text-center text-6 text-weight-bold"
          >
            RESET PASSWORD
          </q-card-section>
          <q-card-section>
            New password
            <q-input outlined :rules="[requiredValidation]" />
            Confirm Password
            <q-input outlined :rules="[requiredValidation]" />
          </q-card-section>
          <q-card-section class="text-center">
            <q-btn
              color="primary"
              icon="key"
              label="RESET PASSWORD"
              class="full-width"
            />
          </q-card-section>
        </q-card>
      </div> -->
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
        personalEmail: "",
        mobileNo: null,
        studentno: "",
        birthDate: null,
      },
    };
  }, //end of data life cycle hooks
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
    },

    requiredValidation(value) {
      return !!value || "This field is required";
    },
  }, //end pf method life cycle hooks
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
