import { configureStore } from "@reduxjs/toolkit";
import appstat from "./stores/appstatus";

export default configureStore({
    reducer: {
        appstat: appstat
    }
})