<template>
    <gw2-icon
        class="text-primary"
        @contextmenu.prevent
        :show-label="!tile"
        :label="label === null ? iconInfo?.defaultLabel : label"
        :icon="iconInfo?.iconSrc"
        :size="tile ? 56 : 24"
        v-bind="{ ...props, ...gw2IconProps }"
    />
</template>

<script>
import { useDataStore } from '../stores/data.js';
import Gw2Icon from './Gw2Icon.vue';
import AegisIcon from '../assets/images/boons/aegis.png';
import AlacrityIcon from '../assets/images/boons/alacrity.png';
import FuryIcon from '../assets/images/boons/fury.png';
import MightIcon from '../assets/images/boons/might.png';
import ProtectionIcon from '../assets/images/boons/protection.png';
import QuicknessIcon from '../assets/images/boons/quickness.png';
import RegenerationIcon from '../assets/images/boons/regeneration.png';
import ResistanceIcon from '../assets/images/boons/resistance.png';
import ResolutionIcon from '../assets/images/boons/resolution.png';
import StabilityIcon from '../assets/images/boons/stability.png';
import SwiftnessIcon from '../assets/images/boons/swiftness.png';
import VigorIcon from '../assets/images/boons/vigor.png';
import ConditionCleanseIcon from '../assets/images/facts/condition-cleanse.png';
import HealingIcon from '../assets/images/facts/healing.png';
import RadiusIcon from '../assets/images/facts/radius.png';
import RangeIcon from '../assets/images/facts/range.png';
import ReviveIcon from '../assets/images/facts/revive.png';
import DefianceIcon from '../assets/images/defiance.png'

export default {
    components: {
        Gw2Icon
    },
    props: {
        id: {
            type: Number,
            required: true,
        },
        label: {
            type: String,
            default: null
        },
        tile: {
            type: Boolean,
            default: false
        },
        gw2IconProps: {
            type: Object,
            default: () => {}
        }
    },
    setup() {
        const dataStore = useDataStore();
        return { dataStore };
    },
    data() {
        return {
            data: null
        }
    },
    computed: {
        iconInfo() {
            const key = this.id.toLowerCase();
            if(key === "aegis") return { iconSrc: AegisIcon, defaultLabel: "Aegis" }
            else if(key === "alacrity") return { iconSrc: AlacrityIcon, defaultLabel: "Alacrity" }
            else if(key === "fury") return { iconSrc: FuryIcon, defaultLabel: "Fury" }
            else if(key === "might") return { iconSrc: MightIcon, defaultLabel: "Might" }
            else if(key === "protection") return { iconSrc: ProtectionIcon, defaultLabel: "Protection" }
            else if(key === "quickness") return { iconSrc: QuicknessIcon, defaultLabel: "Quickness" }
            else if(key === "regeneration") return { iconSrc: RegenerationIcon, defaultLabel: "Regeneration" }
            else if(key === "resistance") return { iconSrc: ResistanceIcon, defaultLabel: "Resistance" }
            else if(key === "resolution") return { iconSrc: ResolutionIcon, defaultLabel: "Resolution" }
            else if(key === "stability") return { iconSrc: StabilityIcon, defaultLabel: "Stability" }
            else if(key === "swiftness") return { iconSrc: SwiftnessIcon, defaultLabel: "Swiftness" }
            else if(key === "vigor") return { iconSrc: VigorIcon, defaultLabel: "Vigor" }
            else if(key === "condition cleanse") return { iconSrc: ConditionCleanseIcon, defaultLabel: "Condition Cleanse" }
            else if(key === "healing") return { iconSrc: HealingIcon, defaultLabel: "Healing" }
            else if(key === "radius") return { iconSrc: RadiusIcon, defaultLabel: "Radius" }
            else if(key === "range") return { iconSrc: RangeIcon, defaultLabel: "Range" }
            else if(key === "revive") return { iconSrc: ReviveIcon, defaultLabel: "Revive" }
            else if(key === "defiance") return { iconSrc: DefianceIcon, defaultLabel: "Defiance" }
            return null
        }
    }
}
</script>

<style scoped>
</style>