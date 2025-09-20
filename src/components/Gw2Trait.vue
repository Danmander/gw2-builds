<template>
    <gw2-tooltip :disabled="data === null">
        <template #activator="{ props }">
            <gw2-icon
                class="trait text-primary"
                @click="searchSkillOnWiki()"
                @contextmenu.prevent="showNextSkill()"
                show-label
                :label="data?.name"
                :icon="data?.icon"
                :hexagon-icon="data?.slot === TraitSlot.Minor"
                v-bind="{ ...props, ...gw2IconProps }"
            />
        </template>

        <template #default>
            <gw2-skill-and-trait-tooltip
                :title="data?.name"
                :description="data?.description"
                :facts="data?.facts"
            >
                <template #bottom>
                    <!-- Attunement specific skills have no other tell than coming in a pair of 4 so we need to do some magic here -->
                    <div v-if="sortedSkills !== null && sortedSkills.length === 4">
                        <div
                            v-for="(attunement, index) in ['Fire', 'Water', 'Air', 'Earth']"
                            :key="index"
                            class="text-faded"
                        >
                            <gw2-icon
                                :icon="getAttunementIcon(attunement)"
                                :size="32"
                            />
                            <gw2-icon
                                :icon="sortedSkills[index]?.icon"
                                show-label
                                :label="sortedSkills[index]?.name"
                                :size="32"
                            />
                        </div>
                    </div>
                    <div
                        v-if="data?.skills !== undefined && data.skills.length > 1"
                        class="mt-4 text-faded"
                    >
                        <!-- TODO: data.skills -->
                        Mouse 2: Show more info ({{ shownSkillIndex + 1 }} of {{ data.skills.length }})
                    </div>
                </template>
            </gw2-skill-and-trait-tooltip>
            <gw2-skill-and-trait-tooltip
                v-if="data?.skills !== undefined"
                class="mt-2"
                :title="data.skills[shownSkillIndex].name"
                :description="data.skills[shownSkillIndex].description"
                :facts="data.skills[shownSkillIndex].facts"
                :tooltip-container-props="{ borderColor: 'tooltip-inactive-border'}"
            />
        </template>
    </gw2-tooltip>
</template>

<script>
import { useDataStore } from '../stores/data.js';
import Gw2Tooltip from './Gw2Tooltip.vue';
import Gw2SkillAndTraitTooltip from './Gw2SkillAndTraitTooltip.vue';
import Gw2Icon from './Gw2Icon.vue';
import TraitSlot from '../enums/traitSlot.js';
import fireAttunementIcon from '../assets/images/fire-attunement.png';
import waterAttunementIcon from '../assets/images/water-attunement.png';
import airAttunementIcon from '../assets/images/air-attunement.png';
import earthAttunementIcon from '../assets/images/earth-attunement.png';

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
        gw2IconProps: {
            type: Object,
            default: null
        }
    },
    setup() {
        const dataStore = useDataStore();
        return { dataStore };
    },
    data() {
        return {
            TraitSlot,

            data: null,
            shownSkillIndex: 0
        }
    },
    mounted() {
        this.dataStore.getTrait(this.id).then(data => {
            this.data = data;
        }).catch((error) => {
            console.error(error);
        });
    },
    computed: {
        sortedSkills() {
            if(this.data?.skills === undefined) return null;

            return JSON.parse(JSON.stringify(this.data.skills)).sort((a, b) => {
                if(a?.attunement !== undefined && b?.attunement !== undefined) {
                    const attunementOrder = ["Fire", "Water", "Air", "Earth"];
                        
                    // Sort based on attunement since the api sometimes gives these in the wrong order
                    let aValue = attunementOrder.findIndex((value) => value === a.attunement);
                    let bValue = attunementOrder.findIndex((value) => value === b.attunement);
                    return aValue - bValue;
                } else {
                    return 0;
                }
            });
        }
    },
    methods: {
        searchSkillOnWiki() {
            if(this.data === null) return;
            window.open(`https://wiki.guildwars2.com/wiki/Special:Search/${this.data.name}`);
        },
        showNextSkill() {
            if(this.data.skills === undefined) return;
            this.shownSkillIndex = (this.shownSkillIndex + 1) % this.data.skills.length;
        },
        getAttunementIcon(subskillForm) {
            if(subskillForm === "Fire") return fireAttunementIcon;
            else if(subskillForm === "Water") return waterAttunementIcon;
            else if(subskillForm === "Air") return airAttunementIcon;
            else if(subskillForm === "Earth") return earthAttunementIcon;
            else return null;
        }
    }
}
</script>

<style scoped>
.trait {
    cursor: pointer;
}
</style>