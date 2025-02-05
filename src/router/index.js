import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

// import store from "src/store/users/index";
// import { Notify } from "quasar";
// import { LocalStorage } from "quasar";
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE !== "hash"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath

    scrollBehavior: () => ({ left: 0, top: 0 }),
  });

  // Router.beforeEach((to, from, next) => {
  //   console.log("dawda", !store.state.userAccount);
  //   if (to.meta.isAuthenticated) {
  //     if (store.state.userAccount) {
  //       next("/home");
  //     } else {
  //       Notify.create({
  //         message: "YOU NEED TO LOGIN FIRST",
  //         color: "negative",
  //         position: "top",
  //         icon: "warning",
  //       });
  //       next("/");
  //     }
  //   } else {
  //     Notify.create({
  //       message: "YOU NEED TO LOGIN FIRST",
  //       color: "negative",
  //       position: "top",
  //       icon: "warning",
  //     });
  //     next();
  //   }
  // });

  return Router;
});
