<template>
  <q-layout>
    <router-view />

    <Announcement v-if="bools.checkAnnouncement" />

    <PersonalInfo v-if="bools.personalInfoDialog" />

    <EnrollmentEvaluation v-if="bools.enrollmentDialog" />
  </q-layout>
</template>

<script>
const util = require("src/util");
import { defineComponent } from "vue";
import { LocalStorage, Cookies } from "quasar";
import Announcement from "src/components/Announcement.vue";

import PersonalInfo from "src/components/PersonalInfo.vue";

import EnrollmentEvaluation from "./components/EnrollmentSurvey.vue";

// import EmailAutologin from "./components/EmailAutoLogin.vue";

import { mapGetters } from "vuex";
export default defineComponent({
  name: "App",
  metaInfo: {
    title: "UERM STUDENT PORTAL",
    meta: [
      {
        name: "Welcome to Student Portal",
        content:
          "University of the East Ramon Magsaysay Memorial Medical Center, Inc. is a non-stock, non-profit corporation that aspires to become a bastion of quality education, service and research in the health sciences advancing health empowerment towards nation building.",
      },
    ],
  },
  components: {
    Announcement,
    PersonalInfo,
    EnrollmentEvaluation,
  },
  data() {
    let studentData = Cookies.get("student_no");
    // let studentAccessToken = LocalStorage.getItem("access_token");
    let validateClearanceIfExist = "";
    return {
      TermsAndAgreementResponse: [],
      studentData,
      getAnnouncement: [],
      acceptAnnouncement: [],
      checkAnnouncement: [],
      visible: false,
      showSimulatedReturnData: false,
      persistent: false,
      validateClearanceIfExist,
      bools: {
        checkAnnouncement: false,
        personalInfoDialog: false,
        enrollmentDialog: false,
      },
      // documentValidation: false,
    };
  },
  methods: {
    async getCookie() {
      // if (
      //   !util.isObjAndEmpty(this.studentInfo) &&
      //   this.studentInfo.semester == "20241" &&
      //   this.studentInfo.college !== "M" &&
      //   this.bools.personalInfoDialog &&
      //   LocalStorage.getItem("access_token")
      // ) {
      //   await this.$store.dispatch("users/setUserData");
      //   this.bools.personalInfoDialog = false;
      //   this.bools.enrollmentDialog = true;
      // } else if (
      //   !util.isObjAndEmpty(this.studentInfo) &&
      //   this.studentInfo.semester == "20241" &&
      //   this.studentInfo.college !== "M" &&
      //   !this.bools.personalInfoDialog &&
      //   LocalStorage.getItem("access_token")
      // ) {
      //   await this.$store.dispatch("users/setUserData");
      //   this.bools.personalInfoDialog = true;
      //   this.bools.enrollmentDialog = false;
      // } else if (!LocalStorage.getItem("access_token")) {
      //   this.bools.personalInfoDialog = false;
      //   this.bools.enrollmentDialog = false;
      // }

      if (LocalStorage.getItem("access_token")) {
        await this.$store.dispatch("users/setUserData");
      } else if (!LocalStorage.getItem("access_token")) {
      }
    }, //END OF getCookie METHOD

    // async checkIfAlreadySubmittedPersonalInformation() {
    //   if (Object.keys(this.studentInfo).length === 0) {
    //     return;
    //   }
    //   const payload = {
    //     studentno: this.studentData,
    //   };
    //   const response = await this.$store.dispatch(
    //     "users/checkIfAlreadySubmittedPersonalInformation",
    //     payload
    //   );

    //   if (response.length == 0 && this.studentInfo.yearLevel !== 1) {
    //     this.bools.personalInfoDialog = true;
    //   } else {
    //     this.bools.personalInfoDialog = false;
    //   }
    // },

    // async checkExistingClearance() {
    //   const result = await this.$store.dispatch(
    //     "clearance/checkIfClearanceExist"
    //   );
    //   this.validateClearanceIfExist = result.result;
    //   if (
    //     LocalStorage.getItem("access_token") &&
    //     this.validateClearanceIfExist == 0
    //   ) {
    //     await this.$store.dispatch("users/setUserData");
    //     this.$router.push("register-clearance");
    //   } else if (
    //     LocalStorage.getItem("access_token") &&
    //     this.validateClearanceIfExist != 0
    //   ) {
    //     await this.$store.dispatch("users/setUserData");
    //     this.$router.push("clearance-tracking");
    //   } else {
    //     this.$router.push("/");
    //     // window.location.href = "https://www.uerm.edu.ph/apps/portal/student";
    //   }
    // }, //END OF checkExisitingClearance METHOD
    // async checkIfAllAnnouncementAccepted() {
    //   const payload = {
    //     studentno: this.studentData,
    //   };
    //   const response = await this.$store.dispatch(
    //     "announcement/checkIfAllAnnouncementAccepted",
    //     payload
    //   );

    //   if (response.result.length > 0) {
    //     let filterNotAgreedAnnc = response.result.filter(
    //       (annc) => annc.studentNo === null
    //     );

    //     if (filterNotAgreedAnnc.length > 0) {
    //       this.bools.checkAnnouncement = true;
    //     }
    //   }
    // }, //END of checkIfAllAnnouncementAccepted
    // async checkIfDocumentsAreCleared() {
    //   const response = await this.$store.dispatch(
    //     "documents/checkIfDocumentsAreCleared"
    //   );
    //   const ret = response.map((docu) => docu.fileData);
    //   const hasNull = ret.includes(null);
    //   this.documentValidation = hasNull;
    //   // console.log("Response from App.vue", hasNull);
    // },
    async getDocuments() {
      const result = await this.$store.dispatch("documents/getDocuments");
      this.allDocuments = result;
    }, ///END OF getDocuments METHOD
  },
  created() {
    this.getCookie();
    // this.checkIfAlreadySubmittedPersonalInformation();
  },
  watch: {
    "$route.name": {
      handler(val) {
        this.getCookie();
        // this.checkIfAlreadySubmittedPersonalInformation();
      },
    },
  },
  computed: {
    ...mapGetters({
      studentInfo: "users/userAccount",
    }),
  },
});
</script>
<style scoped>
.terms-of-agreement {
  position: sticky;
  top: 0;
  z-index: 1; /* Adjust the z-index as needed */
}
.terms-of-agreement-logout {
  margin-top: -20px;
}
</style>
