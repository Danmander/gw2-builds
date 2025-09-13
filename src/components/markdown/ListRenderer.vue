<template>
    <component :is="listRootElementType">
        <li
            v-for="(item, index) in items"
            :key="index"
        >
            <span class="item">
                <elements-renderer :markdown="item" />
            </span>
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
                console.log(item, match);
                return match[1] === undefined ? "" : match[1];
            });
        },
        listRootElementType() {
            return this.type === "ordered" ? "ol" : "ul";
        }
    }
}
</script>

<style scoped>
li {
    list-style-position: inside;

    /* We want to make sure an empty list item doesn't shift the item style/icon at the front */
    min-height: 25px;
}

li::marker {
    vertical-align: middle;
}

.item {
    display: inline-block;
    vertical-align: text-bottom;

    /* We want to make sure an empty list item doesn't shift the item style/icon at the front */
    min-height: 25px;
}
</style>