<template>
  <div>
    <div class="fit flex flex-center" v-if="loading">
      <q-spinner-hourglass color="primary" size="150px" />
    </div>
    <q-markup-table separator="vertical" flat bordered v-else>
      <thead class="bg-primary text-white">
        <tr class="text-center">
          <th>REQUIREMENTS</th>
          <th>FILE NAME</th>
          <!-- <th>IMAGE</th> -->
          <th>STATUS</th>
          <th>DATE PROCESSED</th>
          <!-- <th>REMARKS</th> -->
          <!-- <th>ACTIONS</th> -->
        </tr>
      </thead>
      <tbody>
        <template v-for="(docu, i) in allDocuments" :key="i">
          <tr class="tableHover" @click.stop.prevent="selectedRow(docu)">
            <q-tooltip
              class="bg-positive text-body2"
              v-if="docu.fileData != null"
            >
              CLICK TO VIEW UPLOADED IMAGE
            </q-tooltip>
            <td class="text-left">{{ docu.requirements }}</td>
            <td class="text-center">{{ docu.fileName }}</td>
            <!-- <td v-if="docu.fileData !== null" class="text-center">
            <q-btn
              round
              color="primary"
              icon="image"
              @click.prevent="viewImages(docu.code)"
            >
              <q-tooltip class="bg-primary"> CLICK TO VIEW IMAGE </q-tooltip>
            </q-btn>
          </td>
          <td v-else></td> -->
            <td
              class="text-center"
              v-if="docu.fileData != null && docu.status === null"
            >
              <q-chip color="red-8" text-color="white" icon="close">
                UNVERIFIED
              </q-chip>
            </td>
            <td
              class="text-center"
              v-else-if="docu.fileData != null && docu.status === 2"
            >
              <q-chip color="green-8" text-color="white" icon="done">
                VERIFIED
              </q-chip>
            </td>
            <td v-else></td>
            <td class="text-center">{{ docu.dateTimeUpdated }}</td>
            <!-- <td class="text-center">{{ docu.remarks }}</td> -->
            <!-- <td v-if="docu.innerCode === null" class="text-center">
            <q-btn color="green-9" icon="upload" @click="openDialog(docu.code)">
              <q-tooltip class="bg-green"> CLICK TO UPLOAD IMAGE </q-tooltip>
            </q-btn>
          </td>
          <td v-else class="text-center">
            <q-btn-group>
              <q-btn
                color="yellow-9"
                text-color="black"
                icon="edit"
                @click="openEditDialog(docu.code)"
              >
                <q-tooltip class="bg-yellow-9 text-black">
                  CLICK TO EDIT IMAGE
                </q-tooltip>
              </q-btn>
              <q-btn
                color="red-9"
                icon="delete"
                @click="deleteDocuments(docu.code)"
              >
                <q-tooltip class="bg-red-9 text-white">
                  CLICK TO DELETE IMAGE
                </q-tooltip>
              </q-btn>
            </q-btn-group>
          </td> -->
          </tr>
        </template>
      </tbody>
    </q-markup-table>

    <!--UPLOAD DIALOG-->
    <q-dialog v-model="uploadFileDialog">
      <q-card>
        <q-card-section class="bg-primary text-white">
          <div class="text-h6 text-center">UPLOAD FILE</div>
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-form
            @submit.prevent="uploadDocuments()"
            method="post"
            class="q-gutter-md"
            enctype="multipart/form-data"
            name="file"
          >
            <q-file
              v-model="file"
              label="Upload your document"
              accept=".jpg, .jpeg, .png,  image/*"
              hint="Only .jpg, .jpeg, .png, and 5mb size are required"
              max-file-size="5000000"
              @rejected="onRejected"
              clearable
              name="file"
              counter
              :counter-label="sizeLabelFile"
              square
              outlined
              class="InputToUpper"
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>

              <template #file="{ file }">
                <q-chip class="full-width q-my-xs" rounded>
                  {{ file.name }}
                </q-chip>
              </template>
            </q-file>
            <div class="row justify-end">
              <q-btn
                :disable="file == null ? true : false"
                label="UPLOAD"
                color="primary"
                type="submit"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!--UPLOAD DIALOG-->

    <!--EDIT DIALOG-->
    <q-dialog v-model="editFileDialog">
      <q-card>
        <q-card-section class="bg-primary text-white">
          <div class="text-h6 text-center text-weight-bold">EDIT FILE</div>
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-form
            @submit.prevent="editDocuments()"
            method="post"
            class="q-gutter-md"
            enctype="multipart/form-data"
            name="file"
          >
            <q-file
              v-model="file"
              label="Upload your document"
              accept=".jpg, .jpeg, .png,  image/*"
              hint="Only .jpg, .jpeg, .png, and 5mb size are required"
              max-file-size="5000000"
              @rejected="onRejected"
              clearable
              name="file"
              counter
              :counter-label="sizeLabelFile"
              square
              outlined
              class="InputToUpper"
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>

              <template #file="{ file }">
                <q-chip class="full-width q-my-xs" rounded>
                  {{ file.name }}
                </q-chip>
              </template>
            </q-file>
            <div class="row justify-end">
              <q-btn
                :disable="file == null ? true : false"
                label="UPLOAD"
                color="primary"
                type="submit"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!--END OF EDIT DIALOG-->

    <!--POP UP UPLOADED IMAGE-->
    <q-dialog
      v-model="viewImageDialog"
      persistent
      :maximized="true"
      transition-show="fade"
      transition-hide="fade"
    >
      <q-card class="bg-primary text-white">
        <q-bar class="text-h4 q-pa-md">
          <q-space />

          <q-btn dense color="red-9" icon="close" v-close-popup>
            <q-tooltip class="bg-red-9 text-white">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="q-pt-none">
          <div class="row justify-center uploadedImage">
            <div v-if="this.isImage">
              <img
                :src="'data:image/jpeg;base64,' + documentImage"
                class="q-mx-xl"
              />
            </div>
            <div v-else>
              <iframe
                :src="documentPdf"
                width="1800px"
                height="1000px"
                v-if="documentPdf"
              ></iframe>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!--END OF POP UP UPLOADED IMAGE-->
  </div>
