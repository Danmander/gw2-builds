<template>
    <template v-if="build !== null">
        <h1>
            <markdown-renderer :markdown="build.title" />
        </h1>
        <container
            v-if="build.description" 
            class="mb-2"
        >
            <markdown-renderer :markdown="build.description" />
        </container>
        <build
            style="width: auto;"
            :armor-weight-class="build.armor.weightClass"
            :armor-infixes="build.armor.infixes"
            :rune-id="build.armor.runeId"
            :trinket-infixes="build.trinkets.infixes"
            :relic-id="build.relicId"
            :weapon-sets="build.weaponSets"
            :utility-skill-ids="build.utilitySkillIds"
            :trait-lines="build.traitLines"
            :food-id="build.foodId"
            :utility-id="build.utilityId"
        >
            <template
                v-if="build.skillNotes"
                #skill-notes
            >
                <expander
                    title="Skill notes"
                    class="mb-2"
                >
                    <markdown-renderer :markdown="build.skillNotes" />
                </expander>
            </template>
            <template
                v-if="build.traitNotes"
                #trait-notes
            >
                <expander
                    title="Trait notes"
                >
                    <markdown-renderer :markdown="build.traitNotes" />
                </expander>
            </template>
            <template
                v-if="build.rotationNotes"
                #rotation
            >
                <container>
                    <markdown-renderer :markdown="build.rotationNotes" />
                </container>
            </template>
            <template
                v-if="build.youtubeVideoCodes"
                #video
            >
                <iframe
                    v-for="(youtubeVideoCode, index) in build.youtubeVideoCodes"
                    :key="index"
                    style="width: 100%; aspect-ratio: 16/9;"
                    class="rounded"
                    :src="`https://www.youtube.com/embed/${youtubeVideoCode}`"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                />
            </template>
        </build>
    </template>
</template>

<script>
import Build from '../../components/layout/Build.vue';
import Expander from '../../components/layout/Expander.vue';
import Container from '../../components/layout/Container.vue';
import MarkdownRenderer from '../../components/markdown/MarkdownRenderer.vue';
import LZString from 'lz-string';

export default {
    components: {
        Build,
        Expander,
        Container,
        MarkdownRenderer
    },
    created() {
        const searchParameters = new URLSearchParams(window.location.search);

        if(this.$route.meta.buildData !== undefined) this.build = JSON.parse(LZString.decompressFromEncodedURIComponent(this.$route.meta.buildData));
        else if(searchParameters.has("build")) this.build = JSON.parse(LZString.decompressFromEncodedURIComponent(searchParameters.get("build")));
    },
    data() {
        return {
            build: null
        }
    },
}
</script>

<style scoped>
</style>