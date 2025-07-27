<template>
    <gw2-tooltip-container
        :title="title"
        :subtitle="subtitle"
        :recharge="rechargeFact?.value ?? null"
        :description="description"
        v-bind="tooltipContainerProps"
    >
        <template #default>
            <gw2-fact
                v-for="(fact, index) in nonRechargeFacts"
                :key="index"
                :fact="fact"
            />
            <slot name="bottom" />
        </template>
    </gw2-tooltip-container>
</template>

<script>
import Gw2TooltipContainer from './Gw2TooltipContainer.vue';
import FactType from '../enums/factType';
import Gw2Fact from './Gw2Fact.vue';

export default {
    components: {
        Gw2Fact,
        Gw2TooltipContainer
    },
    props: {
        title: {
            type: String,
            default: null
        },
        subtitle: {
            type: String,
            default: null
        },
        description: {
            type: String,
            default: null
        },
        facts: {
            type: Array,
            default: () => []
        },
        tooltipContainerProps: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        rechargeFact() {
            if(this.facts === null) return null;
            
            return this.facts.find((fact) => fact.type === FactType.Recharge) ?? null;
        },
        nonRechargeFacts() {
            if(this.facts === undefined) return [];

            return JSON.parse(JSON.stringify(this.facts)).filter((fact) => fact.type !== FactType.Recharge);
        },
    },
}
</script>

<style scoped>
</style>