<template>
    <gw2-tooltip :disabled="data === null">
        <template #activator="{ props }">
            <gw2-icon
                class="item text-primary"
                @click="searchSkillOnWiki()"
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
                :description="data?.description ?? null"
            >
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
import { transformItemType } from '../services/transformerService.js';

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
            transformItemType,
            
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
        searchSkillOnWiki() {
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