<template>
    <gw2-icon
        class="text-primary"
        @contextmenu.prevent
        :show-label="!tile"
        :label="label === null ? iconInfo?.defaultLabel : label"
        :icon="iconInfo?.iconSrc"
        :size="tile ? 56 : 24"
        v-bind="{ ...props, ...gw2IconProps }"
    />
</template>

<script>
import { useDataStore } from '../stores/data.js';
import Gw2Icon from './Gw2Icon.vue';

import customIcons from '../assets/custom-icons.json';

export default {
    components: {
        Gw2Icon
    },
    props: {
        id: {
            type: Number,
            required: true,
        },
        label: {
            type: String,
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
            data: null
        }
    },
    computed: {
        iconInfo() {
            const key = this.id.toLowerCase();
            if(customIcons[key] === undefined) return null;

            return customIcons[key];
        }
    }
}
</script>

<style scoped>
</style>