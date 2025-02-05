<template>
  <q-page class="q-pa-md q-ma-md">
    <!-- <div class="row justify-center q-gutter-xl q-mb-xl">
      <div class="col-12 col-md-3">
        <q-card class="bg-grey-1 text-primary" style="height: 100%">
          <q-card-section class="text-h4 text-weight-bold">
            <q-icon name="menu_book" color="primary" size="4rem" /> MISSION
          </q-card-section>
          <q-card-section class="text-body1">
            Develop outstanding health professionals committed to lifelong
            learning Provide equitable, holistic, and quality health care
            Advance quality research relevant to education and practice of
            health professionals Advocate causes and promote love of country,
            welfare of the people, and preservation of the environment Provide
            services relevant and responsive to the needs of the community
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-3">
        <q-card class="bg-grey-1 text-primary" style="height: 100%">
          <q-card-section class="text-h4 text-weight-bold">
            <q-icon name="menu_book" color="primary" size="4rem" /> VISION
          </q-card-section>
          <q-card-section class="text-body1">
            A bastion of quality education, service and research in the health
            sciences advancing health empowerment towards nation building.
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-3">
        <q-card class="bg-grey-1 text-primary" style="height: 100%">
          <q-card-section class="text-h4 text-weight-bold">
            <q-icon name="menu_book" color="primary" size="4rem" /> CORE VALUES
          </q-card-section>
          <q-card-section class="text-body1">
            <div class="row justify-center">I-ntegrity</div>
            <div class="row justify-center">C-ommitment</div>
            <div class="row justify-center">S-ocial Responsibility</div>
            <div class="row justify-center">C-ompassion</div>
          </q-card-section>
        </q-card>
      </div>
    </div> -->
    <!-- <div class="row justify-center q-gutter-xl q-mb-xl">
      <div class="col-12 col-md-4">
        <q-card class="bg-grey-1 text-primary" style="height: 100%">
          <q-card-section
            class="text-h6 text-weight-bold"
            style="display: flex; align-items: center"
          >
            <q-icon name="menu_book" color="primary" size="4rem" /> LEADER IN
            INNOVATIVE EDUCATIONAL CURRICULUM
          </q-card-section>
          <q-card-section class="text-body1">
            The University of the East Ramon Magsaysay Memorial Medical Center,
            Inc. (UERMMMCI) is both a world-renowned training ground for the
            medical, nursing and physical therapy professions and one of the
            leading health care facilities in the country today. It is a witness
            to the remarkable vision and foresight of its founders.
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card class="bg-grey-1 text-primary" style="height: 100%">
          <q-card-section
            class="text-h6 text-weight-bold"
            style="display: flex; align-items: center"
          >
            <q-icon name="menu_book" color="primary" size="4rem" /> LEADER IN
            UERMMMCI: WHERE ART AND SCIENCE MEET
          </q-card-section>
          <q-card-section class="text-body1">
            The UERM Memorial Medical Center, Inc. believes in the development
            of the healers of tomorrow who are capable of being relevant,
            compassionate, and ethical in the practice of his/her profession.
            Thus, its graduates are imbued not only with technology but with the
            power to continue growing with a commitment to life-long learning.
            Campus activities help to mold him to be relevant and serve as a
            catalyzer, an organizer, and an advocate. He thus learns to practice
            his profession not only as a skilled technician but one who puts art
            in the science of healing. He cares not only for his individual
            patient but the whole community that he serves as well. (Romeo A.
            Divinagracia, M.D.)
          </q-card-section>
        </q-card>
      </div>
    </div> -->

    <!---ETO YUNG SA HANDBOOK-->
    <div class="row justify-around q-gutter-md q-mb-xl">
      <div class="col-12 col-md q-mb-md">
        <q-card class="my-card bg-grey-2" style="width: 350px">
          <q-img
            src="../../assets/FinalBannerStudentAccountBalance-01.jpg"
            @click="bool.showAccountBalanceDialog = true"
            class="clickable-img"
            fit="contain"
          />
        </q-card>
      </div>
      <div class="col-12 col-md q-mb-md">
        <q-card class="my-card bg-grey-2" style="width: 350px">
          <q-img
            src="../../assets/TFPaymentOptions.jpg"
            @click="bool.showPaymentDialog = true"
            class="clickable-img"
            fit="contain"
          />
        </q-card>
      </div>
      <div class="col-12 col-md q-mb-md">
        <q-card class="my-card bg-grey-2" style="width: 350px">
          <q-img
            src="../../assets/c_button_faq-01.png"
            @click="bool.showCanvasDialog = true"
            class="clickable-img"
            fit="contain"
          />
        </q-card>
      </div>
      <div class="col-12 col-md q-mb-md">
        <q-card class="my-card bg-grey-2" style="width: 350px">
          <q-img
            src="../../assets/onlineregs.jpg"
            @click="onlineRegistration"
            class="clickable-img"
            fit="contain"
          />
        </q-card>
      </div>
    </div>

    <!-- <div class="row justify-around q-gutter-md q-mb-xl">
      <div class="col-12 col-md-5 q-mb-md">
        <q-card class="my-card bg-grey-2">
          <q-img
            src="../../assets/c_button_faq-01.png"
            @click="bool.showCanvasDialog = true"
            class="clickable-img"
            fit="contain"
          />
        </q-card>
      </div>
      <div class="col-12 col-md-5 q-mb-md">
        <q-card class="my-card bg-grey-2">
          <q-img
            src="../../assets/onlineregs.jpg"
            @click="onlineRegistration"
            class="clickable-img"
            fit="contain"
          />
        </q-card>
      </div>
    </div> -->

    <q-card style="width: 300px">
      <q-img src="../../assets/studenthanbookicon.jpg"> </q-img>

      <q-card-section>
        Password: <span class="text-weight-bold">[Your student number]</span>
      </q-card-section>
      <q-card-section>
        <!-- <q-btn
          @click="downloadStudentHandbook"
          label="DOWNLOAD"
          color="primary"
          class="full-width"
        /> -->
        <q-btn
          label="DOWNLOAD"
          class="full-width"
          color="primary"
          @click="downloadHandbook"
        />
      </q-card-section>
      <q-card-section>
        Note: Kindly download and print the
        <span class="text-primary">Student and Parents Agreement Form </span>.
        Submit it to the Dean's Office after signed by your parents.
      </q-card-section>
      <q-card-section>
        <q-btn
          label="LIBRARY SATISFACTION SURVEY"
          color="green-8"
          class="full-width"
          @click="openLibrarySurvey"
        />
      </q-card-section>
    </q-card>

    <!--ACCOUNT BALANCE DIALOG-->
    <q-dialog v-model="bool.showAccountBalanceDialog" maximized>
      <q-card>
        <q-card-actions class="bg-primary" align="right">
          <q-btn
            label="Close"
            color="red"
            @click="bool.showAccountBalanceDialog = false"
          />
        </q-card-actions>
        <q-card-section>
          <q-img
            src="../../assets/InstructionsStudentAccountBalance-03.jpg"
            basic
            contain
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!---END OF ACCOUNT BALANCE DIALOG-->

    <!---Payment dialog-->
    <q-dialog v-model="bool.showPaymentDialog" maximized>
      <q-card class="bg-grey-2">
        <q-card-actions class="bg-primary" align="right">
          <q-btn
            label="Close"
            color="red"
            @click="bool.showPaymentDialog = false"
          />
        </q-card-actions>
        <q-card-section class="row justify-center">
          <q-img src="../../assets/paymentOption.png" class="dialog-image" />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!--END OF PAYMENT DIALOG-->

    <!--CANVAS DIALOG-->
    <q-dialog v-model="bool.showCanvasDialog" maximized>
      <q-card class="bg-grey-2">
        <q-card-actions class="bg-primary" align="right">
          <q-btn
            label="Close"
            color="red"
            @click="bool.showCanvasDialog = false"
          />
        </q-card-actions>
        <q-card-section class="q-ml-xl">
          <h2 class="text-h5 text-weight-bold">
            Login Frequently Asked Questions (FAQs)
          </h2>
          <!-- <q-list>
            <q-item v-for="(faq, index) in faqs" :key="index">
              <q-item-section>
                <q-item-label class="text-h6">{{ faq.question }}</q-item-label>
                <q-item-label>{{ faq.answer }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list> -->
          <p>
            <strong>1. What is my login account to access the CANVAS?</strong>
          </p>
          <p class="q-ml-md">
            A. Use your UERM Email account to login to CANVAS.
          </p>

          <p>
            <strong
              >2. What internet browsers are compatible with CANVAS?</strong
            >
          </p>
          <p class="q-ml-md">
            A. CANVAS is compatible with UPDATED Google Chrome, Mozilla Firefox,
            Microsoft Edge, and Opera browsers.
          </p>

          <p>
            <strong
              >3. How to open/navigate my CANVAS dashboard from my UERM Email
              (Desktop/laptop)?</strong
            >
          </p>
          <p class="q-ml-md">
            A. Once logged in your UERM email, click the Google App icon (9
            dots) scroll down to search the UERM Logo with RAMONLINE tag; click
            to open your CANVAS.
          </p>

          <p><strong>4. How to get my UERM Email account?</strong></p>
          <p class="q-ml-md">
            A. Login to your UERM Student Portal; click the Profile menu to view
            your UERM email account and default password.
          </p>

          <p>
            <strong
              >5. My UERM email password is not working/ or I forgot my
              password.</strong
            >
          </p>
          <p class="q-ml-md">
            A. Send an email to canvassupport@uerm.edu.ph using your personal
            email with the following details: Student Number, full name,
            birthdate, and college.
          </p>

          <p><strong>6. Can I access the CANVAS on my mobile?</strong></p>
          <p class="q-ml-md">
            A. Yes, provided that you have downloaded and installed the CANVAS
            Student (for students) or CANVAS Faculty (for faculty) app from
            Google Play/App Store.
          </p>

          <p>
            <strong
              >7. I have successfully accessed my CANVAS account on my mobile
              but cannot access it on my laptop/desktop or vice versa.</strong
            >
          </p>
          <p class="q-ml-md">
            A. You have to login first to your UERM email on your mobile and
            laptop/desktop, and then ADD/SAVE your UERM email account
            credentials.
          </p>

          <p>
            <strong
              >8. Is there any guide for using the CANVAS Learning Management
              System?</strong
            >
          </p>
          <p class="q-ml-md">A. Yes, there is a guide available:</p>
          <ul>
            <li>
              <a
                href="https://community.canvaslms.com/docs/DOC-10701-canvas-student-guide-table-of-contents"
                target="_blank"
                >CANVAS Student Guide</a
              >
            </li>
            <li>
              <a href="http://bit.ly/cnvs-student-guide" target="_blank"
                >Download CANVAS Student Guide</a
              >
            </li>
          </ul>
          <p class="q-ml-md">A. CANVAS Instructor Guide:</p>
          <ul>
            <li>
              <a
                href="https://community.canvaslms.com/docs/DOC-10460-canvas-instructor-guide-table-of-contents"
                target="_blank"
                >CANVAS Instructor Guide</a
              >
            </li>
            <li>
              <a href="http://bit.ly/cnvs-instructor-guide" target="_blank"
                >Download CANVAS Instructor Guide</a
              >
            </li>
          </ul>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!--END OF CANVAS DIALOG-->

    <!--LIBRARY SURVEY-->
    <q-dialog v-model="bool.showLibrarySurvey" full-height full-width maximized>
      <q-card class="fit">
        <q-card-section class="bg-primary text-white text-weight-bold">
          <div class="row justify-between items-center">
            <span class="text-body1 text-uppercase"> LIBRARY SURVEY </span>
            <span>
              <q-btn icon="fa fa-times" color="red" v-close-popup></q-btn>
            </span>
          </div>
        </q-card-section>
        <div v-if="!bool.pdfLoading">
          <q-card-section
            class="full-width q-pa-none"
            style="
              height: 92.9vh;
              display: flex;
              justify-content: center;
              align-items: center;
            "
            v-if="bool.showLibrarySurvey"
          >
            <q-pdfviewer
              v-model="bool.show"
              type="html5"
              src="https://docs.google.com/forms/d/e/1FAIpQLSfDl4h9OB_vcAF-a-jZs4baD0VUMuDFWHFWyRLGcSzsjoU8sQ/viewform?fbclid=IwAR2K9mUm-3x-2cuC7p2kuFymBfdz3sOFptjN-3bS0mrIlVZsOve2AY0jRIE"
              content-class="absolute"
            />
          </q-card-section>
        </div>
        <div v-else>
          <q-card-section style="height: 92.9vh"></q-card-section>
        </div>
        <q-inner-loading :showing="this.bool.pdfLoading">
          <q-spinner-puff size="100px" color="primary" />
          <span class="q-pt-md text-overline">FETCHING DATA ...</span>
        </q-inner-loading>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { LocalStorage, Cookies } from "quasar";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      bool: {
        showAccountBalanceDialog: false,
        showPaymentDialog: false,
        showCanvasDialog: false,
        showLibrarySurvey: false,
        pdfLoading: false,
        show: false,
      },
      uermSlide: 1,
      autoplay: true,
      time: "",
      date: "",
      documentValidation: false,
    };
  }, //END OF DATA LIFE CYCLE HOOKSl
  methods: {
    async checkIfDocumentsAreCleared() {
      const response = await this.$store.dispatch(
        "documents/checkIfDocumentsAreCleared"
      );
      const ret = response.map((docu) => docu.fileData);
      const hasNull = ret.includes(null);
      this.documentValidation = hasNull;
    },
    onlineRegistration() {
      this.$router.push("/students/transactions/online-registration");
    },

    downloadHandbook() {
      window.open(
        "https://www.uerm.edu.ph/wp-content/uploads/2024/12/BOTStudenthandbookRev2020.pdf",
        "_blank"
      );
    },

    async downloadStudentHandbook() {
      try {
        const response = await this.$store.dispatch(
          "users/downloadStudentHandbook"
        );

        if (Object.keys(response).length > 0) {
          const byteArray = Object.values(response);

          const blob = new Blob([new Uint8Array(byteArray)], {
            type: "application/pdf",
          });

          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "StudentHandbook.pdf";

          link.click();
        }
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
    }, //end of downloadStudentHanbook
    openLibrarySurvey() {
      this.bool.showLibrarySurvey = true;
      this.bool.show = true;
      this.bool.pdfLoading = true;
      setTimeout(() => {
        this.bool.pdfLoading = false;
      }, 1000);
    },

    async getCookie() {
      if (Cookies.has("access_token")) {
        await this.$store.dispatch("users/setUserData", this.studentInfo);
        // this.bools.personalInfoDialog = true;
        this.$router.push("/students");
      } else if (!LocalStorage.getItem("access_token")) {
        this.$router.push("/");
      }
    },
  }, //END OF METHODS LIFE CYCLE HOOKS
  created() {
    this.checkIfDocumentsAreCleared();
    this.getCookie();
  }, ///END OF MOUNTED LIFE CYCLE HOOKS
  computed: {
    ...mapGetters({
      studentInfo: "users/userAccount",
    }),
  },
});
</script>

<style scoped>
.clickable-img {
  height: 300px;
  cursor: pointer;
  transition: transform 0.5s; /* Smooth transition kapag nag-hover */
}

.clickable-img:hover {
  transform: scale(1.05); /* Pag-hover, mag-scale ng konti */
}

.dialog-image {
  max-width: 100%;
  height: auto;
}

.flex-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
