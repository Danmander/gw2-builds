<template>
    <div class="text-renderer d-flex-inline">
        <template
            v-for="(line, index) in lines"
            :key="index"
        >
            <table-renderer
                v-if="line[1] !== undefined"
                :markdown="line[1]"
            />
            <list-renderer
                v-else-if="line[2] !== undefined"
                :markdown="line[2]"
                type="unordered"
            />
            <list-renderer
                v-else-if="line[3] !== undefined"
                :markdown="line[3]"
                type="ordered"
            />
            <line-renderer
                v-else-if="line[4] !== undefined"
                :markdown="line[4]"
            />
        </template>
    </div>
</template>

<script>
import LineRenderer from '../markdown/LineRenderer.vue';
import ListRenderer from './ListRenderer.vue';
import TableRenderer from './TableRenderer.vue';

export default {
    components: {
        LineRenderer,
        ListRenderer,
        TableRenderer
    },
    props: {
        markdown: {
            type: String,
            default: ""
        }
    },
    computed: {
        lines() {
            // We add a \n to the end of the text so we can always assume a line ends with \n which makes it easier to regex
            // ((?:\|(?:[^|]+\|)*\n)+) is a markdown table
            // ((?:- [^\n]+\n)+) is a unordered list
            // ((?:[0-9]+\. [^\n]+\n)+) is an ordered list
            // (?:([^\n]*)\n) is any old text
            return [...((this.markdown ? this.markdown : "").trim() + "\n").matchAll(/((?:\|(?:[^|]+\|)*\n)+)|((?:- [^\n]*\n)+)|((?:[0-9]+\. [^\n]*\n)+)|(?:([^\n]*)\n)/gi)];
        },
    }
}
</script>

<style scoped>
.text-renderer:deep(.vertical-align-middle) {
    vertical-align: middle;
}
</style>