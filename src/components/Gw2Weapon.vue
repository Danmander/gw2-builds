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
                <div>
                    Weapon Strength: <span class="text-attribute">{{ data?.details?.min_power }} - {{ data?.details?.max_power }}</span>
                </div>
                <div v-if="data?.details?.defense !== undefined && data.details.defense > 0">
                    Defense: <span class="text-attribute">{{ data.details.defense }}</span>
                </div>
                <div
                    v-for="(attributes, index) in data?.details?.infix_upgrade?.attributes || []"
                    :key="index"
                    class="text-attribute"
                >
                    +{{ attributes.modifier }} {{ transformAttribute(attributes.attribute) }}
                </div>

                <!-- Sigil info -->
                <div
                    v-for="(sigilData, index) in sigilsData"
                    :key="index"
                    class="mt-4"
                >
                    <gw2-icon
                        class="text-bonus"
                        :icon="sigilData.icon"
                        show-label
                        :label="sigilData.name"
                    />
                    <div class="text-bonus">
                        {{ sigilData?.details?.infix_upgrade?.buff?.description }}
                    </div>
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
import { WeaponInfix } from '../enums/infixUpgrade.js';
import WeaponType from '../enums/weaponType.js';

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
        sigilIds: {
            type: Array,
            default: () => []
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
            transformWeaponType,
            transformInfixUpgrade,
            
            data: null,
            sigilsData: []
        }
    },
    mounted() {
        this.dataStore.getItem(this.getItemIdByInfixAndWeaponType()).then(data => {
            this.data = data;
        }).catch((error) => {
            console.error(error);
        });

        this.sigilIds.forEach((sigilId, index) => {
            this.dataStore.getItem(sigilId).then(data => {
                this.sigilsData[index] = data;
            }).catch((error) => {
                console.error(error);
            });
        });
    },
    methods: {
        getItemIdByInfixAndWeaponType() {
            // TODO: add more infix/weapon combinations
            if(this.infix === WeaponInfix.Harrier) {
                if(this.type === WeaponType.Dagger) return 85051;
                else if(this.type === WeaponType.Pistol) return 84878;
                else if(this.type === WeaponType.Scepter) return 85027;
                else if(this.type === WeaponType.Spear) return 85131;
                else if(this.type === WeaponType.Warhorn) return 84973;
            }
            
            return null;
        },
        searchItemOnWiki() {
            if(this.data === null) return;
            window.open(`https://wiki.guildwars2.com/wiki/Special:Search/${this.data.name}`);
        }
    }
}
</script>

<style scoped>
.item {
    cursor: pointer;
}
</style>