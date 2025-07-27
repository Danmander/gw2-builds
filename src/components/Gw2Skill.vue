<template>
    <gw2-tooltip>
        <template #activator="{ props }">
            <gw2-icon
                class="skill text-primary"
                @click="searchSkillOnWiki()"
                @contextmenu.prevent="showNextSubkill()"
                :show-label="!tile"
                :label="data?.name"
                :icon="data?.icon"
                :size="tile ? 56 : 24"
                v-bind="{ ...props, ...gw2IconProps }"
            />
        </template>

        <template #default>
            <gw2-skill-and-trait-tooltip
                :title="data?.name"
                :description="data?.description"
                :facts="data?.facts"
                :subtitle="`(${defaultKeybind})`"
            >
                <template #bottom>
                    <div
                        v-for="(subskillData, index) in subskillsData"
                        :key="index"
                        class="text-faded"
                    >
                        <gw2-icon
                            :icon="getFormIcon(subskillData.form)"
                            :size="32"
                        />
                        <gw2-icon
                            :icon="subskillData.icon"
                            show-label
                            :label="subskillData.name"
                            :size="32"
                        />
                    </div>
                    <div
                        v-if="subskillsData !== null && subskillsData.length > 1"
                        class="mt-4 text-faded"
                    >
                        Mouse 2: Show more info ({{ shownSubskillIndex + 1 }} of {{ data.subskills.length }})
                    </div>
                </template>
            </gw2-skill-and-trait-tooltip>

            <!-- Subskills -->
            <gw2-skill-and-trait-tooltip
                v-if="shownSubskill !== null"
                class="mt-2"
                :title="shownSubskill.name"
                :subtitle="`(${defaultKeybind})`"
                :description="shownSubskill.description"
                :facts="shownSubskill.facts"
                :tooltip-container-props="{ borderColor: 'tooltip-inactive-border'}"
            />

            <!-- Flip skill of subskills -->
            <gw2-skill-and-trait-tooltip
                v-if="shownSubskill !== null && shownSubskill?.flipSkillData !== undefined"
                class="mt-2"
                :title="subskillsData[shownSubskillIndex].flipSkillData.name"
                :subtitle="`(${defaultKeybind} - Flip Skill)`"
                :description="subskillsData[shownSubskillIndex].flipSkillData.description"
                :facts="subskillsData[shownSubskillIndex].flipSkillData.facts"
                :tooltip-container-props="{ borderColor: 'tooltip-inactive-border'}"
            />

            <!-- Flip skill -->
            <gw2-skill-and-trait-tooltip
                v-if="flipSkillData !== null"
                class="mt-2"
                :title="flipSkillData.name"
                :subtitle="`(${defaultKeybind} - Flip Skill)`"
                :description="flipSkillData.description"
                :facts="flipSkillData.facts"
                :tooltip-container-props="{ borderColor: 'tooltip-inactive-border'}"
            />
        </template>
    </gw2-tooltip>
</template>

<script>
import SkillSlot from '../enums/skillSlot.js';
import { useDataStore } from '../stores/data.js';
import Gw2Tooltip from './Gw2Tooltip.vue';
import Gw2SkillAndTraitTooltip from './Gw2SkillAndTraitTooltip.vue';
import Gw2Icon from './Gw2Icon.vue';
import fireAttunementIcon from '../assets/images/fire-attunement.png';
import waterAttunementIcon from '../assets/images/water-attunement.png';
import airAttunementIcon from '../assets/images/air-attunement.png';
import earthAttunementIcon from '../assets/images/earth-attunement.png';
import celestialAvatarIcon from '../assets/images/celestial-avatar.png';
import emptyIcon from '../assets/images/empty.png';

