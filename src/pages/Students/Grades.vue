<template>
  <q-page>
    <!-- <pre v-for="(swa, index) of formattedGrades" :key="index">
      {{ swa[5].grade }}
    </pre> -->
    <!-- <pre> {{ studentDecryptData }}</pre> -->
    <div class="row">
      <div class="col-12 col-md-8 q-ml-md q-pb-xl">
        <div class="fit flex flex-center" v-if="loading">
          <q-spinner-hourglass color="primary" size="150px" />
        </div>
        <!-- <template v-else> -->
        <!-- <template v-if="this.gradeOfStudent === 0">
          <q-card class="text-primary q-pa-xl">
            <q-card-section
              class="text-h4 text-weight-bold text-uppercase text-center"
            >
              No grades available
            </q-card-section>
          </q-card>
        </template> -->
        <!-- <q-card>
          <q-card-section> -->
        <!-- <div class="q-mb-md text-weight-bold">
          The records and information issued by Registrar's office shall be
          final and official
        </div> -->
        <!-- </q-card-section>
        </q-card> -->

        <q-markup-table
          class="my-sticky-header-table"
          separator="cell"
          v-else-if="this.evalResponse == undefined"
        >
          <thead>
            <tr>
              <th class="text-center text-white">SUBJECT CODE</th>
              <th class="text-center text-white">DESCRIPTION</th>
              <th class="text-center text-white">GRADE</th>
              <th class="text-center text-white">RE-EX</th>
              <th class="text-center text-white">UNITS</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(grade, index) in formattedGrades" :key="index">
              <tr>
                <td colspan="5" class="bg-blue-2 text-center text-weight-bold">
                  <div class="row">
                    <div class="col-6">
                      {{ index }}
                    </div>
                    <div class="col-6" v-if="grade[0].gradeAvg == 0">N/A</div>
                    <div class="col-6" v-else>SWA: {{ grade[0].gradeAvg }}</div>
                  </div>
                </td>
              </tr>
              <tr v-for="innerGrade in grade" :key="innerGrade">
                <td class="text-left">{{ innerGrade.subjectcode }}</td>
                <td class="text-left">{{ innerGrade.description }}</td>
                <td class="text-center">
                  <span v-if="innerGrade.ledgerBalanceSemester !== ''">
                    {{ innerGrade.grade }}
                  </span>
                  <!--HIDE KO MUNA YUNG SA PENDING EVALUATION-->
                  <span v-else-if="innerGrade.ledgerBalanceSemester === ''">
                    {{ innerGrade.grade }}
                  </span>
                </td>
                <td class="text-center">
                  {{ innerGrade.reex }}
                </td>
                <td class="text-center">
                  {{ innerGrade.pUnit }}
                </td>
              </tr>
            </template>
          </tbody>
        </q-markup-table>

        <q-markup-table class="my-sticky-header-table" separator="cell" v-else>
          <thead>
            <tr>
              <th class="text-center text-white">SUBJECT CODE</th>
              <th class="text-center text-white">DESCRIPTION</th>
              <th class="text-center text-white">GRADE</th>
              <th class="text-center text-white">RE-EX</th>
              <th class="text-center text-white">UNITS</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(grade, index) in formattedGrades" :key="index">
              <tr>
                <td colspan="5" class="bg-blue-2 text-center text-weight-bold">
                  <div class="row">
                    <div class="col-6">
                      {{ index }}
                    </div>
                    <div class="col-6" v-if="grade[0].gradeAvg == 0">N/A</div>
                    <div class="col-6" v-else>SWA: {{ grade[0].gradeAvg }}</div>
                  </div>
                </td>
              </tr>
              <tr v-for="innerGrade in grade" :key="innerGrade">
                <td class="text-left">{{ innerGrade.subjectcode }}</td>
                <td class="text-left">{{ innerGrade.description }}</td>
                <td class="text-center">
                  <span
                    v-if="
                      innerGrade.ledgerBalanceSemester !== '' &&
                      this.evalResponse.semester != ''
                    "
                  >
                    <q-icon
                      name="payments"
                      color="teal"
                      v-if="this.evalResponse.semester === innerGrade.sem"
                      @click="redirectToLedger"
                    >
                      <q-tooltip> Please settle your balances </q-tooltip>
                    </q-icon>

                    <span v-else>
                      {{ innerGrade.grade }}
                    </span>
                  </span>
                  <span
                    v-else-if="
                      !studentEvalResponse && this.evalResponse.semester != ''
                    "
                  >
                    <q-icon
                      name="help"
                      color="primary"
                      v-if="this.evalResponse.semester === innerGrade.sem"
                      @click="redirectToEvaluation"
                    >
                      <q-tooltip> Pending evaluation </q-tooltip>
                    </q-icon>
                    <span v-else>
                      {{ innerGrade.grade }}
                    </span>
                  </span>
                  <!--HIDE KO MUNA YUNG SA PENDING EVALUATION-->
                  <span
                    v-else-if="
                      innerGrade.ledgerBalanceSemester === '' &&
                      studentEvalResponse
                    "
                  >
                    {{ innerGrade.grade }}
                  </span>
                </td>
                <td class="text-center">
                  {{ innerGrade.reex }}
                </td>
                <td class="text-center">
                  {{ innerGrade.pUnit }}
                </td>
              </tr>
            </template>
          </tbody>
        </q-markup-table>
        <!-- </template> -->
      </div>

      <div class="col">
        <q-card
          class="my-card q-pb-md bg-yellow-2 q-ml-md q-mr-md q-mb-md"
          flat
        >
          <q-card-section>
            <div class="text-weight-bold">GENERAL WEIGHTED AVERAGE</div>
            <div class="text-h5 text-weight-bold">{{ this.studentGWA }}</div>
          </q-card-section>

          <!-- <q-card-section class="q-pt-none">
            Records and information issued by Registrar's Office shall be final
            and official.
          </q-card-section> -->
        </q-card>
        <q-expansion-item
          group="somegroup"
          icon="grade"
          label="GRADING SYSTEM"
          default-opened
          header-class="bg-teal text-white"
          expand-icon-class="text-white"
          class="col-12 col-md-3 q-pb-xl q-pl-md q-pr-md"
        >
          <q-card bordered>
            <q-card-section>
              <q-markup-table class="grading-system-table">
                <thead>
                  <tr class="text-weight-bold">
                    <td>POINT</td>
                    <td>PERCENTAGE</td>
                    <td>POINT</td>
                    <td>PERCENTAGE</td>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr>
                    <td>1.00</td>
                    <td>97-100</td>
                    <td>2.25</td>
                    <td>83-84</td>
                  </tr>
                  <tr>
                    <td>1.25</td>
                    <td>94-96</td>
                    <td>2.50</td>
                    <td>80-82</td>
                  </tr>
                  <tr>
                    <td>1.50</td>
                    <td>91-93</td>
                    <td>2.75</td>
                    <td>77-79</td>
                  </tr>
                  <tr>
                    <td>1.75</td>
                    <td>88-90</td>
                    <td>3.00</td>
                    <td>75-76</td>
                  </tr>
                  <tr>
                    <td>2.00</td>
                    <td>85-87</td>
                    <td>5.00</td>
                    <td>below 75</td>
                  </tr>
                </tbody>
              </q-markup-table>
              <q-markup-table>
                <tbody>
                  <tr>
                    <td class="text-center">X</td>
                    <td>Absent from Examination</td>
                  </tr>
                  <tr>
                    <td class="text-center">W</td>
                    <td>Dropped without credit</td>
                  </tr>
                  <tr>
                    <td class="text-center">LOA</td>
                    <td>Leave of Absence</td>
                  </tr>
                  <tr>
                    <td class="text-center">GW</td>
                    <td>Grade Withheld</td>
                  </tr>
                  <tr>
                    <td class="text-center">FA</td>
                    <td>Failed due to Absences</td>
                  </tr>
                  <tr>
                    <td class="text-center">IP</td>
                    <td>
                      In Progress(for the first part of a one year subject)
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center">FAILED</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-card-section>
            <q-card-section>
              <q-icon name="payments" color="teal" size="1.5rem" /> With Pending
              Account Balance. Click
              <a href="#/students/ledger" class="text-weight-bold">here</a> to
              view student ledger
            </q-card-section>
            <q-card-section>
              <q-icon name="help" color="primary" size="1.5rem" /> Need to
              finish evaluations faculty and course evaluation. Click
              <a
                href="https://uerm.edu.ph/apps/portal-v2/#/students/evaluation"
                class="text-weight-bold"
                >here</a
              >
              to proceed with evaluations
            </q-card-section>
            <q-card-section>
              <div class="q-mb-md text-weight-bold">Reference:</div>
              <q-markup-table>
                <tbody class="referenceGradeTable">
                  <tr>
                    <td class="text-weight-bold">SWA :</td>
                    <td>Semester Weighted Average</td>
                  </tr>
                  <tr>
                    <td class="text-weight-bold">YWA :</td>
                    <td>Year Level Weighted Average</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      Weighted average for the academic year, i.e., first
                      semester, second semester, and summer (if applicable)
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      Note: Used for scholarship/academic excellence purposes
                    </td>
                  </tr>
                  <tr>
                    <td class="text-weight-bold">GWA :</td>
                    <td>General Weighted Average</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      Weighted average from first semester/term up to the last
                      enrollment of a student for the same degree program in the
                      Medical Center
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
    </div>
  </q-page>
