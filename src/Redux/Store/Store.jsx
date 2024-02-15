import { configureStore } from "@reduxjs/toolkit";
import settingSlice from "../State/SettingSlice";
import profileSlice from "../State/ProfileSlice";
import chatSlice from "../State/ChatSlice";

export default configureStore({
    reducer:{
        setting: settingSlice,
        profile: profileSlice,
        chat: chatSlice
    }
})