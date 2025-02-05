<template>
  <q-select
    filled
    input-debounce="500"
    label-slot
    :options="limitedOptions"
    :disable="loading"
    :model-value="value"
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
  name: "SchoolsSuggestions",
  props: {
    label: String,
    initialValue: {
      type: String,
      default: "",
    },
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
      value: this.initialValue,
      options: [],
      loading: true,
    };
  },
  mounted() {
    this.getSchools();
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
  },
  methods: {
    async filterFn(val, update, abort) {
      const payload = {
        search: val,
      };
      const response = await this.$store.dispatch(
        "clearance/getSchools",
        payload
      );

      this.allOptions = response.map((item) => item.dESC);
      this.loading = false;

      update(() => {
        const needle = val.toLocaleLowerCase();
        this.options = this.allOptions.filter(
          (v) => v.toLocaleLowerCase().indexOf(needle) > -1
        );
      });
    }, //END OF filterFn METHOD
    async getSchools() {
      const response = await this.$store.dispatch("clearance/getSchools");
      this.allOptions = response.map((item) => item.dESC);
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
