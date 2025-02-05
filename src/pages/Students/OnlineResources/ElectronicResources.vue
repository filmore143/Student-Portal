<template>
  <div class="q-pa-md">
    <div class="q-pa-md example-row-equal-width">
      <p class="q-px-lg text-primary q-ml-xl">
        <b class="text-h6 text-weight-bold">LIBRARY HOURS</b> <br />
        7:00 AM to 8:00 PM (Monday to Saturday) and CLOSED on Sunday and
        Holidays. Changes in library hours will be announced prior to
        implementation <br />
        <br />
        <b class="text-h6 text-weight-bold">ELECTRONIC RESOURCES</b> <br />
        Click the image to see the access instructions.
        <b
          >Clicking the image will direct you to the homepage of the platform.
        </b>
      </p>
    </div>
    <div ref="myListRef" class="row justify-center q-gutter-sm">
      <!---ACCESS MEDICINE-->
      <q-intersection
        transition="scale"
        class="online-materials"
        v-for="pdfResource in this.pdfResources"
        :key="pdfResource"
      >
        <q-card flat bordered class="cursor-pointer q-ma-sm" v-ripple>
          <q-card-section
            class="q-pa-none"
            style="position: relative"
            @click="openPDFDialog(pdfResource.src, pdfResource.title)"
          >
            <img :src="pdfResource.img" style="width: 100%; height: 100%" />
            <!-- <a :href="pdfResource.subImgLink">
              <img
                :src="pdfResource.subImg"
                style="position: absolute; bottom: 0; left: 0; width: 100%"
              />
            </a> -->
          </q-card-section>

          <q-card-section
            class="q-pa-none"
            style="position: relative"
            @click="
              openPDFDialog(
                pdfResource.src,
                pdfResource.title,
                pdfResource.subImgLink
              )
            "
          >
            <!-- <a :href="pdfResource.subImgLink"> -->
            <img
              :src="pdfResource.subImg"
              style="position: absolute; bottom: 0; left: 0; width: 100%"
            />
            <!-- </a> -->
          </q-card-section>
        </q-card>

        <q-form
          ref="loginForm"
          id="loginForm"
          method="post"
          action="https://ovidsp.dc1.ovid.com/"
          style="display: none"
        >
          <q-input type="hidden" name="QS2" value="" />
          <q-input type="text" name="ID" v-model="formData.id" />
          <q-input
            type="password"
            name="password"
            v-model="formData.password"
          />
        </q-form>
      </q-intersection>
    </div>

    <q-dialog v-model="bools.openPDFDialog" full-height full-width maximized>
      <q-card class="fit">
        <q-card-section class="bg-primary text-white text-weight-bold">
          <div class="row justify-between items-center">
            <span class="text-body1 text-uppercase">
              {{ this.pdfSrc.title }}
            </span>
            <span>
              <q-btn icon="fa fa-times" color="red" v-close-popup></q-btn>
            </span>
          </div>
        </q-card-section>
        <div v-if="!bools.pdfLoading">
          <q-card-section
            class="full-width q-pa-none"
            style="height: 92.9vh"
            v-if="bools.openPDFDialog"
          >
            <q-pdfviewer
              v-model="bools.show"
              type="html5"
              :src="this.pdfSrc.src"
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

    <!---STACK STACE-->
    <div>
      <q-card flat>
        <q-card-section
          class="q-px-lg text-primary text-h6 text-weight-bold text-weight-bold q-ml-xl"
        >
          OTHER LIBRARY SERVICES
        </q-card-section>
        <q-card-section class="q-px-lg text-primary text-weight-bold q-ml-xl">
          Click the image to see the instructions on how to avail the service.
        </q-card-section>
        <q-card-section class="row justify-center q-gutter-sm">
          <q-intersection
            transition="scale"
            class="online-materials"
            v-for="libResource in this.otherLibraryResources"
            :key="libResource"
          >
            <q-card
              flat
              bordered
              class="cursor-pointer q-ma-sm"
              v-ripple
              @click="openOtherLibraryDialog(libResource)"
            >
              <q-card-section class="q-pa-none" style="position: relative">
                <img :src="libResource.img" style="width: 100%; height: 100%" />
              </q-card-section>
            </q-card>
          </q-intersection>
        </q-card-section>
      </q-card>

      <div class="q-px-lg text-primary text-weight-bold q-ml-xl">
        Medical Center Library Contact Information: +6328- 715-08-61 loc.355 |
        email: library@uerm.edu.ph or aclib@uerm.edu.ph
      </div>
    </div>

    <q-dialog
      v-model="bools.openOtherLibraryDialog"
      full-height
      full-width
      maximized
    >
      <q-card class="fit">
        <q-card-section class="bg-primary text-white text-weight-bold">
          <div class="row justify-between items-center">
            <span class="text-body1 text-uppercase">
              {{ this.libSrc.title }}
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
            v-if="bools.openOtherLibraryDialog"
          >
            <!-- <q-pdfviewer
              v-model="bools.show"
              type="html5"
              :src="this.pdfSrc.src"
              content-class="absolute"
            /> -->
            <img :src="this.libSrc.img" />
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
</template>