</template>

<script>
export default {
  name: "DocumentsPage",
  data() {
    return {
      allDocuments: [],
      loading: true,
      upload: true,
      selectedDocuCode: null,
      uploadFileDialog: false,
      editFileDialog: false,
      file: null,
      uploadButtonLoading: false,
      percentage: 0,
      isImage: false,
      documentImage: null,
      documentPdf: null,
      viewImageDialog: false,
    };
  }, ///END OF DATA LIFE CYCLE HOOKS
  methods: {
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
    }, //END OF onRejected METHOD
    sizeLabelFile({ totalSize }) {
      return `size(${totalSize})`;
    },
    async getDocuments() {
      const result = await this.$store.dispatch("documents/getDocuments");
      setTimeout(() => {
        // Assuming data is fetched here
        this.allDocuments = result;
        this.loading = false;
      }, 1000);
    }, ///END OF getDocuments METHOD
    openDialog(docucode) {
      this.selectedDocuCode = docucode;
      this.uploadFileDialog = true;
    }, //END OF openDialog METHOD
    openEditDialog(docucode) {
      this.selectedDocuCode = docucode;
      this.editFileDialog = true;
    }, //END OF openEditDialog METHOD
    async uploadDocuments() {
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
          const fileData = new FormData();
          fileData.append("file", this.file, this.file.name);
          fileData.append("docucode", this.selectedDocuCode);
          try {
            const response = await this.$store.dispatch(
              "documents/uploadDocuments",
              fileData
            );
            if (response !== 0) {
              this.uploadButtonLoading = true;
              this.loading = true;
              this.percentage = 0;
              this.intervals = setInterval(() => {
                this.percentage += Math.floor(Math.random() * 8 + 10);
                if (this.percentage >= 100) {
                  clearInterval(this.intervals);
                  this.uploadButtonLoading = false;
                  this.uploadFileDialog = false;
                  this.file = null;
                  this.$q.notify({
                    message: "Succesfully Uploaded!",
                    position: "bottom",
                    type: "positive",
                  });
                  this.loading = false;
                  this.uploadFileDialog = false;
                  this.getDocuments();
                }
              }, 400);
            } else {
              this.$q.notify({
                message: "Something went wrong :(",
                position: "bottom",
                type: "negative",
              });
              this.uploadFileDialog = false;
              this.getDocuments();
            }
          } catch (error) {
            console.log(error);
            this.$q.notify({
              message: `${error}`,
              position: "bottom",
              type: "negative",
            });
          }
        })
        .onCancel(() => {
          this.uploadFileDialog = false;
        });
    }, //END OF uploadDocuments METHOD
    async editDocuments() {
      this.$q
        .dialog({
          title: "EDIT",
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
          // console.log('OK')
          const fileData = new FormData();
          fileData.append("file", this.file, this.file.name);
          fileData.append("docucode", this.selectedDocuCode);
          try {
            const response = await this.$store.dispatch(
              "documents/editDocuments",
              fileData
            );
            if (response != 0) {
              this.uploadButtonLoading = true;
              this.loading = true;
              this.percentage = 0;
              this.intervals = setInterval(() => {
                this.percentage += Math.floor(Math.random() * 8 + 10);
                if (this.percentage >= 100) {
                  clearInterval(this.intervals);
                  this.uploadButtonLoading = false;
                  this.editFileDialog = false;
                  this.file = null;
                  this.$q.notify({
                    message: "Succesfully Edited!",
                    position: "bottom",
                    type: "positive",
                  });
                  this.loading = false;
                  this.editFileDialog = false;
                  this.getDocuments();
                }
              }, 400);
            } else {
              this.$q.notify({
                message: "Something went wrong :(",
                position: "bottom",
                type: "negative",
              });
              this.getDocuments();
            }
          } catch (error) {
            console.log(error);
            this.$q.notify({
              message: `${error}`,
              position: "bottom",
              type: "negative",
            });
          }
        })
        .onCancel(async () => {
          this.editFileDialog = false;
        });
    }, //END OF editDocuments
    async deleteDocuments(docucode) {
      this.$q
        .dialog({
          title: "DELETE",
          message: "are you sure you want to delete this document?",
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
          try {
            const payload = {
              docucode,
            };
            const response = await this.$store.dispatch(
              "documents/deleteDocuments",
              payload
            );

            if (response != 0) {
              this.uploadButtonLoading = true;
              this.loading = true;
              this.percentage = 0;
              this.intervals = setInterval(() => {
                this.percentage += Math.floor(Math.random() * 8 + 10);
                if (this.percentage >= 100) {
                  clearInterval(this.intervals);
                  this.uploadButtonLoading = false;
                  this.file = null;
                  this.$q.notify({
                    message: "Succesfully Deleted!",
                    position: "bottom",
                    type: "positive",
                  });
                  this.loading = false;
                  this.getDocuments();
                }
              }, 400);
            } else {
              this.$q.notify({
                message: "Something went wrong :(",
                position: "bottom",
                type: "negative",
              });
              this.getDocuments();
            }

            // console.log("DeleteResponse", response);
          } catch (error) {
            console.log(error);
            this.$q.notify({
              message: `${error}`,
              position: "bottom",
              type: "negative",
            });
          }
        })
        .onCancel(() => {
          this.uploadFileDialog = false;
          // console.log('Cancel')
        });
    }, //END of deleteDocuments
    async selectedRow(data) {
      // const payload = [docucode];

      if (data.sddCode !== null) {
        this.viewImageDialog = true;
        const payload = {
          docucode: data.code,
        };
        try {
          const response = await this.$store.dispatch(
            "documents/viewImages",
            payload
          );

          this.isImage = response[1].includes("image");
          this.documentImage = response[0];

          if (response[1].includes("application/pdf")) {
            const binaryData = atob(response[0]);
            const arrayBuffer = new ArrayBuffer(binaryData.length);
            const byteArray = new Uint8Array(arrayBuffer);

            for (let i = 0; i < binaryData.length; i++) {
              byteArray[i] = binaryData.charCodeAt(i);
            }

            const blob = new Blob([byteArray], { type: "application/pdf" });
            const blobUrl = URL.createObjectURL(blob);

            this.documentPdf = blobUrl;
          }
        } catch (error) {
          console.log("Error to view images", error);
        }
      }
    }, //END OF viewImages METHOD
  },
  created() {
    this.getDocuments();
  },
};
</script>

<style lang="scss" scoped>
.uploadedImage {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

img {
  max-width: 100%; /* Ensure the image doesn't exceed the container's width */
  max-height: 100%; /* Ensure the image doesn't exceed the container's height */
}

td,
th {
  word-wrap: break-word;
  white-space: normal;
  max-width: 150px;
  padding: 8px;
}

thead th .thead-sticky {
  position: sticky;
  top: 0;
  z-index: 1;
}

.setSize {
  font-size: 13px;
}

.tableHover:hover {
  background-color: #ffbc03; /* Change the background color on hover */
  cursor: pointer; /* Change the cursor to a pointer on hover */
}
</style>
