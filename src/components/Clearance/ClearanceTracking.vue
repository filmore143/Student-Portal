<template>
  <div class="row">
    <div class="col-12 col-md">
      <div class="fit flex flex-center" v-if="loading">
        <q-spinner-hourglass color="primary" size="150px" />
      </div>

      <q-card class="my-card q-ma-xl" v-else>
        <div
          class="col-12 col-md text-center text-h4 text-weight-thin text-white bg-primary q-mt-md q-py-md"
        >
          CLEARANCE TRACKING
        </div>
        <!-- <div
          class="col-12 col-md text-center text-h4 text-weight-thin text-white bg-primary q-mt-md q-py-md"
        >
          CLEARANCE TRACKING
        </div>
        <div class="q-pt-lg q-pl-xl q-ml-xl">
          <div class="row q-pl-xl q-ml-xl">
            <div class="col-12 col-md text-yellow-8 text-weight-bold">
              <q-badge color="yellow-8" class="q-mr-sm" />PROCESSING
            </div>
            <div class="col-12 col-md text-positive text-weight-bold">
              <q-badge color="positive" class="q-mr-sm" />CLEARED
            </div>
            <div class="col-12 col-md text-blue-grey text-weight-bold">
              <q-badge color="blue-grey" class="q-mr-sm" />NOT YET CLEARED
            </div>
          </div>

          <div
            class="col-6 text-h6 text-uppercase text-primary text-weight-bold"
          ></div>
        </div> -->
        <!-- <q-card-section class="q-pt-lg">
          <q-list bordered class="rounded-borders"> -->
        <!-- <q-expansion-item
              expand-separator
              icon="list_alt"
              label="COLLEGE LEVEL"
              dense-toggle
              :header-style="{ backgroundColor: '#00368c' }"
              header-class="text-white"
              expand-icon-class="text-white"
              default-opened
              v-if="studentUser.college === 'M'"
            >
              <q-card class="q-ma-md">
                <q-card-section>
                  <q-markup-table>
                    <thead class="bg-blue-9 text-white">
                      <tr class="text-h3">
                        <th>
                          <q-icon
                            name="group"
                            size="20px"
                            class="q-pr-md"
                          />DEPARTMENT
                        </th>
                        <th>
                          <q-icon
                            name="insights"
                            size="20px"
                            class="q-pr-md"
                          />STATUS
                        </th>
                        <th>
                          <q-icon name="comment" size="20px" class="q-pr-md" />
                          REMARKS
                        </th>
                        <th>
                          <q-icon
                            name="calendar_month"
                            size="20px"
                            class="q-pr-md"
                          />DATE PROCESSED
                        </th>
                      </tr>
                    </thead>
                    <tbody class="text-center text-uppercase">
                      <template
                        v-for="clearance in collegeClearanceList"
                        :key="clearance.id"
                      >
                        <td>{{ clearance.departmentName }}</td>
                        <td
                          v-if="clearance.status == '3'"
                          :class="[
                            clearance.status == '3'
                              ? 'bg-blue-grey'
                              : 'bg-white',
                            clearance.status == '3' ? 'text-white' : '',
                          ]"
                        >
                          NOT YET CLEARED
                        </td>
                        <td
                          v-else-if="clearance.status == '2'"
                          :class="[
                            clearance.status == '2' ? 'text-white' : '',
                            clearance.status == '2' ? 'bg-green-5' : 'bg-white',
                          ]"
                        >
                          CLEARED
                        </td>
                        <td
                          v-else-if="clearance.status == '1'"
                          :class="[
                            clearance.status == '1'
                              ? 'bg-yellow-8'
                              : 'bg-white',
                            clearance.status == '1' ? 'text-black' : '',
                          ]"
                        >
                          PROCESSING
                        </td>
                        <td v-else-if="clearance.status == null">
                          NOT YET ACCEPTED
                        </td>
                        <td v-if="clearance.status != '1'">
                          {{ clearance.remarks }}
                        </td>
                        <td v-if="clearance.status == '3'">
                          {{ clearance.dateTimeRejected }}
                        </td>
                        <td v-if="clearance.status == '2'">
                          {{ clearance.dateTimeCleared }}
                        </td>
                        <td v-if="clearance.status == null"></td>
                        <td v-if="clearance.status == '1'"></td>
                        <td v-if="clearance.status == '1'"></td>
                      </template>
                    </tbody>
                  </q-markup-table>
                </q-card-section>
              </q-card>
            </q-expansion-item> -->

        <!-- <q-expansion-item
              expand-separator
              icon="feed"
              label="UNIVERSITY LEVEL"
              dense-toggle
              :header-style="{ backgroundColor: '#00368c' }"
              header-class="text-white"
              expand-icon-class="text-white"
              default-opened
            >
              <q-card class="q-ma-lg">
                <q-card-section>
                  <q-markup-table den>
                    <thead class="bg-blue-9 text-white">
                      <tr class="text-h3">
                        <th>
                          <q-icon
                            name="group"
                            size="20px"
                            class="q-pr-md"
                          />DEPARTMENT
                        </th>
                        <th>
                          <q-icon
                            name="insights"
                            size="20px"
                            class="q-pr-md"
                          />STATUS
                        </th>
                        <th>
                          <q-icon name="comment" size="20px" class="q-pr-md" />
                          REMARKS
                        </th>
                        <th>
                          <q-icon
                            name="calendar_month"
                            size="20px"
                            class="q-pr-md"
                          />DATE PROCESSED
                        </th>
                      </tr>
                    </thead>
                    <tbody class="text-center text-uppercase">
                      <template
                        v-for="clearance in universityClearanceList"
                        :key="clearance.id"
                      >
                        <tr class="text-h3">
                          <td>{{ clearance.departmentName }} <br /></td>
                          <td
                            v-if="clearance.status == '3'"
                            :class="[
                              clearance.status == '3'
                                ? 'bg-blue-grey'
                                : 'bg-white',
                              clearance.status == '3' ? 'text-white' : '',
                            ]"
                          >
                            NOT YET CLEARED
                          </td>
                          <td
                            v-else-if="clearance.status == '2'"
                            :class="[
                              clearance.status == '2' ? 'text-white' : '',
                              clearance.status == '2'
                                ? 'bg-green-5'
                                : 'bg-white',
                            ]"
                          >
                            CLEARED
                          </td>
                          <td
                            v-else-if="clearance.status == '1'"
                            :class="[
                              clearance.status == '1'
                                ? 'bg-yellow-8'
                                : 'bg-white',
                              clearance.status == '1' ? 'text-black' : '',
                            ]"
                          >
                            PROCESSING
                          </td>
                          <td v-else-if="clearance.status == null">
                            NOT YET ACCEPTED
                          </td>
                          <td v-if="clearance.status != '1'">
                            {{ clearance.remarks }}
                            <div v-if="clearance.departmentCode == 11500">
                              <q-btn
                                label="CLICK HERE TO ANSWER THE GUIDANCE EXIT INTERVIEW"
                                color="yellow-8"
                                text-color="black"
                                @click="openExitInterview()"
                                v-if="clearance.status != '2'"
                              />
                            </div>
                          </td>
                          <td v-if="clearance.status == '3'">
                            {{ clearance.dateTimeRejected }}
                          </td>
                          <td v-if="clearance.status == '2'">
                            {{ clearance.dateTimeCleared }}
                          </td>
                          <td v-if="clearance.status == null"></td>
                          <td v-if="clearance.status == '1'"></td>
                          <td v-if="clearance.status == '1'"></td>
                        </tr>
                      </template>
                    </tbody>
                  </q-markup-table>
                </q-card-section>
              </q-card>
            </q-expansion-item> -->

        <!-- <q-expansion-item
              icon="edit"
              label="DEAN APPROVAL"
              dense-toggle
              :header-style="{ backgroundColor: '#00368c' }"
              header-class="text-white"
              expand-icon-class="text-white"
              default-opened
            >
              <q-card class="q-ma-lg">
                <q-card-section>
                  <div
                    class="row q-ml-md q-pa-md"
                    v-for="clearance in deansSequenceFourList"
                    :key="clearance.id"
                  >
                    <div class="col-12" v-if="clearance.status == '3'">
                      <div class="row">
                        <div class="col-12 col-md-2">STATUS:</div>
                        <div
                          class="col-12 col-md bg-blue-grey text-center q-pa-s"
                        >
                          NOT YET CLEARED
                        </div>
                      </div>
                    </div>
                    <div class="col-12" v-else-if="clearance.status == '1'">
                      <div class="row">
                        <div class="col-12 col-md-2">STATUS:</div>
                        <div
                          class="col-12 col-md-2 bg-yellow-8 text-center q-pa-s"
                        >
                          PROCESSING
                        </div>
                      </div>
                    </div>
                    <div class="col-12" v-else-if="clearance.status == '2'">
                      <div class="row">
                        <div class="col-12 col-md-2">STATUS:</div>
                        <div
                          class="col-12 col-md-2 bg-green-5 text-white text-center q-pa-s"
                        >
                          CLEARED
                        </div>
                      </div>
                    </div>
                    <div class="col-12" v-else-if="clearance.status == null">
                      <div class="row">
                        <div class="col-12 col-md-2">STATUS:</div>
                        <div class="col-12 col-md-2">NOT YET ACCEPTED</div>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="row">
                        <div class="col-12 col-md-2">REMARKS:</div>
                        <div class="col-12 col-md">{{ clearance.remarks }}</div>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="row">
                        <div class="col-12 col-md-2">DATE TIME PROCESSED:</div>
                        <div class="col-12 col-md">
                          {{
                            clearance.status == "3"
                              ? clearance.dateTimeCleared
                              : clearance.dateTimeCleared
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item> -->
        <!-- </q-list>
        </q-card-section> -->

        <q-card-section class="q-mt-md">
          <!--DITO KO ILALAGAY YUNG BAGO KONG GAGAWIN NA TRACKER-->
          <q-table
            :rows="studentClearance"
            :columns="columns"
            class="headerStyle"
          >
            <template v-slot:body-cell-GuidanceOffice="props">
              <q-td :props="props">
                <div class="remarks">
                  {{ props.row["guidance and Counselling Office"] }}
                </div>
                <q-btn
                  label="CLICK HERE TO ANSWER THE GUIDANCE EXIT INTERVIEW"
                  color="yellow-8"
                  text-color="black"
                  @click="openExitInterview()"
                  v-if="
                    props.row['guidance and Counselling Office'] !== 'cleared'
                  "
                />
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>

      <q-dialog v-model="bools.exitInterview" full-height full-width maximized>
        <q-card class="fit">
          <q-card-section class="bg-primary text-white text-weight-bold">
            <div class="row justify-between items-center">
              <span class="text-body1 text-uppercase">
                GUIDANCE EXIT INTERVIEW
              </span>
              <span>
                <q-btn icon="fa fa-times" color="red" v-close-popup></q-btn>
              </span>
            </div>
          </q-card-section>
          <div v-if="!bools.pdfLoading">
            <q-card-section
              class="full-width q-pa-none"
              style="
                height: 92.9vh;
                display: flex;
                justify-content: center;
                align-items: center;
              "
              v-if="bools.exitInterview"
            >
              <q-pdfviewer
                v-model="bools.show"
                type="html5"
                src="https://docs.google.com/forms/d/12M1p0fHFie0baniLT8dkuSLi9v2LRbeNFZSSNLf0478/viewform?edit_requested=true&fbclid=IwZXh0bgNhZW0CMTAAAR0CXkcPYg2BWVD5b_DdVe7PQVp4L79JyMOq18fKHPwewyokUh4Xe0GBa0M_aem_Ad23AGY-_X0KCZQLNZDsW4Kq-j18LwWtGixNmOKfUXOIV57cstaqEM7kSq_yaO48jWJY_VPBV93ivDafdS3omMLR"
                content-class="absolute"
              />
            </q-card-section>
          </div>
          <div v-else>
            <q-card-section style="height: 92.9vh"></q-card-section>
          </div>
          <q-inner-loading :showing="this.bools.pdfLoading">
            <q-spinner-puff size="100px" color="primary" />
            <span class="q-pt-md text-overline">FETCHING DATA ...</span>
          </q-inner-loading>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LocalStorage } from "quasar";
export default {
  name: "ClearanceTracking",
  data() {
    return {
      bools: {
        exitInterview: false,
        pdfLoading: true,
        show: false,
      },
      deansApprovalStatus: null,
      universityClearanceList: [],
      collegeClearanceList: [],
      deansSequenceOneList: [],
      deansSequenceFourList: [],
      startInterval: [],
      validateClearanceIfExist: [],
      loading: true,

      studentClearance: [],
      columns: [
        {
          name: "MedicalRecordsSection",
          label: "MEDICAL RECORDS",
          align: "center",
          field: "medical records section",
          headerStyle: "background-color: #B7E0FF; color: #0C0C0C; ",
        },
        {
          name: "Accounting",
          label: "ACCOUNTING",
          align: "center",
          field: "accounting",
          sortable: false,
          headerStyle: "background-color: #B7E0FF; color: #0C0C0C; ",
        },
        {
          name: "GuidanceOffice",
          label: "GUIDANCE OFFICE",
          align: "center",
          field: "guidance and Counselling Office",
          headerStyle: "background-color: #B7E0FF; color: #0C0C0C; ",
        },
        {
          name: "Library",
          label: "LIBRARY",
          align: "center",
          field: "library",
          headerStyle: "background-color: #B7E0FF; color: #0C0C0C; ",
        },
        {
          name: "Registrar",
          label: "REGISTRAR",
          align: "center",
          field: "registrar",
          headerStyle: "background-color: #B7E0FF; color: #0C0C0C; ",
        },
        {
          name: "Treasury",
          label: "TREASURY",
          align: "center",
          field: "treasury",
          headerStyle: "background-color: #B7E0FF; color: #0C0C0C; ",
        },
        {
          name: "DEAN",
          label: "DEAN",
          align: "center",
          field: "dEAN",
          headerStyle: "background-color: #B7E0FF; color: #0C0C0C; ",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      existingClearance: ["clearance/existClearance"],
      studentUser: ["users/userAccount"],
      universityClearance: ["clearance/universityClearanceList"],
      collegeClearance: ["clearance/collegeClearanceList"],
      deansApprovalSequenceOne: ["clearance/deansApprovalSequenceOne"],
      deansApprovalSequenceFour: ["clearance/deansApprovalSequenceFour"],
    }),
  },

  methods: {
    async getDeansApprovalSequenceOne() {
      const payload = {
        studentno: this.studentno,
      };
      const result = await this.$store.dispatch(
        "clearance/getDeansApprovalSequenceOne",
        payload
      );
      if (result.error) {
        localStorage.removeItem("access_token");
        // this.$q.notify({
        //   message: "Session Expired!",
        //   position: "bottom",
        //   type: "negative",
        // });
        this.$router.push("/");
      }
      this.deansSequenceOneList = this.deansApprovalSequenceOne.result;
    },
    async getDeansApprovalSequenceFour() {
      const payload = {
        studentno: this.studentno,
      };
      const result = await this.$store.dispatch(
        "clearance/getDeansApprovalSequenceFour",
        payload
      );
      if (result.error) {
        localStorage.removeItem("access_token");
        // this.$q.notify({
        //   message: "Session Expired!",
        //   position: "bottom",
        //   type: "negative",
        // });
        this.$router.push("/");
      }
      console.log("Deans Four", this.deansApprovalSequenceFour.result);
      this.deansSequenceFourList = this.deansApprovalSequenceFour.result;
      this.deansApprovalStatus = this.deansSequenceFourList[0].status;
    },
    async getUniversityClearanceTracking() {
      const payload = {
        studentno: this.studentno,
      };
      const result = await this.$store.dispatch(
        "clearance/getUniversityClearanceTracking",
        payload
      );

      if (result.error) {
        localStorage.removeItem("access_token");
        // this.$q.notify({
        //   message: "Session Expired!",
        //   position: "bottom",
        //   type: "negative",
        // });
        this.$router.push("/");
      }
      this.universityClearanceList = this.universityClearance.result;
      // this.clearanceList = this.clearanceTrackingList.result;
    }, //END OF getClearanceTracking.

    async getCollegeClearanceTracking() {
      const result = await this.$store.dispatch(
        "clearance/getCollegeClearanceTracking"
      );
      if (result.error) {
        localStorage.removeItem("access_token");
        // this.$q.notify({
        //   message: "Session Expired!",
        //   position: "bottom",
        //   type: "negative",
        // });
        this.$router.push("/");
      }
      this.collegeClearanceList = this.collegeClearance.result;
    }, //END OF GetCollegeClearanceTracking
    async checkExistingClearance() {
      const result = await this.$store.dispatch(
        "clearance/checkIfClearanceExist"
      );
      this.validateClearanceIfExist = result;

      if (
        LocalStorage.getItem("access_token") &&
        this.validateClearanceIfExist == 0
      ) {
        await this.$store.dispatch("users/setUserData");
      } else if (
        LocalStorage.getItem("access_token") &&
        this.validateClearanceIfExist != 0
      ) {
        await this.$store.dispatch("users/setUserData");
      } else {
        localStorage.removeItem("access_token");
        // this.$q.notify({
        //   message: "Session Expired!",
        //   position: "bottom",
        //   type: "negative",
        // });
        this.$router.push("/");
        // window.location.href = "https://uerm.edu.ph/apps/portal/login/";
      }
    }, //END OF CHECK EXISTING CLEARANCE METHOD

    async clearanceStatus() {
      const response = await this.$store.dispatch("clearance/clearanceStatus");
      this.studentClearance = response;
      console.log("Clearance Status: ", response);
    },
    openExitInterview() {
      this.bools.exitInterview = true;
      this.bools.show = true;
      this.bools.pdfLoading = true;
      setTimeout(() => {
        this.bools.pdfLoading = false;
        this.bools.show = false;
      }, 1500);
    },
    loadingMethod() {
      setTimeout(() => {
        this.loading = false; // Set loading state to false once data is fetched
      }, 1500);
    },
  },
  mounted() {
    this.getUniversityClearanceTracking();
    this.getCollegeClearanceTracking();
    this.getDeansApprovalSequenceOne();
    this.getDeansApprovalSequenceFour();
    this.clearanceStatus();
  },
  created() {
    this.checkExistingClearance();
    this.loadingMethod();
  },
};
</script>

<style lang="scss" scoped>
td,
th {
  word-wrap: break-word;
  white-space: normal;
  max-width: 150px;
  padding: 8px;
}

// .headerStyle td {
//   background-color: #00b4ff;
// }
</style>
