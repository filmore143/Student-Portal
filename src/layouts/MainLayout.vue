<template>
  <q-layout view="hHh LpR lFf" v-if="Object.keys(this.studentInfo).length > 0">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          class="text-white"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <!--IF DESSKTOP VIEW-->
        <q-toolbar-title v-if="this.$q.platform.is.desktop">
          <div class="text-weight-bold text-uppercase text-white">
            Student Portal
          </div>
        </q-toolbar-title>

        <!--IF MOBILE VIEW-->
        <q-toolbar-title v-if="this.$q.platform.is.mobile">
          <div class="text-weight-bold text-uppercase text-white">
            Student Portal
          </div>
        </q-toolbar-title>

        <div class="row">
          <div class="name gt-xs">
            <p></p>
          </div>
          <div class="col">
            <!--IF DESSKTOP VIEW-->
            <q-btn
              square
              color="white"
              flat
              icon="logout"
              @click="logout()"
              v-if="!this.$q.platform.is.desktop"
            />
            <q-btn-dropdown
              color="white"
              outline
              icon="person"
              :label="`Welcome back, ${this.studentInfo.firstName}`"
              flat
              v-if="this.$q.platform.is.desktop"
            >
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <div
                    class="row text-overline justify-center text-h6 text-weight-bold q-mb-lg"
                  >
                    {{ fullName }}
                  </div>

                  <div class="text-overline text-uppercase">
                    <!-- Degree Program: {{ this.studentInfo.college }} <br /> -->
                    Student No: {{ this.studentInfo.sn }} <br />
                    Course: {{ this.studentInfo.description }} <br />
                    Year Level: {{ this.studentInfo.yearLevel }} <br />
                  </div>
                </div>

                <q-separator vertical inset class="q-mx-lg"></q-separator>

                <div class="column items-center">
                  <q-avatar class="shadow-5" size="120px" v-ripple>
                    <!-- <img
                      class="avatar-image"
                      :src="'data:image/jpeg;base64,' + studentImage"
                    /> -->
                    <q-img
                      :src="`https://iehr.uerm.edu.ph/users/public-picture/${this.studentInfo.sn}`"
                    />
                  </q-avatar>
                  <div class="q-mt-md text-overline">
                    <!-- {{ this.studentInfo.sn }} -->
                  </div>

                  <!-- <q-btn
                    color="negative"
                    label="Logout"
                    icon="logout"
                    size="sm"
                    @click="persistent = true"
                    v-close-popup
                  ></q-btn> -->
                  <!-- <q-btn
                    color="primary"
                    text-color="white"
                    label="UPDATE PROFILE"
                    icon="person"
                    size="sm"
                    @click="changeProfile()"
                    v-close-popup
                    class="q-mb-xs full-width text-weight-bold"
                  /> -->

                  <!-- <div class="row no-wrap q-pa-md">
                    <div class="column"> -->
                  <!-- <q-btn
                    label="PERSONAL INFO"
                    @click="gotoPersonalInfo()"
                    size="sm"
                    color="primary"
                    class="q-mb-md full-width text-weight-bold"
                  /> -->
                  <!-- </div>
                  </div> -->

                  <q-btn
                    color="negative"
                    label="Logout"
                    icon="logout"
                    size="sm"
                    @click="logout()"
                    v-close-popup
                    class="q-mb-md full-width text-weight-bold"
                  />
                  <div class="text-overline text-uppercase">Portal V2.0.10</div>
                </div>
              </div>
            </q-btn-dropdown>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="bg-blue-grey-10"
      dark
      elevated
      @click.capture="drawerClick"
    >
      <div class="drawer-background"></div>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
        class="lt-md"
      />
      <q-list separator dark>
        <q-item class="bg-image">
          <q-item-section align="center">
            <div class="row justify-center items-center text-overline">
              <div class="col-12">
                <q-avatar size="120px" v-ripple class="shadow-5">
                  <q-img
                    :src="`https://iehr.uerm.edu.ph/users/public-picture/${this.studentInfo.sn}`"
                  />
                </q-avatar>
              </div>
              <div class="col-12">
                {{ this.fullName }}
              </div>
              <div class="col-12">
                {{ this.studentInfo.sn }}
              </div>
            </div>
          </q-item-section>
        </q-item>
        <q-separator dark class="q-pa-none"></q-separator>

        <EssentialLink
          v-for="link in navLinks"
          :key="link.title"
          v-bind="link"
          @setCurrentRoute="setCurrentRoute"
        />

        <!-- <q-img
          src="../assets/header-profile-flip.png"
          style="background-s ize: cover; background-position: center"
        /> -->

        <q-separator dark class="q-pa-none"></q-separator>
      </q-list>
    </q-drawer>

    <!-- <q-dialog
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
    </q-dialog> -->
    <q-page-container>
      <HeaderWidget
        :currentRouteDetails="this.currentRouteDetails"
      ></HeaderWidget>
      <div class="q-pa-md q-ma-md">
        <q-card flat>
          <q-card-section>
            <router-view />
          </q-card-section>
        </q-card>
      </div>
      <UpButton></UpButton>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