</template>

<script>
const utils = require("src/util/index");
import { LocalStorage } from "quasar";
import { jwtDecrypt } from "src/shared/jwtHelper";
// import { ref } from "vue";
import { mapGetters } from "vuex";
export default {
  name: "GradesPage",
  data() {
    var studentData = LocalStorage.getItem("access_token");
    if (studentData != null) {
      var studentDecryptData = jwtDecrypt(studentData);
    }
    var outstandingBalance;
    var courseEval;
    const gradingSystemData = [];
    const gradeOfStudent = [];
    var semester = "";
    return {
      gradingSystemData,
      gradeOfStudent,
      studentDecryptData,
      outstandingBalance,
      courseEval,
      semester,
      studentGWA: 0,
      loading: true, // Initial loading state,
      visible: false,
      showSimulatedReturnData: false,
      sumGPA: 0,
      evalResponse: [],
    };
  }, //END OF DATA LIFE CYCLE HOOKS
  computed: {
    formattedGrades() {
      let formattedGrades = [];
      if (this.gradingSystemData.length > 0) {
        formattedGrades = utils.groupBy(this.gradeOfStudent, "semester");
      }
      return formattedGrades;
    },
    studentEvalResponse() {
      return this.evalResponse.totalEvaluations === this.evalResponse.completed;
    },
    ...mapGetters({
      studentUser: ["users/userAccount"],
    }),
  },
  created() {
    this.getGradingSystem();
    this.getGradeOfStudent();
  }, //END OF created LIFE CYCLE HOOKS
  mounted() {
    this.getEvaluationResponse();
  },
  methods: {
    isLastSemester(index, grade) {
      return index === grade - 1;
    },
    async getEvaluationResponse() {
      const result = await this.$store.dispatch("grades/getEvalResponse");
      this.evalResponse = result[0];
    },
    async getGradingSystem() {
      const result = await this.$store.dispatch("grades/getGradingSystem");

      if (result.error) {
        localStorage.removeItem("access_token");
        // this.$q.notify({
        //   message: "Session Expired!",
        //   position: "bottom",
        //   type: "negative",
        // });
        this.$router.push("/");
      } else {
        this.gradingSystemData = result;
      }
    }, //END OF getGradingSystem METHOD

    async getGradeOfStudent() {
      const result = await this.$store.dispatch("grades/getGradeOfStudent");

      if (result.error) {
        localStorage.removeItem("access_token");
        this.$q.notify({
          message: "Session Expired!",
          position: "bottom",
          type: "negative",
        });
        this.$router.push("/");
      } else {
        setTimeout(() => {
          this.gradeOfStudent = result;
          this.loading = false; // Set loading state to false once data is fetched
          this.computeGWA();
        }, 100);
      }
    }, //END OF getGradeOfStudent METHOD
    redirectToEvaluation() {
      this.$router.push("/students/evaluation");
    },
    redirectToLedger() {
      this.$router.push("/students/ledger");
    },
    computeGWA() {
      var sumGPA = 0;
      var sumUnitsHours = 0;
      var gwa = 0;
      this.gradeOfStudent.forEach((grade) => {
        sumGPA += grade.gPA;
        sumUnitsHours += grade._unitshours;
      });
      if (sumUnitsHours != 0) {
        gwa = sumGPA / sumUnitsHours;
      }
      this.studentGWA = parseFloat(gwa.toFixed(4));
    }, //END of computeGWA METHOD
  }, //END OF METHODS LIFE CYCLE HOOKS
};
</script>

<style lang="scss" scoped>
thead tr:first-child th {
  background-color: #0e4296;
  color: #ffffff;
}

thead tr th {
  position: sticky;
  z-index: 1;
}

thead tr:first-child th {
  top: 0;
}

tbody {
  scroll-margin-top: 48px;
}

.my-sticky-header-table {
  /* height or max-height is important */
  height: 100%;
}
.my-sticky-header-table td {
  border: solid 1px rgb(219, 219, 219);
  white-space: normal !important;
  word-wrap: break-word !important;
}

.referenceGradeTable td,
th {
  // td,
  // th {
  word-wrap: break-word;
  white-space: normal;
  max-width: 150px;
  padding: 8px;
  // }
}
</style>
