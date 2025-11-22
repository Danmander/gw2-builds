<template>
    <div class="bg-surface text-on-surface rounded">
        <div>
            <v-btn-toggle
                v-model="previewColumnWidth"
                :rounded="0"
                density="compact"
                group
            >
                <v-btn :value="0">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn :value="6">
                    <v-icon>mdi-pencil</v-icon>
                    +
                    <v-icon>mdi-eye</v-icon>
                </v-btn>
                <v-btn :value="12">
                    <v-icon>mdi-eye</v-icon>
                </v-btn>
            </v-btn-toggle>
            <span>
                TODO: auto insert skills/traits/...
            </span>
        </div>
        <v-row dense>
            <v-col
                v-if="previewColumnWidth !== 12"
                :cols="12 - previewColumnWidth"
            >
                <v-textarea
                    v-model="markdown"
                    variant="outlined"
                    auto-grow
                    rows="5"
                    hide-details
                />
            </v-col>
            <v-col
                v-if="previewColumnWidth !== 0"
                :cols="previewColumnWidth"
            >
                <markdown-renderer :markdown="markdown" />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import MarkdownRenderer from './MarkdownRenderer.vue';

export default {
    emits: ['update:modelValue'],
    components: {
        MarkdownRenderer
    },
    props: {
        modelValue: {
            type: String,
            default: "null"
        }
    },
    data() {
        return {
            markdown: this.modelValue,
            previewColumnWidth: 6
        }
    },
    watch: {
        modelValue(newValue) {
            this.markdown = newValue;
        },
        markdown(newValue) {
            this.$emit("update:modelValue", newValue);
        }
    }
}
</script>

<style scoped>
</style>