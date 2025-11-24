<template>
    <div>
        <v-select
            :model-value="modelValue.infix"
            @update:model-value="(value) => updateModelValue('infix', value)"
            :items="infixOptions"
            hide-details
            density="compact"
        />
        <v-select
            :model-value="modelValue.type"
            @update:model-value="(value) => updateModelValue('type', value)"
            :items="typeOptions"
            hide-details
            density="compact"
        />

        <v-text-field
            v-for="(sigilId, index) in modelValue.sigilIds"
            :key="index"
            :model-value="sigilId"
            @update:model-value="(value) => updateSigil(index, value)"
            hide-details
            density="compact"
        >
            <template #append>
                <v-icon
                    color="error"
                    @click="removeSigil(index)"
                >
                    mdi-delete
                </v-icon>
            </template>
        </v-text-field>
        <div
            v-if="modelValue.sigilIds.length < 2"
            class="mt-2 text-center"
        >
            <v-icon
                size="32"
                @click="addSigil()"
            >
                mdi-plus-circle
            </v-icon>
            Add sigil
        </div>
    </div>
</template>

<script>
import { WeaponInfix } from '../../enums/infixUpgrade.js';
import WeaponType from '../../enums/weaponType.js';

export default {
    emits: ['update:model-value'],
    props: {
        modelValue: {
            type: Object,
            required: true
        }
    },
    computed: {
        typeOptions() {
            return Object.entries(WeaponType).map(([key, value]) => {
                return { title: key, value: value}
            });
        },
        infixOptions() {
            return Object.entries(WeaponInfix).map(([key, value]) => {
                return { title: key, value: value}
            });
        },
    },
    methods: {
        updateModelValue(key, value){
            this.$emit("update:model-value", {...this.modelValue, [key]: value});
        },
        addSigil() {
            const newModelValue = JSON.parse(JSON.stringify(this.modelValue));
            newModelValue.sigilIds.push(null);
            this.$emit("update:model-value", newModelValue);
        },
        updateSigil(index, value) {
            const newModelValue = JSON.parse(JSON.stringify(this.modelValue));

            // Make sure the sigil id is an int
            if(value === "") value = null;
            else if(value !== null) value = Number.parseInt(value);

            newModelValue.sigilIds[index] = value;
            this.$emit("update:model-value", newModelValue);
        },
        removeSigil(index) {
            const newModelValue = JSON.parse(JSON.stringify(this.modelValue));
            newModelValue.sigilIds.splice(index, 1);
            this.$emit("update:model-value", newModelValue);
        }
    }
}
</script>

<style scoped>
</style>