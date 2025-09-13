<template>
    <component
        v-for="(component) in components"
        :key="component.key"
        :is="component.type"
        v-bind="component.props"
    >
        {{ component.content }}
    </component>
</template>

<script>
import { ArmorInfix, TrinketInfix, WeaponInfix } from '../../enums/infixUpgrade.js';
import Gw2Armor from '../Gw2Armor.vue';
import ArmorType from '../../enums/armorType.js';
import ArmorWeightClass from '../../enums/armorWeightClass.js';
import Gw2Consumable from '../Gw2Consumable.vue';
import Gw2Relic from '../Gw2Relic.vue';
import Gw2Skill from '../Gw2Skill.vue';
import Gw2Trait from '../Gw2Trait.vue';
import Gw2TraitLine from '../Gw2TraitLine.vue';
import Gw2Specialization from '../Gw2Specialization.vue';
import Gw2Trinket from '../Gw2Trinket.vue';
import TrinketType from '../../enums/trinketType.js';
import Gw2UpgradeComponent from '../Gw2UpgradeComponent.vue';
import Gw2Weapon from '../Gw2Weapon.vue';
import WeaponType from '../../enums/weaponType.js';
import { VIcon } from 'vuetify/components';

export default {
    props: {
        markdown: {
            type: String,
            required: true
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

            // Initialize the components list
            const components = [];

            // We have to use one big capture group with non-capturing sub groups as otherwise we get a lot of undefined matches.
            // \[[^()[\]]+\]\([^()[\]]*\) is a markdown link
            // \*[^*]+\* is for italic
            // \*\*[^*]+\*\* is for bold
            // \*\*\*[^*]+\*\*\* is for bold and italic
            // -> is for a custom rendered arrow icon
            // \[(?:armor|consumable|relic|skill|traitline|trait|trinket|component|weapon):?[^[\]]+] is for a component
            const nodes = this.markdown.split(/((?:\[[^()[\]]+\]\([^()[\]]*\))|(?:\*[^*]+\*)|(?:\*\*[^*]+\*\*)|(?:\*\*\*[^*]+\*\*\*)|(?:->)|(?:\[(?:armor|consumable|relic|skill|traitline|trait|trinket|component|weapon):?[^[\]]+]))/gi);
            for (let index = 0; index < nodes.length; index++) {
                const node = nodes[index];

                // Rendering empty elements is just overhead which we don't want.
                if(node === null || node === '' || node === undefined) continue;

                // We wanted custom markdown arrows so that's why we create an arrow icon here
                if(node === "->") {
                    components.push({
                        key: getKey(node),
                        type: VIcon,
                        props:{
                            icon: "mdi-arrow-right-thin",
                            class: "vertical-align-middle"
                        }
                    });
                    continue;
                }

                // Handle markdown links
                const linkMatch = node.match(/^\[([^()[\]]+)\]\(([^()[\]]*)\)$/i);
                if(linkMatch !== null) {
                    components.push({
                        key: getKey(node),
                        type: "a",
                        content: linkMatch[1],
                        props: {
                            class: "vertical-align-middle",
                            href: linkMatch[2],
                            // We want links to headers to not open a new page as this would interupt the user flow
                            target: linkMatch[2].startsWith("#") ? "_self" :"_blank",
                            rel: "noopener noreferrer"
                        }
                    })
                    continue;
                }

                // Handle components in the text
                const componentMatch = node.match(/^\[(armor|consumable|relic|skill|traitline|trait|trinket|component|weapon):?([^[\]]+)]$/i);
                if(componentMatch !== null) {
                    const type = componentMatch[1].toLowerCase();
                    const properties = componentMatch[2].split(":");

                    if(type === "armor" && properties.length >= 3) {
                        components.push({
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
                        components.push({
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
                        components.push({
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
                        components.push({
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
                        components.push({
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
                        const displayType = (properties[2] ?? "").toLowerCase();

                        if(displayType === "full") {
                            components.push({
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
                        } else {
                            components.push({
                                key: getKey(node),
                                type: Gw2Specialization,
                                props: {
                                    id: parseInt(properties[0]),
                                    // tile: displayType === "tile",
                                    gw2IconProps: {
                                        class: "vertical-align-middle"
                                    }
                                }
                            });
                        }
                    } else if(type === "trinket" && properties.length >= 2) {
                        components.push({
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
                        components.push({
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
                        components.push({
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
                        components.push({
                            key: getKey(node),
                            type: "span",
                            content: node,
                            props: {
                                class: "vertical-align-middle text-error"
                            }
                        });
                    }
                    continue;
                }

                // In case it's not a special element it's likely plain text.
                // We still have some markdown for this type of text that we need to handle like bold and italic.
                const stylings = [
                    { regex: /^\*\*\*([^*]+)\*\*\*$/i, classes: "bold italic" },
                    { regex: /^\*\*([^*]+)\*\*$/i, classes: "bold" },
                    { regex: /^\*([^*]+)\*$/i, classes: "italic" },
                ];
                let text = node;
                let textClass = "";
                for (const { regex, classes } of stylings) {
                    const match = node.match(regex);
                    if (match) {
                        textClass = classes;
                        text = match[1];
                        break;
                    }
                }

                components.push({
                    key: getKey(node),
                    type: "span",
                    content: text,
                    props: {
                        class: `text-pre-wrap vertical-align-middle ${textClass}`
                    }
                });
                continue;
            }

            return components;
        }
    }
}
</script>

<style scoped>
.vertical-align-middle {
    vertical-align: middle;
}

.bold {
    font-weight: bold;
}

.italic {
    font-style: italic;
}
</style>