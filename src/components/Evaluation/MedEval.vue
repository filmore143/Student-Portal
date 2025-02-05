<template>
  <div class="fit flex flex-center" v-if="isLoading">
    <q-spinner-hourglass color="primary" size="150px" />
  </div>

  <div class="row clickable-card" v-else>
    <q-card
      class="col-12 text-h6 text-center bg-primary text-white q-mt-xl q-mb-lg"
    >
      <!-- <q-card-section class="row justify-around items-center">
        <div class="col-12 col-md">
          <SSEval :subject="studServiceEval" />
        </div>
      </q-card-section> -->

      <q-card-section class="row justify-start items-start">
        <div class="col-12 col-md-3">I. STUDENT SERVICES EVALUATION</div>
      </q-card-section>
    </q-card>
    <div class="row clickable-card">
      <SSEval :subject="studServiceEval" />
    </div>
    <!-- <div class="row justify-center clickable-card">
      <q-card
        class="col-12 text-h6 text-center bg-primary text-white q-mt-xl q-mb-lg"
      >
        <q-card-section>
          <q-card-section class="row justify-around items-center">
            COURSE EVALUATION BY
            {{ subjectlist[0].yearLevel === 3 ? "3RD" : "4TH" }} YEAR STUDENTS
          </q-card-section>
        </q-card-section>
      </q-card>
      <template v-for="(studEval, i) in subjectlist" :key="i">
        <q-card
          class="hoverable-card q-mt-md q-mx-lg q-mb-md"
          @click="
            subjectlist[i].dateCompleted === null && !isCardDisabled(studEval)
              ? getEvalQuestion(
                  studEval.subjectCode,
                  studEval.evalID,
                  studEval.evalCode
                )
              : null
          "
          :class="{
            'cursor-not-allowed':
              subjectlist[i].dateCompleted !== null || isCardDisabled(studEval),
          }"
          style="min-width: 400px"
          v-if="
            (studEval.facultyId == 0 ||
              studEval.facultyId == '' ||
              studEval.facultyId == null) &&
            (studEval.evalCode === 'CE3YL2324' ||
              studEval.evalCode === 'CE4YL2324')
          "
        >
          <q-card-section class="text-center">
            <q-avatar
              square
              size="100px"
              font-size="82px"
              color="white"
              text-color="grey-7"
              class="full-width"
            >
              {{ i + 1 }}</q-avatar
            >
            <br />
            <br />
            <div
              :class="
                studEval.dateCompleted === null ? 'text-red' : 'text-green'
              "
            >
              {{
                studEval.dateCompleted === null
                  ? "NOT YET COMPLETED"
                  : "COMPLETED"
              }}
            </div>

            <div
              class="text-weight-bold text-body1"
              v-if="studEval.subjectCode !== ' ' && studEval.facultyid !== null"
            >
              {{ studEval.subjectCode }}
            </div>
            <div
              class="text-weight-bold text-body1"
              v-if="studEval.facultyid !== 0 && studEval.firstName !== null"
            >
              {{ studEval.lastName + ", " + studEval.firstName }}
            </div>
          </q-card-section>
        </q-card>
      </template>
    </div> -->

    <!-- <q-card
      class="col-12 text-h6 text-center bg-primary text-white q-mt-xl q-mb-lg"
    >
      <q-card-section>
        <q-card-seCE4LY2324ction class="row justify-around items-center">
          <div class="col-12 col-md-3">CURRICULUM EVALUATION (MEDICINE)</div>
          <div class="col-12 col-md">
            <SSEval :subject="studServiceEval" />
          </div>
        </q-card-seCE4LY2324ction>
      </q-card-section>
    </q-card>
    <div class="row justify-center clickable-card">
      <template v-for="(studEval, i) in subjectlist" :key="i">
        <q-card
          class="hoverable-card q-mt-md q-mx-lg q-mb-md"
          @click="
            subjectlist[i].dateCompleted === null && !isCardDisabled(studEval)
              ? getEvalQuestion(
                  studEval.subjectCode,
                  studEval.evalID,
                  studEval.evalCode
                )
              : null
          "
          :class="{
            'cursor-not-allowed':
              subjectlist[i].dateCompleted !== null || isCardDisabled(studEval),
          }"
          style="min-width: 400px"
          v-if="studEval.descrip === 'CURRICULUM EVALUATION (MEDICINE)'"
        >
          <q-card-section class="text-center">
            <q-avatar
              square
              size="100px"
              font-size="82px"
              color="white"
              text-color="grey-7"
              class="full-width"
            >
              {{ i + 1 }}</q-avatar
            >
            <br />
            <br />
            <div
              :class="
                studEval.dateCompleted === null ? 'text-red' : 'text-green'
              "
            >
              {{
                studEval.dateCompleted === null
                  ? "NOT YET COMPLETED"
                  : "COMPLETED"
              }}
            </div>

            <div
              class="text-weight-bold text-body1"
              v-if="studEval.subjectCode !== ' ' && studEval.facultyid !== null"
            >
              {{ studEval.subjectCode }}
            </div>
            <div
              class="text-weight-bold text-body1"
              v-if="studEval.facultyid !== 0 && studEval.firstName !== null"
            >
              {{ studEval.lastName + ", " + studEval.firstName }}
            </div>
          </q-card-section>
        </q-card>
      </template>
    </div> -->

    <!--HIDE MUNA-->
    <!-- <div class="row justify-center clickable-card">
      <q-card
        class="col-12 text-h6 text-start bg-primary text-white q-mt-xl q-mb-lg"
      >
        <q-card-section>
          <q-card-seCE4LY2324ction
            class="row justify-around items-start q-ml-md"
          >
            <div class="col-12 col-md">II. SUBJECT LIST EVALUATION</div>
          </q-card-seCE4LY2324ction>
        </q-card-section>
      </q-card>
      <template v-for="(studEval, i) in subjectlist" :key="i">
        <q-card
          class="hoverable-card q-mt-md q-mx-lg q-mb-md"
          @click="
            subjectlist[i].dateCompleted === null && !isCardDisabled(studEval)
              ? getEvalQuestion(
                  studEval.subjectCode,
                  studEval.evalID,
                  studEval.evalCode
                )
              : null
          "
          :class="{
            'cursor-not-allowed':
              subjectlist[i].dateCompleted !== null || isCardDisabled(studEval),
          }"
          style="min-width: 400px"
        >
          <q-card-section class="text-center">
            <q-avatar
              square
              size="100px"
              font-size="82px"
              color="white"
              text-color="grey-7"
              class="full-width"
            >
              {{ i + 1 }}</q-avatar
            >
            <br />
            <br />
            <div
              :class="
                studEval.dateCompleted === null ? 'text-red' : 'text-green'
              "
            >
              {{
                studEval.dateCompleted === null
                  ? "NOT YET COMPLETED"
                  : "COMPLETED"
              }}
            </div>

            <div
              class="text-weight-bold text-body1"
              v-if="studEval.subjectCode !== ' ' && studEval.facultyid !== null"
            >
              {{ studEval.subjectCode }}
            </div>
            <div
              class="text-weight-bold text-body1"
              v-if="studEval.facultyid !== 0 && studEval.firstName !== null"
            >
              {{ studEval.lastName + ", " + studEval.firstName }}
            </div>
          </q-card-section>
        </q-card>
      </template>
    </div> -->

    <!--DIALOG FOR QUESTION-->
    <q-dialog
      v-model="questionDialog"
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
          <template v-for="(title, index) in formattedEval" :key="index">
            <q-card
              v-if="title[0].subj !== null"
              class="row justify-center text-h6 bg-yellow-8 text-weight-bold q-mb-md q-mt-md"
            >
              <q-card-section>
                {{ title[0].subj !== null ? title[0].subj : "" }}
              </q-card-section>
            </q-card>
          </template>
          <q-form ref="formEval" @submit.prevent="submitEval">
            <q-card>
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
                      <q-list>
                        <q-item>
                          <q-item-label> </q-item-label>
                          <q-item-section class="col">
                            {{ number + 1 }}. {{ content.description }} <br />
                            <q-input
                              outlined
                              v-model="content.rating"
                              label=""
                              v-if="content.questionType === 'comments'"
                              autogrow
                            />
                          </q-item-section>

                          <q-item-section side top>
                            <div class="q-gutter-sm">
                              <q-option-group
                                v-model="content.rating"
                                :options="medOptions"
                                color="primary"
                                inline
                                v-kbd-trap.roving.horizontal
                                v-kbd-trap.roving.vertical
                                v-kbd-trap.roving
                                @focusin="onOptionFocus"
                                size="xl"
                                v-if="content.questionType === null"
                              ></q-option-group>
                              <q-option-group
                                v-model="content.rating"
                                :options="medOptionsRating1to4"
                                color="primary"
                                inline
                                v-kbd-trap.roving.horizontal
                                v-kbd-trap.roving.vertical
                                v-kbd-trap.roving
                                @focusin="onOptionFocus"
                                size="xl"
                                v-if="content.questionType === 'Rating1to4'"
                              ></q-option-group>
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
                <!-- <q-card-section>
                  <q-input outlined v-model="comment" label="Comments" />
                </q-card-section> -->
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
    <!--DIALOG FOR QUESTION-->
  </div>
