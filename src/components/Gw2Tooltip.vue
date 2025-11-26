<template>
    <v-tooltip
        location="bottom"
        class="tooltip"
        content-class="tooltip-content pa-0"
        z-index="1"
        width="400"
        :disabled="disabled"
        :eager="false"
    >
        <template #activator="{ props }">
            <slot
                name="activator"
                :props="props"
            />
        </template>

        <template #default>
            <slot name="default" />
        </template>
    </v-tooltip>
</template>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.tooltip:deep(.tooltip-content) {
    background: transparent;
}
</style>