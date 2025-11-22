<template>
    <v-expansion-panels
        :model-value="expand ? ['tab'] : []"
        flat
    >
        <v-expansion-panel
            value="tab"
            class="expansion-panel elevation-1"
        >
            <v-expansion-panel-title class="title">
                {{ title }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <slot name="default" />
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
export default {
    props: {
        expand: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: null
        }
    },
}
</script>

<style scoped>
.expansion-panel:deep(.v-expansion-panel__shadow) {
    box-shadow: none;
}

.expansion-panel:deep(.v-expansion-panel-title__overlay) {
    opacity: 0 !important;
}

.expansion-panel:deep(.v-expansion-panel-text__wrapper) {
    padding-top: 0 !important;
}

.title {
    font-size: 1.175rem;
    min-height: 64px !important;
    max-height: 64px !important;
}
</style>