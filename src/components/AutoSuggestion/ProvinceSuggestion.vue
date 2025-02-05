<template>
  <q-select
    filled
    input-debounce="500"
    label-slot
    :options="limitedOptions"
    :model-value="value"
    :disable="this.region === ''"
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
  name: "RegionSuggestion",
  props: {
    label: String,
    initialValue: {
      type: String,
      default: "",
    },
    region: String,
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
      filteredProvinces: [],
      loading: true,
    };
  },
  mounted() {
    this.getProvinces();
  },
  watch: {
    value(val) {
      const selectedProvince = this.filteredProvinces.find(
        (item) => item.otherName === val
      );
      this.shortCode = selectedProvince;
      this.$emit("valueChanged", {
        val: val,
        shortCode: this.shortCode,
      });
    },

    initialValue: {
      handler(val) {
        if (val) this.value = val;
      },
      immediate: true,
    },
    region() {
      this.getProvinces();
    },
  },
  methods: {
    async filterFn(val, update, abort) {
      const regionSearch = this.region.replace(/\s+/g, "");
      const payload = {
        search: val,
        region: this.region,
      };
      const response = await this.$store.dispatch(
        "clearance/getProvinces",
        payload
      );

      this.filteredProvinces = response.filter(
        (item) => item.region === regionSearch
      );

      this.allOptions = this.filteredProvinces.map((item) => item.otherName);

      update(() => {
        const needle = val.toLocaleLowerCase();
        this.options = this.allOptions.filter(
          (v) => v.toLocaleLowerCase().indexOf(needle) > -1
        );
      });
    }, //END OF filterFn METHOD
    async getProvinces() {
      const payload = {
        region: this.region, // Add region to the payload
      };
      const response = await this.$store.dispatch(
        "clearance/getProvinces",
        payload
      );

      // Update options with the filtered results from the backend

      this.allOptions = response.map((item) => item.otherName);
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
