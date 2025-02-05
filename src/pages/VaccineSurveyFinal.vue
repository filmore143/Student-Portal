<template>
  <q-page>
    <q-form @submit.prevent="submitForm" enctype="multipart/form-data">
      <div class="row q-gutter-xl justify-center">
        <div
          class="col-12 col-md-3"
          v-for="vaccine in vaccines"
          :key="vaccine.VaccineId"
        >
          <q-card>
            <q-card-section>
              <div class="text-h6 text-primary text-center">
                {{ vaccine.name }}
              </div>
              <!-- <strong class="text-h6 text-primary">{{ vaccine.name }}</strong> -->

              <q-input
                v-model="vaccine.doseLabel"
                class="q-py-md"
                outlined
                disable
              />
              Certification By
              <q-input
                v-model="vaccine.certificationBy"
                class="q-pb-md"
                outlined
              />
              Antibody Titer
              <q-input
                v-model="vaccine.antibodyTiter"
                class="q-pb-md"
                outlined
              />
              Vaccine Used
              <q-input v-model="vaccine.vaccineUsed" class="q-pb-md" outlined />
              Route
              <q-input v-model="vaccine.route" class="q-pb-md" outlined />
              Date
              <q-input
                v-model="vaccine.date"
                type="date"
                class="q-pb-md"
                outlined
              />
              Administered By
              <q-input
                v-model="vaccine.administeredBy"
                class="q-pb-md"
                outlined
              />
              Upload File
              <q-file
                v-model="vaccine.file"
                outlined
                counter
                style="margin-top: 10px"
                accept=".jpg, .jpeg, .png"
                hint="Only .jpg, .jpeg, .png and 5mb are accepted"
                max-file-size="5000000"
                class="q-pb-xl"
              />
              <q-toggle
                v-model="vaccine.wantsVaccineAtUERM"
                label="I want to take this vaccine at UERM."
              />
            </q-card-section>
            <!-- <q-card-section>
              <q-input
                v-model="vaccine.certificationBy"
                label="Certification By"
                outlined
              />
              <q-input
                v-model="vaccine.antibodyTiter"
                label="Antibody Titer"
                outlined
              />
              <q-input
                v-model="vaccine.vaccineUsed"
                label="Vaccine Used"
                outlined
              />
              <q-input v-model="vaccine.route" label="Route" outlined />
              <q-input
                v-model="vaccine.date"
                label="Date"
                type="date"
                outlined
              />
              <q-input
                v-model="vaccine.administeredBy"
                label="Administered By"
                outlined
              />
              <q-toggle
                v-model="vaccine.wantsVaccineAtUERM"
                label="Wants Vaccine at UERM"
              />
            </q-card-section> -->
          </q-card>
        </div>
      </div>
      <div class="row justify-end q-mr-xl q-mt-md">
        <q-btn type="submit" label="Submit" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: "VaccineSurvey",
  data() {
    return {
      vaccines: [], // Holds vaccines and doses
    };
  },
  mounted() {
    this.fetchVaccines();
  }, //end of mounted
  methods: {
    async fetchVaccines() {
      try {
        const response = await this.$store.dispatch("vaccine/getVaccineList");
        this.vaccines = response.map((vaccine) => ({
          ...vaccine,
          inputValue: "",
          wantsVaccineAtUERM: false,
          certificationBy: "",
          antibodyTiter: "",
          vaccineUsed: "",
          route: "",
          date: "",
          administeredBy: "",
          file: null,
          doses: [],
        }));
      } catch (error) {
        console.error("Error fetching vaccines:", error);
      }
    },
    async submitForm() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "are you sure you want to submit this form?",
          cancel: true,
          persistent: true,
          ok: {
            push: true,
            color: "primary",
          },
          cancel: {
            push: true,
            color: "negative",
          },
        })
        .onOk(async () => {
          const formData = new FormData();

          this.vaccines.forEach((vaccine) => {
            if (vaccine.vaccineId && vaccine.doseId) {
              formData.append("VaccineId", vaccine.vaccineId);
              formData.append(
                "DoseId",
                vaccine.doseId !== "" ? vaccine.doseId : "NO VACCINE YET"
              );
              formData.append(
                "WantsVaccineAtUERM",
                vaccine.wantsVaccineAtUERM ? "true" : "false"
              );
              formData.append(
                "CertificationBy",
                vaccine.certificationBy !== ""
                  ? vaccine.certificationBy
                  : "NO VACCINE YET"
              );
              formData.append(
                "AntibodyTiter",
                vaccine.antibodyTiter !== ""
                  ? vaccine.antibodyTiter
                  : "NO VACCINE YET"
              );
              formData.append(
                "VaccineUsed",
                vaccine.vaccineUsed !== ""
                  ? vaccine.vaccineUsed
                  : "NO VACCINE YET"
              );
              formData.append(
                "Route",
                vaccine.route !== "" ? vaccine.route : "NO VACCINE YET"
              );
              formData.append(
                "DateAdministered",
                vaccine.date
                  ? this.formatDateToYYYYMMDD(new Date(vaccine.date))
                  : this.formatDateToYYYYMMDD(new Date("1900-01-01"))
              );
              formData.append(
                "AdministeredBy",
                vaccine.administeredBy !== ""
                  ? vaccine.administeredBy
                  : "NO VACCINE YET"
              );

              if (vaccine.file) {
                formData.append("file", vaccine.file, vaccine.name);
              }
            }
          });

          try {
            const response = await this.$store.dispatch(
              "vaccine/uploadVaccineRecord",
              formData
            );

            if (response.error) {
              this.$q.notify({
                progress: true,
                type: "failed",
                message: `Something went wrong`,
                color: "negative",
                position: "top",
              });
              return;
            }
            console.log("VACCINE RESPONSE", response);
          } catch (error) {
            console.error("Error:", error);
          }
        });
    },
    // async submitForm() {
    //   try {
    //     this.$q.notify({
    //       color: "green",
    //       message: "Vaccination status submitted successfully!",
    //     });
    //   } catch (error) {
    //     console.error("Error submitting form:", error);
    //     this.$q.notify({
    //       color: "red",
    //       message: "Submission failed. Please try again.",
    //     });
    //   }
    // },
    formatDateToYYYYMMDD(date) {
      const isoDate = date.toISOString().slice(0, 10);
      return isoDate.split("-").join("/");
    },
  }, //end of method
  computed: {
    isAnyDoseReceived() {
      return this.vaccines.some((vaccine) =>
        vaccine.doses.some((dose) => dose.CertificationBy)
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
