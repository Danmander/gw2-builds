<template>
    <h1>Build Editor</h1>
    {{ buildCode }}
    <a
        class="d-block"
        :href="buildEditorLink"
        target="_blank"
    >
        A link to this editor including all the data so you can continue working on it on a later date.
    </a>
    <a
        class="d-block"
        :href="buildLink"
        target="_blank"
    >
        A link to the build page, share this with your users so they can view the build.
    </a>
    <div>
        You might need to use a URL shortener like <a href="https://shorter.me/">shorter.me</a> as these links can become quite long.
    </div>
   

    <v-tabs
        class="mt-2"
        v-model="activeTab"
        bg-color="background"
        grow
    >
        <v-tab value="general">
            General Info
        </v-tab>
        <v-tab value="gear">
            Gear
        </v-tab>
        <v-tab value="build">
            Build
        </v-tab>
        <v-tab value="notes">
            Notes
        </v-tab>
    </v-tabs>

    <v-tabs-window v-model="activeTab">
        <v-tabs-window-item value="general">
            <v-row dense>
                <!-- Title -->
                <v-col cols="12">
                    <h2>Title</h2>
                    <v-text-field
                        v-model.number="build.title"
                        hide-details
                        density="compact"
                    />
                </v-col>

                <v-col cols="12">
                    <h2>Description</h2>
                    <markdown-editor v-model="build.description" />
                </v-col>
        
                <!-- Videos -->
                <v-col
                    cols="12"
                    md="6"
                >
                    <h2>Video Links</h2>
                    <v-text-field
                        v-for="(_, index) in build.youtubeVideoCodes"
                        :key="index"
                        v-model="build.youtubeVideoCodes[index]"
                        hide-details
                        density="compact"
                    >
                        <template #append>
                            <v-icon
                                color="error"
                                @click="removeYoutubeVideoCode(index)"
                            >
                                mdi-delete
                            </v-icon>
                        </template>
                    </v-text-field>
                    <div class="mt-2 text-center">
                        <v-icon
                            size="32"
                            @click="addYoutubeVideoCode()"
                        >
                            mdi-plus-circle
                        </v-icon>
                        Add video
                    </div>
                </v-col>
            </v-row>
        </v-tabs-window-item>

        <!-- Gear -->
        <v-tabs-window-item value="gear">
            <v-row dense>
                <!-- Armor -->
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <h2>Armor</h2>
                    <v-select
                        v-model="build.armor.weightClass"
                        :items="armorWeightClassOptions"
                        hide-details
                        density="compact"
                    />
                    <v-text-field
                        v-model.number="build.armor.runeId"
                        type="number"
                        hide-details
                        density="compact"
                    />
                    <v-select
                        v-for="(index) in 6"
                        v-model="build.armor.infixes[index - 1]"
                        :key="index"
                        :items="armorInfixOptions"
                        hide-details
                        density="compact"
                    />
                </v-col>

                <!-- Trinkets -->
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <h2>Trinkets</h2>
                    <v-select
                        v-for="(index) in 6"
                        v-model="build.trinkets.infixes[index - 1]"
                        :key="index"
                        :items="trinketInfixOptions"
                        hide-details
                        density="compact"
                    />
                </v-col>

                <!-- Relic, Utility and Food -->
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <h2>Relic</h2>
                    <v-text-field
                        v-model.number="build.relicId"
                        type="number"
                        hide-details
                        density="compact"
                    />
    
                    <h2>Food & Utility</h2>
                    <v-text-field
                        v-model.number="build.foodId"
                        type="number"
                        hide-details
                        density="compact"
                    />
                    <v-text-field
                        v-model.number="build.utilityId"
                        type="number"
                        hide-details
                        density="compact"
                    />
                </v-col>

                <!-- Weapons -->
                <v-col cols="12">
                    <h2>Weapons</h2>
                    <v-row dense>
                        <v-col
                            v-for="(weapon, index) in build.weaponSets"
                            :key="index"
                            cols="12"
                            sm="6"
                        >
                            <weapon-set-selector v-model="build.weaponSets[index]" />
                            <div class="mt-2 text-center">
                                <v-icon
                                    size="32"
                                    color="error"
                                    @click="removeWeaponSet(index)"
                                >
                                    mdi-delete
                                </v-icon>
                                Remove weapon set
                            </div>
                        </v-col>
                        <v-col
                            v-if="build.weaponSets.length < 2"
                            cols="12"
                            sm="6"
                            class="text-center"
                        >
                            <v-icon
                                size="32"
                                @click="addWeaponSet()"
                            >
                                mdi-plus-circle
                            </v-icon>
                            Add weapon set
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-tabs-window-item>

        <!-- Traits & Utility Skills -->
        <v-tabs-window-item value="build">
            <v-row dense>
                <!-- Traits -->
                <v-col
                    cols="12"
                    md="6"
                >
                    <h2>Traits</h2>
                    <trait-line-selector
                        v-for="(traitLine, index) in build.traitLines"
                        :key="index"
                        v-model:trait-line-id="traitLine.id"
                        v-model:trait-ids="traitLine.traitIds"
                    />
                </v-col>

                <!-- Utilities -->
                <v-col
                    cols="12"
                    md="6"
                >
                    <h2>Skills</h2>
                    <v-text-field
                        v-for="(_, index) in build.utilitySkillIds"
                        :key="index"
                        v-model.number="build.utilitySkillIds[index]"
                        type="number"
                        hide-details
                        density="compact"
                    />
                </v-col>
            </v-row>
        </v-tabs-window-item>

        <!-- Notes -->
        <v-tabs-window-item value="notes">
            <v-row dense>
                <v-col cols="12">
                    <h2>Skill Notes</h2>
                    <markdown-editor v-model="build.skillNotes" />
                </v-col>
                <v-col cols="12">
                    <h2>Trait Notes</h2>
                    <markdown-editor v-model="build.traitNotes" />
                </v-col>
                <v-col cols="12">
                    <h2>Rotation Notes</h2>
                    <markdown-editor v-model="build.rotationNotes" />
                </v-col>
            </v-row>
        </v-tabs-window-item>
    </v-tabs-window>
