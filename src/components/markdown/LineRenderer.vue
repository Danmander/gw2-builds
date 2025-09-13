<template>
    <component
        class="line"
        :is="parsedData.wrapperType"
        v-bind="parsedData.props"
    >
        <elements-renderer :markdown="parsedData.content" />
    </component>
</template>

<script>
import { VAlert } from 'vuetify/components';
import ElementsRenderer from './ElementsRenderer.vue';

export default {
    components: {
        ElementsRenderer
    },
    props: {
        markdown: {
            type: String,
            required: true
        }
    },
    computed: {
        parsedData() {
            const data = {
                wrapperType: "div",
                props: {},
                content: this.markdown
            };

            // Figure out which wrapper element the current data.content needs (these are inspired by markdown)
            if(data.content.startsWith("# ")) {
                data.content = data.content.replace("# ", "");
                data.wrapperType = "h1";

                // We want to give headers an id so that links can link directly to these headers
                data.props.id = data.content.toLowerCase().replaceAll(" ", "-");
            } else if(data.content.startsWith("## ")) {
                data.content = data.content.replace("## ", "");
                data.wrapperType = "h2";

                // We want to give headers an id so that links can link directly to these headers
                data.props.id = data.content.toLowerCase().replaceAll(" ", "-");
            } else if(data.content.startsWith("### ")) {
                data.content = data.content.replace("### ", "");
                data.wrapperType = "h3";

                // We want to give headers an id so that links can link directly to these headers
                data.props.id = data.content.toLowerCase().replaceAll(" ", "-");
            } else if(data.content.startsWith("> ")) {
                data.content = data.content.replace("> ", "");
                data.wrapperType = VAlert;
                data.props.class = "blockquote-border";
                data.props.variant = "tonal";
                data.props.density = "compact";
            } else if(data.content.startsWith("i> ")) {
                data.content = data.content.replace("i> ", "");
                data.wrapperType = VAlert;
                data.props.variant = "tonal";
                data.props.density = "compact";
                data.props.type = "info";
            } else if(data.content.startsWith("w> ")) {
                data.content = data.content.replace("w> ", "");
                data.wrapperType = VAlert;
                data.props.variant = "tonal";
                data.props.density = "compact";
                data.props.type = "warning";
            } else if(data.content.startsWith("e> ")) {
                data.content = data.content.replace("e> ", "");
                data.wrapperType = VAlert;
                data.props.variant = "tonal";
                data.props.density = "compact";
                data.props.type = "error";
            }

            return data;
        }
    }
}
</script>

<style scoped>
.line {
    /* We want to make sure an empty line isn't automatically collapsed */
    min-height: 25px;
}

.blockquote-border {
    border-left: 2px solid currentColor;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
</style>