<template>
  <q-card>
    <q-form
      @submit.prevent="submitForm"
      method="post"
      class="q-gutter-md"
      enctype="multipart/form-data"
    >
      <!-- <q-card-section class="text-h6 text-primary text-center text-weight-bold"
        >VACCINATION STATUS SURVEY</q-card-section
      > -->

      <div v-for="vaccine in vaccines" :key="vaccine.name" class="q-mb-lg">
        <q-card>
          <q-card-section class="text-h6 text-primary text-weight-bold">
            {{ vaccine.name }}
          </q-card-section>
          <q-card-section>
            <div
              v-for="dose in vaccine.doses"
              :key="dose.label"
              class="q-mb-md"
            >
              <q-checkbox
                v-model="dose.received"
                :label="dose.label"
                class="q-mb-xs"
              ></q-checkbox>

              <div v-if="dose.received" class="q-pl-md q-py-md">
                <q-input
                  v-model="dose.certificationBy"
                  label="Certification By"
                  outlined
                  class="q-py-md"
                  :rules="[
                    (value) =>
                      dose.received
                        ? (value && value.length > 0) ||
                          'This field is required'
                        : true,
                  ]"
                ></q-input>
                <q-input
                  v-model="dose.antibodyTiter"
                  label="Antibody Titer"
                  outlined
                  class="q-py-md"
                  :rules="[
                    (value) =>
                      dose.received
                        ? (value && value.length > 0) ||
                          'This field is required'
                        : true,
                  ]"
                ></q-input>
                <q-input
                  v-model="dose.vaccineUsed"
                  label="Vaccine Used"
                  outlined
                  class="q-py-md"
                  :rules="[
                    (value) =>
                      dose.received
                        ? (value && value.length > 0) ||
                          'This field is required'
                        : true,
                  ]"
                ></q-input>
                <q-input
                  v-model="dose.route"
                  label="Route"
                  outlined
                  :rules="[
                    (value) =>
                      dose.received
                        ? (value && value.length > 0) ||
                          'This field is required'
                        : true,
                  ]"
                ></q-input>
                <div class="q-mt-md">DATE</div>
                <q-input
                  v-model="dose.date"
                  type="DATE"
                  outlined
                  class="q-pb-md"
                  :rules="[
                    (value) =>
                      dose.received
                        ? (value && value.length > 0) ||
                          'This field is required'
                        : true,
                  ]"
                ></q-input>
                <q-input
                  v-model="dose.administeredBy"
                  label="Administered By"
                  outlined
                  class="q-py-md"
                  :rules="[
                    (value) =>
                      dose.received
                        ? (value && value.length > 0) ||
                          'This field is required'
                        : true,
                  ]"
                ></q-input>
              </div>
              <div v-if="!dose.received" class="q-pl-md">
                <span>Would you like to take this vaccine at UERM?</span>
                <q-checkbox v-model="dose.wantsVaccineAtUERM" />
                <!-- <q-radio
                  v-model="dose.wantsVaccineAtUERM"
                  :options="[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false },
                  ]"
                  val="true"
                /> -->
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="text-center">
        <div class="text-left text-weight-bold q-ml-md">
          NOTE: Kindly combine all of your vaccine photos into a single PDF
          file, which you may then upload in this field.
        </div>
        <div class="row">
          <div class="col-12 col-md-4">
            <q-file
              v-model="uploadedFile"
              label="Upload File"
              outlined
              class="q-py-md q-ml-md"
              accept=".pdf"
              hint="Only .pdf and 5mb are accepted"
              max-file-size="5000000"
              clearable
              @rejected="onRejected"
              :counter-label="sizeLabelFile"
              :rules="[requiredValidation]"
            />
          </div>
        </div>
        <q-btn
          label="Submit"
          type="submit"
          color="primary"
          class="q-mt-md q-mb-md"
          :disabled="!isAnyDoseReceived"
        ></q-btn>
      </div>
    </q-form>
  </q-card>
</template>

