import { defineStore } from 'pinia';
import { ref, watch } from 'vue'
import Cookies from 'js-cookie';
import CookieName from '../enums/cookieName';

export const useUserPreferencesStore = defineStore('user-preferences', () => {
    const hasSavedPreferences = ref(
        Cookies.get(CookieName.ShowWeaponSkillKeybinds) !== undefined ||
        Cookies.get(CookieName.ShowProfessionSkillKeybinds) !== undefined ||
        Cookies.get(CookieName.ShowSlotSkillKeybinds) !== undefined
    );

    const showKeybindAsWeaponSkillName = ref(Cookies.get(CookieName.ShowWeaponSkillKeybinds) === "true");
    const showKeybindAsProfessionSkillName = ref(Cookies.get(CookieName.ShowProfessionSkillKeybinds) === "true");
    const showKeybindAsSlotSkillName = ref(Cookies.get(CookieName.ShowSlotSkillKeybinds) === "true");

    function savePreferenced() {
        const cookieSettings = { expires: 365, sameSite: "Strict", secure: true };

        Cookies.set(CookieName.ShowWeaponSkillKeybinds, showKeybindAsWeaponSkillName.value, cookieSettings);
        Cookies.set(CookieName.ShowProfessionSkillKeybinds, showKeybindAsProfessionSkillName.value, cookieSettings);
        Cookies.set(CookieName.ShowSlotSkillKeybinds, showKeybindAsSlotSkillName.value, cookieSettings);
        hasSavedPreferences.value = true;
    }

    // Make sure cookies automatically update when any of the user preferences change
    watch(showKeybindAsWeaponSkillName, savePreferenced)

    return {
        hasSavedPreferences, showKeybindAsWeaponSkillName, showKeybindAsProfessionSkillName, showKeybindAsSlotSkillName // state
    };
})