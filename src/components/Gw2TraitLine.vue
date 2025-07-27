<template>
    <div
        v-if="data !== null"
        class="trait-line d-flex flex-row align-center rounded"
        :style="cssData"
    >
        <div class="d-flex flex-column flex-grow-1 align-center">
            <gw2-trait
                :id="data.minor_traits[0]" 
                :gw2-icon-props="gw2IconProps"
            />
        </div>
        <div class="d-flex flex-column flex-grow-1 align-center">
            <gw2-trait
                :id="data.major_traits[0]"
                :gw2-icon-props="{ ...gw2IconProps, inactive: !selectedTraitIds.includes(data.major_traits[0])}"
            />
            <gw2-trait
                :id="data.major_traits[1]"
                :gw2-icon-props="{ ...gw2IconProps, inactive: !selectedTraitIds.includes(data.major_traits[1])}"
            />
            <gw2-trait
                :id="data.major_traits[2]"
                :gw2-icon-props="{ ...gw2IconProps, inactive: !selectedTraitIds.includes(data.major_traits[2])}"
            />
        </div>
        <div class="d-flex flex-column flex-grow-1 align-center">
            <gw2-trait
                :id="data.minor_traits[1]"
                :gw2-icon-props="gw2IconProps"
            />
        </div>
        <div class="d-flex flex-column flex-grow-1 align-center">
            <gw2-trait
                :id="data.major_traits[3]"
                :gw2-icon-props="{ ...gw2IconProps, inactive: !selectedTraitIds.includes(data.major_traits[3])}"
            />
            <gw2-trait
                :id="data.major_traits[4]"
                :gw2-icon-props="{ ...gw2IconProps, inactive: !selectedTraitIds.includes(data.major_traits[4])}"
            />
            <gw2-trait
                :id="data.major_traits[5]"
                :gw2-icon-props="{ ...gw2IconProps, inactive: !selectedTraitIds.includes(data.major_traits[5])}"
            />
        </div>
        <div class="d-flex flex-column flex-grow-1 align-center">
            <gw2-trait
                :id="data.minor_traits[2]"
                :gw2-icon-props="gw2IconProps"
            />
        </div>
        <div class="d-flex flex-column flex-grow-1 align-center">
            <gw2-trait
                :id="data.major_traits[6]"
                :gw2-icon-props="{ ...gw2IconProps, inactive: !selectedTraitIds.includes(data.major_traits[6])}"
            />
            <gw2-trait
                :id="data.major_traits[7]"
                :gw2-icon-props="{ ...gw2IconProps, inactive: !selectedTraitIds.includes(data.major_traits[7])}"
            />
            <gw2-trait
                :id="data.major_traits[8]"
                :gw2-icon-props="{ ...gw2IconProps, inactive: !selectedTraitIds.includes(data.major_traits[8])}"
            />
        </div>
    </div>
</template>

<script>
import { useDataStore } from '../stores/data.js';
import Gw2Trait from './Gw2Trait.vue';

export default {
    components: {
        Gw2Trait
    },
    props: {
        id: {
            type: Number,
            required: true
        },
        selectedTraitIds: {
            type: Array,
            default: () => []
        }
    },
    setup() {
        const dataStore = useDataStore();
        return { dataStore };
    },
    data() {
        return {
            data: null,
            gw2IconProps: { size: 42, showLabel: false, class: "my-1" }
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
        cssData() {
            if(this.data === null) return null;

            return {
                "--background-image-url": `url(${this.data?.background})`,
            };
        }
    }
}
</script>

<style scoped>
.trait-line {
    width: auto;
    max-width: 700px;
    min-height: 144px;
    aspect-ratio: 583/123; /* Size ratio of trait lines in game */
    background-color: black; /* Darkens the image when combined with the trait line image opacity */
    padding-left: 200px; /* 850/240 ratio */
    overflow: hidden;
}

.trait-line::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: var(--background-image-url);
    background-position-x: left;
    background-position-y: bottom;
    background-size: 165%;
    opacity: 0.8;
    pointer-events: none;
}
</style>