<script>
export default {
  name: "VaccineSurvey",
  data() {
    return {
      vaccines: [
        {
          name: "HepatitisB",
          doses: [
            {
              name: "HepatitisB",
              label: "1st Dose",
              received: false,
              wantsVaccineAtUERM: false,
              certificationBy: "",
              antibodyTiter: "",
              vaccineUsed: "",
              route: "",
              date: "",
              administeredBy: "",
            },
            {
              name: "HepatitisB",
              label: "2nd Dose",
              received: false,
              wantsVaccineAtUERM: false,
              certificationBy: "",
              antibodyTiter: "",
              vaccineUsed: "",
              route: "",
              date: "",
              administeredBy: "",
            },
            {
              name: "HepatitisB",
              label: "3rd Dose",
              received: false,
              wantsVaccineAtUERM: false,
              certificationBy: "",
              antibodyTiter: "",
              vaccineUsed: "",
              route: "",
              date: "",
              administeredBy: "",
            },
          ],
        },
        {
          name: "MMR",
          doses: [
            {
              name: "MMR",
              label: "1st Dose",
              received: false,
              wantsVaccineAtUERM: false,
              certificationBy: "",
              antibodyTiter: "",
              vaccineUsed: "",
              route: "",
              date: "",
              administeredBy: "",
            },
            {
              name: "MMR",
              label: "2nd Dose",
              received: false,
              wantsVaccineAtUERM: false,
              certificationBy: "",
              antibodyTiter: "",
              vaccineUsed: "",
              route: "",
              date: "",
              administeredBy: "",
            },
          ],
        },
        {
          name: "Varicella",
          doses: [
            {
              name: "Varicella",
              label: "1st Dose",
              received: false,
              wantsVaccineAtUERM: false,
              certificationBy: "",
              antibodyTiter: "",
              vaccineUsed: "",
              route: "",
              date: "",
              administeredBy: "",
            },
            {
              name: "Varicella",
              label: "2nd Dose",
              received: false,
              wantsVaccineAtUERM: false,
              certificationBy: "",
              antibodyTiter: "",
              vaccineUsed: "",
              route: "",
              date: "",
              administeredBy: "",
            },
            {
              name: "Varicella",
              label: "Tdap",
              received: false,
              wantsVaccineAtUERM: false,
              certificationBy: "",
              antibodyTiter: "",
              vaccineUsed: "",
              route: "",
              date: "",
              administeredBy: "",
            },
          ],
        },
        {
          name: "FluVaccine",
          doses: [
            {
              name: "FluVaccine",
              label: "Received",
              received: false,
              wantsVaccineAtUERM: false,
              certificationBy: "",
              antibodyTiter: "",
              vaccineUsed: "",
              route: "",
              date: "",
              administeredBy: "",
            },
          ],
        },
        {
          name: "Rabies",
          doses: [
            {
              name: "Rabies",
              label: "Pre-exposure Prophylaxis",
              received: false,
              wantsVaccineAtUERM: false,
              certificationBy: "",
              antibodyTiter: "",
              vaccineUsed: "",
              route: "",
              date: "",
              administeredBy: "",
            },
            {
              name: "Rabies",
              label: "Post-exposure Prophylaxis",
              received: false,
              wantsVaccineAtUERM: false,
              certificationBy: "",
              antibodyTiter: "",
              vaccineUsed: "",
              route: "",
              date: "",
              administeredBy: "",
            },
          ],
        },
        {
          name: "Recommended Vaccines",
          doses: [
            {
              name: "Meningococcal",
              label: "Meningococcal",
              received: false,
              wantsVaccineAtUERM: false,
              certificationBy: "",
              antibodyTiter: "",
              vaccineUsed: "",
              route: "",
              date: "",
              administeredBy: "",
            },
            {
              label: "Pneumococcal",
              name: "Pneumococcal",
              received: false,
              wantsVaccineAtUERM: false,
              certificationBy: "",
              antibodyTiter: "",
              vaccineUsed: "",
              route: "",
              date: "",
              administeredBy: "",
            },
          ],
        },
      ],
      uploadedFile: null,
    };
  },
  methods: {
    async submitForm() {
      const formData = new FormData();
      // formData.append("File", this.uploadedFile);
      // formData.append("Vaccines", this.vaccines);

      // this.vaccines.forEach((vaccine) => {
      //   vaccine.doses.forEach((dose) => {
      //     formData.append(
      //       `${vaccine.name}[${dose.label}][received]`,
      //       dose.received
      //     );
      //     formData.append(
      //       `${vaccine.name}[${dose.label}][wantsVaccineAtUERM]`,
      //       dose.wantsVaccineAtUERM
      //     );
      //     formData.append(
      //       `${vaccine.name}[${dose.label}][certificationBy]`,
      //       dose.certificationBy
      //     );
      //     formData.append(
      //       `${vaccine.name}[${dose.label}][antibodyTiter]`,
      //       dose.antibodyTiter
      //     );
      //     formData.append(
      //       `${vaccine.name}[${dose.label}][vaccineUsed]`,
      //       dose.vaccineUsed
      //     );
      //     formData.append(`${vaccine.name}[${dose.label}][route]`, dose.route);
      //     formData.append(`${vaccine.name}[${dose.label}][date]`, dose.date);
      //     formData.append(
      //       `${vaccine.name}[${dose.label}][administeredBy]`,
      //       dose.administeredBy
      //     );
      //   });
      // });

      // For demonstration, log the formData keys and values
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      try {
        const response = await this.$store.dispatch(
          "vaccine/uploadVaccineRecord",
          formData
        );
        console.log("VACCINE RESPONSE", response);
      } catch (error) {
        console.error("Error:", error);
      }
    }, //end of submitForm

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
    sizeLabelFile({ totalSize }) {
      return `size(${totalSize})`;
    },
    requiredValidation(value) {
      return !!value || "This field is required";
    },
  }, //end of method life cycle hooks
  computed: {
    isAnyDoseReceived() {
      return this.vaccines.some((vaccine) =>
        vaccine.doses.some((dose) => dose.received)
      );
    },
  },
};
</script>

<style scoped></style>