</template>

<script>
import LZString from "lz-string";
import MarkdownEditor from '../../components/markdown/MarkdownEditor.vue';
import { ArmorInfix, TrinketInfix } from '../../enums/infixUpgrade.js';
import ArmorWeightClass from '../../enums/armorWeightClass.js';
import TraitLineSelector from "../../components/build-editor-page/TraitLineSelector.vue";
import WeaponSetSelector from '../../components/build-editor-page/WeaponSetSelector.vue';
import emptyBuildTemplate from '../../../build-template.json';

export default {
    components: {
        MarkdownEditor,
        TraitLineSelector,
        WeaponSetSelector
    },
    data() {
        return {
            ArmorInfix,
            TrinketInfix,

            activeTab: null,
            build: emptyBuildTemplate
        }
    },
    mounted() {
        const searchParameters = new URLSearchParams(window.location.search);

        // TODO: merge this with the empty template instead of overwriting it so new properties are automatically added
        if(searchParameters.has("build")) this.build = JSON.parse(LZString.decompressFromEncodedURIComponent(searchParameters.get("build")));
    },
    computed: {
        armorWeightClassOptions() {
            return Object.entries(ArmorWeightClass).map(([key, value]) => {
                return { title: key, value: value}
            });
        },
        armorInfixOptions() {
            return Object.entries(ArmorInfix).map(([key, value]) => {
                return { title: key, value: value}
            });
        },
        trinketInfixOptions() {
            return Object.entries(TrinketInfix).map(([key, value]) => {
                return { title: key, value: value}
            });
        },

        buildCode() {
            if(this.build === null) return null;
            return LZString.compressToEncodedURIComponent(JSON.stringify(this.build));
        },
        buildEditorLink() {
            return `${window.location.protocol}//${window.location.host}/build-editor?build=${this.buildCode}`;
        },
        buildLink() {
            return `${window.location.protocol}//${window.location.host}/build?build=${this.buildCode}`;
        }
    },
    methods: {
        addYoutubeVideoCode(){
            this.build.youtubeVideoCodes.push(null);
        },
        removeYoutubeVideoCode(index) {
            this.build.youtubeVideoCodes.splice(index, 1);
        },
        addWeaponSet() {
            this.build.weaponSets.push({
                weapons: []
            });
        },
        removeWeaponSet(index) {
            this.build.weaponSets.splice(index, 1);
        }
    }
}
</script>

<style scoped>
</style>