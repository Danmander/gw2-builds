import ArmorType from "../enums/armorType";
import { ArmorInfix, TrinketInfix, WeaponInfix} from "../enums/infixUpgrade";
import WeaponType from '../enums/weaponType';

function transformAttribute(attribute) {
    if (attribute === "AgonyResistance") return "Agony Resistance";
    else if (attribute === "BoonDuration") return "Concentration";
    else if (attribute === "ConditionDamage") return "Condition Damage";
    else if (attribute === "ConditionDuration") return "Expertise";
    else if (attribute === "CritDamage") return "Ferocity";
    else if (attribute === "Healing") return "Healing Power";
    else if (attribute === "Power") return "Power";
    else if (attribute === "Precision") return "Precision";
    else if (attribute === "Toughness") return "Toughness";
    else if (attribute === "Vitality") return "Vitality";
    else return attribute;
}

function transformItemType(itemType) {
    if(itemType === "Armor") return "Armor";
    else if(itemType === "Back") return "Back Item";
    else if(itemType === "Bag") return "Bag";
    else if(itemType === "Consumable") return "Consumable";
    else if(itemType === "Container") return "Container";
    else if(itemType === "CraftingMaterial") return "Crafting Material";
    else if(itemType === "Gathering") return "Gathering Tool, Baits or Lure";
    else if(itemType === "Gizmo") return "Gizmo";
    else if(itemType === "JadeTechModule") return "Sensory Array or Service Chip module";
    else if(itemType === "MiniPet") return "Miniature";
    else if(itemType === "PowerCore") return "Power Core";
    else if(itemType === "Relic") return "Relic";
    else if(itemType === "Tool") return "Salvage Kit";
    else if(itemType === "Trait") return "Trait Guide";
    else if(itemType === "Trinket") return "Trinket";
    else if(itemType === "Trophy") return "Trophy";
    else if(itemType === "UpgradeComponent") return "Upgrade Component";
    else if(itemType === "Weapon") return "Weapon";
    else return itemType;
}

function transformArmorType(armorType) {
    if(armorType === ArmorType.Boots) return "Foot Armor";
    else if(armorType === ArmorType.Chest) return "Chest Armor";
    else if(armorType === ArmorType.Gloves) return "Hand Armor";
    else if(armorType === ArmorType.Headgear) return "Head Armor";
    else if(armorType === ArmorType.AquaticHeadgear) return "Aquatic Head Armor";
    else if(armorType === ArmorType.Leggings) return "Leg Armor";
    else if(armorType === ArmorType.Shoulders) return "Shoulder Armor";
    else return armorType;
}

function transformWeaponType(weaponType) {
    if(weaponType === WeaponType.Axe) return "Axe";
    else if(weaponType === WeaponType.Dagger) return "Dagger";
    else if(weaponType === WeaponType.Mace) return "Mace";
    else if(weaponType === WeaponType.Pistol) return "Pistol";
    else if(weaponType === WeaponType.Scepter) return "Scepter";
    else if(weaponType === WeaponType.Sword) return "Sword";
    else if(weaponType === WeaponType.Focus) return "Focus";
    else if(weaponType === WeaponType.Shield) return "Shield";
    else if(weaponType === WeaponType.Torch) return "Torch";
    else if(weaponType === WeaponType.Warhorn) return "Warhorn";
    else if(weaponType === WeaponType.Greatsword) return "Greatsword";
    else if(weaponType === WeaponType.Hammer) return "Hammer";
    else if(weaponType === WeaponType.Longbow) return "Longbow";
    else if(weaponType === WeaponType.Rifle) return "Rifle";
    else if(weaponType === WeaponType.Shortbow) return "Short Bow";
    else if(weaponType === WeaponType.Staff) return "Staff";
    else if(weaponType === WeaponType.Harpoon) return "Harpoon";
    else if(weaponType === WeaponType.Speargun) return "Speargun";
    else if(weaponType === WeaponType.Trident) return "Trident";
    else if(weaponType === WeaponType.LargeBundle) return "Bundle";
    else if(weaponType === WeaponType.SmallBundle) return "Bundle";
    else if(weaponType === WeaponType.Toy) return "Toy";
    else if(weaponType === WeaponType.TwoHandedToy) return "Toy";
    else return weaponType;
}

function transformInfixUpgrade(infix) {
    // TODO: add more infixes
    if([ArmorInfix.Harrier, TrinketInfix.Harrier, WeaponInfix.Harrier].includes(infix)) return "Harrier's";
    else if([ArmorInfix.Giver, TrinketInfix.Giver, WeaponInfix.Giver].includes(infix)) return "Giver's";
    else return infix;
}

export { transformAttribute, transformItemType, transformArmorType, transformWeaponType, transformInfixUpgrade };