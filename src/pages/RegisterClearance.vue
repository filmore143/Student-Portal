<template>
  <div class="row">
    <div class="col-12 col-md">
      <div class="fit flex flex-center" v-if="loading">
        <q-spinner-hourglass color="primary" size="150px" />
      </div>
      <q-card class="register-card" v-else>
        <div
          class="col-12 col-md text-center text-h4 text-weight-thin text-white bg-primary q-py-md"
        >
          REGISTRATION FOR STUDENT CLEARANCE
        </div>
        <q-card-section>
          <div>
            <q-form
              @submit.prevent="clearanceRegister()"
              method="posts"
              class="q-gutter-md"
            >
              <q-card flat>
                <q-card-section
                  class="bg-blue-grey-2 text-caption text-weight-bold q-mt-xl"
                >
                  EDUCATIONAL BACKGROUND
                </q-card-section>
              </q-card>

              <div class="row justify-evenly q-gutter-md">
                <div class="col-12 col-md">
                  Last School Attended
                  <span class="text-weight-bold text-red">*</span>
                  <Schools
                    :initialValue="initialSchoolAttended"
                    @valueChanged="handleSchoolAttended"
                  />
                </div>
                <div class="col-12 col-md">
                  Degree Program Obtained
                  <span class="text-weight-bold text-red">*</span>
                  <q-input
                    v-model="posts.degreeProgramObtained"
                    debounce="500"
                    filled
                    :rules="[requiredValidation]"
                  />
                </div>
              </div>

              <div class="row justify-evenly q-gutter-md">
                <div class="col-12 col-md">
                  Date of Graduation
                  <span class="text-weight-bold text-red">*</span>
                  <q-input
                    stack-label
                    filled
                    v-model="posts.dateOfGraduation"
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
                          <q-date v-model="posts.dateOfGraduation">
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

              <q-card flat>
                <q-card-section
                  class="bg-blue-grey-2 text-caption text-weight-bold"
                >
                  CONTACT INFORMATION
                </q-card-section>
              </q-card>

              <div class="row justify-evenly q-gutter-md">
                <div class="col-12 col-md">
                  Email
                  <span class="text-weight-bold text-red">*</span>
                  <q-input
                    v-model="posts.email"
                    debounce="500"
                    filled
                    :rules="[requiredValidation, validateEmail]"
                  />
                </div>
                <div class="col-12 col-md">
                  Mobile No.
                  <span class="text-weight-bold text-red">*</span>
                  <q-input
                    v-model="posts.mobileNo"
                    filled
                    debounce="500"
                    :rules="[requiredValidation, numberValidation]"
                  />
                </div>
                <div class="col-12 col-md">
                  Landline Phone No
                  <q-input v-model="posts.landlineNo" filled />
                </div>
              </div>

              <q-card flat>
                <q-card-section
                  class="bg-blue-grey-2 text-caption text-weight-bold"
                >
                  PERMANENT ADDRESS
                </q-card-section>
              </q-card>
              <div class="row justify-evenly q-gutter-md">
                <div class="col-12 col-md">
                  Country
                  <span class="text-weight-bold text-red">*</span>
                  <CountrySuggestion
                    :initialValue="'PHILIPPINES'"
                    @valueChanged="handleCountryChange"
                  />
                </div>
              </div>

              <!--IF PHILIPPINES-->
              <div class="q-mx-lg" v-if="isPhilippines">
                <div>
                  <div class="row justify-evenly q-gutter-md">
                    <div class="col-12 col-md">
                      Unit Number / Room No, Floor
                      <q-input v-model="posts.roomNo" filled />
                    </div>
                    <div class="col-12 col-md">
                      Lot No., Block No., Phase No., House No.
                      <q-input v-model="posts.lotNo" filled />
                    </div>
                    <div class="col-12 col-md">
                      Street Name
                      <q-input v-model="posts.street" filled />
                    </div>
                    <div class="col-12 col-md">
                      Barangay
                      <q-input v-model="posts.barangay" filled />
                    </div>
                  </div>

                  <div class="row justify-evenly q-gutter-md">
                    <div class="col-12 col-md">
                      Region
                      <span class="text-weight-bold text-red">*</span>
                      <Region
                        :initialValue="initialRegion"
                        @valueChanged="handleRegionChange"
                      />
                    </div>
                    <div class="col-12 col-md">
                      Province
                      <span class="text-weight-bold text-red">*</span>
                      <Provinces
                        :region="posts.region"
                        :initialValue="initialProvinces"
                        @valueChanged="handleProvincesChange"
                      />
                    </div>
                    <div class="col-12 col-md">
                      City/Municipality/Town
                      <span class="text-weight-bold text-red">*</span>
                      <City
                        :shortCode="shortCode"
                        :initalValue="initialCities"
                        @valueChanged="handleCitiesChange"
                      />
                    </div>
                    <div class="col-12 col-md">
                      Zip Code
                      <q-input v-model="posts.zipcode" filled />
                    </div>
                  </div>

                  <div class="row justify-evenly q-gutter-md">
                    <div class="col-12 col-md">
                      Full Address
                      <span class="text-weight-bold text-red">*</span>
                      <q-input
                        v-model="posts.fullAddress"
                        filled
                        :rules="[requiredValidation]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <!--END OF IF PHILIPPINES-->

              <!--IF NOT PHILIPPINES-->
              <div class="q-mx-lg" v-else>
                <div class="col-12 col-md">
                  Full Address
                  <span class="text-weight-bold text-red">*</span>
                  <q-input v-model="posts.fullAddress" filled />
                </div>
              </div>
              <!--END OF NOT PHILIPPINES-->

              <q-card flat>
                <q-card-section
                  class="bg-blue-grey-2 text-caption text-weight-bold"
                >
                  PURPOSE
                </q-card-section>
              </q-card>

              <div class="row justify-evenly q-gutter-md">
                <div class="col-12 col-md">
                  Reason for Clearance
                  <span class="text-weight-bold text-red">*</span>
                  <q-select
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    filled
                    v-model="posts.type"
                    :options="reasons"
                    :rules="[requiredValidation]"
                  />
                </div>
              </div>

              <div class="row justify-end q-pt-md">
                <q-btn
                  type="submit"
                  color="primary"
                  class="q-mx-md"
                  label="Register"
                  size="15px"
                />
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
import { onBeforeUnmount } from "vue";
import { LocalStorage, Cookies, QSpinnerHourglass, useQuasar } from "quasar";
import { mapGetters } from "vuex";

