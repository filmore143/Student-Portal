<template>
  <!-- <q-dialog v-model="show" full-width full-height> -->
  <div>
    <q-card class="register-card">
      <!-- <div
        class="col-12 col-md q-pa-lg text-center text-h4 text-weight-thin text-white bg-primary q-py-md"
      >
        PERSONAL INFORMATION
      </div> -->
      <!-- <q-btn dense flat icon="close" class="q-my-md" v-close-popup>
          <q-tooltip class="bg-negative text-white">CLOSE</q-tooltip>
        </q-btn> -->
      <q-card-section>
        <div>
          <q-form
            @submit.prevent="submitForm()"
            method="posts"
            class="q-gutter-md"
          >
            <q-card flat>
              <q-card-section
                class="bg-blue-grey-2 text-caption tesxt-weight-bold q-mt-lg"
              >
                STUDENT INFORMATION
              </q-card-section>

              <!-- <pre>
              {{ this.previousData.city }}
             </pre
              > -->
            </q-card>

            <div class="row justify-evenly">
              <div class="col-12 col-6"></div>
              <div class="col-12 col-6"></div>
            </div>

            <div class="q-mx-lg">
              <div>
                <div class="row justify-evenly q-gutter-md">
                  <!-- <div class="col-12 col-md">
                    <pre>{{ this.studentInfo }}</pre>
                  </div> -->

                  <div class="col-12 col-md">
                    Birth Date
                    <q-input
                      disable
                      filled
                      v-model="this.studentInfo.birthDate"
                    />
                  </div>
                  <div class="col-12 col-md">
                    Birth Place
                    <q-input
                      disable
                      filled
                      v-model="this.studentInfo.birthPlace"
                    />
                  </div>
                  <div class="col-12 col-md-5">
                    Sex
                    <q-input disable filled v-model="this.studentInfo.sex" />
                  </div>
                </div>

                <div class="row justify-evenly q-gutter-md">
                  <div class="col-12 col-md q-mt-xl">
                    Personal Email
                    <span class="text-weight-bold text-red">*</span>
                    <q-input
                      v-model="posts.personalEmail"
                      filled
                      :rules="[requiredValidation, validateEmail]"
                    />
                  </div>
                  <div class="col-12 col-md q-mt-xl">
                    Mobile No
                    <span class="text-weight-bold text-red">*</span>
                    <q-input
                      v-model="posts.mobileNumber"
                      filled
                      :rules="[
                        requiredValidation,
                        numberValidation,
                        validateMobileNumber,
                      ]"
                      hint="Begins in 09"
                    />
                  </div>
                  <div class="col-12 col-md q-mt-xl">
                    Landline No
                    <q-input v-model="posts.landline" filled />
                  </div>
                  <div class="col-12 col-md q-mt-xl">
                    Viber Number
                    <span class="text-weight-bold text-red">*</span>
                    <q-input
                      v-model="posts.viber"
                      filled
                      :rules="[
                        requiredValidation,
                        numberValidation,
                        validateMobileNumber,
                      ]"
                      hint="Begins in 09"
                    />
                  </div>
                  <div
                    class="col-12 col-md-1 text-red text-weight-bold"
                    v-if="isIdVisible"
                  >
                    <!-- <q-img
                      class="q-mt-md"
                      style="height: 170px; max-width: 150px"
                      :src="`https://iehr.uerm.edu.ph/users/public-picture/${this.studentInfo.sn}`"
                    />
                    <br /> -->
                    <br />
                    Do you want to retain your current ID Picture?
                    <q-checkbox
                      v-model="posts.stillThisPicture"
                      color="primary"
                    />
                  </div>
                </div>

                <div class="row justify-evenly q-gutter-md">
                  <div class="col-12 col-md">
                    Unit Number / Room No, Floor
                    <q-input v-model="posts.roomNo" filled />
                  </div>
                  <div class="col-12 col-md">
                    Lot No., Block No., Phase No., House No.
                    <span class="text-weight-bold text-red">*</span>
                    <q-input
                      v-model="posts.lotNo"
                      filled
                      :rules="[requiredValidation]"
                    />
                  </div>
                  <div class="col-12 col-md">
                    Street Name
                    <span class="text-weight-bold text-red">*</span>
                    <q-input
                      v-model="posts.street"
                      filled
                      :rules="[requiredValidation]"
                    />
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
                      :initialValue="posts.region"
                      @valueChanged="handleRegionChange"
                    />
                  </div>
                  <div class="col-12 col-md">
                    Province
                    <span class="text-weight-bold text-red">*</span>
                    <Provinces
                      :region="posts.region"
                      :initialValue="posts.province"
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
                    <q-input v-model="posts.zipCode" filled />
                  </div>
                </div>

                <div class="row justify-evenly q-gutter-md">
                  <div class="col-12 col-md">
                    Full Address
                    <q-input
                      v-model="posts.fullAddress"
                      filled
                      :rules="[requiredValidation]"
                      disable
                    />
                  </div>
                </div>
              </div>
            </div>

            <q-card flat>
              <q-card-section
                class="bg-blue-grey-2 text-caption text-weight-bold q-mt-lg"
              >
                MOTHER INFORMATION
              </q-card-section>
            </q-card>

            <div class="q-mx-lg">
              <div class="row justify-evenly q-gutter-md">
                <div class="col-12 col-md">
                  Name
                  <q-input
                    v-model="posts.motherName"
                    filled
                    :disable="
                      this.posts.motherName === ''
                        ? this.posts.motherName
                        : true
                    "
                  />
                </div>
                <div class="col-12 col-md">
                  Mobile No
                  <q-input
                    v-model="posts.motherMobileNo"
                    filled
                    hint="begins in 09"
                    :disable="
                      this.posts.motherMobileNo === ''
                        ? this.posts.motherMobileNo
                        : true
                    "
                  />
                </div>
              </div>
            </div>

            <div class="q-mx-lg">
              <div class="row justify-evenly q-gutter-md">
                <div class="col-12 col-md">
                  Landline No
                  <q-input v-model="posts.motherLandlineNo" filled />
                </div>
                <div class="col-12 col-md">
                  Email
                  <q-input v-model="posts.motherEmail" filled />
                  <br />
                </div>
              </div>

              <div class="q-mx-lg">
                <div class="row q-mb-md">
                  <div class="col-12 col-md text-weight-bold">
                    Please check all the questions that apply to your mother.
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 col-md-12">
                    Is your mother a UERM alumni?
                    <q-checkbox v-model="posts.isUERMalumni" color="primary" />
                  </div>
                  <div class="col-12 col-md-12">
                    Is your mother a present UERM Faculty or Employee?
                    <q-checkbox
                      v-model="posts.isUERMFacultyEmployee"
                      color="primary"
                    />
                  </div>
                  <div class="col-12 col-md-12">
                    Is your mother a UE alumni?
                    <q-checkbox v-model="posts.isUEalumni" color="primary" />
                  </div>
                  <div class="col-12 col-md-12">
                    Is your mother a present UE Faculty or Employee?
                    <q-checkbox
                      v-model="posts.isUEFacultyEmployee"
                      color="primary"
                    />
                  </div>
                </div>
              </div>

              <div class="q-mx-lg">
                <div class="row">
                  <div class="col-12 col-md" v-if="posts.isUERMalumni">
                    UERM Alumni Class
                    <q-input
                      filled
                      v-model="posts.alumniClass"
                      color="primary"
                    />
                    UERM Alumni Degree Program
                    <q-input
                      filled
                      v-model="posts.alumniDegreeProgram"
                      color="primary"
                    />
                  </div>
                </div>
              </div>
              <div class="q-mx-lg">
                <div class="row">
                  <div class="col-12 col-md" v-if="posts.isUERMFacultyEmployee">
                    UERM College/Degree/Office
                    <q-input
                      filled
                      v-model="posts.UERMDepartment"
                      color="primary"
                    />
                  </div>
                </div>
              </div>

              <div class="q-mx-lg">
                <div class="row">
                  <div class="col-12 col-md" v-if="posts.isUEalumni">
                    UE Alumni Class
                    <q-input
                      filled
                      v-model="posts.UEalumniClass"
                      color="primary"
                    />
                    UE Alumni Degree Program
                    <q-input
                      filled
                      v-model="posts.UEalumniDegreeProgram"
                      color="primary"
                    />
                  </div>
                </div>
              </div>

              <div class="q-mx-lg">
                <div class="row">
                  <div class="col-12 col-md" v-if="posts.isUEFacultyEmployee">
                    UE College/Degree/Office
                    <q-input
                      filled
                      v-model="posts.UEDepartment"
                      color="primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <q-card flat>
              <q-card-section
                class="bg-blue-grey-2 text-caption text-weight-bold q-mt-lg"
              >
                FATHER PROFILE
              </q-card-section>
            </q-card>

            <div class="q-mx-lg">
              <div>
                <div class="row justify-evenly q-gutter-md">
                  <div class="col-12 col-md">
                    Name
                    <q-input
                      v-model="this.studentInfo.father"
                      filled
                      :disable="
                        this.studentInfo.father === ''
                          ? this.studentInfo.father
                          : true
                      "
                    />
                  </div>
                  <div class="col-12 col-md">
                    Mobile No
                    <q-input
                      v-model="posts.fatherMobileNo"
                      filled
                      hint="begins in 09"
                      :disable="
                        this.posts.fatherMobileNo === ''
                          ? this.posts.fatherMobileNo
                          : true
                      "
                    />
                  </div>
                </div>

                <div class="row justify-evenly q-gutter-md">
                  <div class="col-12 col-md">
                    Landline No
                    <q-input
                      v-model="posts.fatherLandlineNo"
                      filled
                      :disable="
                        this.posts.fatherLandlineNo === ''
                          ? this.posts.fatherLandlineNo
                          : true
                      "
                    />
                  </div>
                  <div class="col-12 col-md">
                    Email
                    <q-input
                      v-model="posts.fatherEmail"
                      filled
                      :disable="
                        this.posts.fatherEmail === ''
                          ? this.posts.fatherEmail
                          : true
                      "
                    />
                  </div>
                </div>
              </div>

              <div class="q-mx-lg">
                <div class="row q-mb-md">
                  <div class="col-12 col-md text-weight-bold">
                    Please check all the questions that apply to your father.
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 col-md-12">
                    Is your father a UERM alumni?
                    <q-checkbox
                      v-model="posts.fatherIsUERMalumni"
                      color="primary"
                    />
                  </div>
                  <div class="col-12 col-md-12">
                    Is your father a UERM faculty member or employee?
                    <q-checkbox
                      v-model="posts.fatherIsUERMFacultyEmployee"
                      color="primary"
                    />
                  </div>
                  <div class="col-12 col-md-12">
                    Is your father a UE alumni?
                    <q-checkbox
                      v-model="posts.fatherIsUEalumni"
                      color="primary"
                    />
                  </div>
                  <div class="col-12 col-md-12">
                    Is your father a UE faculty member or employee?
                    <q-checkbox
                      v-model="posts.fatherIsUEFacultyEmployee"
                      color="primary"
                    />
                  </div>
                </div>
              </div>

              <div class="q-mx-lg">
                <div class="row">
                  <div class="col-12 col-md" v-if="posts.fatherIsUERMalumni">
                    UERM Alumni Class
                    <q-input
                      filled
                      v-model="posts.fatherAlumniClass"
                      color="primary"
                    />
                    UERM Alumni Degree Program
                    <q-input
                      filled
                      v-model="posts.fatherAlumniDegreeProgram"
                      color="primary"
                    />
                  </div>
                </div>
              </div>

              <div class="q-mx-lg">
                <div class="row">
                  <div
                    class="col-12 col-md"
                    v-if="posts.fatherIsUERMFacultyEmployee"
                  >
                    UE College/Degree/Office
                    <q-input
                      filled
                      v-model="posts.fatherUERMDepartment"
                      color="primary"
                    />
                  </div>
                </div>
              </div>

              <div class="q-mx-lg">
                <div class="row">
                  <div class="col-12 col-md" v-if="posts.fatherIsUEalumni">
                    UE Alumni Class
                    <q-input
                      filled
                      v-model="posts.fatherUEalumniClass"
                      color="primary"
                    />
                    UE Alumni Degree Program
                    <q-input
                      filled
                      v-model="posts.fatherUEalumniDegreeProgram"
                      color="primary"
                    />
                  </div>
                </div>
              </div>

              <div class="q-mx-lg">
                <div class="row">
                  <div
                    class="col-12 col-md"
                    v-if="posts.fatherIsUEFacultyEmployee"
                  >
                    UE College/Degree/Office
                    <q-input
                      filled
                      v-model="posts.fatherUEDepartment"
                      color="primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!---GUARDIAN INFORMATION-->
            <q-card flat>
              <q-card-section
                class="bg-blue-grey-2 text-caption text-weight-bold q-mt-lg"
              >
                GUARDIAN PROFILE
              </q-card-section>
            </q-card>

            <div class="q-mx-lg">
              <div>
                <div class="row justify-evenly q-gutter-md">
                  <div class="col-12 col-md">
                    First Name
                    <span class="text-weight-bold text-red">*</span>
                    <q-input
                      v-model="posts.guardianFirstName"
                      filled
                      :rules="[requiredValidation]"
                    />
                  </div>
                  <div class="col-12 col-md">
                    Middle Name
                    <q-input v-model="posts.guardianMiddleName" filled />
                  </div>
                  <div class="col-12 col-md">
                    Last Name
                    <span class="text-weight-bold text-red">*</span>
                    <q-input
                      v-model="posts.guardianLastName"
                      filled
                      :rules="[requiredValidation]"
                    />
                  </div>
                </div>
                <div class="row justify-evenly q-gutter-md">
                  <div class="col-12 col-md">
                    Suffix (Optional)
                    <q-input v-model="posts.guardianSuffix" filled />
                  </div>
                  <div class="col-12 col-md">
                    Mobile No
                    <span class="text-weight-bold text-red">*</span>
                    <q-input
                      v-model="posts.guardianMobileNumber"
                      filled
                      :rules="[requiredValidation]"
                    />
                  </div>
                  <div class="col-12 col-md">
                    Landline No
                    <q-input v-model="posts.guardianLandlinNumber" filled />
                  </div>
                </div>
                <div class="row justify-evenly q-gutter-md">
                  <div class="col-12 col-md">
                    Unit Number / Room No, Floor
                    <q-input v-model="posts.guardianRoomNo" filled />
                  </div>
                  <div class="col-12 col-md">
                    Lot No., Block No., Phase No., House No.
                    <!-- <span class="text-weight-bold text-red">*</span> -->
                    <q-input v-model="posts.guardianLotNo" filled />
                  </div>
                  <div class="col-12 col-md">
                    Street Name
                    <span class="text-weight-bold text-red">*</span>
                    <q-input
                      v-model="posts.guardianStreet"
                      filled
                      :rules="[requiredValidation]"
                    />
                  </div>
                  <div class="col-12 col-md">
                    Barangay
                    <q-input v-model="posts.guardianBarangay" filled />
                  </div>
                </div>

                <div class="row justify-evenly q-gutter-md">
                  <div class="col-12 col-md">
                    Region
                    <span class="text-weight-bold text-red">*</span>
                    <Region
                      :initialValue="posts.guardianRegion"
                      @valueChanged="handleGuardianRegionChange"
                    />
                  </div>
                  <div class="col-12 col-md">
                    Province
                    <span class="text-weight-bold text-red">*</span>
                    <Provinces
                      :region="posts.guardianRegion"
                      :initialValue="posts.guardianProvince"
                      @valueChanged="handleGuardianProvincesChange"
                    />
                  </div>
                  <div class="col-12 col-md">
                    City/Municipality/Town
                    <span class="text-weight-bold text-red">*</span>
                    <City
                      :shortCode="guardianShortCode"
                      :initalValue="initialGuardianCities"
                      @valueChanged="handleGuardianCitiesChange"
                    />
                  </div>
                  <div class="col-12 col-md">
                    Zip Code
                    <q-input v-model="posts.guardianZipCode" filled />
                  </div>
                </div>
                <div class="row justify-evenly q-gutter-md">
                  <div class="col-12 col-md">
                    Full Address
                    <q-input
                      v-model="posts.guardianFullAddress"
                      filled
                      :rules="[requiredValidation]"
                      disable
                    />
                  </div>
                </div>

                <q-card flat>
                  <q-card-section
                    class="bg-blue-grey-2 text-caption text-weight-bold q-mt-lg"
                  >
                    EMERGENCY CONTACT
                  </q-card-section>
                </q-card>

                <div class="q-mx-lg">
                  <div>
                    <div class="row justify-evenly q-gutter-md q-mt-xl">
                      <div class="col-12 col-md">
                        First Name
                        <span class="text-weight-bold text-red">*</span>
                        <q-input
                          v-model="posts.emergencyFirstName"
                          filled
                          :rules="[requiredValidation]"
                          :disable="
                            this.posts.emergencyFirstName === ''
                              ? this.posts.emergencyFirstName
                              : true
                          "
                        />
                      </div>
                      <div class="col-12 col-md">
                        Middle Name
                        <q-input
                          v-model="posts.emergencyMiddleName"
                          filled
                          :disable="
                            this.posts.emergencyMiddleName === ''
                              ? this.posts.emergencyMiddleName
                              : true
                          "
                        />
                      </div>
                      <div class="col-12 col-md">
                        Last Name
                        <span class="text-weight-bold text-red">*</span>
                        <q-input
                          v-model="posts.emergencyLastName"
                          filled
                          :rules="[requiredValidation]"
                          :disable="
                            this.posts.emergencyLastName === ''
                              ? this.posts.emergencyLastName
                              : true
                          "
                        />
                      </div>
                      <div class="col-12 col-md">
                        Mobile No
                        <span class="text-weight-bold text-red">*</span>
                        <q-input
                          v-model="posts.emergencyMobile"
                          filled
                          :rules="[requiredValidation, validateMobileNumber]"
                          hint="begins in 09"
                          :disable="
                            this.posts.emergencyMobile === ''
                              ? this.posts.emergencyMobile
                              : true
                          "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row justify-end q-mb-lg">
              <q-btn type="submit" label="SUBMIT" color="primary" />
            </div>
          </q-form></div
      ></q-card-section>
    </q-card>
  </div>
  <!-- </q-dialog> -->
