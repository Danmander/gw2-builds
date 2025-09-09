<template>
    <div class="d-flex-inline align-center plain-text">
        <!-- We're using the raw string value as a key for components so they get re-rendered if they change. -->
        <!-- For plain text and newlines we're just using index as that's the only thing that changes about them. -->
        <component
            v-for="(component, index) in components"
            :key="component.raw ?? index"
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

            const textToParse = this.$slots.default()[0].children;
            // We have to use non-capturing groups as otherwise the values in these groups would be removed when the split function is executed.
            const nodes = textToParse.trim().split(/((?:\n)|\[(?:armor|consumable|relic|skill|traitline|trait|trinket|component|weapon):?[^[\]]+])/gi);
            for (let index = 0; index < nodes.length; index++) {
                const node = nodes[index];

                // Rendering empty elements is just overhead which we don't want.
                if(node === null || node === '' || node === undefined) continue;

                // Check if we're dealing with a newline, in which case we want to insert a line break to start that new line.
                if(node === "\n") {
                    components.push({
                        type: "br"
                    });
                    continue;
                }

                // Retrieve the type and properties of the element
                const matches = node.match(/\[(armor|consumable|relic|skill|traitline|trait|trinket|component|weapon):?([^[\]]+)]/i);

                // If nothing matches (a.k.a. no type and properties are found) it's just plain text
                if(matches === null) {
                    components.push({
                        type: "span",
                        content: node,
                        props: {
                            class: "d-inline-flex plain-text"
                        }
                    });
                    continue;
                }

                // Figure out the type and properties of the component
                const type = matches[1].toLowerCase();
                const properties = matches[2].split(":");

                if(type === "armor" && properties.length >= 4) {
                    components.push({
                        raw: node,
                        type: Gw2Armor,
                        props: {
                            infix: ArmorInfix[properties[0]],
                            type: ArmorType[properties[1]],
                            weightClass: ArmorWeightClass[properties[2]],
                            runeId: parseInt(properties[3])
                        }
                    });
                } else if(type === "consumable" && properties.length >= 1) {
                    components.push({
                        raw: node,
                        type: Gw2Consumable,
                        props: {
                            id: parseInt(properties[0])
                        }
                    });
                } else if(type === "relic" && properties.length >= 1) {
                    components.push({
                        raw: node,
                        type: Gw2Relic,
                        props: {
                            id: parseInt(properties[0])
                        }
                    });
                } else if(type === "skill" && properties.length >= 1) {
                    components.push({
                        raw: node,
                        type: Gw2Skill,
                        props: {
                            id: parseInt(properties[0])
                        }
                    });
                } else if(type === "trait" && properties.length >= 1) {
                    components.push({
                        raw: node,
                        type: Gw2Trait,
                        props: {
                            id: parseInt(properties[0])
                        }
                    });
                } else if(type === "traitline" && properties.length >= 2) {
                    components.push({
                        raw: node,
                        type: Gw2TraitLine,
                        props: {
                            id: parseInt(properties[0]),
                            selectedTraitIds: properties[1].split(",").filter(value => value !== "").map(value => parseInt(value))
                        }
                    });
                } else if(type === "trinket" && properties.length >= 2) {
                    components.push({
                        raw: node,
                        type: Gw2Trinket,
                        props: {
                            infix: TrinketInfix[properties[0]],
                            type: TrinketType[properties[1]]
                        }
                    });
                } else if(type === "component" && properties.length >= 1) {
                    components.push({
                        raw: node,
                        type: Gw2UpgradeComponent,
                        props: {
                            id: parseInt(properties[0])
                        }
                    });
                } else if(type === "weapon" && properties.length >= 3) {
                    components.push({
                        raw: node,
                        type: Gw2Weapon,
                        props: {
                            infix: WeaponInfix[properties[0]],
                            type: WeaponType[properties[1]],
                            sigilIds: properties[2].split(",").filter(value => value !== "").map(value => parseInt(value))
                        }
                    });
                } else {
                    // This should never happen, but just in case we'll show an error so we know we should fix it.
                    components.push({
                        type: "span",
                        content: node,
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