<script>
import { computed } from "vue";
export default {
  name: "OnlineResources",
  data() {
    const myListRef = null;
    return {
      bools: {
        openPDFDialog: false,
        openOtherLibraryDialog: false,
        show: true,
        pdfLoading: false,
      },
      myListRef,
      listEl: computed(() => (myListRef ? myListRef.$el : null)),
      pdfResources: [
        {
          src: "https://library.uerm.edu.ph/kohaimages/UERM/AccessMedicine%20Guide.pdf",
          title: "AccessMedicine",
          img: "img/electronic-resources/access_medicine.PNG",
          subImg: "img/electronic-resources/access_medicineSub.PNG",
          subImgLink: "https://accessmedicine.mhmedical.com/",
        },
        {
          src: "https://library.uerm.edu.ph/kohaimages/UERM/AccessPhysiotherapy%20Guide.pdf",
          title: "AccessPhysiotherapy",
          img: "img/electronic-resources/access_physiotheraphy.PNG",
          subImg: "img/electronic-resources/access_physiotheraphySub.PNG",
          subImgLink: "https://accessphysiotherapy.mhmedical.com/",
        },
        {
          src: "https://library.uerm.edu.ph/kohaimages/UERM/F.A.%20Davis%20PT%20Collection%20Guide.pdf",
          title: "F.A. Davis PT Collection",
          img: "img/electronic-resources/PT_collection.PNG",
          subImg: "img/electronic-resources/PT_collectionSub.PNG",
          subImgLink: "https://fadavispt.mhmedical.com/",
        },
        {
          src: "https://library.uerm.edu.ph/kohaimages/UERM/Anatomy%20and%20Physiology%20Revealed.pdf",
          title: "Anatomy &  Physiology Revealed 4.0",
          img: "img/electronic-resources/anatomy_physiology.PNG",
          subImg: "img/electronic-resources/anatomy_physiologySub.PNG",
          subImgLink: "https://fadavispt.mhmedical.com/",
        },
        {
          src: "https://library.uerm.edu.ph/kohaimages/UERM/ClinicalKey%20Registration%20Remote%20Access%20Renewal%20Guide.pdf",
          title: "ClinicalKey",
          img: "img/electronic-resources/clinical_key.PNG",
          subImg: "img/electronic-resources/clinical_keySub.PNG",
          subImgLink: "https://www.clinicalkey.com/#!/",
        },
        {
          src: "https://search.ebscohost.com/Community.aspx?user=uermmmci&authtype=uid&stsug=AmiKSr2GKze7Y5rzkJRNqjvUXN91ZO-g8VC1XPxjpsiw-slRt5oSlglVhwPHYuCF2i2C-SFEf9MR6838OYxYMFhQTkkEFDlA0f2n751gr_IZdPCOeaPeW1kHwn7Muw28SpaP4p0i8fy_0Fqry86PySaHB4yiFYRgBrR80qevT_dVRQU&IsAdminMobile=N&encid=22D731163C5635573716353632553C473963378372C376C372C378C373C376C370C331",
          title: "EBSCOHost MEDLINE Complete CINAHL with Full Text",
          img: "img/electronic-resources/cinahl_plus.PNG",
          subImg: "img/electronic-resources/cinahl_plus.PNG",
          subImgLink:
            "http://search.ebscohost.com/login.aspx?authtype=uid&user=uermmmci&password=r@mon1956",
          //dito same lang
        },
        {
          src: "https://library.uerm.edu.ph/kohaimages/UERM/Cochrane%20Library%20Access%20Guide.pdf?fbclid=IwAR3DRZHC-jbXP1ynzPmxrN2_GdcQ3PimQk2_HlxA3J6E6VfmxN4VDPc2M50",
          title: "Cochrane Library",
          img: "img/electronic-resources/cochrane.PNG",
          subImg: "img/electronic-resources/cochraneSub.PNG",
          subImgLink:
            "https://www.cochranelibrary.com/?fbclid=IwAR2rH9sBqB7Yh6K5z3xlY2ACzM-6Ji7VcWWb3NLhhSpo1Owtldifttx7YXs",
        },
        {
          src: "https://uerm.edu.ph/apps/portal/assets/Ovid%20Journals%20Access%20Guide.pdf",
          title: "Journals at OVID",
          img: "img/electronic-resources/ovid.PNG",
          subImg: "img/electronic-resources/ovidSub.PNG",
          subImgLink: "https://ovidsp.dc1.ovid.com/",
        },
        {
          src: "https://docs.google.com/forms/d/e/1FAIpQLSfNRqBkkFC_irQjz1bEcIxYzOHBYTV1kLKqlz8IwcmtrMzWzg/viewform",
          title: "UpToDate Anywhere",
          img: "img/electronic-resources/uptodate_anywhere.PNG",
          subImg: "img/electronic-resources/uptodate_anywhereSub.PNG",
          subImgLink: "https://www.uptodate.com/contents/search",
        },
        // {
        //   src: "https://online.lexi.com/lco/action/home",
        //   title: "Lexicomp",
        //   img: "img/electronic-resources/lexicomp.PNG",
        //   subImg: "img/electronic-resources/lexicompSub.PNG",
        //   subImgLink: "https://online.lexi.com/lco/action/home",
        // },
        {
          src: "img/electronic-resources/TurnitinInstruction.png",
          title: "Turnitin",
          img: "img/electronic-resources/turnitn.png",
          subImg: "img/electronic-resources/Turnitin_logo.png",
          subImgLink: "https://online.lexi.com/lco/action/home",
        },
        {
          src: "https://ejournals.ph/",
          title: "Philippine E-Journals",
          img: "img/electronic-resources/philippine_ejournal.PNG",
          // subImg: "img/electronic-resources/philippine_ejournalSub.PNG",
          // subImgLink: ""
          //SAME LANG
        },
        {
          src: "https://library.uerm.edu.ph/cgi-bin/koha/pages.pl?p=open-access",
          title: "Open Access",
          img: "img/electronic-resources/open_access.PNG",
          subImg: "img/electronic-resources/open_accessSub.PNG",
          subImgLink: "https://phlconnect.ched.gov.ph/home",
        },
      ],
      pdfSrc: {
        src: "",
        title: "",
      },
      libSrc: {
        title: "",
        img: [],
      },
      otherLibraryResources: [
        {
          title: "Document Delivery Service",
          img: "img/electronic-resources/ODDS.png",
        },
        {
          title: "Book an Online Orientation",
          img: "img/electronic-resources/ORIENT.png",
        },
        {
          title: "Course card in Canvas",
          img: "img/electronic-resources/Canvas.png",
        },
        {
          title: "Library's Facebook Page",
          img: "img/electronic-resources/FBPAGE.png",
        },
      ],
      formData: {
        id: "uerm999", // Default username
        password: "access", // Default password
      },
    };
  },
  methods: {
    async openPDFDialog(src, title, subImglink) {
      if (subImglink === "https://ovidsp.dc1.ovid.com/") {
        // console.log("HERE", pdfSrc.subImgLink);
        this.autoLogin();
        return;
      }

      if (
        subImglink ===
        "http://search.ebscohost.com/login.aspx?authtype=uid&user=uermmmci&password=r@mon1956"
      ) {
        window.open(subImglink);
        return; // Exit the function after opening the link
      }

      this.bools.pdfLoading = true;
      this.pdfSrc.title = title;
      this.pdfSrc.src = src;

      this.bools.openPDFDialog = true;
      setTimeout(() => {
        this.bools.pdfLoading = false;
      }, 1000);
    },
    openOtherLibraryDialog(pdfSrc) {
      this.bools.pdfLoading = true;
      this.libSrc.title = pdfSrc.title;
      this.libSrc.img = pdfSrc.img;
      this.bools.openOtherLibraryDialog = true;

      setTimeout(() => {
        this.bools.pdfLoading = false;
      }, 1000);
    },
    autoLogin() {
      // URL to which you need to auto-login
      const loginUrl = "https://ovidsp.ovid.com/";

      // Form data for auto-login
      const formData = new FormData();
      formData.append("ID", "uerm999");
      formData.append("password", "access");

      // Create a form element
      const form = document.createElement("form");
      form.method = "POST";
      form.action = loginUrl;

      // Append the form data as hidden inputs
      for (const [key, value] of formData.entries()) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }

      // Append the form to the body and submit it
      document.body.appendChild(form);
      form.submit();
    },
  },
};
</script>

<style lang="scss" scoped>
.online-materials {
  height: 290px;
  width: 290px;
  margin-bottom: 50px;
}
</style>
