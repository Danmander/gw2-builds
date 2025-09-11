<template>
    <div class="text-renderer d-flex-inline">
        <component
            v-for="(componentGroup, index) in components"
            :key="index"
            :is="componentGroup.wrapperType"
            class="line"
        >
            <component
                v-for="(component) in componentGroup.components"
                :key="component.key"
                :is="component.type"
                v-bind="component.props"
            >
                {{ component.content }}
            </component>
        </component>
    </div>
</template>

<script>
import { ArmorInfix, TrinketInfix, WeaponInfix } from '../../enums/infixUpgrade.js';
import ArmorType from '../../enums/armorType.js';
import ArmorWeightClass from '../../enums/armorWeightClass.js';
import TrinketType from '../../enums/trinketType.js';

import Gw2Armor from '../Gw2Armor.vue';
import Gw2Consumable from '../Gw2Consumable.vue';
import Gw2Relic from '../Gw2Relic.vue';
import Gw2Skill from '../Gw2Skill.vue';
import Gw2Trait from '../Gw2Trait.vue';
import Gw2TraitLine from '../Gw2TraitLine.vue';
import Gw2Trinket from '../Gw2Trinket.vue';
import Gw2UpgradeComponent from '../Gw2UpgradeComponent.vue';
import Gw2Weapon from '../Gw2Weapon.vue';
import WeaponType from '../../enums/weaponType.js';
import { VIcon } from 'vuetify/components';

