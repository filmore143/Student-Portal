<template>
  <q-select
    filled
    input-debounce="500"
    label-slot
    :options="limitedOptions"
    :model-value="value"
    :disable="this.vaccine === ''"
    use-input
    fill-input
    hide-selected
    @filter="filterFn"
    @input-value="(val) => (value = val)"
    :rules="[
      (val) => {
        if (val == null || val === '') return 'This field is required.';
      },
    ]"
    placeholder="Type here to search"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No Suggestion found.
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "VaccineDoseSuggestion",
  props: {
    label: String,
    initialValue: {
      type: String,
      default: "",
    },
    vaccine: String,
  },
  emits: ["valueChanged"],
  setup() {
    let allOptions = [];
    let shortCode = "";
    return {
      allOptions,
      shortCode,
    };
  },
  data() {
    return {
      value: "",
      options: [],
      filteredVaccine: [],
      loading: true,
    };
  },
  mounted() {
    this.getDoses();
  },
  watch: {
    value(val) {
      const selectedDose = this.filteredVaccine.find(
        (item) => item.doseLabel === val
      );

      const doseId = selectedDose ? selectedDose.doseId : null;
      this.$emit("valueChanged", {
        val: val,
        doseId: doseId,
      });
    },

    initialValue: {
      handler(val) {
        if (val) this.value = val;
      },
      immediate: true,
    },
    vaccine() {
      this.getDoses();
    },
  },
  methods: {
    async filterFn(val, update, abort) {
      const vaccineSearch = this.vaccine.replace(/\s+/g, "");
      const payload = {
        search: val,
        vaccine: this.vaccine,
      };
      const response = await this.$store.dispatch("vaccine/getDoses", payload);

      this.filteredVaccine = response.filter(
        (item) => item.name === vaccineSearch
      );

      this.allOptions = this.filteredVaccine.map((item) => item.doseLabel);

      update(() => {
        const needle = val.toLocaleLowerCase();
        this.options = this.allOptions.filter(
          (v) => v.toLocaleLowerCase().indexOf(needle) > -1
        );
      });
    }, //END OF filterFn METHOD
    async getDoses() {
      const payload = {
        vaccine: this.vaccine, // Add region to the payload
      };
      const response = await this.$store.dispatch("vaccine/getDoses", payload);

      this.allOptions = response.map((item) => item.doseLabel);
      this.loading = false;
    },
  }, //END OF METHOD LIFE CYCLE HOOKS
  computed: {
    limitedOptions() {
      // Adjust the limit as needed
      const limit = 10;
      return this.options.slice(0, limit);
    },
  },
});
</script>
