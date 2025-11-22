<template>
    <h1>Build Editor</h1>

    <v-row dense>
        <!-- Title -->
        <v-col cols="12">
            <v-text-field
                v-model.number="build.title"
                hide-details
                density="compact"
            />
        </v-col>

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

        <!-- Weapons, Relic, Utility and Food -->
        <v-col
            cols="12"
            sm="6"
            md="4"
        >
            <h2>Weapons</h2>
            TODO
    
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

        <!-- Skills -->
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

        <!-- Video Links -->
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
            </div>
        </v-col>

        <!-- Notes -->
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

    <h1 class="mt-16">
        Links
    </h1>
    <h2>Editor link</h2>
    <a
        :href="buildEditorLink"
        target="_blank"
    >
        {{ buildEditorLink }}
    </a>
    <h2>Build link</h2>
    <a
        :href="buildLink"
        target="_blank"
    >
        {{ buildLink }}
    </a>
</template>

<script>
import LZString from "lz-string";
import MarkdownEditor from '../../components/markdown/MarkdownEditor.vue';
import { ArmorInfix, TrinketInfix } from '../../enums/infixUpgrade.js';
import ArmorWeightClass from '../../enums/armorWeightClass.js';
import WeaponType from '../../enums/weaponType.js';
import TraitLineSelector from "../../components/build-editor-page/TraitLineSelector.vue";

export default {
    components: {
        MarkdownEditor,
        TraitLineSelector
    },
    data() {
        return {
            ArmorInfix,
            TrinketInfix,

            build: {
                title: null,
                armor: {
                    weightClass: null,
                    runeId: null,
                    infixes: [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null
                    ]
                },
                trinkets: {
                    infixes: [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null
                    ]
                },
                weaponSets: [
                    {
                        weapons: [
                            {
                                type: null,
                                infix: null,
                                sigilIds: []
                            },
                            {
                                type: null,
                                infix: null,
                                sigilIds: []
                            }
                        ]
                    }
                ],
                relicId: null,
                foodId: null,
                utilityId: null,
                utilitySkillIds: [
                    null,
                    null,
                    null,
                    null,
                    null
                ],
                traitLines: [
                    {
                        id: null,
                        traitIds: []
                    },
                    {
                        id: null,
                        traitIds: []
                    },
                    {
                        id: null,
                        traitIds: []
                    }
                ],
                skillNotes: null,
                traitNotes: null,
                rotationNotes: null,
                youtubeVideoCodes: []
            }
        }
    },
    mounted() {
        const searchParameters = new URLSearchParams(window.location.search);
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
        weaponTypeOptions() {
            return Object.entries(WeaponType).map(([key, value]) => {
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
        }
    }
}
</script>

<style scoped>
</style>