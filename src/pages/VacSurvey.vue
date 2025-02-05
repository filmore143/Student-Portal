<template>
  <div class="row q-gutter-md">
    <div class="col-12 col-md">
      <q-form @submit.prevent="submitForm" enctype="multipart/form-data">
        <q-card>
          <q-card-section class="bg-primary text-center text-white">
            STUDENT VACCINE
          </q-card-section>
          <q-card-section>
            Vaccine Name
            <VaccineComponent
              :initialValue="initialVaccine"
              @valueChanged="handleVaccineNameChange"
            />
            Dose
            <DoseComponent
              :vaccine="posts.vaccineName"
              :initialValue="initialDose"
              @valueChanged="handleDoseChange"
            />
            Certification By
            <q-input
              v-model="posts.certificationBy"
              :disable="isUERMSelected"
              class="q-pb-md"
              filled
            />
            Antibody Titer
            <q-input
              v-model="posts.antibodyTiter"
              :disable="isUERMSelected"
              class="q-pb-md"
              filled
            />
            Vaccine Used
            <q-input
              v-model="posts.vaccineUsed"
              :disable="isUERMSelected"
              class="q-pb-md"
              filled
            />
            Route
            <q-input
              v-model="posts.route"
              :disable="isUERMSelected"
              class="q-pb-md"
              filled
            />
            Date
            <q-input
              v-model="posts.date"
              :disable="isUERMSelected"
              type="date"
              class="q-pb-md"
              filled
            />
            Administered By
            <q-input
              v-model="posts.administeredBy"
              :disable="isUERMSelected"
              class="q-pb-md"
              filled
            />
            Upload File
            <q-file
              v-model="posts.file"
              filled
              counter
              style="margin-top: 10px"
              accept=".jpg, .jpeg, .png"
              hint="Only .jpg, .jpeg, .png and 5mb are accepted"
              max-file-size="5000000"
              class="q-pb-xl"
              :disable="isUERMSelected"
            />
            <q-toggle
              v-model="posts.wantsVaccineAtUERM"
              label="I want to take this vaccine at UERM."
              @change="handleUERMChange()"
            />
            <div class="row justify-end q-mt-md">
              <q-btn type="submit" label="Submit" color="primary" />
            </div>
          </q-card-section>
        </q-card>
      </q-form>
    </div>
    <div class="col-12 col-md-5">
      <!-- {{ vaccineRecord }} -->

      <q-table
        flat
        bordered
        title="VACCINE RECORD"
        :rows="vaccineRecord"
        :columns="vaccineColumn"
        row-key="index"
        virtual-scroll
        :rows-per-page-options="[0]"
      >
        <template v-slot:body-cell-fileData="props">
          <q-td :props="props">
            <q-btn
              icon="image"
              square
              color="primary"
              @click="showImage(props.row.fileData.data)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section class="bg-primary text-white text-weight-bold">
          <div class="row justify-between items-center">
            <span class="text-body1 text-uppercase">
              <!-- {{ this.pdfSrc.title }} -->
            </span>
            <span>
              <q-btn icon="fa fa-times" color="red" v-close-popup></q-btn>
            </span>
          </div>
        </q-card-section>
        <!-- <q-card-actions>
          <q-btn color="negative" icon="close" @click="dialog = false" />
        </q-card-actions> -->
        <q-card-section>
          <img :src="imageSrc" style="max-width: 100%; max-height: 100%" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import VaccineComponent from "../components/AutoSuggestion/VaccineName.vue";
import DoseComponent from "../components/AutoSuggestion/VaccineDose.vue";

const vaccineColumn = [
  {
    name: "vaccineName",
    label: "Vaccine Name",
    align: "left",
    field: "vaccineName",
  },
  {
    name: "certificationBy",
    label: "Certification By",
    align: "left",
    field: "certificationBy",
  },
  {
    name: "antibodyTiter",
    label: "Antibody Titer",
    align: "left",
    field: "antibodyTiter",
  },
  {
    name: "route",
    label: "Route",
    align: "left",
    field: "route",
  },
  {
    name: "administeredBy",
    label: "Administered By",
    align: "left",
    field: "administeredBy",
  },
  {
    name: "dateAdministered",
    label: "Date Administered",
    align: "left",
    field: "dateAdministered",
  },
  // {
  //   name: "wantsVaccineAtUerm",
  //   label: "Wanto to Take this Vaccine at UERM",
  //   align: "center",
  //   field: "wantsVaccineAtUerm",
  // },
  {
    name: "fileData",
    label: "VIEW IMAGE",
    align: "center",
    field: "fileData",
  },
];