</template>
<script>
import { VueKeyboardTrapDirectiveFactory } from "@pdanpdan/vue-keyboard-trap";
import SSEval from "./StudentServiceEval.vue";

const utils = require("src/util/index");
const KbdTrap = VueKeyboardTrapDirectiveFactory({}).directive;
export default {
  name: "MedEvalPage",
  props: ["subjectlist", "isLoading"],
  directives: {
    KbdTrap,
  },
  components: {
    SSEval,
  },
  data() {
    return {
      question: [],
      questionDialog: false,
      questionLoading: false,
      comment: "",
      answer: [],
      medOptions: [
        { label: "5 - Strongly Agree", value: "5" },
        { label: "4 - Agree", value: "4" },
        { label: "3 - Disagree", value: "3" },
        { label: "2 - Strongly Disagree", value: "2" },
        { label: "1 - Not Applicable", value: "1" },
      ],
      medOptionsRating1to4: [
        { label: "4 - Strongly Agree", value: "4" },
        { label: "3 - Agree", value: "3" },
        { label: "2 - Mildy Disagree", value: "2" },
        { label: "1 - Strongly Disagree", value: "1" },
      ],
      studServiceEval: [],
    };
  }, //END OF DATA LIFE CYCLE HOOKS
  methods: {
    async getEvalQuestion(subjectcode, evalid, evalCode) {
      this.questionLoading = true;
      this.questionDialog = true;

      const payload = {
        subjectCode: subjectcode,
        evalId: evalid,
        evalCode: evalCode,
      };

      const response = await this.$store.dispatch(
        "evaluation/getEvalQuestion",
        payload
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
          this.questionDialog = true;
        }, 1000);
      } else {
        this.questionLoading = false;
      }
    }, //END OF getEvalQuestion METHOD
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
                comment: this.comment,
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
              // this.getEvalution();
              this.$emit("eval");
              this.questionDialog = false;
              this.comment = "";
            } else {
              this.$q.notify({
                progress: true,
                type: "failed",
                message: `Something went wrong`,
                color: "negative",
                position: "bottom",
              });
            }
          })
          .onCancel(() => {
            if (process.env.DEV) console.log("Saving cancelled.");
          });
      });
    }, //END OF submitEval METHOD
    isCardDisabled(studEval) {
      const currentDate = new Date();
      let dateFrom = new Date(studEval.dateFrom);
      let dateTo = new Date(studEval.dateTo);

      if (currentDate < dateFrom || currentDate > dateTo) return true;
      else return false;
    }, //END OF isCardDisabled METHOD
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
  }, ///END OF METHOD LIFE CYCLE HOOKS
  computed: {
    formattedEval() {
      let formattedEval = [];
      if (this.question.length > 0) {
        formattedEval = utils.groupBy(this.question, "evaluationType");
      }
      return formattedEval;
    },
  }, ///END OF COMPUTED LIFE CYCLE HOOKS
};
</script>

<style lang="scss" scoped>
.clickable-card {
  cursor: pointer;
  transition: background-color 0.3s;
}

.hoverable-card:hover {
  background-color: rgb(193, 221, 235);
}
</style>
