import { configureStore } from "@reduxjs/toolkit";
import appstat from "./stores/appstatus";
import menu from "./stores/menu";

export default configureStore({
    reducer: {
        appstat: appstat,
        menu: menu
    }
})