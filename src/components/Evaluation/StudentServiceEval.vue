<template>
  <div class="fit flex flex-center" v-if="studentServiceLoading">
    <q-spinner-hourglass color="primary" size="150px" />
  </div>

  <div class="row justify-start" v-else>
    <div class="col-12 col-md">
      <q-btn
        :label="
          ssevaluation.isCompleted
            ? 'Student Services Evaluation (COMPLETED)'
            : 'Student Services Evaluation (NOT YET COMPLETED)'
        "
        class="text-black q-pa-md q-mb-md"
        color="white"
        text-color="black"
        icon="person"
        :class="{
          hidden: ssevaluation === 0, // Hide if ssevaluation is 0
          visible: ssevaluation !== 0, // Show if ssevaluation is not 0
          'text-green-6': ssevaluation.isCompleted, // Green for completed
          'text-red-9': !ssevaluation.isCompleted, // Red for not completed
        }"
        @click="studentServiceEvalQuestion()"
        :disable="
          ssevaluation.isCompleted || isCardDisabled(ssTimeFrame) ? true : false
        "
      >
        <q-tooltip
          class="bg-yellow-8 text-black text-weight-bold"
          :offset="[10, 10]"
        >
          CLICK TO EVALUATE
        </q-tooltip>
      </q-btn>
    </div>
  </div>

  <q-dialog
    v-model="studentServiceDialog"
    persistent
    maximized
    transition-show="fade"
    transition-hide="fade"
  >
    <q-card>
      <q-bar class="bg-primary text-white q-pa-lg">
        <div
          class="text-weight-bold text-uppercase"
          v-for="(title, index) in formattedEval"
          :key="index"
        >
          <q-avatar>
            <q-img
              class="uermlogo q-mr-md"
              src="../../assets/uerm-logo.png"
              alt="UERM logo"
            /> </q-avatar
          >{{ index }}
        </div>
        <q-space />

        <q-btn dense flat icon="close" class="q-my-md" v-close-popup>
          <q-tooltip class="bg-negative text-white">CLOSE</q-tooltip>
        </q-btn>
      </q-bar>
      <div class="fit flex flex-center" v-if="questionLoading">
        <q-spinner-hourglass color="primary" size="150px" />
      </div>
      <q-card-section class="q-pt-none" v-else>
        <q-form ref="formEval" @submit.prevent="submitEval">
          <q-card>
            <q-card-section class="text-h6 text-weight-bold text-center">
              ONLINE EVALUATION FORM FOR STUDENT SERVICES
            </q-card-section>
            <q-card-section class="text-weight-bold">
              Objectives:
            </q-card-section>
            <q-card-section>
              The Student Services Evaluation tool aims to:
              <ul>
                <li>
                  Monitor utilization of Student Services • Determine student
                  satisfaction from services utilized
                </li>
                <li>Determine student satisfaction from services utilized</li>
                <li>Obtain suggestions for improvement</li>
              </ul>
            </q-card-section>
            <q-card-section class="text-weight-bold">
              Mechanics:
            </q-card-section>
            <q-card-section>
              <ul>
                <li>
                  Evaluation forms will be open to students at the end of the
                  Academic Year (2nd Semester)
                </li>
                <li>
                  Students will be required to answer the evaluation form online
                  through the UERM Student Portal along with Course and Faculty
                  Evaluation
                </li>
                <li>
                  Students who fail to answer the evaluation of Student Services
                  will not have grade access for clearance to the next semester
                </li>
                <li>
                  Data obtained from the Evaluation will be forwarded to the
                  respective offices
                </li>
              </ul>
            </q-card-section>
            <q-card-section class="text-weight-bold">
              Proposed Evaluation Tool:
            </q-card-section>
            <q-list
              v-for="(title, index) in formattedEval"
              :key="index"
              bordered
            >
              <q-card class="row justify-between">
                <q-card-section class="col-12 col-6">
                  <div v-for="(content, number) in title" :key="number">
                    <div class="col text-weight-bold text-subtitle2">
                      {{ content.heading }}
                    </div>
                    <div
                      class="col text-weight-bold text-subtitle2"
                      v-if="content.questionCode == 'Q21'"
                    >
                      Section 1: Campus Activities/Student Organizations/Student
                      Council/ Government/Leadership Training
                    </div>
                    <div
                      class="col text-weight-bold text-subtitle2"
                      v-if="content.questionCode == 'Q28'"
                    >
                      Section 2: Information and Orientation Service
                    </div>
                    <q-list>
                      <q-item>
                        <q-item-label> </q-item-label>
                        <q-item-section class="col">
                          {{ number + 1 }}. {{ content.description }} <br />
                          <div class="q-gutter-sm q-mt-md">
                            <q-option-group
                              v-model="content.rating"
                              :options="rate1to4"
                              color="primary"
                              inline
                              v-kbd-trap.roving.horizontal
                              v-kbd-trap.roving.vertical
                              v-kbd-trap.roving
                              @focusin="onOptionFocus"
                              size="md"
                              v-if="content.questionType == 'Rate1to4'"
                            />
                            <q-option-group
                              v-model="content.rating"
                              :options="choices1"
                              color="primary"
                              inline
                              v-kbd-trap.roving.horizontal
                              v-kbd-trap.roving.vertical
                              v-kbd-trap.roving
                              @focusin="onOptionFocus"
                              size="md"
                              v-if="content.questionType == 'Choices1'"
                            />
                            <!--ESSAY-->
                            <q-input
                              outlined
                              v-model="content.rating"
                              label=""
                              v-if="content.questionType == 'Part1Essay'"
                              autogrow
                            />
                            <q-input
                              outlined
                              v-model="content.rating"
                              label=""
                              v-if="content.questionType == 'Part2Essay'"
                              autogrow
                            />
                            <q-input
                              outlined
                              v-model="content.rating"
                              label=""
                              v-if="content.questionType == 'Part3Essay'"
                              autogrow
                            />
                            <q-input
                              outlined
                              v-model="content.rating"
                              label=""
                              v-if="content.questionType == 'Part4Essay'"
                              autogrow
                            />
                            <q-input
                              outlined
                              v-model="content.rating"
                              label=""
                              v-if="content.questionType == 'Part5Essay'"
                              autogrow
                            />
                            <!--END OF INPUT ESSAY-->
                            <q-option-group
                              v-model="content.rating"
                              :options="yesOrNo"
                              color="primary"
                              inline
                              v-kbd-trap.roving.horizontal
                              v-kbd-trap.roving.vertical
                              v-kbd-trap.roving
                              @focusin="onOptionFocus"
                              size="md"
                              v-if="content.questionType == 'YesOrNo'"
                            />
                            <q-option-group
                              v-model="content.rating"
                              :options="choices2"
                              color="primary"
                              inline
                              v-kbd-trap.roving.horizontal
                              v-kbd-trap.roving.vertical
                              v-kbd-trap.roving
                              @focusin="onOptionFocus"
                              size="md"
                              v-if="content.questionType == 'Choices2'"
                            />

                            <q-input
                              outlined
                              v-model="content.rating"
                              label="Please Specify"
                              v-show="
                                content.questionType == 'Choices2' &&
                                content.rating !=
                                  'Annual Physical Examination' &&
                                content.rating !=
                                  'Validation of Medical Certificate' &&
                                content.rating !=
                                  'Medical Illness/Injury during school hours' &&
                                content.rating !=
                                  'Dental Procedure during school hours' &&
                                content.rating !=
                                  'I did not visit the Medical Center Infirmary this year' &&
                                content.rating != undefined
                              "
                              autogrow
                            />

                            <q-option-group
                              v-model="content.rating"
                              :options="yesOrNoWhy"
                              color="primary"
                              inline
                              v-kbd-trap.roving.horizontal
                              v-kbd-trap.roving.vertical
                              v-kbd-trap.roving
                              @focusin="onOptionFocus"
                              size="md"
                              v-if="content.questionType == 'YesOrNoWhy'"
                            />

                            <q-input
                              outlined
                              v-model="content.rating"
                              label="Please specify"
                              v-show="
                                content.questionType == 'YesOrNoWhy' &&
                                content.rating !== 'Yes' &&
                                content.rating !== undefined
                              "
                              autogrow
                            />

                            <q-option-group
                              v-model="content.rating"
                              :options="agreeOrDisagree"
                              color="primary"
                              inline
                              v-kbd-trap.roving.horizontal
                              v-kbd-trap.roving.vertical
                              v-kbd-trap.roving
                              @focusin="onOptionFocus"
                              size="md"
                              v-if="content.questionType == 'AgreeOrDisagree'"
                            />
                            <q-option-group
                              v-model="content.rating"
                              :options="choices3"
                              color="primary"
                              inline
                              v-kbd-trap.roving.horizontal
                              v-kbd-trap.roving.vertical
                              v-kbd-trap.roving
                              @focusin="onOptionFocus"
                              size="md"
                              v-if="content.questionType == 'Choices3'"
                            />
                            <q-option-group
                              v-model="content.rating"
                              :options="choices4"
                              color="primary"
                              inline
                              v-kbd-trap.roving.horizontal
                              v-kbd-trap.roving.vertical
                              v-kbd-trap.roving
                              @focusin="onOptionFocus"
                              size="md"
                              v-if="content.questionType == 'Choices4'"
                            />
                            <q-option-group
                              v-model="content.rating"
                              :options="satisfactory"
                              color="primary"
                              inline
                              v-kbd-trap.roving.horizontal
                              v-kbd-trap.roving.vertical
                              v-kbd-trap.roving
                              @focusin="onOptionFocus"
                              size="md"
                              v-if="content.questionType == 'Satisfactory'"
                            />
                            <q-option-group
                              v-model="content.rating"
                              :options="rate1to5"
                              color="primary"
                              inline
                              v-kbd-trap.roving.horizontal
                              v-kbd-trap.roving.vertical
                              v-kbd-trap.roving
                              @focusin="onOptionFocus"
                              size="md"
                              v-if="content.questionType == 'Rating1to5'"
                            />
                          </div>
                        </q-item-section>
                      </q-item>
                      <q-separator />
                    </q-list>
                  </div>
                </q-card-section>
              </q-card>
            </q-list>
          </q-card>
          <div class="col-12">
            <q-card bordered square>
              <q-card-section>
                <div class="col-12">
                  <q-btn
                    label="Submit Evaluation"
                    push
                    color="primary"
                    class="full-width"
                    type="submit"
                  ></q-btn>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { VueKeyboardTrapDirectiveFactory } from "@pdanpdan/vue-keyboard-trap";
