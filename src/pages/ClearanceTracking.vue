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

          <!-- {{ this.validateClearanceIfExist.type }} -->
        </div>
        <div class="q-pt-lg q-pl-xl q-ml-xl">
          <div class="row q-pl-xl q-ml-xl">
            <div class="col-12 col-md text-yellow-9 text-weight-bold">
              <q-badge color="yellow-9" class="q-mr-sm" />PROCESSING
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
          >
            <!-- Course: {{ this.studentUser.course }} -->
          </div>
        </div>
        <!-- {{ existingClearance.result[0].departmentLevel }} -->
        <q-card-section class="q-pt-lg">
          <q-list bordered class="rounded-borders">
            <!---DEANS MODULE SEQUENCE 1 --->
            <!-- <q-expansion-item
              expand-separator
              icon="feed"
              label="DEAN'S APPROVAL"
              dense-toggle
              :header-style="{ backgroundColor: '#00368c' }"
              header-class="text-white"
              expand-icon-class="text-white"
              default-opened
              v-if="
                this.validateClearanceIfExist?.type ===
                'Withdrawal of Enrollment'
              "
            >
              <q-card class="q-ma-lg">
                <q-card-section>
                  <q-markup-table>
                    <thead class="bg-blue-9 text-white">
                      <tr class="text-h3 q-pa-lg">
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
                        v-for="clearance in deansSequenceOneList"
                        :key="clearance.id"
                      >
                        <tr
                          class="text-h3 q-pa-xl"
                          :class="[
                            clearance.status == '2' ? 'text-white' : '',
                            clearance.status == '2' ? 'bg-green-5' : 'bg-white',
                            clearance.status == '3'
                              ? 'bg-blue-grey'
                              : 'bg-white',
                            clearance.status == '3' ? 'text-white' : '',
                            clearance.status == '1'
                              ? 'bg-yellow-9'
                              : 'bg-white',
                            clearance.status == '1' ? 'text-white' : '',
                          ]"
                        >
                          <td>{{ clearance.departmentName }}</td>
                          <td v-if="clearance.status == '3'">
                            NOT YET CLEARED
                          </td>
                          <td v-else-if="clearance.status == '2'">CLEARED</td>
                          <td v-else-if="clearance.status == '1'">
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
                        </tr>
                      </template>
                    </tbody>
                  </q-markup-table>
                </q-card-section>
              </q-card>
            </q-expansion-item> -->

            <q-expansion-item
              expand-separator
              icon="list_alt"
              label="COLLEGE LEVEL"
              dense-toggle
              :header-style="{ backgroundColor: '#00368c' }"
              header-class="text-white"
              expand-icon-class="text-white"
              default-opened
            >
              <q-card class="q-ma-lg">
                <q-card-section>
                  <q-markup-table>
                    <thead class="bg-blue-9 text-white">
                      <tr class="text-h3 q-pa-lg">
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
                        <tr
                          class="text-h3 q-pa-xl"
                          :class="[
                            clearance.status == '2' ? 'text-white' : '',
                            clearance.status == '2' ? 'bg-green-5' : 'bg-white',
                            clearance.status == '3'
                              ? 'bg-blue-grey'
                              : 'bg-white',
                            clearance.status == '3' ? 'text-white' : '',
                            clearance.status == '1'
                              ? 'bg-yellow-9'
                              : 'bg-white',
                            clearance.status == '1' ? 'text-white' : '',
                          ]"
                        >
                          <td>{{ clearance.departmentName }}</td>
                          <td v-if="clearance.status == '3'">
                            NOT YET CLEARED
                          </td>
                          <td v-else-if="clearance.status == '2'">CLEARED</td>
                          <td v-else-if="clearance.status == '1'">
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
                        </tr>
                      </template>
                    </tbody>
                  </q-markup-table>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
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
                  <q-markup-table>
                    <thead class="bg-blue-9 text-white">
                      <tr class="text-h3 q-pa-lg">
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
                        <tr
                          class="text-h3 q-pa-xl"
                          :class="[
                            clearance.status == '2' ? 'text-white' : '',
                            clearance.status == '2' ? 'bg-green-5' : 'bg-white',
                            clearance.status == '3'
                              ? 'bg-blue-grey'
                              : 'bg-white',
                            clearance.status == '3' ? 'text-white' : '',
                            clearance.status == '1'
                              ? 'bg-yellow-9'
                              : 'bg-white',
                            clearance.status == '1' ? 'text-white' : '',
                          ]"
                        >
                          <td>{{ clearance.departmentName }}</td>
                          <td v-if="clearance.status == '3'">
                            NOT YET CLEARED
                          </td>
                          <td v-else-if="clearance.status == '2'">CLEARED</td>
                          <td v-else-if="clearance.status == '1'">
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
                        </tr>
                      </template>
                    </tbody>
                  </q-markup-table>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              icon="edit"
              label="DEAN'S APPROVAL"
              dense-toggle
              :header-style="{ backgroundColor: '#00368c' }"
              header-class="text-white"
              expand-icon-class="text-white"
              default-opened
            >
              <q-card class="q-ma-lg">
                <q-card-section>
                  <q-markup-table>
                    <thead class="bg-blue-9 text-white">
                      <tr class="text-h3 q-pa-lg">
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
                        v-for="clearance in deansSequenceFourList"
                        :key="clearance.id"
                      >
                        <tr
                          class="text-h3 q-pa-xl"
                          :class="[
                            clearance.status == '2' ? 'text-white' : '',
                            clearance.status == '2' ? 'bg-green-5' : 'bg-white',
                            clearance.status == '3'
                              ? 'bg-blue-grey'
                              : 'bg-white',
                            clearance.status == '3' ? 'text-white' : '',
                            clearance.status == '1'
                              ? 'bg-yellow-9'
                              : 'bg-white',
                            clearance.status == '1' ? 'text-white' : '',
                          ]"
                        >
                          <td>{{ clearance.departmentName }}</td>
                          <td v-if="clearance.status == '3'">
                            NOT YET CLEARED
                          </td>
                          <td v-else-if="clearance.status == '2'">CLEARED</td>
                          <td v-else-if="clearance.status == '1'">
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
                        </tr>
                      </template>
                    </tbody>
                  </q-markup-table>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LocalStorage, Cookies } from "quasar";
export default {
  name: "ClearanceTracking",
  data() {
    return {
      deansApprovalStatus: null,
      universityClearanceList: [],
      collegeClearanceList: [],
      deansSequenceOneList: [],
      deansSequenceFourList: [],
      startInterval: [],
      validateClearanceIfExist: [],
      loading: true,
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
        this.$q.notify({
          message: "Session Expired!",
          position: "bottom",
          type: "negative",
        });
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
        this.$q.notify({
          message: "Session Expired!",
          position: "bottom",
          type: "negative",
        });
        this.$router.push("/");
      }
      // console.log("Deans Four", this.deansApprovalSequenceFour.result);
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
        this.$q.notify({
          message: "Session Expired!",
          position: "bottom",
          type: "negative",
        });
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
        this.$q.notify({
          message: "Session Expired!",
          position: "bottom",
          type: "negative",
        });
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
        this.$router.push("register-clearance");
      } else if (
        LocalStorage.getItem("access_token") &&
        this.validateClearanceIfExist != 0
      ) {
        await this.$store.dispatch("users/setUserData");
        this.$router.push("clearance-tracking");
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
</style>
