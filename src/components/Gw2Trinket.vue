<template>
    <gw2-tooltip :disabled="data === null">
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
                <div
                    v-for="(attributes, index) in attributeData || []"
                    :key="index"
                    class="text-attribute"
                >
                    +{{ attributes.modifier }} {{ transformAttribute(attributes.attribute) }}
                </div>

                <!-- Flavor info -->
                <div class="text-faded mt-2">
                    <div>
                        {{ transformWeaponType(data?.details?.type) }}
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
import { transformAttribute, transformInfixUpgrade, transformWeaponType } from '../services/transformerService.js';
import TrinketType from '../enums/trinketType.js';

export default {
    components: {
        Gw2Icon,
        Gw2TooltipContainer,
        Gw2Tooltip
    },
    props: {
        type: {
            type: String,
            required: true
        },
        infix: {
            type: Number,
            required: true
        },
        tile: {
            type: Boolean,
            default: false
        },
        alternativeVariant: {
            type: Number,
            default: 0
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
            transformWeaponType,
            transformInfixUpgrade,
            
            data: null,
            attributeData: null,
        }
    },
    mounted() {
        this.dataStore.getItem(this.getItemIdByInfixAndTrinketType()).then(data => {
            this.data = data;

            // Retrieve the stats for the item
            this.dataStore.getItemStat(this.infix).then(itemStatData => {
                this.attributeData = [];
                for (let i = 0; i < itemStatData.attributes.length; i++) {
                    const itemStatAttribute = itemStatData.attributes[i];
                    this.attributeData.push({
                        attribute: itemStatAttribute.attribute,
                        modifier: Math.round(itemStatAttribute.multiplier * this.data.details.attribute_adjustment + itemStatAttribute.value)
                    });
                }
            })
        }).catch((error) => {
            console.error(error);
        });
    },
    methods: {
        getItemIdByInfixAndTrinketType() {
            // TODO: add more infix/weapon combinations
            if(this.type === TrinketType.Backpack) return 79830;
            else if(this.type === TrinketType.Accessory) return this.alternativeVariant ? 79444 : 79745;
            else if(this.type === TrinketType.Amulet) return 81169;
            else if(this.type === TrinketType.Ring) return this.alternativeVariant ? 81024 : 79712;
            
            return null;
        },
        searchItemOnWiki() {
            if(this.data === null) return;
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