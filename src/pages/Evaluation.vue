<template>
  <div>
    <div class="row">
      <div class="col q-mb-lg q-pb-lg">
        <q-card>
          <q-card-section
            class="bg-yellow-8 text-black text-center text-uppercase q-mb-md text-h6"
          >
            All students are required to answer the evaluation form.
          </q-card-section>
          <!-- STUDENT SERVICE EVALUATION -->
          <!-- <q-card-section>
            <SSEval :subject="studServiceEval" />
          </q-card-section> -->
          <!-- END STUDENT SERVICE EVALUATION -->
          <!-- <q-card-section class="bg-primary text-white text-body1">
            <q-icon name="person" size="3em" />
            STUDENT INFORMATION
          </q-card-section>
          <q-card-section class="q-mt-lg">
            <q-markup-table separator="cell">
              <tbody>
                <tr>
                  <td class="text-weight-bold">FULL NAME:</td>
                  <td>
                    {{ studentUser.lastName + ", " + studentUser.firstName }}
                  </td>
                  <td class="text-weight-bold">STUDENT NUMBER:</td>
                  <td>{{ studentUser.sn }}</td>
                </tr>
                <tr>
                  <td class="text-weight-bold">COURSE:</td>
                  <td>{{ studentUser.description }}</td>
                  <td class="text-weight-bold">YEAR LEVEL:</td>
                  <td>{{ studentUser.yearLevel }}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card-section> -->

          <q-card class="q-pa-md">
            <q-card-section>
              <div
                class="text-subtitle1 text-center"
                v-if="studentUser.college !== 'M'"
              >
                Please accomplish the Student Services Evaluation within the
                evaluation period. <br />

                Student Services Evaluation Period:
                <span class="text-weight-bold">
                  {{ formatDate(ssTimeFrame.dateFrom) }}, to
                  {{ formatDate(ssTimeFrame.dateTo) }}.</span
                >.
                <br />
                Course Evaluation Period:
                <span class="text-weight-bold">
                  {{ formatDate(timeFrame.dateFrom) }}, to
                  {{ formatDate(timeFrame.dateTo) }}.</span
                >.
              </div>
              <div
                class="text-subtitle1 text-center"
                v-else-if="studentUser.college === 'M'"
              >
                Please accomplish the Student Services Evaluation within the
                evaluation period. <br />

                Student Services Evaluation Period:
                <span class="text-weight-bold">
                  {{ formatDate(ssTimeFrame.dateFrom) }}, to
                  {{ formatDate(ssTimeFrame.dateTo) }}.</span
                >.
              </div>
            </q-card-section>
          </q-card>

          <!-- <q-card-section class="bg-red-10 text-white">
            Please be reminded that the evaluation period for your submissions
            is from April 15, 2024, to May 15, 2024. Kindly ensure all
            evaluations are completed within this timeframe. Thank you.
          </q-card-section> -->

          <q-card-section>
            <MedEval
              :subjectlist="this.evaluation"
              :isLoading="this.loading"
              v-if="studentUser.college === 'M'"
              @eval="this.getEvalution()"
            />

            <MTechEval
              :subjectlist="this.evaluation"
              :isLoading="this.loading"
              v-if="studentUser.college === 'T'"
              @eval="this.getEvalution()"
            />
            <NurseEval
              :subjectlist="this.evaluation"
              :isLoading="this.loading"
              v-if="studentUser.college === 'N'"
              @eval="this.getEvalution()"
            />
            <CaresEval
              :subjectlist="this.evaluation"
              :isLoading="this.loading"
              v-if="studentUser.college === 'P'"
              @eval="this.getEvalution()"
            />
            <GraduateEval
              :subjectlist="this.evaluation"
              :isLoading="this.loading"
              v-if="studentUser.college === 'G'"
              @eval="this.getEvalution()"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MedEval from "../components/Evaluation/MedEval.vue";
import MTechEval from "../components/Evaluation/MTechEval.vue";
import NurseEval from "../components/Evaluation/NurseEval.vue";
import CaresEval from "../components/Evaluation/CaresEval.vue";
import GraduateEval from "../components/Evaluation/Graduate.vue";
// import SSEval from "../components/Evaluation/StudentServiceEval.vue";