export default {
    components: {
        Gw2Icon,
        Gw2SkillAndTraitTooltip,
        Gw2Tooltip
    },
    props: {
        id: {
            type: Number,
            required: true,
        },
        tile: {
            type: Boolean,
            default: false
        },
        gw2IconProps: {
            type: Object,
            default: () => {}
        }
    },
    setup() {
        const dataStore = useDataStore();
        return { dataStore };
    },
    data() {
        return {
            data: null,

            subskillsData: null,
            shownSubskillIndex: 0,

            flipSkillData: null
        }
    },
    mounted() {
        if(this.id === null) return;
        this.dataStore.getSkill(this.id).then(data => {
            this.data = data;

            if(this.data.flip_skill !== undefined) {
                this.dataStore.getSkill(this.data.flip_skill).then(flipSkillData => {
                    this.flipSkillData = flipSkillData;
                }).catch((error) => {
                    console.error(error);
                });
            }

            if(this.data.subskills !== undefined) {
                this.subskillsData = [];
                this.data.subskills.sort((a, b) => {
                    if(a?.attunement !== undefined && b?.attunement !== undefined) {
                        const attunementOrder = ["Fire", "Water", "Air", "Earth"];
                        
                        // Sort based on attunement since the api sometimes gives these in the wrong order
                        let aValue = attunementOrder.findIndex((value) => value === a.attunement);
                        let bValue = attunementOrder.findIndex((value) => value === b.attunement);
                        return aValue - bValue;
                    } else {
                        return 0;
                    }
                }).forEach((subskill, index) => {
                    this.dataStore.getSkill(subskill.id).then(subskillData => {
                        // Add the state of in which the subskill needs to be used
                        if(subskill?.form !== undefined) subskillData.form = subskill.form;
                        else if(subskill?.attunement !== undefined) subskillData.form = subskill.attunement;

                        // Set the subskill info
                        this.subskillsData[index] = subskillData;

                        // Load in the flip skill of the subskills
                        if(subskillData.flip_skill !== undefined) {
                            this.dataStore.getSkill(subskillData.flip_skill).then(flipSkillData => {
                                this.subskillsData[index].flipSkillData = flipSkillData;
                            }).catch((error) => {
                                console.error(error);
                            });
                        }
                    }).catch((error) => {
                        console.error(error);
                    });
                });
            }
            
        }).catch((error) => {
            console.error(error);
        });
    },
    computed: {
        defaultKeybind() {
            if(this.data === null) return null;
            if(this.data.slot === null) return null;

            // TODO: transform weapon type
            if(this.data.slot === SkillSlot.Weapon1) return `${this.data.weapon_type} 1`;
            else if(this.data.slot === SkillSlot.Weapon2) return `${this.data.weapon_type} 2`;
            else if(this.data.slot === SkillSlot.Weapon3) return `${this.data.weapon_type} 3`;
            else if(this.data.slot === SkillSlot.Weapon4) return `${this.data.weapon_type} 4`;
            else if(this.data.slot === SkillSlot.Weapon5) return `${this.data.weapon_type} 5`;
            else if(this.data.slot === SkillSlot.Profession1) return "F1";
            else if(this.data.slot === SkillSlot.Profession2) return "F2";
            else if(this.data.slot === SkillSlot.Profession3) return "F3";
            else if(this.data.slot === SkillSlot.Profession4) return "F4";
            else if(this.data.slot === SkillSlot.Profession5) return "F5";
            else if(this.data.slot === SkillSlot.Heal) return "Heal";
            else if(this.data.slot === SkillSlot.Utility) return "Utility";
            else if(this.data.slot === SkillSlot.Elite) return "Elite";
            else return null;
        },
        shownSubskill() {
            if(this.subskillsData === null) return null;
            if(this.subskillsData.length === 0) return null;
            return this.subskillsData[this.shownSubskillIndex];
        }
    },
    methods: {
        searchSkillOnWiki() {
            window.open(`http://wiki.guildwars2.com/wiki/Special:Search/${this.data.name}`);
        },
        showNextSubkill() {
            if(this.data.subskills === undefined) return;
            this.shownSubskillIndex = (this.shownSubskillIndex + 1) % this.data.subskills.length;
        },
        getFormIcon(subskillForm) {
            if(subskillForm === "Fire") return fireAttunementIcon;
            else if(subskillForm === "Water") return waterAttunementIcon;
            else if(subskillForm === "Air") return airAttunementIcon;
            else if(subskillForm === "Earth") return earthAttunementIcon;
            else if(subskillForm === "CelestialAvatar") return celestialAvatarIcon;
            else return emptyIcon;
        }
    }
}
</script>

<style scoped>
.skill {
    cursor: pointer;
}
</style>