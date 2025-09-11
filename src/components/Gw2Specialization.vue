<template>
    <gw2-tooltip :disabled="data === null || !tile">
        <template #activator="{ props }">
            <gw2-icon
                class="specialization text-primary"
                @click="searchSkillOnWiki()"
                @contextmenu.prevent
                :show-label="!tile"
                :label="label"
                :icon="data?.icon"
                :size="tile ? 56 : 24"
                v-bind="{ ...props, ...gw2IconProps }"
            />
        </template>

        <template #default>
            <gw2-tooltip-container
                :title="`${label} Trait Line`"
            />
        </template>
    </gw2-tooltip>
</template>

<script>
import { useDataStore } from '../stores/data.js';
import Gw2Tooltip from './Gw2Tooltip.vue';
import Gw2Icon from './Gw2Icon.vue';
import Gw2TooltipContainer from './Gw2TooltipContainer.vue';

export default {
    components: {
        Gw2Icon,
        Gw2Tooltip,
        Gw2TooltipContainer,
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
            default: null
        }
    },
    setup() {
        const dataStore = useDataStore();
        return { dataStore };
    },
    data() {
        return {
            data: null
        }
    },
    mounted() {
        this.dataStore.getTraitLine(this.id).then(data => {
            this.data = data;
        }).catch((error) => {
            console.error(error);
        });
    },
    computed: {
        label() {
            if(this.data?.name === undefined) return null;

            return `${this.data.name} Trait Line`;
        }
    },
    methods: {
        searchSkillOnWiki() {
            if(this.data === null) return;
            window.open(`http://wiki.guildwars2.com/wiki/Special:Search/${this.data.name}`);
        },
    }
}
</script>

<style scoped>
.specialization {
    cursor: pointer;
}
</style>