<template>
  <q-dialog v-model="bools.evalDialog" persistent full-width full-height>
    <q-card>
      <q-bar class="bg-primary text-white q-pa-lg">
        <div
          class="row justify-center text-weight-bold text-uppercase"
          v-for="(title, index) in formattedEval"
          :key="index"
        >
          <q-avatar>
            <q-img
              class="uermlogo q-mr-md"
              src="../assets/uerm-logo.png"
              alt="UERM logo"
            />
          </q-avatar>
          <div class="q-mt-md">{{ title[0].heading }}</div>
          <!-- <q-btn dense flat icon="close" class="q-my-md" v-close-popup>
            <q-tooltip class="bg-negative text-white">CLOSE</q-tooltip>
          </q-btn> -->
        </div>
        <q-space />
      </q-bar>

      <q-card-section class="q-pt-none">
        <q-form ref="formEval" @submit.prevent="submitEvalAnswer">
          <template v-for="(title, index) in formattedEval" :key="index">
            <q-card>
              <q-list
                v-for="(title, index) in formattedEval"
                :key="index"
                bordered
              >
                <q-card class="row justify-between">
                  <q-card-section class="col-12 col-6">
                    <div v-for="(content, number) in title" :key="number">
                      <!-- <div class="col text-weight-bold text-subtitle2">
                          {{ content.questionType }}
                        </div> -->

                      <q-list>
                        <q-item>
                          <q-item-label> </q-item-label>
                          <q-item-section class="col">
                            <q-item-label>
                              {{
                                content.questionNumber +
                                ". " +
                                content.description
                              }}
                            </q-item-label>

                            <q-item-label>
                              <q-option-group
                                v-model="content.rating"
                                :options="satisfactoryOptions"
                                color="primary"
                                inline
                                v-kbd-trap.roving.horizontal
                                v-kbd-trap.roving.vertical
                                v-kbd-trap.roving
                                @focusin="onOptionFocus"
                                size="xl"
                                v-if="content.questionType === 'Satisfactory'"
                              ></q-option-group>
                              <q-option-group
                                v-model="content.rating"
                                :options="clearOrUnclearOptions"
                                color="primary"
                                inline
                                v-kbd-trap.roving.horizontal
                                v-kbd-trap.roving.vertical
                                v-kbd-trap.roving
                                @focusin="onOptionFocus"
                                size="xl"
                                v-else-if="
                                  content.questionType === 'clearOrUnclear'
                                "
                              ></q-option-group>
                              <q-option-group
                                v-model="content.rating"
                                :options="resolvedOptions"
                                color="primary"
                                inline
                                v-kbd-trap.roving.horizontal
                                v-kbd-trap.roving.vertical
                                v-kbd-trap.roving
                                @focusin="onOptionFocus"
                                size="xl"
                                v-else-if="content.questionType === 'resolved'"
                                @update:model-value="onRatingChange"
                              ></q-option-group>
                              <q-option-group
                                v-model="content.rating"
                                :options="easyOptions"
                                color="primary"
                                inline
                                v-kbd-trap.roving.horizontal
                                v-kbd-trap.roving.vertical
                                v-kbd-trap.roving
                                @focusin="onOptionFocus"
                                size="xl"
                                v-else-if="
                                  content.questionType === 'easyToDifficult'
                                "
                                @input="handleOptionChange(content.rating)"
                              ></q-option-group>
                              <q-option-group
                                v-model="content.rating"
                                :options="helpfulOptions"
                                color="primary"
                                inline
                                v-kbd-trap.roving.horizontal
                                v-kbd-trap.roving.vertical
                                v-kbd-trap.roving
                                @focusin="onOptionFocus"
                                size="xl"
                                v-else-if="content.questionType === 'helpful'"
                              ></q-option-group>
                              <q-option-group
                                v-model="content.rating"
                                :options="timelyOptions"
                                color="primary"
                                inline
                                v-kbd-trap.roving.horizontal
                                v-kbd-trap.roving.vertical
                                v-kbd-trap.roving
                                @focusin="onOptionFocus"
                                size="xl"
                                v-else-if="
                                  content.questionType === 'timelyUntimely'
                                "
                              ></q-option-group>
                              <q-option-group
                                v-model="content.rating"
                                :options="helpfulOptions"
                                color="primary"
                                inline
                                v-kbd-trap.roving.horizontal
                                v-kbd-trap.roving.vertical
                                v-kbd-trap.roving
                                @focusin="onOptionFocus"
                                size="xl"
                                v-else-if="
                                  content.questionType === 'helpfulUnhelpful'
                                "
                              ></q-option-group>
                              <q-option-group
                                v-model="content.rating"
                                :options="fastOptions"
                                color="primary"
                                inline
                                v-kbd-trap.roving.horizontal
                                v-kbd-trap.roving.vertical
                                v-kbd-trap.roving
                                @focusin="onOptionFocus"
                                size="xl"
                                v-else-if="content.questionType === 'fast'"
                              ></q-option-group>
                              <q-option-group
                                v-model="content.rating"
                                :options="yesOrNoOptions"
                                color="primary"
                                inline
                                v-kbd-trap.roving.horizontal
                                v-kbd-trap.roving.vertical
                                v-kbd-trap.roving
                                @focusin="onOptionFocus"
                                size="xl"
                                v-else-if="content.questionType === 'yesOrNo'"
                              ></q-option-group>
                              <q-option-group
                                v-model="content.rating"
                                :options="sufficientOptions"
                                color="primary"
                                inline
                                v-kbd-trap.roving.horizontal
                                v-kbd-trap.roving.vertical
                                v-kbd-trap.roving
                                @focusin="onOptionFocus"
                                size="xl"
                                v-else-if="
                                  content.questionType === 'sufficient'
                                "
                              ></q-option-group>

                              <q-option-group
                                v-model="content.rating"
                                :options="likelyUnlikelyOptions"
                                color="primary"
                                inline
                                v-kbd-trap.roving.horizontal
                                v-kbd-trap.roving.vertical
                                v-kbd-trap.roving
                                @focusin="onOptionFocus"
                                size="xl"
                                v-else-if="
                                  content.questionType === 'likelyUnlikely'
                                "
                              ></q-option-group>

                              <q-option-group
                                v-model="content.rating"
                                :options="efficientOptions"
                                color="primary"
                                inline
                                v-kbd-trap.roving.horizontal
                                v-kbd-trap.roving.vertical
                                v-kbd-trap.roving
                                @focusin="onOptionFocus"
                                size="xl"
                                v-else-if="content.questionType === 'efficient'"
                              ></q-option-group>

                              <q-input
                                outlined
                                v-model="content.rating"
                                label="Comments (Required)"
                                :rules="[(val) => !!val || '* Required']"
                                v-else-if="content.questionType === 'comment'"
                              />
                            </q-item-label>
                            <q-input
                              v-if="showInput && content.questionNumber == 3"
                              filled
                              label="Please specify further"
                              v-model="comment"
                            ></q-input>
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
                  <!-- <q-card-section>
                      <q-input
                        outlined
                        v-model="comment"
                        label="Comments (Required)"
                        :rules="[(val) => !!val || '* Required']"
                      />
                    </q-card-section> -->
                  <q-card-section>
                    <div class="col-12 col-md">
                      <q-btn
                        label="Submit"
                        push
                        color="primary"
                        class="full-width"
                        type="submit"
                      ></q-btn>
                    </div>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { VueKeyboardTrapDirectiveFactory } from "@pdanpdan/vue-keyboard-trap";
