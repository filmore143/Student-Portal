import { store } from "quasar/wrappers";
import { createStore } from "vuex";

// import example from './module-example'
import module from "./module";
import helpers from "./helpers";

import users from "./users";
import ledger from "./ledger";
import grades from "./grades";
import payments from "./payments";
import announcement from "./announcement";
import evaluation from "./evaluation";
import clearance from "./clearance";
import documents from "./documents";
import vaccine from "./vaccine";
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
      module,
      helpers,
      users,
      ledger,
      grades,
      payments,
      announcement,
      evaluation,
      clearance,
      documents,
      vaccine,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
