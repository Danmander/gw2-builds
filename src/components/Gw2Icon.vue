<template>
    <div
        class="d-inline-flex label align-center"
        :class="{ 'inactive': inactive }"
    >
        <img
            class="icon"
            :class="{'hexagon': hexagonIcon }"
            :style="iconSizeStyle"
            :src="icon"
        >
        <span
            v-if="showLabel"
            class="ml-1"
            :class="labelClass"
        >
            {{ label }}
        </span>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: null
        },
        showLabel: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: null
        },
        size: {
            type: Number,
            default: 24
        },
        tile: {
            type: Boolean,
            default: false
        },
        hexagonIcon: {
            type: Boolean,
            default: false
        },
        inactive: {
            type: Boolean,
            default: false
        },
        labelClass: {
            type: String,
            default: null
        }
    },
    computed: {
        iconSizeStyle() {
            return {
                height: `${this.size}px`,
                weight: `${this.size}px`,
            }
        }
    }
}
</script>

<style scoped>
.label {
    vertical-align: bottom;
}

.label.inactive {
    opacity: 0.4;
}

.icon {
    aspect-ratio: 1/1;
    align-self: center;
}

.icon.hexagon {
    clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
}
</style>