export default {
  name: "VacSurveyPage",
  components: {
    VaccineComponent,
    DoseComponent,
  },
  data() {
    return {
      dialog: false,
      imageSrc: "",
      initialVaccine: "",
      initialDose: "",
      shortCode: "",
      vaccineRecord: [],
      vaccineColumn,
      posts: {
        vaccineName: "",
        selectedVaccineId: null,
        vaccineDose: "",
        selectedDoseId: "",
        certificationBy: "",
        antibodyTiter: "",
        vaccineUsed: "",
        route: "",
        date: "",
        administeredBy: "",
        file: null,
        wantsVaccineAtUERM: false,
      },
    };
  }, //end of data
  mounted() {
    this.getVaccineRecords();
  },
  computed: {
    isUERMSelected() {
      return this.posts.wantsVaccineAtUERM;
    },
  },
  methods: {
    showImage(buffer) {
      const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)));
      this.imageSrc = `data:image/jpeg;base64,${base64String}`;
      this.dialog = true;
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
          formData.append("VaccineId", this.posts.selectedVaccineId);
          formData.append(
            "DoseId",
            this.posts.selectedDoseId !== ""
              ? this.posts.selectedDoseId
              : "NO VACCINE YET"
          );
          formData.append(
            "WantsVaccineAtUERM",
            this.posts.wantsVaccineAtUERM ? "true" : "false"
          );
          formData.append(
            "CertificationBy",
            this.posts.certificationBy !== ""
              ? this.posts.certificationBy
              : "NO VACCINE YET"
          );
          formData.append(
            "AntibodyTiter",
            this.posts.antibodyTiter !== ""
              ? this.posts.antibodyTiter
              : "NO VACCINE YET"
          );
          formData.append(
            "VaccineUsed",
            this.posts.vaccineUsed !== ""
              ? this.posts.vaccineUsed
              : "NO VACCINE YET"
          );
          formData.append(
            "Route",
            this.posts.route !== "" ? this.posts.route : "NO VACCINE YET"
          );
          formData.append(
            "DateAdministered",
            this.posts.date
              ? this.formatDateToYYYYMMDD(new Date(this.posts.date))
              : this.formatDateToYYYYMMDD(new Date("1900-01-01"))
          );
          formData.append(
            "AdministeredBy",
            this.posts.administeredBy !== ""
              ? this.posts.administeredBy
              : "NO VACCINE YET"
          );

          if (this.posts.file) {
            formData.append("file", this.posts.file, this.posts.name);
          }

          try {
            const response = await this.$store.dispatch(
              "vaccine/submitVaccine",
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

            this.$q.notify({
              progress: true,
              type: "success",
              message: `Successfully submitted`,
              color: "positive",
              position: "top",
            });
            this.getVaccineRecords();

            // console.log("VACCINE RESPONSE", response);
          } catch (error) {
            console.error("Error:", error);
          }
        });
    },

    async getVaccineRecords() {
      const response = await this.$store.dispatch("vaccine/getVaccineRecord");
      this.vaccineRecord = response;
      this.tableImageData = [{ fileData: response }];
    },

    handleVaccineNameChange({ name, vaccineId }) {
      // console.log("Vaccine Name", name, vaccineId);
      this.posts.selectedVaccineId = vaccineId;
      this.posts.vaccineName = name;
    },
    handleDoseChange({ name, doseId }) {
      // console.log("Vaccine DOSE", doseId);
      this.posts.selectedDoseId = doseId;
      this.posts.vaccineDose = name;
    },
    formatDateToYYYYMMDD(date) {
      const isoDate = date.toISOString().slice(0, 10);
      return isoDate.split("-").join("/");
    },

    handleUERMChange() {
      if (this.posts.wantsVaccineAtUERM) {
        this.posts.certificationBy = "NO VACCINE YET";
        this.posts.antibodyTiter = "NO VACCINE YET";
        this.posts.vaccineUsed = "NO VACCINE YET";
        this.posts.route = "NO VACCINE YET";
        this.posts.date = "NO VACCINE YET";
        this.posts.administeredBy = "NO VACCINE YET";
      } else {
        this.posts.certificationBy = "";
        this.posts.antibodyTiter = "";
        this.posts.vaccineUsed = "";
        this.posts.route = "";
        this.posts.date = "";
        this.posts.administeredBy = "";
      }
    },
  }, //end of method
};
</script>

<style lang="scss" scoped>
.q-table__top,
.q-table__bottom,
thead tr:first-child th {
  background-color: #00b4ff;
}

thead tr th {
  position: sticky;
  z-index: 1;
}
thead tr:first-child th {
  top: 0;
}
</style>