export default {
  name: "EvaluationPage",
  components: {
    MedEval,
    MTechEval,
    NurseEval,
    CaresEval,
    GraduateEval,
    // SSEval,
  },
  emits: ["eval"],

  data() {
    return {
      loading: true,
      studServiceloading: false,
      evaluation: [],
      studServiceEval: [],
      timeFrame: [],
      studentTimeFrame: [],
      ssTimeFrame: [],
    };
  }, //DATA LIFE CYCLE HOOKS
  methods: {
    async getEvalution() {
      const response = await this.$store.dispatch("evaluation/getEvaluation");
      if (
        response.error === "Access token is not whitelisted." ||
        response.error === "Access token is required." ||
        response.error === "Access token is invalid or expired."
      ) {
        localStorage.removeItem("access_token");
        // this.$q.notify({
        //   message: "Session Expired!",
        //   position: "bottom",
        //   type: "negative",
        // });
        this.$router.push("/");
      } else if (response != 0) {
        setTimeout(() => {
          this.evaluation = response;
          this.loading = false;
        }, 1000);
      } else {
        this.loading = false;
      }
    }, //END OF getEvaluation() METHOD
    // async getStudentServiceEvaluation() {
    //   this.studServiceloading = true;
    //   const response = await this.$store.dispatch("evaluation/getSSEvaluation");

    //   if (
    //     response.error === "Access token is not whitelisted." ||
    //     response.error === "Access token is required." ||
    //     response.error === "Access token is invalid or expired."
    //   ) {
    //     localStorage.removeItem("access_token");
    //     // this.$q.notify({
    //     //   message: "Session Expired!",
    //     //   position: "bottom",
    //     //   type: "negative",
    //     // });
    //     this.$router.push("/");
    //     // this.$q.notify({
    //     //   message: "Session Expired!",
    //     //   position: "bottom",
    //     //   type: "negative",
    //     // });
    //   } else if (response != 0) {
    //     setTimeout(() => {
    //       this.studServiceEval = response;
    //       this.studServiceloading = false;
    //     }, 1000);
    //   } else {
    //     this.studServiceloading = false;
    //   }
    // }, //END OF getStudentServiceEvaluation METHOD

    async getEvaluationTimeFrame() {
      const response = await this.$store.dispatch(
        "evaluation/getEvaluationTimeFrame"
      );
      if (response.length !== 0) {
        this.timeFrame = response[0];
      }
    }, //end of evaluation timeframe
    // async getCourseTimeFrame() {
    //   const response = await this.$store.dispatch(
    //     "evaluation/getEvaluationTimeFrame"
    //   );
    //   if (response.length !== 0) {
    //     this.studentTimeFrame = response[0];
    //   }
    // },

    async getSSTimeFrame() {
      const response = await this.$store.dispatch(
        "evaluation/getStudentServiceTimeFrame"
      );

      if (response.error) {
        this.$q.notify({
          message: "Session Expired!",
          position: "bottom",
          type: "negative",
        });
        localStorage.removeItem("access_token");
        this.$router.push("/");
      }

      this.ssTimeFrame = response[0];
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.toLocaleDateString("en-US", {
        month: "long",
      })} ${date.getDate()}, ${date.getFullYear()}`;
    },
  }, ///END OF METHODS LIFE CYCLE HOOKS
  created() {
    this.getEvalution();
    this.getEvaluationTimeFrame();
    // this.getCourseTimeFrame();
    this.getSSTimeFrame();
    // this.newToOld();
  }, //END OF CREATED LIFE CYCLE HOOKS
  computed: {
    ...mapGetters({
      studentUser: ["users/userAccount"],
    }),
  },
  mounted() {
    // this.newToOld()
    this.formatDate();
  },
};
</script>

<style lang="scss" scoped>
.clickable-card {
  cursor: pointer;
  transition: background-color 0.3s; /* Add a smooth transition on hover */
}

.hoverable-card:hover {
  background-color: rgb(
    223,
    220,
    220
  ); /* Change the background color on hover */
}
</style>
