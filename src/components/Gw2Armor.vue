<template>
    <gw2-tooltip>
        <template #activator="{ props }">
            <gw2-icon
                class="item text-primary"
                @click="searchItemOnWiki()"
                @contextmenu.prevent
                :show-label="!tile"
                :label="`${transformInfixUpgrade(infix)} ${data?.name}`"
                :icon="data?.icon"
                :size="tile ? 56 : 24"
                v-bind="{ ...props, ...gw2IconProps }"
            />
        </template>

        <template #default>
            <gw2-tooltip-container
                :title="`${transformInfixUpgrade(infix)} ${data?.name}`"
            >
                <!-- Useful info -->
                <div>
                    Defense: <span class="text-attribute">{{ data?.details?.defense }}</span>
                </div>
                <div
                    v-for="(attributes, index) in data?.details?.infix_upgrade?.attributes || []"
                    :key="index"
                    class="text-attribute"
                >
                    +{{ attributes.modifier }} {{ transformAttribute(attributes.attribute) }}
                </div>

                <!-- Rune info -->
                <div
                    v-if="runeData !== null"
                    class="mt-4"
                >
                    <gw2-icon
                        class="text-bonus"
                        :icon="runeData.icon"
                        show-label
                        :label="runeData.name"
                    />
                    <div
                        v-for="(bonus, index) in runeData?.details?.bonuses || []"
                        :key="index"
                        class="text-bonus"
                    >
                        ({{ index + 1 }}): {{ bonus }}
                    </div>
                </div>
               

                <!-- Flavor info -->
                <div class="text-faded mt-2">
                    <div>
                        {{ data?.details?.weight_class }}
                    </div>
                    <div>
                        {{ transformArmorType(data?.details?.type) }}
                    </div>
                    <div>
                        Required Level: {{ data?.level }}
                    </div>
                </div>
            </gw2-tooltip-container>
        </template>
    </gw2-tooltip>
</template>

<script>
import { useDataStore } from '../stores/data.js';
import Gw2Tooltip from './Gw2Tooltip.vue';
import Gw2Icon from './Gw2Icon.vue';
import Gw2TooltipContainer from './Gw2TooltipContainer.vue';
import { transformAttribute, transformArmorType, transformInfixUpgrade } from '../services/transformerService.js';
import { ArmorInfix } from '../enums/infixUpgrade.js';
import ArmorType from '../enums/armorType.js';
import ArmorWeightClass from '../enums/armorWeightClass.js';

export default {
    components: {
        Gw2Icon,
        Gw2TooltipContainer,
        Gw2Tooltip
    },
    props: {
        infix: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        weightClass: {
            type: String,
            required: true,
        },
        runeId: {
            type: Number,
            default: null
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
            transformAttribute,
            transformArmorType,
            transformInfixUpgrade,
            
            data: null,
            runeData: null
        }
    },
    mounted() {
        this.dataStore.getItem(this.getItemIdByInfixAndArmorType()).then(data => {
            this.data = data;
        }).catch((error) => {
            console.error(error);
        });

        if(this.runeId !== null) {
            this.dataStore.getItem(this.runeId).then(data => {
                this.runeData = data;
            }).catch((error) => {
                console.error(error);
            });
        }
    },
    methods: {
        getItemIdByInfixAndArmorType() {
            // TODO: add more infix/armor/weight class combinations
            if(this.infix === ArmorInfix.Harrier) {
                if(this.type === ArmorType.Headgear) {
                    if(this.weightClass === ArmorWeightClass.Light) return 85161;
                }
                else if(this.type === ArmorType.Shoulders) {
                    if(this.weightClass === ArmorWeightClass.Light) return 85089;
                }
                else if(this.type === ArmorType.Chest) {
                    if(this.weightClass === ArmorWeightClass.Light) return 85098;
                }
                else if(this.type === ArmorType.Gloves) {
                    if(this.weightClass === ArmorWeightClass.Light) return 85004;
                }
                else if(this.type === ArmorType.Leggings) {
                    if(this.weightClass === ArmorWeightClass.Light) return 84926;
                }
                else if(this.type === ArmorType.Boots) {
                    if(this.weightClass === ArmorWeightClass.Light) return 85317;
                }
            }
            
            return null;
        },
        searchItemOnWiki() {
            window.open(`http://wiki.guildwars2.com/wiki/Special:Search/${this.data.name}`);
        }
    }
}
</script>

<style scoped>
.item {
    cursor: pointer;
}
</style>