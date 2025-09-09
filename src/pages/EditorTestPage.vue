<template>
    <v-row dense>
        <v-col cols="6">
            <v-textarea
                v-model="textRendererText"
                variant="outlined"
                auto-grow
                rows="50"
            />
        </v-col>
        <v-col cols="6">
            <text-renderer :text="textRendererText" />
        </v-col>
    </v-row>
</template>

<script>
import TextRenderer from '../components/layout/TextRenderer.vue';

export default {
    components: {
        TextRenderer
    },
    data() {
        return {
            textRendererText: "[Armor:Harrier:Headgear:Light:24842],[Consumable:67528]Oil->Oil,\n[Relic:101268],\n[Skill:30662],\n[Trait:1673],\n[Trinket:Harrier:Ring],\n[Component:84307],\n[Weapon:Harrier:Warhorn:24615,24639,24575],\n[Traitline:37:1487,265,238]"
        }
    }
}
</script>

<style scoped></style>