</template>

<script>
import Region from "../components/AutoSuggestion/RegionSuggestion.vue";
import Provinces from "../components/AutoSuggestion/ProvinceSuggestion.vue";
import City from "../components/AutoSuggestion/CitySuggestion.vue";
import { mapGetters } from "vuex";
import { Cookies } from "quasar";

export default {
  name: "UpdateProfile",
  components: {
    Region,
    Provinces,
    City,
  },
  data() {
    let studentData = Cookies.get("student_no");
    return {
      isIdVisible: false,
      studentData,
      initialRegion: "",
      initialProvinces: "",
      initialCities: "",
      shortCode: "",
      guardianShortCode: "",
      initialGuardianRegion: "",
      initialGuardianProvinces: "",
      initialGuardianCities: "",
      show: false,
      checkSurvey: false,
      previousData: {
        stillThisPicture: true,
        roomNo: "",
        lotNo: "",
        street: "",
        barangay: "",
        city: "",
        province: "",
        region: "",
        zipCode: "",
        fullAddress: "",
        personalEmail: "",
        mobileNumber: "",
        landline: "",
        viber: "",

        motherName: "",
        motherMobileNo: "",
        motherLandlineNo: "",
        motherEmail: "",
        isUERMalumni: false,
        isUERMFacultyEmployee: false,
        UERMDepartment: "",
        alumniClass: "",
        alumniDegreeProgram: "",
        isUEalumni: false,
        UEalumniClass: "",
        UEalumniDegreeProgram: "",
        isUEFacultyEmployee: false,
        UEDepartment: "",

        fatherMobileNo: "",
        fatherLandlineNo: "",
        fatherEmail: "",
        fatherIsUERMalumni: false,
        fatherIsUERMFacultyEmployee: false,
        fatherIsUEalumni: false,
        fatherIsUEFacultyEmployee: false,
        fatherUERMDepartment: "",
        fatherAlumniClass: "",
        fatherAlumniDegreeProgram: "",
        fatherUEalumniClass: "",
        fatherUEalumniDegreeProgram: "",
        fatherIsUEFacultyEmployee: false,
        fatherUEDepartment: "",

        guardianFirstName: "",
        guardianLastName: "",
        guardianMiddleName: "",
        guardianSuffix: "",
        guardianRoomNo: "",
        guardianLotNo: "",
        guardianStreet: "",
        guardianBarangay: "",
        guardianCity: "",
        guardianProvince: "",
        guardianRegion: "",
        guardianZipCode: "",
        guardianFullAddress: "",
        guardianMobileNumber: "",
        guardianLandlineNumber: "",

        emergencyFirstName: "",
        emergencyMiddleName: "",
        emergencyLastName: "",
        emergencyMobile: "",
      },
      posts: {
        stillThisPicture: true,
        roomNo: "",
        lotNo: "",
        street: "",
        barangay: "",
        city: "",
        province: "",
        region: "",
        zipCode: "",
        fullAddress: "",
        personalEmail: "",
        mobileNumber: "",
        landline: "",
        viber: "",

        motherName: "",
        motherMobileNo: "",
        motherLandlineNo: "",
        motherEmail: "",
        isUERMalumni: false,
        isUERMFacultyEmployee: false,
        UERMDepartment: "",
        alumniClass: "",
        alumniDegreeProgram: "",
        isUEalumni: false,
        UEalumniClass: "",
        UEalumniDegreeProgram: "",
        isUEFacultyEmployee: false,
        UEDepartment: "",

        fatherMobileNo: "",
        fatherLandlineNo: "",
        fatherEmail: "",
        fatherIsUERMalumni: false,
        fatherIsUERMFacultyEmployee: false,
        fatherUERMDepartment: "",
        fatherIsUEalumni: false,
        fatherIsUEFacultyEmployee: false,
        fatherAlumniClass: "",
        fatherAlumniDegreeProgram: "",
        fatherUEalumniClass: "",
        fatherUEalumniDegreeProgram: "",
        fatherIsUEFacultyEmployee: false,
        fatherUEDepartment: "",

        guardianFirstName: "",
        guardianLastName: "",
        guardianMiddleName: "",
        guardianSuffix: "",
        guardianRoomNo: "",
        guardianLotNo: "",
        guardianStreet: "",
        guardianBarangay: "",
        guardianCity: "",
        guardianProvince: "",
        guardianRegion: "",
        guardianZipCode: "",
        guardianFullAddress: "",
        guardianMobileNumber: "",
        guardianLandlineNumber: "",

        emergencyFirstName: "",
        emergencyMiddleName: "",
        emergencyLastName: "",
        emergencyMobile: "",
      },
    };
  },
  methods: {
    async submitForm() {
      // Validate the form here

      const payload = {
        stillThisPicture: this.posts.stillThisPicture,
        roomNo: this.posts.roomNo,
        lotNo: this.posts.lotNo,
        street: this.posts.street,
        barangay: this.posts.barangay,
        city: this.posts.city,
        province: this.posts.province,
        region: this.posts.region,
        zipCode: this.posts.zipCode,
        fullAddress: this.posts.fullAddress,
        personalEmail: this.posts.personalEmail,
        mobileNumber: this.posts.mobileNumber,
        landline: this.posts.landline,
        viber: this.posts.viber,

        motherName: this.studentInfo.mother,
        motherMobileNo: this.posts.motherMobileNo,
        motherLandlineNo: this.posts.motherLandlineNo,
        motherEmail: this.posts.motherEmail,
        isUERMalumni: this.posts.isUERMalumni,
        alumniClass: this.posts.alumniClass,
        alumniDegreeProgram: this.posts.alumniDegreeProgram,
        isUEalumni: this.posts.isUEalumni,
        UEalumniClass: this.posts.UEalumniClass,
        UEalumniDegreeProgram: this.posts.UEalumniDegreeProgram,
        isUEFacultyEmployee: this.posts.isUEFacultyEmployee,
        UEDepartment: this.posts.UEDepartment,

        fatherName: this.studentInfo.father,
        fatherMobileNo: this.posts.fatherMobileNo,
        fatherLandlineNo: this.posts.fatherLandlineNo,
        fatherEmail: this.posts.fatherEmail,
        fatherIsUERMalumni: this.posts.fatherIsUERMalumni,
        fatherIsUEalumni: this.posts.fatherIsUEalumni,
        fatherIsUEFacultyEmployee: this.posts.fatherIsUEFacultyEmployee,
        fatherAlumniClass: this.posts.fatherAlumniClass,
        fatherAlumniDegreeProgram: this.posts.fatherAlumniDegreeProgram,
        fatherUEalumniClass: this.posts.fatherUEalumniClass,
        fatherUEalumniDegreeProgram: this.posts.fatherUEalumniDegreeProgram,
        fatherIsUEFacultyEmployee: this.posts.fatherIsUEFacultyEmployee,
        fatherUEDepartment: this.posts.fatherUEDepartment,

        guardianFirstName: this.posts.guardianFirstName,
        guardianLastName: this.posts.guardianLastName,
        guardianMiddleName: this.posts.guardianMiddleName,
        guardianSuffix: this.posts.guardianSuffix,
        guardianRoomNo: this.posts.guardianRoomNo,
        guardianLotNo: this.posts.guardianLotNo,
        guardianStreet: this.posts.guardianStreet,
        guardianBarangay: this.posts.guardianBarangay,
        guardianCity: this.posts.guardianCity,
        guardianProvince: this.posts.guardianProvince,
        guardianRegion: this.posts.guardianRegion,
        guardianZipCode: this.posts.guardianZipCode,
        guardianFullAddress: this.posts.guardianFullAddress,
        guardianMobileNumber: this.posts.guardianMobileNumber,
        guardianLandlineNumber: this.posts.guardianLandlineNumber,

        emergencyFirstName: this.posts.emergencyFirstName,
        emergencyMiddleName: this.posts.emergencyMiddleName,
        emergencyLastName: this.posts.emergencyLastName,
        emergencyMobile: this.posts.emergencyMobile,
      };

      const response = await this.$store.dispatch(
        "users/personalInformatiom",
        payload
      );

      if (response.message === "Already submitted") {
        this.$q.notify({
          color: "negative",
          message: "You already submitted!",
          position: "top",
        });
        return;
      }

      if (response.error) {
        this.$q.notify({
          color: "negative",
          message: "Something went wrong!",
          position: "top",
        });
        return;
      }

      if (response.length !== 0) {
        this.$q.notify({
          color: "positive",
          message: "Successfully submitted",
          position: "top",
        });
        // this.show = false;
      } else {
        this.$q.notify({
          color: "negative",
          message: "Something went wrong!",
          position: "top",
        });
      }
    }, //end of submitForm
    async getPersonalData() {
      const response = await this.$store.dispatch(
        "users/getPersonalInformatiom"
      );
      if (response[0].personalEmail === null) {
        return; // Exit if no data is found
      }

      const dataToAssign = Array.isArray(response) ? response[0] : response;
      Object.assign(this.posts, dataToAssign);
      this.previousData = dataToAssign;
    },

    // async checkIfAlreadySubmittedPersonalInformation() {
    //   const payload = {
    //     studentno: this.studentData,
    //   };
    //   const response = await this.$store.dispatch(
    //     "users/checkIfAlreadySubmittedPersonalInformation",
    //     payload
    //   );

    //   if (response.length == 0 && this.studentInfo.yearLevel !== 1) {
    //     this.show = true;
    //   } else {
    //     this.show = false;
    //   }
    // },

    handleRegionChange(val) {
      if (!val) {
        console.error("Invalid region:", val);
        return;
      }
      this.posts.region = val;
    },

    async handleProvincesChange(province) {
      // this.posts.province = province;
      // this.shortCode = province.shortCode;
      // this.posts.city = "";
      if (province && province.val && province.shortCode) {
        this.posts.province = province.val;
        this.shortCode = province.shortCode;

        this.posts.city = "";
      } else {
        console.error("Invalid province data:", province);
      }
    },

    handleCitiesChange(val) {
      this.posts.city = val;
    },

    ///for guardian
    handleGuardianRegionChange(val) {
      this.posts.guardianRegion = val;
    },
    handleGuardianProvincesChange(guardianProvince) {
      this.posts.guardianProvince = guardianProvince.val;
      this.guardianShortCode = guardianProvince.shortCode;
    },
    handleGuardianCitiesChange(val) {
      this.posts.guardianCity = val;
    },
    requiredValidation(value) {
      return !!value || "This field is required";
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.posts.personalEmail)) {
        return "Invalid email format";
      }
    },
    numberValidation(value) {
      const isValidNumber = !isNaN(value) && value !== "" && value !== null;
      return isValidNumber || "Please enter a valid number";
    },
    validateMobileNumber(value) {
      const regex = /^09\d{9}$/;
      return regex.test(value) || "Invalid mobile number"; // Magbabalik ng error message kung hindi valid
    },
  }, //end of method
  computed: {
    updatedFullAddress() {
      const parts = [
        this.posts.lotNo,
        this.posts.street,
        this.posts.barangay,
        this.posts.city,
      ];
      return parts;

      // return parts.filter((part) => part.trim() !== "").join(", ");
    },
    updateGuardianFullAddress() {
      const guardian = [
        this.posts.guardianLotNo,
        this.posts.guardianStreet,
        this.posts.guardianBarangay,
        this.posts.guardianCity,
      ];
      return guardian;
    },
    ...mapGetters({
      studentInfo: "users/userAccount",
    }),
  },
  watch: {
    updatedFullAddress(newVal) {
      this.posts.fullAddress = newVal;
    },
    updateGuardianFullAddress(newVal) {
      this.posts.guardianFullAddress = newVal;
    },
  }, //end of watch
  created() {
    // this.checkIfAlreadySubmittedPersonalInformation();
    this.getPersonalData();
  }, //end of created
  mounted() {},
};
</script>
<style scoped>
.q-dialog__inner {
  width: 90vw;
  max-width: 90vw;
  max-height: 90vh;
}
.fixed-btn-container {
  position: fixed;
  bottom: 16px;
  right: 50px;
  z-index: 100;
}
</style>
