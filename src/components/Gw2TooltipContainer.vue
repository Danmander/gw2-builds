<template>
    <div
        class="tooltip pa-2"
        :style="borderColorStyle"
    >
        <div>
            <span class="title text-primary">
                {{ title }}
            </span>
            <div
                v-if="recharge !== null"
                class="recharge"
            >
                {{ recharge }} <img src="../assets/images/recharge.png">
            </div>
        </div>
        <div
            v-if="subtitle !== null"
            class="subtitle text-faded mb-1"
        >
            {{ subtitle }}
        </div>
        <div
            v-if="description !== null"
            class="mb-2"
        >
            {{ description }}
        </div>
        <div>
            <slot name="default" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: null
        },
        subtitle: {
            type: String,
            default: null
        },
        recharge: {
            type: Number,
            default: null
        },
        description: {
            type: String,
            default: null
        },
        borderColor: {
            type: String,
            default: "on-surface"
        }
    },
    computed: {
        borderColorStyle() {
            return {
                "border-color": `rgb(var(--v-theme-${this.borderColor}))`,
            }
        }
    }
}
</script>

<style scoped>
.tooltip {
    --border-color: 'surface'
}

.tooltip {
    background: transparent;
	border-style: solid;
	border-width: 1px;
    border-radius: 4px;
	background-color: black; /* Darkens the image when combined with the trait line image opacity */
    background-image: url("../assets/images/background.png");
    background-size: cover;
	color: rgb(var(--v-theme-on-surface)) !important;
    /* font-size: 0.875em; */
}

.title {
    font-size: 1.075em;
}

.recharge {
    position: absolute;
    right: 0px;
    top: 0px;
}

.recharge img {
    height: 20px;
    width: 20px;
    vertical-align: middle;
    aspect-ratio: 1/1;
}

.subtitle {
    line-height: 1;
}
</style>