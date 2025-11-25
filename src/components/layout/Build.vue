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
                <div class="gear-header mb-2">
                    Armor
                </div>
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
                <div class="gear-header mb-2">
                    Trinkets
                </div>
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
                <div class="gear-header mb-2">
                    Weapons
                </div>
                <template
                    v-for="(weaponSet, weaponSetIndex) in weaponSets"
                    :key="weaponSetIndex"
                >
                    <gw2-custom-icon
                        v-if="weaponSetIndex !== 0"
                        :id="'weapon swap'"
                        class="weapon-swap-icon my-2"
                        :tile="true"
                        :gw2-icon-props="{ size: 36 }"
                    />
                    <div
                        v-for="(weapon, index) in weaponSet.weapons"
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
                </template>
                
                <!-- Relic -->
                <div class="gear-header mb-2 mt-2">
                    Relics
                </div>
                <div class="mt-2">
                    <gw2-relic
                        :gw2-icon-props="{ 'size': 56, 'labelClass': 'ml-2' }"
                        :id="relicId"
                    />
                </div>
                
                <!-- Consumables -->
                <div class="gear-header mb-2 mt-2">
                    Food & Utility
                </div>
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
            order="2"
            md="6"
            order-md="1"
        >
            <div class="position-sticky">
                <gw2-trait-line
                    v-for="(traitLine, index) in traitLines"
                    :key="index"
                    class="elevation-1"
                    :class="{ 'mt-2': index !== 0 }"
                    :id="traitLine.id"
                    :selected-trait-ids="traitLine.traitIds ?? []"
                />
            </div>
        </v-col>
        <v-col
            cols="12"
            order="1"
            md="6"
            order-md="2"
        >
            <container class="mb-2">
                <gw2-skill
                    v-for="(skillId, index) in utilitySkillIds"
                    :key="index"
                    :gw2-icon-props="{ 'class': { 'ml-2': index !== 0 } }"
                    :id="skillId"
                    tile
                />
            </container>
            
            <slot name="skill-notes" />

            <div class="position-sticky">
                <slot name="trait-notes" />
            </div>
        </v-col>
        <v-col
            cols="12"
            order="3"
            md="6"
        >
            <div class="position-sticky">
                <slot name="rotation" />
            </div>
        </v-col>
        <v-col
            cols="12"
            order="4"
            md="6"
            v-show="$slots.video"
        >
            <div class="position-sticky">
                <slot name="video" />
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
import Gw2CustomIcon from '../Gw2CustomIcon.vue';

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
        Container,
        Gw2CustomIcon
    },
    props: {
        utilitySkillIds: {
            type: Array,
            default: () => []
        },
        weaponSets: {
            type: Array, // Each item should be in the form { weapons: array } which each item in the weapon array being in the form { type: string, infix: int, sigilIds: int[] }
            default: () => null
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

.position-sticky {
    top: 8px;
}

.gear-header {
    /* color: rgb(var(--v-theme-faded)); */
    font-size: 1.075rem;
    border-bottom: solid 1px rgb(var(--v-theme-faded));
}

.weapon-swap-icon {
    margin-left: 10px;
}
</style>