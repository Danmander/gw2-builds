<template>
    <div class="d-flex-inline align-center plain-text">
        <component
            v-for="(component, index) in components"
            :key="index"
            :is="component.type"
            v-bind="component.props"
        >
            {{ component.content }}
        </component>
    </div>
</template>

<script>
import { ArmorInfix, TrinketInfix, WeaponInfix } from '../../enums/infixUpgrade';
import ArmorType from '../../enums/armorType.js';
import ArmorWeightClass from '../../enums/armorWeightClass.js';
import TrinketType from '../../enums/trinketType';

import Gw2Armor from '../Gw2Armor.vue';
import Gw2Consumable from '../Gw2Consumable.vue';
import Gw2Relic from '../Gw2Relic.vue';
import Gw2Skill from '../Gw2Skill.vue';
import Gw2Trait from '../Gw2Trait.vue';
import Gw2TraitLine from '../Gw2TraitLine.vue';
import Gw2Trinket from '../Gw2Trinket.vue';
import Gw2UpgradeComponent from '../Gw2UpgradeComponent.vue';
import Gw2Weapon from '../Gw2Weapon.vue';
import WeaponType from '../../enums/weaponType';

export default {
    computed: {
        components() {
            const components = [];

            const textToParse = this.$slots.default()[0].children; // TODO: allow for new lines
            const parts = textToParse.trim().split(/(\[(?:armor|consumable|relic|skill|trait|traitline|trinket|component|weapon):(?:[^\]]+)])/gi);
            for (let index = 0; index < parts.length; index++) {
                const part = parts[index];

                // We don't want to render empty elements so we just skip them here
                if(part === null || part === '' || part === undefined) continue;

                // Retrieve the type and properties of the element
                const matches = part.match(/\[(armor|consumable|relic|skill|trait|traitline|trinket|component|weapon):([^\]]+)]/i);

                // If nothing matches (a.k.a. no type and properties are found) it's just plain text
                if(matches === null) {
                    components.push({
                        type: "span",
                        content: part,
                        props: {
                            class: "d-inline-flex plain-text"
                        }
                    });
                    continue;
                }

                // Figure out the type and properties of the component
                const type = matches[1].toLowerCase();
                const properties = matches[2].split(":");

                if(type === "armor") {
                    components.push({
                        type: Gw2Armor,
                        props: {
                            infix: ArmorInfix[properties[0]],
                            type: ArmorType[properties[1]],
                            weightClass: ArmorWeightClass[properties[2]],
                            runeId: parseInt(properties[3])
                        }
                    });
                } else if(type === "consumable") {
                    components.push({
                        type: Gw2Consumable,
                        props: {
                            id: parseInt(properties[0])
                        }
                    });
                } else if(type === "relic") {
                    components.push({
                        type: Gw2Relic,
                        props: {
                            id: parseInt(properties[0])
                        }
                    });
                } else if(type === "skill") {
                    components.push({
                        type: Gw2Skill,
                        props: {
                            id: parseInt(properties[0])
                        }
                    });
                } else if(type === "trait") {
                    components.push({
                        type: Gw2Trait,
                        props: {
                            id: parseInt(properties[0])
                        }
                    });
                } else if(type === "traitline") {
                    components.push({
                        type: Gw2TraitLine,
                        props: {
                            id: parseInt(properties[0]),
                            selectedTraitIds: properties[1].split(",").map(value => parseInt(value))
                        }
                    });
                } else if(type === "trinket") {
                    components.push({
                        type: Gw2Trinket,
                        props: {
                            infix: TrinketInfix[properties[0]],
                            type: TrinketType[properties[1]]
                        }
                    });
                } else if(type === "component") {
                    components.push({
                        type: Gw2UpgradeComponent,
                        props: {
                            id: parseInt(properties[0])
                        }
                    });
                } else if(type === "weapon") {
                    components.push({
                        type: Gw2Weapon,
                        props: {
                            infix: WeaponInfix[properties[0]],
                            type: WeaponType[properties[1]],
                            sigilIds: properties[2].split(",").map(value => parseInt(value))
                        }
                    });
                } else {
                    // This should never happen, but just in case we'll show an error so we know we should fix it.
                    components.push({
                        type: "span",
                        content: part,
                        props: {
                            class: "d-inline-flex text-error"
                        }
                    });
                }
            }

            return components;
        }
    }
}
</script>

<style scoped>
.plain-text {
    white-space: pre-wrap;
}
</style>