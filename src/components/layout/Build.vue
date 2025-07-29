<template>
    <!-- Equipment -->
    <container>
        <v-row dense>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
                <!-- Armor -->
                <div
                    v-for="(armorType, index) in [ArmorType.Headgear, ArmorType.Shoulders, ArmorType.Chest, ArmorType.Gloves, ArmorType.Leggings, ArmorType.Boots]"
                    :key="index"
                    class="d-flex"
                    :class="{ 'mt-2': index !== 0 }"
                >
                    <gw2-armor
                        :weight-class="armorWeightClass"
                        :type="armorType"
                        :infix="armorInfixes[index]"
                        :rune-id="runeId"
                        tile
                    />
                    <div class="ml-2">
                        <div class="flex-align-self-center">
                            <span>
                                {{ transformInfixUpgrade(armorInfixes[index]) }}
                            </span>
                            <span class="text-faded ml-1">
                                {{ armorType }}
                            </span>
                        </div>
                        <div class="mt-1">
                            <gw2-upgrade-component :id="runeId" />
                        </div>
                    </div>
                </div>
            </v-col>

            <v-col
                cols="12"
                sm="6"
                md="4"
            >
                <!-- Trinket -->
                <div
                    v-for="(trinketType, index) in [TrinketType.Backpack, TrinketType.Accessory, TrinketType.Accessory, TrinketType.Amulet, TrinketType.Ring, TrinketType.Ring]"
                    :key="index"
                    class="d-flex"
                    :class="{ 'mt-2': index !== 0 }"
                >
                    <gw2-trinket
                        :type="trinketType"
                        :infix="trinketInfixes[index]"
                        :alternative-variant="index === 2 || index === 5"
                        tile
                    />
                    <div class="ml-2 flex-align-self-center">
                        <span>
                            {{ transformInfixUpgrade(trinketInfixes[index]) }}
                        </span>
                        <span class="text-faded ml-1">
                            {{ trinketType }}
                        </span>
                    </div>
                </div>
            </v-col>

            <v-col
                cols="12"
                sm="6"
                md="4"
            >
                <!-- Weapons -->            
                <div
                    v-for="(weapon, index) in weapons"
                    :key="index"
                    class="d-flex"
                    :class="{ 'mt-2': index !== 0 }"
                >
                    <gw2-weapon
                        :type="weapon.type"
                        :infix="weapon.infix"
                        :sigil-ids="weapon.sigilIds ?? []"
                        tile
                    />
                    <div class="ml-2">
                        <div class="flex-align-self-center">
                            <span>
                                {{ transformInfixUpgrade(weapon.infix) }}
                            </span>
                            <span class="text-faded ml-1">
                                {{ weapon.type }}
                            </span>
                        </div>
                        <div
                            v-for="(sigilId, sigilIndex) in weapon.sigilIds ?? []"
                            :key="sigilIndex"
                            class="mt-1"
                        >
                            <gw2-upgrade-component :id="sigilId" />
                        </div>
                    </div>
                </div>
                
                <!-- Relic -->
                <div class="mt-2">
                    <gw2-relic
                        :gw2-icon-props="{ 'size': 56, 'labelClass': 'ml-2' }"
                        :id="relicId"
                    />
                </div>

                <!-- Consumables -->
                <div class="mt-2">
                    <gw2-consumable
                        :gw2-icon-props="{ 'size': 56, 'labelClass': 'ml-2' }"
                        :id="foodId"
                    />
                </div>
                <div class="mt-2">
                    <gw2-consumable
                        :gw2-icon-props="{ 'size': 56, 'labelClass': 'ml-2' }"
                        :id="utilityId"
                    />
                </div>
            </v-col>
        </v-row>
    </container>
    
    <!-- Build -->
    <v-row
        dense
        class="mt-2"
    >
        <v-col
            cols="12"
            md="6"
        >
            <div class="position-sticky">
                <container class="utility-skills">
                    <gw2-skill
                        v-for="(skillId, index) in utilitySkillIds"
                        :key="index"
                        :gw2-icon-props="{ 'class': { 'ml-2': index !== 0 } }"
                        :id="skillId"
                        tile
                    />
                </container>

                <gw2-trait-line
                    v-for="(traitLine, index) in traitLines"
                    :key="index"
                    class="mt-2 elevation-1"
                    :id="traitLine.id"
                    :selected-trait-ids="traitLine.traitIds ?? []"
                />
            </div>
        </v-col>
        <v-col
            cols="12"
            md="6"
            v-show="$slots.info"
        >
            <div class="position-sticky">
                <slot name="info" />
            </div>
        </v-col>
    </v-row>
</template>

<script>
import Gw2TraitLine from '../Gw2TraitLine.vue';
import Gw2Skill from '../Gw2Skill.vue';
import Gw2Weapon from '../Gw2Weapon.vue';
import Gw2Armor from '../Gw2Armor.vue';
import Gw2UpgradeComponent from '../Gw2UpgradeComponent.vue';
import Gw2Consumable from '../Gw2Consumable.vue';
import Gw2Relic from '../Gw2Relic.vue';
import Gw2Trinket from '../Gw2Trinket.vue';
import ArmorType from '../../enums/armorType.js';
import TrinketType from '../../enums/trinketType.js';
import { transformInfixUpgrade } from '../../services/transformerService.js';
import Container from './Container.vue';

export default {
    components: {
        Gw2TraitLine,
        Gw2Skill,
        Gw2Weapon,
        Gw2Armor,
        Gw2UpgradeComponent,
        Gw2Consumable,
        Gw2Relic,
        Gw2Trinket,
        Container
    },
    props: {
        utilitySkillIds: {
            type: Array,
            default: () => []
        },
        weapons: {
            type: Array, // Each item should be in the form { type: string, infix: int, sigilIds: int[] }
            default: () => []
        },
        armorWeightClass: {
            type: String,
            required: true
        },
        armorInfixes: {
            type: Array,
            default: () => [null, null, null, null, null, null],
            validator: (value) => value.length === 6
        },
        runeId: {
            type: Number,
            default: null
        },
        trinketInfixes: {
            type: Array,
            default: () => [null, null, null, null, null, null],
            validator: (value) => value.length === 6
        },
        traitLines: {
            type: Array, // Each item should be in the form { id: int, traitIds: int[] }
            default: () => [null, null, null],
            validator: (value) => value.length === 3
        },
        foodId: {
            type: Number,
            default: null
        },
        utilityId: {
            type: Number,
            default: null
        },
        relicId: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            ArmorType,
            TrinketType,
            transformInfixUpgrade
        }
    },
    computed: {
        sigilIds() {
            return this.weapons.flatMap(weapon => weapon.sigilIds);
        }
    }
}
</script>

<style scoped>
.flex-align-self-center {
    align-self: center;
}

.utility-skills {
    max-width: 700px; /* Same as the trait lines */
}

.position-sticky {
    top: 8px;
}
</style>