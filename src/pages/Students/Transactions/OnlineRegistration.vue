<template>
  <div>
    <q-card class="q-mx-md q-mb-lg">
      <q-card-section class="text-blue-10 text-weight-bold text-h6 q-mb-lg">
        <q-avatar icon="monitor" />
        ASSESSMENT FOR: {{ this.semDescription }}
      </q-card-section>
    </q-card>

    <div class="row">
      <div class="col-12 col-md-5 q-ml-md">
        <div class="text-h6 text-blue-10 text-weight-bold">
          SCHEDULE OF ENROLLMENT:
        </div>
        <q-markup-table flat bordered>
          <thead class="bg-blue-10">
            <tr>
              <th colspan="5">
                <div class="row no-wrap justify-center">
                  <div class="text-weight-bold q-ml-md text-white">
                    {{ this.collegeDescription }}
                  </div>
                </div>
              </th>
            </tr>
            <tr class="text-white">
              <th class="text-center">YEAR LEVEL</th>
              <th class="text-center">START OF ENROLLMENT</th>
              <th class="text-center">END OF ENROLLMENT</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(sched, i) in scheduleOfEnrollment" :key="i">
              <tr>
                <td class="text-center">{{ sched.yearlevel }}</td>
                <td class="text-center">{{ sched.startEnrolment }}</td>
                <td class="text-center">{{ sched.endofEnrollment }}</td>
                <td style="display: none">
                  {{ (this.semDescription = sched.aCSemDesc) }}
                  {{ (this.collegeDescription = sched.cOLLEGEDESC) }}
                  {{ (this.endOfEnrollment = sched.endofEnrollment) }}
                </td>
              </tr>
            </template>
          </tbody>
        </q-markup-table>
      </div>
      <div class="col-12 col-md-6 q-ml-md">
        <div class="col text-blue-10 text-h6">
          Prerequisites for Online Registration/Enrollment:
        </div>
        <div class="col">
          <ol>
            <li>You should be a <strong>REGULAR STUDENT.</strong></li>
            <li>
              It is required that you have <b>NO OUTSTANDING BALANCES</b> from
              the prior semester.
            </li>
            <li>This is accessible during regular enrollment period only.</li>
          </ol>
          <div class="text-blue-10 text-h6">Important reminder:</div>
          For <strong>IRREGULAR STUDENT</strong>, please contact your respective
          College Secretaries for advising of subjects.
        </div>
      </div>
    </div>

    <div class="row q-mt-xl">
      <div class="col-12 col-md-5 q-ml-md">
        <q-table
          class="assessmentheader"
          title="Online Assessment Form"
          :rows="assessmentForm"
          :columns="columns"
          row-key="id"
          header-class="assessment-header"
        >
          <template v-slot:body-cell-openLink="props">
            <q-td :props="props">
              <q-btn
                label="Open Link"
                :disable="isLinkExpired(props.row.directLinkExpirydate)"
                @click="redirectToLink(props.row.openLink)"
                :color="
                  isLinkExpired(props.row.directLinkExpirydate)
                    ? 'gray'
                    : 'yellow-8'
                "
                text-color="black"
                size="sm"
              />
            </q-td>
          </template>
        </q-table>
      </div>

      <!-- <pre>
        {{ assessmentForm }}
      </pre> -->
    </div>

    <!--END OF PRE REQUISITES FOR ONLINE REGISTRATION/ENROLLMENT-->
    <div class="row q-mx-md q-mt-xl q-pb-xl">
      <!-- <q-btn
        label="Click here to continue"
        color="red-4"
        class="full-width q-pa-md"
        v-if="this.studentEnrollmentDates !== new Date().toLocaleDateString()"
      />
      <q-btn
        label="Click here to continue"
        color="green-10"
        class="full-width q-pa-md"
        disabled
        v-else
      /> -->

      <!-- <q-btn
        label="Click here to continue"
        color="primary"
        class="full-width q-pa-md"
        @click="directOnlineRegInv1"
      /> -->
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  name: "OnlineRegistration",
  data() {
    const scheduleOfEnrollment = [];
    const semDescription = [];
    const collegeDescription = [];
    const endOfEnrollment = [];

    return {
      scheduleOfEnrollment,
      semDescription,
      collegeDescription,
      endOfEnrollment,
      columns: [
        {
          name: "TransDate",
          label: "Transaction Date",
          align: "center",
          field: "transDate",
        },
        {
          name: "SemDesc",
          label: "Semester Description",
          align: "center",
          field: "semsdesc",
        },
        {
          name: "openLink",
          label: "Action",
          align: "center",
          field: "OpenLink",
          sortable: false,
        },
        {
          name: "directLinkExpirydate",
          label: "Expiry Date",
          align: "center",
          field: "directLinkExpirydate",
        },
      ],
      assessmentForm: [],
    };
  }, //END OF DATA LIFE CYCLE HOOKS
  computed: {
    studentEnrollmentDates() {
      const schedule = this.scheduleOfEnrollment.find(
        (sched) => sched.yearlevel === this.studentYearLevel
      );
      return schedule
        ? { start: schedule.startEnrolment, end: schedule.endofEnrollment }
        : null;
    },
  },
  methods: {
    async getOnlineRegistration() {
      const response = await this.$store.dispatch(
        "payments/getOnlineRegistration"
      );
      this.scheduleOfEnrollment = response;
    },
    async getOnlineAssessmentForm() {
      const response = await this.$store.dispatch(
        "payments/getOnlineAssessmentForm"
      );

      const formattedData = response.map((item) => {
        return {
          ...item,
          transDate: new Date(item.transDate).toISOString().split("T")[0],
          directLinkExpirydate: new Date(item.directLinkExpirydate + "Z") // explicitly add 'Z' for UTC timezone
            .toISOString()
            .split("T")[0],
        };
      });
      this.assessmentForm = formattedData;
    },
    redirectToLink(link) {
      window.open(link, "_blank");
    },
    isLinkExpired(expiryDate) {
      const today = new Date();
      const expiry = new Date(expiryDate);
      return today > expiry;
    },
    directOnlineRegInv1() {
      window.location.href =
        "https://uerm.edu.ph/apps/portal/students/onlineregsv2";
    },
  }, //END OF METHOD LIFE CYCLE HOOK
  created() {
    this.getOnlineRegistration();
    this.getOnlineAssessmentForm();
  }, //END OF CREATED HOOK
};
</script>

<style lang="scss" scoped>
.full-width-button {
  display: block;
  width: 100%;
  text-align: center;
  padding: 10px;
  color: #ffffff;
  text-decoration: none;
  border: none;
  cursor: pointer;
}

// .assessment-header {
//   background-color: #4e4caf; /* Change this to your desired color */
//   color: white; /* Change this to your desired text color */
//   text-align: center; /* Center the header text */
//   font-weight: bold; /* Make the header text bold */
// }

.q-table__top,
thead tr th {
  background-color: #00b4ff;
}
tr th {
  position: sticky;
  z-index: 2;
  background: #00b4ff;
}
thead tr th {
  position: sticky;
  z-index: 1;
}

tbody {
  scroll-margin-top: 48px;
}
</style>
