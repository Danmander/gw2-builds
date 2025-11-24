<template>
    <div>
        <v-select
            v-model="category"
            :items="categoryOptions"
            hide-details
            density="compact"
            class="mb-2"
        />
        <v-row dense>
            <v-col>
                <weapon-selector
                    v-if="modelValue.weapons.length > 0"
                    :model-value="modelValue.weapons[0]"
                    @update:model-value="(value) => updateModelValueWeapon(0, value)"
                />
            </v-col>
            <v-col v-if="modelValue.weapons.length > 1">
                <weapon-selector
                    :model-value="modelValue.weapons[1]"
                    @update:model-value="(value) => updateModelValueWeapon(1, value)"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import WeaponSelector from './WeaponSelector.vue';

export default {
    components: {
        WeaponSelector
    },
    emits: ['update:model-value'],
    props: {
        modelValue: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            categoryOptions: [
                { title: 'None', value: 0 },
                { title: 'Two handed', value: 1 },
                { title: 'Dual wield', value: 2 }
            ]
        }
    },
    computed: {
        category: {
            get() {
                return this.modelValue.weapons.length;
            },
            set(value) {
                const newModelValue = JSON.parse(JSON.stringify(this.modelValue));

                while(newModelValue.weapons.length < value) {
                    newModelValue.weapons.push({
                        "type": null,
                        "infix": null,
                        "sigilIds": []
                    })
                }
                while(newModelValue.weapons.length > value) {
                    newModelValue.weapons.pop();
                }

                this.$emit('update:model-value', newModelValue);
            }
        }
    },
    methods: {
        updateModelValueWeapon(index, value){
            const newModelValue = JSON.parse(JSON.stringify(this.modelValue));
            newModelValue.weapons[index] = value;
            this.$emit("update:model-value", newModelValue);
        }
    }
}
</script>

<style scoped>
</style>