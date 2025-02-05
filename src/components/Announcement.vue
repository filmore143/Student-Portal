<template>
  <q-dialog
    v-model="fixed"
    full-width
    persistent
    v-if="checkAnnouncement"
    style="max-height: 80%; max-width: 100%"
  >
    <div class="bg-white q-pb-lg">
      <q-card>
        <q-card-section class="bg-dark text-white terms-of-agreement">
          <div class="row justify-between">
            <div class="text-h5 text-center text-weight-bold">
              TERMS OF AGREEMENT
            </div>
            <div>
              <q-btn
                flat
                icon="logout"
                :label="this.$q.platform.is.mobile ? '' : 'Logout'"
                class="bg-grey-9"
                color="white"
                @click="persistent = true"
              >
                <q-tooltip
                  class="bg-amber text-black shadow-4"
                  anchor="center left"
                  self="center right"
                  :offset="[10, 10]"
                >
                  CLICK TO LOGOUT
                </q-tooltip>
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <template v-for="(announcement, i) in getAnnouncement" :key="i">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-expansion-item
            class="shadow-1 overflow-hidden q-mt-md q-mx-xl"
            icon="campaign"
            :label="announcement.announcementName"
            header-class="bg-primary text-white"
            :default-opened="i === 0"
            expand-icon-class="text-white"
            :style="{
              display:
                this.getAnnouncement[i].studentNo !== null ? 'none' : 'inherit',
            }"
            group="announcementGroup"
          >
            <!-- <div class="bg-blue-grey-3"> -->
            <!-- Content for the expansion item -->
            <q-form
              @submit.prevent="acceptTermsOfAgreement(announcement.id)"
              method="post"
              class="q-gutter-md"
            >
              <div class="q-px-md q-mt-xl" style="height: 60vh">
                <q-pdfviewer type="html5" :src="announcement.link" />
              </div>
              <div>
                <q-btn
                  class="full-width q-ml-md"
                  label="ACKNOWLEDGE"
                  type="submit"
                  color="green-9"
                />
              </div>
            </q-form>
            <!-- </div> -->
          </q-expansion-item>
        </transition>
      </template>
      <q-inner-loading :showing="visible">
        <q-spinner-hourglass size="150px" color="red" />
      </q-inner-loading>
    </div>

    <!---PERSISTENT LOGOUT-->
    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-white text-black" style="width: 300px">
        <q-card-section>
          <div class="text-h6">LOGOUT</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Are you sure you want to logout?
        </q-card-section>
        <q-card-actions align="right" class="bg-white">
          <q-btn
            flat
            class="text-green"
            label="NO"
            v-close-popup
            @click="persistent = false"
          /><q-btn
            flat
            class="text-green"
            label="YES"
            v-close-popup
            to="/"
            @click="logout(), (persistent = true)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-dialog>
</template>

<script>
import { LocalStorage, Cookies, useQuasar, QSpinnerBall } from "quasar";
export default {
  name: "AnnouncementPage",
  data() {
    var studentData = Cookies.get("student_no");
    var userToken = LocalStorage.getItem("access_token");
    const $q = useQuasar();
    let timer;
    return {
      studentData,
      userToken,
      fixed: true,
      getAnnouncement: [],
      acceptAnnouncement: [],
      checkAnnouncement: true,
      visible: false,
      showSimulatedReturnData: false,
      persistent: false,
    };
  }, //END OF DATA LIFE CYCLE HOOK
  methods: {
    logout() {
      LocalStorage.clear();
      Cookies.remove("student_no");
      this.fixed = false;
    },
    async getAllAnnouncement() {
      const payload = {
        studentno: this.studentData,
      };
      const response = await this.$store.dispatch(
        "announcement/getAllAnnouncement",
        payload
      );
      this.getAnnouncement = response;
    }, ///END OF getAllAnnouncement METHOD
    async acceptTermsOfAgreement(id) {
      this.visible = true;
      this.showSimulatedReturnData = false;
      const payload = {
        studentno: this.studentData,
        announcementId: id,
      };
      setTimeout(async () => {
        this.visible = false;
        this.showSimulatedReturnData = true;
        const response = await this.$store.dispatch(
          "announcement/acceptTermsOfAgreement",
          payload
        );
        this.getAllAnnouncement();
        this.checkIfAllAnnouncementAccepted();
        this.acceptAnnouncement = response;
      }, 2000);
    }, //END OF acceptTermsOfAgreement
    async checkIfAllAnnouncementAccepted() {
      const payload = {
        studentno: this.studentData,
      };
      const response = await this.$store.dispatch(
        "announcement/checkIfAllAnnouncementAccepted",
        payload
      );
      var validation = [];
      for (var i = 0; i < response.result.length; i++) {
        validation += response.result[i].studentNo;
        // this.checkAnnouncement = validation;
        if (validation.includes(null)) {
          this.fixed = true;
          this.checkAnnouncement = true;
        } else {
          this.fixed = false;
          this.checkAnnouncement = false;
        }
      }
    }, //END of checkIfAllAnnouncementAccepted
  }, //END OF METHODS LIFE CYCLE HOOKS
  created() {
    this.getAllAnnouncement();
    this.checkIfAllAnnouncementAccepted();
  }, //END OF CREATED LIFE CYCLE HOOKS
  mounted() {},
};
</script>

<style lang="scss" scoped>
.terms-of-agreement {
  position: sticky;
  top: 0;
  z-index: 1; /* Adjust the z-index as needed */
}
.terms-of-agreement-logout {
  margin-top: -20px;
}
</style>