const KbdTrap = VueKeyboardTrapDirectiveFactory({}).directive;
const utils = require("src/util/index");
import { mapGetters } from "vuex";
import { Cookies } from "quasar";
export default {
  name: "EvaluationSurvey",
  directives: {
    KbdTrap,
  },
  data() {
    let studentData = Cookies.get("student_no");
    return {
      studentData,
      question: [],
      comment: "",
      answer: [],
      followUpVisible: false,
      bools: {
        evalDialog: true,
      },
      clearOrUnclearOptions: [
        { label: "Very Clear", value: "Very Clear" },
        { label: "Somewhat Clear", value: "Somewhat Clear" },
        { label: "Somewhat Unclear", value: "Somewhat Unclear" },
        { label: "Very Unclear", value: "Very Unclear" },
      ],
      easyOptions: [
        { label: "Very Easy", value: "Very Easy" },
        { label: "Somewhat Easy", value: "Somewhat Easy" },
        { label: "Somewhat Difficult", value: "Somewhat Difficult" },
        { label: "Very Difficult", value: "Very Difficult" },
      ],
      resolvedOptions: [
        {
          label: "Yes, and they were resolved",
          value: "Yes, and they were resolved",
        },
        {
          label: "Yes, but they were not resolved",
          value: "Yes, but they were not resolved",
        },
        {
          label: "No, I did not encounter any issues",
          value: "No, I did not encounter any issues",
        },
      ],
      satisfactoryOptions: [
        { label: "Very Satisfied", value: "Very Satisfied" },
        { label: "Satisfied", value: "Satisfied" },
        { label: "Dissatified", value: "Dissatified" },
        { label: "Very Dissatisifed", value: "Very Dissatisifed" },
      ],
      timelyOptions: [
        { label: "Very Timely", value: "Very Timely" },
        { label: "Somewhat Timely", value: "Somewhat Timely" },
        { label: "Somewhat Untimely", value: "Somewhat Untimely" },
        { label: "Very Untimely", value: "Very Untimely" },
      ],
      helpfulOptions: [
        { label: "Very Helpful", value: "Very Helpful" },
        { label: "Somewhat Helpful", value: "Somewhat Helpful" },
        { label: "Somewhat Unhelpful", value: "Somewhat Unhelpful" },
        { label: "Very Unhelpful", value: "Very Unhelpful" },
      ],
      fastOptions: [
        { label: "Very Fast", value: "Very Fast" },
        { label: "Somewhat Fast", value: "Somewhat Fast" },
        { label: "Somewhat Slow", value: "Somewhat Slow" },
        { label: "Very Slow", value: "Very Slow" },
        {
          label: "Not Applicable, I paid onsite",
          value: "Not Applicable, I paid onsite",
        },
      ],
      sufficientOptions: [
        {
          label: "Yes, it was sufficient",
          value: "Yes, it was insufficient",
        },
        {
          label: "No, it was insufficient",
          value: "No, it was insufficient",
        },
      ],
      efficientOptions: [
        { label: "Very Efficient", value: "Very Efficient" },
        { label: "Somewhat Efficient", value: "Somewhat Efficient" },
        { label: "Somewhat Inefficient", value: "Somewhat Inefficient" },
        { label: "Very Inefficient", value: "Very Inefficient" },
      ],
      yesOrNoOptions: [
        { label: "YES", value: "YES" },
        { label: "NO", value: "NO" },
      ],
      likelyUnlikelyOptions: [
        { label: "Very Likely", value: "Very Likely" },
        { label: "Likely", value: "Likely" },
        { label: "Unlikely", value: "Unlikely" },
        { label: "Very Unlikely", value: "Very Unlikely" },
      ],
      showInput: false,
    };
  }, //end of data
  created() {
    this.checkIfAlreadySubmittedSurvey();
  },
  mounted() {
    this.getEnrollmentSurveyQuestion();
  },
  methods: {
    handleOptionChange(option) {
      if (option === "Yes, but they were not resolved") {
        this.followUpVisible = true;
      } else {
        this.followUpVisible = false;
      }
    },
    async getEnrollmentSurveyQuestion() {
      const payload = {
        yearLevel: this.studentInfo.yearLevel,
      };
      const response = await this.$store.dispatch(
        "evaluation/getEnrollmentEvaluationQuestion",
        payload
      );
      this.question = response;
    }, //end of getEnrollmentSurveyQuestion
    async checkIfAlreadySubmittedSurvey() {
      const payload = {
        studentno: this.studentData,
      };
      const response = await this.$store.dispatch(
        "evaluation/checkIfAlreadySubmittedSurvey",
        payload
      );

      if (response.length == 0) {
        this.bools.evalDialog = true;
      } else {
        this.bools.evalDialog = false;
      }
    },

    onRatingChange(value) {
      this.showInput = value == "Yes, but they were not resolved";
      // return this.content.rating == "Yes, but they were not resolved";
    },

    async submitEvalAnswer() {
      this.$refs.formEval.validate().then(async (valid) => {
        if (!valid) {
          return false;
        }
        const selectedRatings = this.question.map((content) => ({
          questionNumber: content.questionNumber,
          evaluationCode: content.evaluationCode,
          rating: content.rating,
        }));

        this.$q
          .dialog({
            title: "Confirmation",
            message: `Are you sure you want to submit?`,
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

            if (verifyAnswer && this.comment === "") {
              this.$q.notify({
                progress: true,
                type: "failed",
                message: `You need to complete this form before you submit`,
                color: "negative",
                position: "top",
              });
            } else if (!verifyAnswer) {
              const payload = {
                selectedRatings: selectedRatings,
                comment: this.comment,
              };

              const response = await this.$store.dispatch(
                "evaluation/enrollmentSurveyResponse",
                payload
              );

              if (response.message == "Already submitted") {
                this.$q.notify({
                  message: "You already submitted!",
                  position: "top",
                  type: "negative",
                });
                return;
              }

              if (response.error) {
                this.$q.notify({
                  message: "Something went wrong!",
                  position: "top",
                  type: "negative",
                });
                return;
              }

              if (response.length !== 0) {
                this.$q.notify({
                  message: "Successfully submitted",
                  position: "top",
                  type: "positive",
                });
                this.bools.evalDialog = false;
              } else {
                this.$q.notify({
                  message: "Something went wrong!",
                  position: "top",
                  type: "negative",
                });
              }
            } else {
              this.$q.notify({
                progress: true,
                type: "failed",
                message: `Something went wrong`,
                color: "negative",
                position: "top",
              });
            }
          })
          .onCancel(() => {
            if (process.env.DEV) console.log("Saving cancelled.");
          });
      });
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
  }, //end of method
  computed: {
    formattedEval() {
      let formattedEval = [];
      if (this.question.length > 0) {
        formattedEval = utils.groupBy(this.question, "evaluationType");
      }
      return formattedEval;
    },
    ...mapGetters({
      studentInfo: "users/userAccount",
    }),
  }, ///END OF COMPUTED LIFE CYCLE HOOKS
  watch: {
    showAdditionalInput() {
      return this.content.rating == "Yes, but they were not resolved";
    },
  },
};
</script>

<style lang="scss" scoped></style>
