<template>
  <div class="q-pt-lg">
    <q-tabs
      v-model="tab"
      class="bg-primary text-white shadow-2"
      active-color="yellow-8"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="about" label="about" />
      <q-tab name="epolicy" label="UERM Email Policy" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="about">
        <div
          class="text-h5 q-pa-lg text-primary text-uppercase text-weight-bold"
        >
          What is G-Suite for education?
        </div>
        <div class="row justify-center">
          <q-img
            src="~assets/googlesuite.png"
            style="width: 300px; height: 100px"
          />
        </div>
        <p>
          G suite for education is a free productivity tools to help students
          and faculty interact seamlessly and securely across devices. The G
          Suite for Education (formerly called Google Apps for Education) core
          services are the heart of Google's educational offering to schools.
          The core services are Gmail (including Inbox by Gmail), Calendar,
          Classroom, Contacts, Drive, Docs, Forms, Groups, Sheets, Sites,
          Slides, Talk/Hangouts and Vault.
        </p>
        <br />
        <p>What’s included: Everything you need for your organization.</p>
        <ul>
          <li>
            <b>Communicate your way-</b>Connect with email, chat, and video
            conference.
          </li>
          <li>
            <b>Collaborate anywhere- </b>Co-edit documents, spreadsheets, and
            presentations in real time.
          </li>
          <li>
            <b>Manage all your tasks-</b>Build to-do lists, create task
            reminders, and schedule meetings.
          </li>
          <li>
            <b>Manage your classroom with ease-</b>Create classes, distribute
            assignments, give quizzes, send feedback, and see everything in one
            place.
          </li>
          <li>
            <b>Administer with confidence- </b>Add students, manage devices, and
            configure security and settings so your data stays safe.
          </li>
        </ul>
      </q-tab-panel>

      <q-tab-panel name="epolicy">
        <div class="row justify-center">
          <iframe
            src="https://drive.google.com/file/d/1mFOCqEQlchSZqBLJQcQB6ONGCLJUxwyD/preview"
            width="59%"
            height="580"
            allow="autoplay"
          ></iframe>

          <iframe
            src="https://drive.google.com/file/d/1u4l3HZJSGyXxrxs0LPfkzSh8bBHC5jb4/preview"
            width="50%"
            height="580"
            allow="autoplay"
          ></iframe>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { ref } from "vue";
import Announcement from "src/components/Announcement.vue";
import upButton from "src/components/UpButton.vue";
export default {
  name: "GoogleMail",
  data() {
    return {
      tab: ref("about"),
    };
  },
};
</script>

<style lang="scss" scoped></style>