// import { LocalStorage, Cookies } from "quasar";
import { mapGetters } from "vuex";
import EssentialLink from "src/components/Helpers/EssentialLink.vue";
import UpButton from "src/components/UpButton.vue";
import HeaderWidget from "src/components/Partials/HeaderWidget.vue";

export default defineComponent({
  name: "MainLayout",
  components: { EssentialLink, UpButton, HeaderWidget },
  data() {
    const miniState = false;
    let validateClearanceIfExist = "";
    return {
      studentImage: "",
      leftDrawerOpen: false,
      miniState,
      persistent: false,
      drawerClick(e) {
        if (miniState.value) {
          miniState.value = false;
          e.stopPropagation();
        }
      }, //END OF drawerClick
      validateClearanceIfExist,
      currentRouteDetails: {},
    };
  }, //END OF DATA
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    gotoPersonalInfo() {
      this.$router.push("/students/update-profile");
    },
    async logout() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure you would like to logout?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.$q.loading.show({
            boxClass: "bg-grey-2 text-grey-9",
            spinnerColor: "primary",
            message:
              'Logging out now...<br/><span class="text-yellow-8 text-italic">Please wait...</span>',
            html: true,
          });

          // hiding in 3s
          setTimeout(async () => {
            this.$q.loading.hide();
            void 0;

            await this.$store.dispatch("users/logout");
            this.$router.push("/");
          }, 2000);
        })
        .onCancel(() => {});
      // window.location.href = "https://www.uerm.edu.ph/apps/portal/student";
    },
    setCurrentRoute(route) {
      this.currentRouteDetails = route;
    },
    // async getPicture() {
    //   const payload = {
    //     studentno: this.studentInfo.sn,
    //   };
    //   //to get the picture of student
    //   const result = await this.$store.dispatch("users/getPicture", payload);
    //   this.studentImage = result; //token pala result neto
    // }, //END OF getPicture METHOD
    // async checkExistingClearance() {
    //   const result = await this.$store.dispatch(
    //     "clearance/checkIfClearanceExist"
    //   );

    //   this.validateClearanceIfExist = result.result;

    //   if (
    //     LocalStorage.getItem("access_token") &&
    //     this.validateClearanceIfExist == 0
    //   ) {
    //     await this.$store.dispatch("users/setUserData");
    //     this.$router.push("register-clearance");
    //   } else if (
    //     LocalStorage.getItem("access_token") &&
    //     this.validateClearanceIfExist != 0
    //   ) {
    //     await this.$store.dispatch("users/setUserData");
    //     this.$router.push("clearance-tracking");
    //   } else {
    //     this.$router.push("/");

    //   }
    // }, //END OF checkExisitingClearance METHOD
  }, //END OF METHODS
  computed: {
    ...mapGetters({
      studentInfo: "users/userAccount",
      accessLink: "users/userAccount",
      navLinks: "helpers/navLinks",
    }),

    fullName() {
      return `${this.studentInfo.lastName},  ${this.studentInfo.firstName}`;
    },
  }, //END OF COMPUTED LIFE CYCLE HOOKS
  created() {
    // this.getPicture();
  }, ///END OF MOUNTED LIFE CYCLE HOOKS
});
</script>

<style scoped>
.avatar-image {
  height: 127px !important;
}
.my-menu-link {
  color: white;
  background: #03172e;
}

.resources_list {
  font-size: 15px;
  margin-left: -8px;
}

.resources {
  font-size: 17px;
  margin-left: 56px;
}

.name {
  margin-right: 5px;
  margin-top: 8px;
}

.bg-image {
  background-image: url("../assets/header-profile.png");
  background-size: cover;
  background-position: center;
}

.drawer-background {
  background-image: url("../assets/header-profile-flip.png");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
