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
            <markdown-renderer :markdown="textRendererText" />
        </v-col>
    </v-row>
</template>

<script>
import MarkdownRenderer from '../components/markdown/MarkdownRenderer.vue';

export default {
    components: {
        MarkdownRenderer
    },
    data() {
        return {
            textRendererText: "[Armor:Harrier:Headgear:Light:24842],[Consumable:67528]Oil->Oil\n[Relic:101268]\n[Skill:30662]\n[Trait:1673]\n[Trinket:Harrier:Ring]\n[Component:84307]\n[Weapon:Harrier:Warhorn:24615,24639,24575]\n[Traitline:37:1487,265,238]\n[Traitline:37:1487,265,238:full]\n# Header 1 [Skill:30662]\n## Header 2\n## Header 2 [Skill:30662]\n### Header 3 [Skill:30662]\n> Blockquote [Skill:30662]\ni> Blockquote [Skill:30662]\nw> Blockquote [Skill:30662]\ne> Blockquote [Skill:30662]\n- List item 1\n- List item 2\n- \n1. List item 1\n1. List item 2\n1. \n***Bold italic***\n**Bold**\n*Italic*\n[Link to header 2](#header-2)\n[Link to google.com](https://google.com)\n| Title | Header |\n| ------ | --------- |\n| Skill | [Skill:30662] Something |\n| Some | [Skill:30662] | No show |\n| [Skill:30662]| -> |"
        }
    }
}
</script>

<style scoped></style>