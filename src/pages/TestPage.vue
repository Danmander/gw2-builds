<!-- eslint-disable vue/max-attributes-per-line -->

<template>
    Use <gw2-skill :id="30662" /> when you feel like you need to use 

    <gw2-skill :id="15718" />
    <gw2-skill :id="5496" />
    <gw2-skill :id="5644" />
    <gw2-skill :id="5691" />
    <gw2-skill :id="5557" />
    <gw2-skill :id="29535" />
    <gw2-skill :id="30662" tile />
    <gw2-skill :id="29968" tile />
    <gw2-skill :id="30047" tile />
    <gw2-skill :id="5625" tile />
    <gw2-skill :id="5493" />
    <gw2-skill :id="5666" />
    <gw2-skill :id="25491" />
    <gw2-skill :id="5678" />
    <gw2-skill :id="31677" />
    <gw2-skill :id="55024" />
    <gw2-skill :id="25480" />

    <hr>

    <gw2-trait :id="263" />
    <gw2-trait :id="1673" />
    <gw2-trait :id="334" />
    <gw2-trait :id="238" />
    <gw2-trait :id="2025" />

    <hr>

    <gw2-armor :type="ArmorType.Headgear" :infix="ArmorInfix.Harrier" :rune-id="24842" />
    <gw2-weapon :type="WeaponType.Warhorn" :infix="ArmorInfix.Harrier" :sigil-ids="[24615, 24639, 24575]" />
    <gw2-weapon :type="WeaponType.Dagger" :infix="ArmorInfix.Giver" />

    <hr>

    <gw2-upgrade-component :id="84307" />
    <gw2-upgrade-component :id="86097" />
    <gw2-upgrade-component :id="24615" />

    <hr>

    <gw2-relic :id="101268" />
    <gw2-relic :id="100153" />
    <gw2-relic :id="103763" />

    <hr>

    <gw2-consumable :id="67528" tile />
    <gw2-consumable :id="68634" tile />
    <gw2-consumable :id="91690" />

    <hr>

    <gw2-trait-line class="mt-2" :id="37" :selected-trait-ids="[1487, 265, 238]" />
    <gw2-trait-line class="mt-2" :id="17" :selected-trait-ids="[360, 358, 2028]" />
    <gw2-trait-line class="mt-2" :id="48" :selected-trait-ids="[1962, 2015, 2033]" />
</template>

<script>
import Gw2Skill from '../components/Gw2Skill.vue';
import Gw2Trait from '../components/Gw2Trait.vue';
import Gw2Consumable from '../components/Gw2Consumable.vue';
import Gw2Armor from '../components/Gw2Armor.vue';
import Gw2Weapon from '../components/Gw2Weapon.vue';
import Gw2UpgradeComponent from '../components/Gw2UpgradeComponent.vue';
import Gw2Relic from '../components/Gw2Relic.vue';
import Gw2TraitLine from '../components/Gw2TraitLine.vue';
import ArmorType from '../enums/armorType';
import WeaponType from '../enums/weaponType';
import { ArmorInfix } from '../enums/infixUpgrade';

export default {
    components: {
        Gw2Skill,
        Gw2Trait,
        Gw2TraitLine,
        Gw2Consumable,
        Gw2Armor,
        Gw2Weapon,
        Gw2UpgradeComponent,
        Gw2Relic
    },
    data() {
        return {
            ArmorType,
            WeaponType,
            ArmorInfix,
        }
    }
}
</script>

<style scoped></style>