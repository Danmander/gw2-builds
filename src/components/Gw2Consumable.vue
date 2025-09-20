<template>
    <gw2-tooltip :disabled="data === null">
        <template #activator="{ props }">
            <gw2-icon
                class="item text-primary"
                @click="searchItemOnWiki()"
                @contextmenu.prevent
                :show-label="!tile"
                :label="data?.name"
                :icon="data?.icon"
                :size="tile ? 56 : 24"
                v-bind="{ ...props, ...gw2IconProps }"
            />
        </template>

        <template #default>
            <gw2-tooltip-container
                :title="data?.name"
            >
                <!-- Useful info -->
                <div>
                    Double-click to consume.
                </div>

                <div class="d-flex align-top">
                    <span>
                        <img
                            v-if="data?.details?.icon"
                            class="icon mr-1"
                            :src="data?.details?.icon"
                        > 
                        <div
                            v-if="data?.details?.apply_count > 1"
                            class="count"
                        >
                            {{ data.details.apply_count }}
                        </div>
                    </span>
        
                    <span class="text-faded">
                        {{ data?.details?.name }}
                        <span v-if="data?.details?.duration_ms">
                            ({{ data?.details?.duration_ms / 1000 / 60 }}m):
                        </span>
                        <div class="white-space-pre-line">
                            {{ data?.details?.description }}
                        </div>
                    </span>
                </div>

                <!-- Flavor info -->
                <div class="text-faded mt-2">
                    <div>
                        {{ transformItemType(data?.type) }}
                    </div>
                    <div v-if="data?.level !== undefined && data.level > 0">
                        Required Level: {{ data.level }}
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
import { transformAttribute, transformItemType, transformArmorType } from '../services/transformerService.js';

export default {
    components: {
        Gw2Icon,
        Gw2TooltipContainer,
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
            transformAttribute,
            transformItemType,
            transformArmorType,
            
            data: null
        }
    },
    mounted() {
        this.dataStore.getItem(this.id).then(data => {
            this.data = data;
        }).catch((error) => {
            console.error(error);
        });
    },
    methods: {
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

.icon {
    height: 32px;
    width: 32px;
    aspect-ratio: 1/1;
    vertical-align: middle;
}

.count {
    position: absolute;
    right: 4px;
    bottom: -6px;
    z-index: 1;
}
</style>