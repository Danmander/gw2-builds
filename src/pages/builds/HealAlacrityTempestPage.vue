<template>
    <h1>Heal Alacrity Tempest</h1>
    <gear-and-template-showcase
        style="width: auto;"
        :armor-weight-class="ArmorWeightClass.Light"
        :armor-infixes="[
            ArmorInfix.Harrier,
            ArmorInfix.Harrier,
            ArmorInfix.Harrier,
            ArmorInfix.Harrier,
            ArmorInfix.Harrier,
            ArmorInfix.Harrier,
        ]"
        :rune-id="24842"
        :trinket-infixes="[
            TrinketInfix.Giver,
            TrinketInfix.Giver,
            TrinketInfix.Giver,
            TrinketInfix.Giver,
            TrinketInfix.Harrier,
            TrinketInfix.Harrier,
        ]"
        :relic-id="101268"
        :weapons="[
            { type: WeaponType.Dagger, infix: WeaponInfix.Harrier, sigilIds: [74326] },
            { type: WeaponType.Warhorn, infix: WeaponInfix.Harrier, sigilIds: [24639] }
        ]"
        :utility-skill-ids="[
            29535,
            null,
            null,
            null,
            5666
        ]"
        :trait-lines="[
            { id: 26, traitIds: [289, 281, 1508] },
            { id: 17, traitIds: [348, 358, 361] },
            { id: 48, traitIds: [1886, 2015, 1986] }
        ]"
        :food-id="91690"
        :utility-id="67528"
    >
        <template #info>
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
        </template>
    </gear-and-template-showcase>
</template>

<script>
import GearAndTemplateShowcase from '../../components/layout2/GearAndTemplateShowcase.vue';
import ArmorWeightClass from '../../enums/armorWeightClass';
import { ArmorInfix, TrinketInfix, WeaponInfix } from '../../enums/infixUpgrade';
import WeaponType from '../../enums/weaponType';

export default {
    components: {
        GearAndTemplateShowcase
    },
    data() {
        return {
            ArmorInfix,
            ArmorWeightClass,
            TrinketInfix,
            WeaponInfix,
            WeaponType
        }
    }
}
</script>

<style scoped>
</style>