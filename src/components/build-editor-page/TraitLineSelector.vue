<template>
    <v-row dense>
        <v-col cols="12">
            <v-autocomplete
                v-model="internalTraitLineId"
                :items="traitLineOptions"
                item-title="name"
                item-value="id"
                hide-details
                density="compact"
            />
        </v-col>
        <template v-if="internalTraitLineId !== null">
            <v-col
                cols="4"
                v-for="(_, index) in 3"
                :key="index"
            >
                <v-select        
                    v-model="internalTraitIds[index]"
                    :items="[{id: null, name: ''}, ...traitOptions.slice(index * 3, (index + 1) * 3)]"
                    item-title="name"
                    item-value="id"
                    hide-details
                    density="compact"
                />
            </v-col>
        </template>
    </v-row>
</template>

<script>
import { useDataStore } from '../../stores/data.js';

export default {
    emits: ['update:traitIds', 'update:traitLineId'],
    setup() {
        const dataStore = useDataStore();
        return { dataStore }
    },
    props: {
        traitLineId: {
            type: Number,
            default: null
        },
        traitIds: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            traitLineOptions: [],
            traitOptions: [],

            internalTraitLineId: this.traitLineId,
            internalTraitIds: this.traitIds
        }
    },
    mounted() {
        this.dataStore.getAllTraitLines().then(response => {
            this.traitLineOptions = [{ id: null, name: "" }, ...response];
            this.retrieveTraitOptions();
        });
    },
    methods: {
        retrieveTraitOptions() {
            if(this.internalTraitLineId === null) return;

            const selectedTraitLine = this.traitLineOptions.find(traitLine => traitLine.id === this.internalTraitLineId);
            if(selectedTraitLine === undefined) return;

            this.traitOptions = [];
            Promise.all(selectedTraitLine.major_traits.map((traitId) => this.dataStore.getTrait(traitId))).then(response => this.traitOptions = response);
        }
    },
    watch: {
        traitLineId(newValue) {
            this.internalTraitLineId = newValue;
            this.retrieveTraitOptions();
        },
        traitIds(newValue) {
            this.internalTraitIds = newValue;
        },
        internalTraitLineId(newValue) {
            this.retrieveTraitOptions();
            this.$emit("update:traitLineId", newValue);
        },
        internalTraitIds: {
            handler: function (newValue) {
                this.$emit("update:traitIds", newValue);
            },
            deep: true
        },
    }
}
</script>

<style scoped>
</style>