export default {
    props: {
        text: {
            type: String,
            default: ""
        }
    },
    computed: {
        components() {
            // We need a unique key for each component which allows it to re-render when it changes, but not re-render when it changes position.
            // So we can't use the index of the component because that would change with the position.
            // We also can't use the signature of the component as that would allow multiple components with the same key which causes render duplication issues.
            // What does work is create a key which represents the n-th occurance of a signature as it's unique enough to cause a re-render when properties change, but doesn't change with general component position.
            const keyStore = {};
            function getKey(signature) {
                if(keyStore[signature] === undefined) keyStore[signature] = 0;
                else keyStore[signature]++;

                return `${signature}:${keyStore[signature]}`
            }

            const componentGroups = [];

            const lines = this.text.trim().split("\n");
            for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
                let line = lines[lineIndex];

                const componentGroup = {
                    wrapperType: "div",
                    components: []
                };

                // Figure out which wrapper element the current line needs (these are inspired by markdown)
                if(line.startsWith("# ")) {
                    line = line.replace("# ", "");
                    componentGroup.wrapperType = "h1";
                } else if(line.startsWith("## ")) {
                    line = line.replace("## ", "");
                    componentGroup.wrapperType = "h2";
                } else if(line.startsWith("### ")) {
                    line = line.replace("### ", "");
                    componentGroup.wrapperType = "h3";
                } else if(line.startsWith("> ")) {
                    line = line.replace("> ", "");
                    componentGroup.wrapperType = "blockquote";
                } else if(line.startsWith("- ")) {
                    line = line.replace("- ", "");
                    componentGroup.wrapperType = "li";
                }
            
                // We have to use non-capturing sub groups as otherwise the values in these groups would be removed when the split function is executed.
                const nodes = line.split(/((?:->)|\[(?:armor|consumable|relic|skill|traitline|trait|trinket|component|weapon):?[^[\]]+])/gi);
                for (let index = 0; index < nodes.length; index++) {
                    const node = nodes[index];

                    // Rendering empty elements is just overhead which we don't want.
                    if(node === null || node === '' || node === undefined) continue;

                    // We wanted custom markdown arrows so that's why we create an arrow icon here
                    if(node === "->") {
                        componentGroup.components.push({
                            key: getKey(node),
                            type: VIcon,
                            props:{
                                icon: "mdi-arrow-right-thin",
                                class: "vertical-align-middle"
                            }
                        });
                        continue;
                    }

                    // Retrieve the type and properties of the element
                    const matches = node.match(/\[(armor|consumable|relic|skill|traitline|trait|trinket|component|weapon):?([^[\]]+)]/i);

                    // If nothing matches (a.k.a. no type and properties are found) it's just plain text
                    if(matches === null) {
                        componentGroup.components.push({
                            key: getKey(node),
                            type: "span",
                            content: node,
                            props: {
                                class: "text-pre-wrap vertical-align-middle"
                            }
                        });
                        continue;
                    }

                    // Figure out the type and properties of the component
                    const type = matches[1].toLowerCase();
                    const properties = matches[2].split(":");

                    if(type === "armor" && properties.length >= 3) {
                        componentGroup.components.push({
                            key: getKey(node),
                            type: Gw2Armor,
                            props: {
                                infix: ArmorInfix[properties[0]],
                                type: ArmorType[properties[1]],
                                weightClass: ArmorWeightClass[properties[2]],
                                runeId: properties[3] === undefined ? null : parseInt(properties[3]),
                                gw2IconProps: {
                                    class: "vertical-align-middle"
                                }
                            }
                        });
                    } else if(type === "consumable" && properties.length >= 1) {
                        componentGroup.components.push({
                            key: getKey(node),
                            type: Gw2Consumable,
                            props: {
                                id: parseInt(properties[0]),
                                gw2IconProps: {
                                    class: "vertical-align-middle"
                                }
                            }
                        });
                    } else if(type === "relic" && properties.length >= 1) {
                        componentGroup.components.push({
                            key: getKey(node),
                            type: Gw2Relic,
                            props: {
                                id: parseInt(properties[0]),
                                gw2IconProps: {
                                    class: "vertical-align-middle"
                                }
                            }
                        });
                    } else if(type === "skill" && properties.length >= 1) {
                        componentGroup.components.push({
                            key: getKey(node),
                            type: Gw2Skill,
                            props: {
                                id: parseInt(properties[0]),
                                gw2IconProps: {
                                    class: "vertical-align-middle"
                                }
                            }
                        });
                    } else if(type === "trait" && properties.length >= 1) {
                        componentGroup.components.push({
                            key: getKey(node),
                            type: Gw2Trait,
                            props: {
                                id: parseInt(properties[0]),
                                gw2IconProps: {
                                    class: "vertical-align-middle"
                                }
                            }
                        });
                    } else if(type === "traitline" && properties.length >= 1) {
                        componentGroup.components.push({
                            key: getKey(node),
                            type: Gw2TraitLine,
                            props: {
                                id: parseInt(properties[0]),
                                selectedTraitIds: (properties[1] ?? "").split(",").filter(value => value !== "").map(value => parseInt(value)),
                                gw2IconProps: {
                                    class: "vertical-align-middle"
                                }
                            }
                        });
                    } else if(type === "trinket" && properties.length >= 2) {
                        componentGroup.components.push({
                            key: getKey(node),
                            type: Gw2Trinket,
                            props: {
                                infix: TrinketInfix[properties[0]],
                                type: TrinketType[properties[1]],
                                gw2IconProps: {
                                    class: "vertical-align-middle"
                                }
                            }
                        });
                    } else if(type === "component" && properties.length >= 1) {
                        componentGroup.components.push({
                            key: getKey(node),
                            type: Gw2UpgradeComponent,
                            props: {
                                id: parseInt(properties[0]),
                                gw2IconProps: {
                                    class: "vertical-align-middle"
                                }
                            }
                        });
                    } else if(type === "weapon" && properties.length >= 2) {
                        componentGroup.components.push({
                            key: getKey(node),
                            type: Gw2Weapon,
                            props: {
                                infix: WeaponInfix[properties[0]],
                                type: WeaponType[properties[1]],
                                sigilIds: (properties[2] ?? "").split(",").filter(value => value !== "").map(value => parseInt(value)),
                                gw2IconProps: {
                                    class: "vertical-align-middle"
                                }
                            }
                        });
                    } else {
                        // This should never happen, but just in case we'll show an error so we know we should fix it.
                        componentGroup.components.push({
                            key: getKey(node),
                            type: "span",
                            content: node,
                            props: {
                                class: "vertical-align-middle text-error"
                            }
                        });
                    }
                }
                componentGroups.push(componentGroup);
            }

            return componentGroups;
        }
    }
}
</script>

<style scoped>
.line {
    min-height: 24px;
}

.vertical-align-middle,
.text-renderer:deep(.vertical-align-middle) {
    vertical-align: middle;
}

/* Styles which can be rendered by the markdown-esque renderer */
blockquote {
    border-left: 2px solid currentColor;
    padding-left: 8px;
}
li {
    list-style-position: inside;
}
</style>