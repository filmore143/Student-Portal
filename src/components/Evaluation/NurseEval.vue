<template>
  <div class="fit flex flex-center" v-if="loading">
    <q-spinner-hourglass color="primary" size="150px" />
  </div>
  <div v-else>
    <q-card
      class="col-12 text-h6 text-center bg-primary text-white q-mt-xl q-mb-lg"
    >
      <q-card-section class="row justify-start items-start">
        <div class="col-12 col-md-3">I. STUDENT SERVICES EVALUATION</div>
      </q-card-section>
    </q-card>
    <div class="row justify-start q-mb-md clickable-card">
      <SSEval :subject="studServiceEval" />
    </div>
    <q-list
      bordered
      separator
      class="rounded-borders"
      v-if="facultyList.length !== 0"
    >
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>
          <!-- LIST -->
          <q-card-section class="row justify-start">
            <div class="col-12 col-md-2">
              II. CLASSROOM / COURSE / PERFORMANCE EVALUATION
            </div>
            <!-- <div class="col-12 col-md">
              <SSEval :subject="studServiceEval" />
            </div> -->
          </q-card-section>
        </q-toolbar-title>
      </q-toolbar>
      <q-item v-for="(studEval, i) in facultyList" :key="i" class="row">
        <!-- <pre>
          {{ studEval }}
        </pre> -->
        <q-item-section avatar top class="col">
          <div class="row">
            <!-- <q-avatar
              size="70px"
              color="grey-8"
              text-color="grey-8"
              font-size="120px"
            >
              <q-img
                :src="`https://iehr.uerm.edu.ph/users/public-picture/${studEval.employeeCode}`"
              />
            </q-avatar> -->
            <div class="col-6 q-ml-xs q-mt-xs">
              <q-item-label>{{
                studEval.lastName + "," + studEval.firstName
              }}</q-item-label>
              <q-item-label caption>
                <span class="text-weight-bold"
                  >Subject: {{ studEval.subjectCode }}</span
                >
              </q-item-label>
              <q-item-label caption top>
                <span class="text-weight-bold"
                  >Section: {{ studEval.section }}</span
                >
              </q-item-label>
            </div>
          </div>
        </q-item-section>
        <q-item-section side class="col">
          <div class="text-grey-8 q-gutter-lg">
            <q-btn
              label="CLASSROOM EVALUATION"
              outline
              :color="
                studEval.cON2023 === 1 || isCardDisabled(studEval)
                  ? 'grey'
                  : 'primary'
              "
              @click="
                studEval.cON2023 === 0 && !isCardDisabled(studEval)
                  ? getEvalQuestion(
                      studEval.subjectCode,
                      studEval.facultyid,
                      'CON2023'
                    )
                  : null
              "
              :class="{
                'cursor-not-allowed':
                  isCardDisabled(studEval) || studEval.cON2023 === 1,
              }"
            />
            <q-btn
              label="COURSE EVALUATION"
              outline
              :color="
                studEval.cEN2023 === 1 || isCardDisabled(studEval)
                  ? 'grey'
                  : 'primary'
              "
              @click="
                studEval.cEN2023 === 0 && !isCardDisabled(studEval)
                  ? getEvalQuestion(
                      studEval.subjectCode,
                      studEval.facultyid,
                      'CEN2023'
                    )
                  : null
              "
              :class="{
                'cursor-not-allowed':
                  isCardDisabled(studEval) || studEval.cEN2023 === 1,
              }"
            />
            <q-btn
              label="PERFORMANCE EVALUATION"
              outline
              :color="
                studEval.pEN2023 === 1 || isCardDisabled(studEval)
                  ? 'grey'
                  : 'primary'
              "
              @click="
                studEval.pEN2023 === 0 && !isCardDisabled(studEval)
                  ? getEvalQuestion(
                      studEval.subjectCode,
                      studEval.facultyid,
                      'PEN2023'
                    )
                  : null
              "
              :class="{
                'cursor-not-allowed':
                  isCardDisabled(studEval) || studEval.pEN2023 === 1,
              }"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>

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
                            {{ number + 1 }}. {{ content.description }}
                          </q-item-section>

                          <q-item-section side top class="col">
                            <div
                              class="q-gutter-sm"
                              v-if="
                                content.evaluationType ===
                                'Classroom Observation Evaluation'
                              "
                            >
                              <q-option-group
                                v-model="content.rating"
                                :options="classroomOptions"
                                color="primary"
                                inline
                                v-kbd-trap.roving.horizontal
                                v-kbd-trap.roving.vertical
                                v-kbd-trap.roving
                                @focusin="onOptionFocus"
                                size="xl"
                              ></q-option-group>
                            </div>

                            <div
                              class="q-gutter-sm"
                              v-if="
                                content.evaluationType === 'Course Evaluation'
                              "
                            >
                              <q-option-group
                                v-model="content.rating"
                                :options="courseOptions"
                                color="primary"
                                inline
                                v-kbd-trap.roving.horizontal
                                v-kbd-trap.roving.vertical
                                v-kbd-trap.roving
                                @focusin="onOptionFocus"
                                size="xl"
                              ></q-option-group>
                            </div>
                            <div
                              class="q-gutter-sm"
                              v-if="
                                content.evaluationType ===
                                'Performance Evaluation'
                              "
                            >
                              <q-option-group
                                v-model="content.rating"
                                :options="performanceOptions"
                                color="primary"
                                inline
                                v-kbd-trap.roving.horizontal
                                v-kbd-trap.roving.vertical
                                v-kbd-trap.roving
                                @focusin="onOptionFocus"
                                size="xl"
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
                <q-card-section>
                  <q-input
                    outlined
                    v-model="comment"
                    label="Comments/Suggestions"
                  />
                </q-card-section>
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
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { VueKeyboardTrapDirectiveFactory } from "@pdanpdan/vue-keyboard-trap";
import SSEval from "./StudentServiceEval.vue";
const utils = require("src/util/index");

