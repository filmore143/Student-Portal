<template>
  <q-select
    filled
    input-debounce="500"
    label-slot
    :options="limitedOptions"
    :model-value="value"
    use-input
    :disable="this.shortCode === ''"
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
  {{ shortCode }}
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
    shortCode: String,
  },
  emits: ["valueChanged"],
  setup() {
    let allOptions = [];
    return {
      allOptions,
    };
  },
  data() {
    return {
      value: "",
      options: [],
      loading: true,
      province: "",
    };
  },
  mounted() {
    this.getCities();
  },
  watch: {
    value(val) {
      this.$emit("valueChanged", val);
    },
    initialValue: {
      handler(val) {
        if (val) this.value = val;
      },
      immediate: true,
    },
    shortCode() {
      this.getCities(); // Re-fetch provinces when region changes
    },
  },
  methods: {
    async filterFn(val, update, abort) {
      const payload = {
        province: this.shortCode.shortCode,
      };
      const response = await this.$store.dispatch(
        "clearance/getCities",
        payload
      );

      // Update options with the filtered results from the backend
      this.allOptions = response.map((item) => item.name);

      update(() => {
        const needle = val.toLocaleLowerCase();
        this.options = this.allOptions.filter(
          (v) => v.toLocaleLowerCase().indexOf(needle) > -1
        );
      });
    }, //END OF filterFn METHOD
    async getCities() {
      if (this.shortCode) {
        const payload = {
          province: this.shortCode.shortCode, // Add region to the payload
        };
        const response = await this.$store.dispatch(
          "clearance/getCities",
          payload
        );

        const sortedCities = response.map((item) => item.name).sort();

        this.allOptions = sortedCities;
        this.loading = false;
      } else {
        const response = await this.$store.dispatch("users/getStudentCity");

        this.value = response.city;
      }
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