const utils = require("src/util/index");
const KbdTrap = VueKeyboardTrapDirectiveFactory({}).directive;
export default {
  name: "StudentServiceEval",
  props: ["subject"],
  directives: {
    KbdTrap,
  },
  data() {
    return {
      selectedOthers: null,
      questionLoading: false,
      question: [],
      evaluation: [],
      ssevaluation: [],
      ssTimeFrame: [],
      studentServiceLoading: true,
      studentServiceDialog: false,
      rate1to4: [
        { label: "4 - Very Easy", value: "4 - Very Easy" },
        { label: "3 - Easy", value: "3 - Easy" },
        { label: "2 - Difficult", value: "2 - Difficult" },
        { label: "1 - Very Difficult", value: "1 - Very Difficult" },
      ],
      choices1: [
        {
          label:
            "Submission of requirements (for freshmen) / Obtaining clearance from previous semester (for upperclassmen)",
          value:
            "Submission of requirements (for freshmen) / Obtaining clearance from previous semester (for upperclassmen)",
        },
        {
          label: "Advising for available courses",
          value: "Advising for available courses",
        },
        { label: "Enlisting for enrolment", value: "Enlisting for enrolment" },
        { label: "Assessment of Fees", value: "Assessment of Fees" },
        { label: "Payment of Fees", value: "Payment of Fees" },
        { label: "None of these", value: "None of these" },
      ],
      yesOrNo: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      choices2: [
        {
          label: "Annual Physical Examination",
          value: "Annual Physical Examination",
        },
        {
          label: "Validation of Medical Certificate",
          value: "Validation of Medical Certificate",
        },
        {
          label: "Medical Illness/Injury during school hours",
          value: "Medical Illness/Injury during school hours",
        },
        {
          label: "Dental Procedure during school hours",
          value: "Dental Procedure during school hours",
        },
        {
          label: "I did not visit the Medical Center Infirmary this year",
          value: "I did not visit the Medical Center Infirmary this year",
        },
        { label: "Others:________", value: "Others:" },
      ],
      yesOrNoWhy: [
        { label: "Yes", value: "Yes" },
        { label: "No. Why Not?", value: "No." },
      ],
      agreeOrDisagree: [
        { label: "5 - Strongly Agree", value: "5 - Strongly Agree" },
        { label: "4 - Agree", value: "4 - Agree" },
        {
          label: "3 - Neither agree nor disagree",
          value: "3 - Neither agree nor disagree",
        },
        { label: "2 - Disagree", value: "2 - Disagree" },
        { label: "1 - Strongly disagree", value: "1 - Strongly disagree" },
      ],
      choices3: [
        { label: "Counseling", value: "Counseling" },
        { label: "Initial Interview", value: "Initial Interview" },
        {
          label: "Routine Interview",
          value: "Routine Interview",
        },
        {
          label: "Psychological Exam Interpretation",
          value: "Psychological Exam Interpretation",
        },
        {
          label: "Referred by the dean, professor, parent",
          value: "Referred by the dean, professor, parent",
        },
        {
          label: "Group/Classroom Guidance",
          value: "Group/Classroom Guidance",
        },
        {
          label: "Seminar/symposium organize by the guidance office",
          value: "Seminar/symposium organize by the guidance office",
        },
      ],
      choices4: [
        { label: "Once a week", value: "Once a week" },
        { label: "2 – 3 times per week", value: "2 – 3 times per week" },
        {
          label: "More than 5 times per week",
          value: "More than 5 times per week",
        },
      ],
      satisfactory: [
        { label: "4 - Very Satisfactory", value: "4 - Very Satisfactory" },
        { label: "3 - Satisfactory", value: "3 - Satisfactory" },
        { label: "2 - Needs Improvement", value: "2 - Needs Improvement" },
        { label: "1 - Poor", value: "1 - Poor" },
      ],
      rate1to5: [
        {
          label: "5 - complied to a very great extent",
          value: "5 - complied to a very great extent",
        },
        {
          label: "4 - complied to a great extent",
          value: "4 - complied to a great extent",
        },
        {
          label: "3 - complied to a moderate extent",
          value: "3 - complied to a moderate extent",
        },
        {
          label: "2 - complied to a little extent",
          value: "2 - complied to a little extent",
        },
        {
          label: "1 - complied to a very little extent",
          value: "1 - complied to a very little extent",
        },
      ],
    };
  }, // END OF DATA LIFE CYCLE HOOKS
  created() {
    this.getSSEvalution();
    this.getStudentServicesTimeFrame();
  },
  methods: {
    async getSSEvalution() {
      const response = await this.$store.dispatch("evaluation/getSSEvaluation");
      if (
        response.error === "Access token is not whitelisted." ||
        response.error === "Access token is required." ||
        response.error === "Access token is invalid or expired."
      ) {
        localStorage.removeItem("access_token");
        this.$q.notify({
          message: "Session Expired!",
          position: "bottom",
          type: "negative",
        });
        this.$router.push("/");
      } else if (response != 0) {
        setTimeout(() => {
          this.ssevaluation = response[0];
          this.studentServiceLoading = false;
        }, 1000);
      } else {
        this.studentServiceLoading = false;
      }
    }, //END OF getSSEvalution() METHOD
    async studentServiceEvalQuestion() {
      this.questionLoading = true;
      this.studentServiceDialog = true;

      const response = await this.$store.dispatch(
        "evaluation/studentServiceQuestion"
      );

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
          this.question = response;
          this.questionLoading = false;
          this.studentServiceDialog = true;
        }, 1000);
      } else {
        this.questionLoading = false;
      }
    }, //END OF StudentServiceEvalQuestion
    async submitEval() {
      this.$refs.formEval.validate().then(async (valid) => {
        if (!valid) {
          return false;
        }
        const selectedRatings = this.question.map((content) => ({
          evalId: content.evalId,
          questionCode: content.questionCode,
          rating: content.rating,
          evaluationType: content.evaluationType,
        }));
        this.$q
          .dialog({
            title: "Confirmation",
            message: `Are you want save your Evaluation?`,
            ok: {
              glossy: true,
            },
            cancel: {
              glossy: true,
              color: "negative",
            },
            persistent: true,
          })
          .onOk(async () => {
            const verifyAnswer = selectedRatings.some(
              (ans) => ans.rating === undefined
            );
            if (verifyAnswer) {
              this.$q.notify({
                progress: true,
                type: "failed",
                message: `You need to complete this form before you submit`,
                color: "negative",
                position: "bottom",
              });
            } else if (!verifyAnswer) {
              const payload = {
                selectedRatings: selectedRatings,
              };

              const response = await this.$store.dispatch(
                "evaluation/evalResponse",
                payload
              );
              if (response.length !== 0)
                this.$q.notify({
                  progress: true,
                  type: "success",
                  message: `Successfully saved the Evaluation`,
                  color: "positive",
                  position: "bottom",
                });

              this.getSSEvalution();
              this.studentServiceDialog = false;
            } else {
              this.$q.notify({
                progress: true,
                type: "failed",
                message: `Something went wrong`,
                color: "negative",
                position: "bottom",
              });
              this.studentServiceDialog = false;
            }
          })
          .onCancel(() => {
            if (process.env.DEV) console.log("Saving cancelled.");
          });
      });
    },

    async getStudentServicesTimeFrame() {
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
    onOptionFocus(ev) {
      if (
        ev.target.matches(".q-radio") && // QRadio is focused
        ev.target.contains(ev.relatedTarget) === false // it is not a refocus after click
      ) {
        setTimeout(() => {
          if (ev.target === document.activeElement) {
            // it is still focused (it was not a focus in transition)
            ev.target.click();
            ev.target.focus();
          }
        });
      }
    },
    isCardDisabled(studEval) {
      const currentDate = new Date();
      let dateFrom = new Date(studEval.dateFrom);
      let dateTo = new Date(studEval.dateTo);

      if (currentDate < dateFrom || currentDate > dateTo) return true;
      else return false;
    }, //END OF isCardDisabled METHOD
  }, //END OF METHODS LIFE CYCLE HOOKS
  computed: {
    formattedEval() {
      let formattedEval = [];
      if (this.question.length > 0) {
        formattedEval = utils.groupBy(this.question, "evaluationType");
      }
      return formattedEval;
    },
  }, //END OF COMPUTED LIFE CYCLE HOOKS
};
</script>

<style lang="scss" scoped></style>