const KbdTrap = VueKeyboardTrapDirectiveFactory({}).directive;
export default defineComponent({
  name: "NurseEval",
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
      answer: [],
      comment: "",
      classroomOptions: [
        { label: "5 - Always", value: "5" },
        { label: "4 - Often", value: "4" },
        { label: "3 - Sometimes", value: "3" },
        { label: "2 - Rarely", value: "2" },
        { label: "1 - Never", value: "1" },
      ],
      courseOptions: [
        { label: "5 - Strongly Agree", value: "5" },
        { label: "4 - Agree", value: "4" },
        { label: "3 - Disagree", value: "3" },
        { label: "2 - Strongly Disagree", value: "2" },
        { label: "1 - Not Applicable", value: "1" },
      ],
      performanceOptions: [
        { label: "5 - Excellent", value: "5" },
        { label: "4 - Very Good", value: "4" },
        { label: "3 - Good", value: "3" },
        { label: "2 - Fair", value: "2" },
        { label: "1 - Poor", value: "1" },
      ],
      facultyList: [],
      loading: false,
      questionLoading: false,
      studServiceEval: [],
    };
  }, //END OF DATA LIFE CYCLE HOOKS
  methods: {
    async getEvalQuestion(subjectcode, facultyid, evalcode) {
      this.questionDialog = true;
      this.questionLoading = true;
      const payload = {
        subjectCode: subjectcode,
        facultyId: facultyid,
        evalCode: evalcode,
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
        this.loading = false;
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
              this.$emit("eval");
              this.nurseFacultyList();
              this.questionDialog = false;
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

    async nurseFacultyList() {
      this.loading = true;
      const response = await this.$store.dispatch(
        "evaluation/nurseFacultyList"
      );
      if (response !== 0) {
        setTimeout(() => {
          this.loading = false;
          this.facultyList = response;
        }, 1000);
      }
    }, //END OF nurseFacultyList
  }, //END OF METHOD LIFE CYCLE HOOKS
  computed: {
    formattedEval() {
      let formattedEval = [];
      if (this.question.length > 0) {
        formattedEval = utils.groupBy(this.question, "evaluationType");
      }
      return formattedEval;
    }, //END OF formattedEval
    formattedFaculty() {
      let formatFaculty = [];
      if (this.facultyList.length > 0) {
        formatFaculty = utils.groupBy(this.facultyList, "computerCode");
      }
      return formatFaculty;
    },
  }, //END OF COMPUTED LIFE CYCLE HOOKS
  created() {
    this.nurseFacultyList();
  },
});
</script>

<style lang="scss" scoped>
.subject-code {
  word-wrap: break-word;
  white-space: normal;
  max-width: 400px;
}
</style>
