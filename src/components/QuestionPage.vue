<template>
  <div>
    {{ this.currentHashmapTemplate }}
    <q-form ref="formEval" @submit="submitEval">
      <div v-for="field of this.template" :key="field">
        <q-expansion-item
          expand-separator
          icon="fas fa-school"
          :label="field.questionName"
          default-opened
          header-class="bg-primary text-white text-uppercase text-body1"
          expand-icon-class="text-white"
        >
          <q-card square class="shadow-0" bordered>
            <q-card-section>
              <q-list bordered class="rounded-borders">
                <div v-for="(content, index) in field.children" :key="index">
                  <q-item>
                    <q-item-section>
                      {{ index + 1 }}. {{ content.questionName }}
                    </q-item-section>

                    <q-item-section side top>
                      <q-btn-toggle
                        :disable="this.bools.disableButtons"
                        v-model="content.rating"
                        @update:model-value="
                          setRating({
                            code: content.questionCode,
                            value: content.rating,
                          })
                        "
                        push
                        toggle-color="yellow-8"
                        toggle-text-color="black"
                        :options="[
                          {
                            label: 'STRONGLY DISAGREE',
                            value: '1',
                            slot: 'one',
                          },
                          { label: 'DISAGREE', value: '2', slot: 'two' },
                          { label: 'AGREE', value: '3', slot: 'three' },
                          { label: 'STRONGLY AGREE', value: '4', slot: 'four' },
                        ]"
                      >
                        <template v-slot:one>
                          <q-icon right name="fas fa-thumbs-down" />
                          <q-tooltip>STRONGLY DISAGREE!</q-tooltip>
                        </template>

                        <template v-slot:two>
                          <q-icon right name="far fa-thumbs-down" />
                          <q-tooltip>DISAGREE!</q-tooltip>
                        </template>
                        <template v-slot:three>
                          <q-icon right name="far fa-thumbs-up" />
                          <q-tooltip>AGREE!</q-tooltip>
                        </template>
                        <template v-slot:four
                          ><q-icon right name="fas fa-thumbs-up" />
                          <q-tooltip>STRONGLY AGREE!</q-tooltip>
                        </template>
                      </q-btn-toggle>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                </div>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
      <div class="row">
        <div class="col-12">
          <q-card bordered square>
            <q-card-section>
              <div>
                <q-input
                  square
                  v-model="remarks"
                  filled
                  placeholder="Comments/Suggestions: "
                  type="textarea"
                  :rules="[(val) => !!val || 'Field is required']"
                /></div
            ></q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row">
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
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: "QuestionPage",
  props: ["currentTemplate", "currentHashmapTemplate"],
  data() {
    return {
      template: [],
      remarks: "",
    };
  }, //END OF DATA LIFE CYCLE
  mounted() {
    // let cloneTemplate = JSON.parse(JSON.stringify(this.currentTemplate));
    // this.template = cloneTemplate;
  }, //END OF CREATED LIFE CYCLE HOOKS
  methods: {
    submitEval() {
      this.$refs.formEval.validate().then(async (valid) => {
        if (!valid) {
          return false;
        }
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
            let validatedForm = true;
            for (var hashMap in this.currentHashmapTemplate) {
              if (this.currentHashmapTemplate[hashMap].rating === "") {
                validatedForm = false;
              }
            }
            if (!validatedForm) {
              this.$q.notify({
                progress: true,
                type: "negative",
                message: `Please rate all questions on the Evaluation!`,
              });
            } else {
              const studentEvaluation = {
                studentInfo: JSON.stringify(this.studentInfo),
                results: JSON.stringify(this.currentHashmapTemplate),
                remarks: this.remarks,
              };
              await this.$store.dispatch(
                "students/saveEvaluation",
                studentEvaluation
              );
              await this.$store.dispatch(
                "students/saveOldEvaluation",
                studentEvaluation
              );
              this.bools.disableButtons = true;
              this.$q.notify({
                progress: true,
                type: "success",
                message: `Successfully saved the Evaluation`,
              });
            }
          })
          .onCancel(() => {
            if (process.env.DEV) console.log("Saving cancelled.");
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