import Schools from "../components/AutoSuggestion/SchoolsSuggestion.vue";
import CountrySuggestion from "../components/AutoSuggestion/CountrySuggestion.vue";
import Region from "../components/AutoSuggestion/RegionSuggestion.vue";
import Provinces from "../components/AutoSuggestion/ProvinceSuggestion.vue";
import City from "../components/AutoSuggestion/CitySuggestion.vue";

// import ClearanceTracking from "../components/Clearance/ClearanceTracking.vue"

export default {
  name: "registrationPage",
  components: {
    Schools,
    CountrySuggestion,
    Region,
    Provinces,
    City,
    // ClearanceTracking
  },
  data() {
    var studentno = Cookies.get("studentnumber");
    const $q = useQuasar();
    let timer;
    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer);
        $q.loading.hide();
      }
    });
    return {
      initialSchoolAttended: "",
      initialRegion: "",
      initialProvinces: "",
      initialCities: "",
      shortCode: "",
      reasons: ["Graduating Student"],
      posts: {
        lastSchoolAttended: "",
        degreeProgramObtained: "",
        dateOfGraduation: "",
        email: "",
        mobileNo: null,
        landlineNo: null,
        country: "",
        roomNo: "",
        lotNo: "",
        street: "",
        barangay: "",
        region: "",
        province: "",
        city: "",
        zipcode: "",
        fullAddress: "",
        type: null,
      },
      studentnumber: "",
      autogrow: true,
      studentno,
      timer,
      loading: true, // Initial loading state,
    };
  },
  methods: {
    async clearanceRegister() {
      this.$q
        .dialog({
          title: "DO YOU WANT TO CONTINUE?",
          ok: {
            push: true,
            color: "primary",
            label: "Register",
          },
          cancel: {
            flat: true,
            color: "primary",
          },
          persistent: true,
        })
        .onOk(async () => {
          const response = await this.$store.dispatch(
            "clearance/registerClearance",
            this.posts
          );
          const degreeProgram = this.student.course;

          if (response.error) {
            this.$router.push("/");
            localStorage.removeItem("access_token");
            // this.$q.notify({
            //   message: "Session Expired!",
            //   position: "top",
            //   type: "negative",
            // });
          } else if (response.type == "Withdrawal of Enrollment") {
            this.$q.loading.show({
              spinner: QSpinnerHourglass,
              spinnerColor: "primary",
              spinnerSize: 140,
            });
            this.timer = setTimeout(() => {
              this.$q.loading.hide();
              this.timer = void 0;
              this.$router.push("/withdrawal");
            }, 3000);
          } else if (
            response.type == "Graduating Student" &&
            degreeProgram === "MD  "
          ) {
            this.$q.notify({
              message: "Successfully registered",
              position: "top",
              type: "positive",
            });
            this.timer = setTimeout(() => {
              this.$q.loading.hide();
              this.timer = void 0;
              // this.$router.push("/graduating-medical-students");
              this.$router.push("/students/clearance-tracking");
            }, 3000);
          } else if (response.type == "Graduating Student") {
            this.$q.notify({
              message: "Successfully registered",
              position: "top",
              type: "positive",
            });
            this.timer = setTimeout(() => {
              this.$q.loading.hide();
              this.timer = void 0;
              this.$router.push("clearance-tracking");
            }, 3000);
          } else {
            this.$q.notify({
              message: "Did not successfully registered",
              position: "top",
              type: "negative",
            });
          }
        })
        .onCancel(() => {
          console.log("Cancel");
        });
    }, //END OF CLEARANCE REGISTER

    handleSchoolAttended(val) {
      this.posts.lastSchoolAttended = val;
    },

    handleCountryChange(val) {
      this.posts.country = val;
    },

    handleRegionChange(val) {
      this.posts.region = val;
    },

    handleProvincesChange(province) {
      this.posts.province = province.val;
      this.shortCode = province.shortCode;
    },

    handleCitiesChange(val) {
      this.posts.city = val;
    },

    async checkExistingClearance() {
      const result = await this.$store.dispatch(
        "clearance/checkIfClearanceExist"
      );
      this.validateClearanceIfExist = result.result;
      if (
        LocalStorage.getItem("access_token") &&
        this.validateClearanceIfExist == 0
      ) {
        await this.$store.dispatch("users/setUserData");
        this.$router.push("/students/register-clearance");
      } else if (
        LocalStorage.getItem("access_token") &&
        this.validateClearanceIfExist != 0
      ) {
        await this.$store.dispatch("users/setUserData");
        this.$router.push("/students/clearance-tracking");
      } else {
        localStorage.removeItem("access_token");
        // this.$q.notify({
        //   message: "Session Expired!",
        //   position: "bottom",
        //   type: "negative",
        // });
        this.$router.push("/");
        // window.location.href = "https://www.uerm.edu.ph/apps/portal/student";
      }
    }, //END OF checkExisitingClearance METHOD

    numberValidation(value) {
      const isValidNumber = !isNaN(value) && value !== "" && value !== null;
      return isValidNumber || "Please enter a valid number";
    },

    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.posts.email)) {
        return "Invalid email format";
        // this.$q.notify({
        //   color: "negative",
        //   position: "top",
        //   message: "Invalid email format",
        // });
      }
    },

    requiredValidation(value) {
      return !!value || "This field is required";
    },

    loadingMethod() {
      setTimeout(() => {
        this.loading = false; // Set loading state to false once data is fetched
      }, 1500);
    },
  }, //END OF METHOD HOOKS
  computed: {
    isPhilippines() {
      return this.posts.country === "PHILIPPINES";
    },
    updatedFullAddress() {
      const parts = [
        this.posts.roomNo,
        this.posts.lotNo,
        this.posts.street,
        this.posts.barangay,
        this.posts.city,
        this.posts.province,
        this.posts.region,
        this.posts.zipcode,
      ];
      return parts.filter((part) => part.trim() !== "").join(", ");
    },
    ...mapGetters({
      student: ["users/userAccount"],
    }),
  }, //END OF COMPUTED HOOKS
  watch: {
    isPhilippines() {
      return this.posts.country === "PHILIPPINES";
    },
    updatedFullAddress(newVal) {
      this.posts.fullAddress = newVal;
    },
    country(newVal) {
      if (newVal !== "PHILIPPINES") {
        this.posts.fullAddress = "";
      }
    },
  },
  created() {
    this.checkExistingClearance();
    this.loadingMethod();
    this.posts.country = "PHILIPPINES";
  },
};
</script>
<style scoped></style>
