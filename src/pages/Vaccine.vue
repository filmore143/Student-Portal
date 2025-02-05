<template>
  <div>
    <q-card>
      <q-card-section>
        <q-form
          @submit.prevent="uploadVaccineRecord()"
          method="post"
          class="q-gutter-md"
          enctype="multipart/form-data"
          name="file"
        >
          <!-- <q-card flat>
            <q-card-section
              class="bg-blue-grey-2 text-caption text-weight-bold"
            >
              Doses of COVID-19 Vaccine
            </q-card-section>
          </q-card> -->
          <div class="row justify-end q-gutter-md">
            <q-btn
              label="add vaccine"
              color="yellow-8"
              text-color="black"
              @click="addVaccine"
            />
          </div>
          <!-- <div class="row justify-end">
            <div class="col-12 col-md-1 q-mt-xl">
              <q-btn
                @click="deleteVaccine(index)"
                color="negative"
                icon="delete"
              />
            </div>
          </div> -->

          <q-card class="q-mt-xl">
            <q-card-section>
              <div
                class="row justify-center q-gutter-md"
                v-for="(vaccine, index) in posts.vaccines"
                :key="index"
              >
                <q-card class="col-12 col-md-12 q-mt-xl">
                  <q-card-section
                    class="bg-blue-grey-2 text-center text-caption text-weight-bold"
                  >
                    VACCINE INFO
                  </q-card-section>
                </q-card>
                <div class="column items-end col-12 col-md-12">
                  <!-- <div class="col-12 col-md-12 q-mt-xl">
                    <q-btn
                      @click="deleteVaccine(index)"
                      color="negative"
                      icon="delete"
                    />
                  </div> -->
                </div>

                <div class="col-12 col-md-3">
                  <q-input
                    v-model="vaccine.vaccineName"
                    :rules="[requiredValidation]"
                    outlined
                    label="Vaccine Name"
                  />
                </div>
                <div class="col-12 col-md-3">
                  <q-input
                    v-model="vaccine.vacDose"
                    :rules="[requiredValidation]"
                    outlined
                    label="Vaccine Dose"
                  />
                  <!-- <q-select
                    outlined
                    v-model="vaccine.vacDose"
                    :options="doseOptions"
                    label="Vaccine Dose"
                  /> -->
                </div>

                <div class="col-12 col-md-3">
                  <!-- <q-input
                    v-model="vaccine.brandName"
                    :rules="[requiredValidation]"
                    outlined
                    label="Brand Name"
                  /> -->
                  <q-input
                    v-model="vaccine.route"
                    :rules="[requiredValidation]"
                    outlined
                    label="Route"
                  />
                </div>
                <div class="col-12 col-md-3">
                  <q-input
                    v-model="vaccine.administerBy"
                    :rules="[requiredValidation]"
                    outlined
                    label="Administer By"
                  />
                </div>
                <div class="col-12 col-md-3">
                  <q-input
                    stack-label
                    outlined
                    v-model="vaccine.dateAdministered"
                    mask="date"
                    label-slot
                    :rules="['date']"
                    hide-bottom-space
                    square
                    label="Date Administered"
                  >
                    <template v-slot:label
                      >Date Administered (YYYY/MM/DD)
                    </template>
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="vaccine.dateAdministered">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-md-3">
                  <q-input
                    v-model="vaccine.physicianName"
                    :rules="[requiredValidation]"
                    outlined
                    label="Physician Name"
                  />
                </div>
                <div class="col-12 col-md-3">
                  <q-input
                    v-model="vaccine.antibodyTiter"
                    :rules="[requiredValidation]"
                    outlined
                    label="Antibody Titer"
                  />
                </div>

                <div class="col-12 col-md-3">
                  <q-file
                    v-model="vaccine.file"
                    accept=".jpg, .jpeg, .png"
                    hint="Only .jpg, .jpeg, .png, and 5mb are accepted"
                    max-file-size="5000000"
                    clearable
                    @rejected="onRejected"
                    :counter-label="sizeLabelFile"
                    name="file"
                    :rules="[requiredValidation]"
                    counter
                    square
                    outlined
                    class="InputToUpper"
                    label="Certificate File"
                  >
                    <template v-slot:append>
                      <q-icon name="attach_file" />
                    </template>

                    <!-- <template #file="{ file }">
                      <q-chip class="full-width q-my-xs" rounded>
                        {{ file.name }}
                      </q-chip>
                    </template> -->
                  </q-file>
                </div>
                <div class="col-12 col-md-3">
                  <q-input
                    v-model="vaccine.notes"
                    :rules="[requiredValidation]"
                    outlined
                    label="Notes"
                    autogrow
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>

          <div class="row justify-end q-pt-xl">
            <div class="">
              <q-btn
                class="btn full-width text-white"
                label="Submit"
                type="submit"
                color="primary"
              >
              </q-btn>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "VaccineRecords",
  data() {
    return {
      posts: {
        vaccines: [
          {
            vaccineName: "",
            vacDose: "",
            route: "",
            administerBy: "",
            dateAdministered: "",
            physicianName: "",
            antibodyTiter: "",
            notes: "",
            file: [],
            // brandName: "",
          },
        ],
      },
      doseOptions: ["1ST DOSE", "2ND DOSE", "3RD DOSE"],
      // file: [],
    };
  }, //end of data
  methods: {
    sizeLabelFile({ totalSize }) {
      return `size(${totalSize})`;
    },
    async uploadVaccineRecord() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Are you sure would you like to continue?",
          ok: {
            color: "primary",
            label: "SUBMIT",
            buttonProps: {
              color: "red",
            },
          },
          cancel: {
            flat: true,
            color: "primary",
          },
          persistent: true,
        })
        .onOk(async () => {
          const formData = new FormData();
          // formData.append("file", this.vaccines.file, this.vaccines.file.name);
          // formData.append("vaccines", JSON.stringify(this.posts.vaccines));

          this.posts.vaccines.forEach((field) => {
            formData.append("file", field.file);
          });

          formData.append("vaccines", this.posts.vaccines);

          // this.posts.vaccines.forEach((field) => {
          //   if (field.file) {
          //     formData.append("file", field.file);
          //     formData.append("vaccineName", field.vaccineName);
          //     formData.append("vacDose", field.vacDose);
          //     formData.append("route", field.route);
          //     formData.append("administerBy", field.administerBy);
          //     formData.append("dateAdministered", field.dateAdministered);
          //     formData.append("physicianName", field.physicianName);
          //     formData.append("antibodyTiter", field.antibodyTiter);
          //     formData.append("notes", field.notes);
          //   }
          // });

          formData.append("vaccines", this.posts.vaccines);

          try {
            const response = await this.$store.dispatch(
              "vaccine/uploadVaccineRecord",
              formData
            );

            if (response.message === "You already submittted vaccine") {
              this.$q.notify({
                message: "You already submittted vaccine",
                position: "bottom",
                type: "negative",
              });
              return;
            }

            if (response.error) {
              this.$q.notify({
                message: "Something went wrong!",
                position: "bottom",
                type: "negative",
              });
              return;
            }

            this.$q.notify({
              message: "Successfully submited!",
              position: "bottom",
              type: "positive",
            });
          } catch (error) {
            console.log(error);
          }
        });
    }, //end of uploadVaccineRecord

    addVaccine() {
      this.posts.vaccines.push({
        vaccineName: "",
        vacDose: "",
        route: "",
        administerBy: "",
        dateAdministered: "",
        physicianName: "",
        antibodyTiter: "",
        notes: "",
        file: [],
      });
    },
    deleteVaccine(index) {
      this.posts.vaccines.splice(index, 1);
    },

    onRejected(entries) {
      if (entries.length > 0) {
        switch (entries[0].failedPropValidation) {
          case "max-file-size":
            this.$q.notify({
              position: "bottom",
              type: "negative",
              message: "File exceeds 5MB.",
            });
            break;
        }
      }
    }, //end of onRejected

    requiredValidation(value) {
      return !!value || "This field is required";
    },
  }, //end of method
};
</script>

<style lang="scss" scoped></style>
