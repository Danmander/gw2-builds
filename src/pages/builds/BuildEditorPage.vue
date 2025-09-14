<template>
    <h1>Build Editor</h1>

    <h2>Armor</h2>
    <v-select
        v-model="build.armor.weightClass"
        :items="armorWeightClassOptions"
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

    <h2>Trinkets</h2>
    TODO
    
    <h2>Weapons</h2>
    TODO
    
    <h2>Relic</h2>
    TODO
    
    <h2>Food & Utility</h2>
    TODO

    <h2>Traits</h2>
    TODO

    <h2>Skills</h2>
    TODO

    <h2>Skill Notes</h2>
    <markdown-editor v-model="build.skillNotes" />

    <h2>Trait Notes</h2>
    <markdown-editor v-model="build.traitNotes" />
    
    <h2>Rotation Notes</h2>
    <markdown-editor v-model="build.rotationNotes" />

    <h1 class="mt-16">
        Debug info
    </h1>
    {{ build }}
    <hr>
    {{ buildCode }}
    <hr>
    {{ buildLink }}
    <hr>
</template>

<script>
import LZString from "lz-string";
import MarkdownEditor from '../../components/markdown/MarkdownEditor.vue';
import { ArmorInfix, TrinketInfix } from '../../enums/infixUpgrade.js';
import ArmorWeightClass from '../../enums/armorWeightClass.js';
import WeaponType from '../../enums/weaponType.js';

export default {
    components: {
        MarkdownEditor
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
                    }
                ],
                skillNotes: null,
                traitNotes: null,
                rotationNotes: null,
                youtubeVideoCodes: []
            }
        }
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
        buildLink() {
            return `https://${window.location.host}/build?build=${this.buildCode}`;
        }
    }
}
</script>

<style scoped>
</style>