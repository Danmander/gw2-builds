<template>
    <component :is="listRootElementType">
        <li
            v-for="(item, index) in items"
            :key="index"
            :class="{ 'mt-1': index !== 0 }"
        >
            <span class="prefix">
                <template v-if="type === 'ordered'">{{ index + 1 }}.</template>
                <template v-else><v-icon>mdi-circle-medium</v-icon></template>
            </span>
            <elements-renderer :markdown="item" />
        </li>
    </component>
</template>

<script>
import ElementsRenderer from './ElementsRenderer.vue';

export default {
    components: {
        ElementsRenderer
    },
    props: {
        markdown: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: "ordered",
            validator: (value) => value === "ordered" || value === "unordered"
        }
    },
    computed: {
        items() {
            return this.markdown.split("\n").filter((item) => {
                return item !== "";
            }).map((item)=> {
                const match = item.match(/^(?:-|[0-9]+\.) (.*)?$/);
                return match[1] === undefined ? "" : match[1];
            });
        },
        listRootElementType() {
            return this.type === "ordered" ? "ol" : "ul";
        }
    },
}
</script>

<style scoped>
ul, ol {
    list-style: none;
}

li {
    padding-left: 24px;

    /* We want to make sure an empty list item doesn't shift the item style/icon at the front */
    min-height: 25px;
}

.prefix {
    position: absolute;
    left: 0px;
    text-align: right;
    width: 20px;
}

ol .prefix {
    /* The prefixes are 21px high so we need to offset them by 2px to align them properly */
    top: 2px;
}
</style>