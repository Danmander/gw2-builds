<template>
    <div class="d-flex align-center">
        <img
            v-if="fact.type === FactType.PrefixedBuff"
            class="icon mr-1"
            :src="fact.prefix.icon"
        >
        <span>
            <img
                class="icon mr-1"
                :src="fact.icon"
            > 
            <div
                v-if="(fact.type === FactType.Buff || fact.type === FactType.PrefixedBuff) && fact.apply_count > 1"
                class="count"
            >
                {{ fact.apply_count }}
            </div>
        </span>
        
        <span class="text-faded">
            <span v-if="fact.type === FactType.Buff">
                {{ fact.status }}
                <span v-if="fact.duration > 0">({{ fact.duration }}s)</span>
                <span v-if="fact.description !== undefined">: {{ fact.description }}</span>
            </span>
            <span v-else-if="fact.type === FactType.PrefixedBuff">
                {{ fact.status }}
                <span v-if="fact.duration > 0">({{ fact.duration }}s)</span>
                <span v-if="fact.description !== undefined">: {{ fact.description }}</span>
            </span>
            <span v-else-if="fact.type === FactType.Number">
                {{ fact.text }}: {{ fact.value }}
            </span>
            <span v-else-if="fact.type === FactType.Range">
                {{ fact.text }}: {{ fact.value }}
            </span>
            <span v-else-if="fact.type === FactType.Radius">
                {{ fact.text }}: {{ fact.distance }}
            </span>
            <span v-else-if="fact.type === FactType.Time">
                {{ fact.text }}: {{ fact.duration }}s
            </span>
            <span v-else-if="fact.type === FactType.Damage">
                <span>{{ fact.text }}: </span>
                <!-- Random 366 damage multiplier to simulate power/armor which is irregular at best -->
                <span>{{ Math.ceil(fact.hit_count * fact.dmg_multiplier * 366) }}</span>
                <span class="text-faded">
                    (<span v-if="fact.hit_count > 1"> {{ fact.hit_count }} x </span>{{ fact.dmg_multiplier }})
                </span>
            </span>
            <span v-else-if="fact.type === FactType.NoData">
                {{ fact.text }}
            </span>
            <span v-else-if="fact.type === FactType.Duration">
                {{ fact.text }}: {{ fact.duration }}s
            </span>
            <span v-else-if="fact.type === FactType.Distance">
                {{ fact.text }}: {{ fact.distance }}
            </span>
            <span v-else-if="fact.type === FactType.ComboField">
                {{ fact.text }}: {{ fact.field_type }}
            </span>
            <span v-else-if="fact.type === FactType.ComboFinisher">
                {{ fact.text }}: {{ fact.finisher_type }}
            </span>
            <span v-else-if="fact.type === FactType.AttributeAdjust">
                {{ fact.text ?? transformAttribute(fact.target) }}: {{ fact.value }}
            </span>
            <span v-else-if="fact.type === FactType.StunBreak">
                Breaks Stuns
            </span>
            <span v-else-if="fact.type === FactType.Percent">
                {{ fact.text }}: {{ fact.percent }}%
            </span>
            <span v-else-if="fact.type === FactType.BuffConversion">
                Gain {{ transformAttribute(fact.target) }} based on a percentage of {{ transformAttribute(fact.source) }}: {{ fact.percent }}%
            </span>
            <span v-else-if="fact.type === FactType.Unblockable">
                {{ fact.text }}
            </span>
            <span
                v-else
                class="text-error"
            >
                Unsupported fact type: {{ fact.type }} {{ fact }}
            </span>
        </span>
    </div>
</template>

<script>
import { transformAttribute } from '../services/transformerService.js';
import FactType from '../enums/factType.js';

export default {
    props: {
        fact: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            FactType,
            transformAttribute
        }
    }
}
</script>

<style scoped>
.icon {
    height: 32px;
    width: 32px;
    aspect-ratio: 1/1;
    vertical-align: middle;
}

.count {
    position: absolute;
    right: 4px;
    bottom: -6px;
    z-index: 1;
}
</style>