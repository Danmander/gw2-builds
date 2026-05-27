<template>
    <v-dialog
        width="700"
        v-model="isOpen"
    >
        <template #activator="{ props: activatorProps }">
            <v-icon
                class="options-icon"
                v-bind="activatorProps"
            >
                mdi-cog
            </v-icon>
        </template>
  
        <v-card title="Your preferences">
            <v-card-text>
                <template v-if="hasNotSavedPreferences">
                    <p class="mb-2">
                        Hello there! It looks like this is your first time visiting the site. To make rotations easier to read, would you prefer to view skills by their skill names or their default keybinds?
                    </p>
                    <p class="subtext mb-2">
                        You can change this preference anytime by clicking the <v-icon>mdi-cog</v-icon> icon in the top-left corner of the screen.
                    </p>
                    <hr class="mt-4 mb-2">
                </template>
                <v-switch
                    v-model="userPreferencesStore.showKeybindAsWeaponSkillName"
                    label="Show default keybinds instead of weapon skill names"
                    color="primary"
                    hide-details
                    density="comfortable"
                />
                <v-switch
                    v-model="userPreferencesStore.showKeybindAsProfessionSkillName"
                    label="Show default keybinds instead of profession skill names"
                    color="primary"
                    hide-details
                    density="comfortable"
                />
                <v-switch
                    v-model="userPreferencesStore.showKeybindAsSlotSkillName"
                    label="Show &quot;keybinds&quot; instead of heal and elite skill names"
                    color="primary"
                    hide-details
                    density="comfortable"
                />
                <div>
                    <p class="mb-2">
                        To show you some examples of what these settings do, lets talk about one of our builds on the site:
                    </p>
                    <v-alert
                        class="markdown-renderer"
                        variant="tonal"
                        density="compact"
                    >
                        <markdown-renderer :markdown="exampleText" />
                    </v-alert>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { useUserPreferencesStore } from '../../stores/user-preferences.js';
import MarkdownRenderer from '../markdown/MarkdownRenderer.vue';

export default {
    components: {
        MarkdownRenderer
    },
    setup() {
        const userPreferencesStore = useUserPreferencesStore();
        return { userPreferencesStore };
    },
    data() {
        return {
            exampleText: "[icon:antiquary:Heal Alacrity Antiquary] uses [skill:77397], [icon:antiquary:Artifacts], [skill:63351] and [skill:63128] to upkeep boons.\n\nSince [icon:antiquary:Artifacts] are somewhat random, so it's important to recognize the ones providing the most value such as [skill:77277], [skill:76591], [skill:76816], [skill:76674] and [skill:76601].\n\nIt also has strong [icon:defiance:Breakbar] damage due to [skill:72927] and [skill:13132].\n\nGaining a lot of [icon:initiative] through [skill:77230] combined with [trait:2400] can also be very beneficial for both [icon:healing] and [icon:defiance:Breakbar] damage.\n\nAlthough its best heal skill is [skill:12440], which is a bit funky due to it being a [icon:sylvari] racial skill.",

            isOpen: false,
            hasNotSavedPreferences: false
        }
    },
    mounted() {
        if(!this.userPreferencesStore.hasSavedPreferences) {
            this.isOpen = true;
            this.hasNotSavedPreferences = true;
        }
    },
}
</script>

<style scoped>
.options-icon {
    position: fixed;
    top: 4px;
    left: 4px;
}

.subtext {
    opacity: 0.7;
}

.markdown-renderer {
    border-left: 2px solid currentColor;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
</style>