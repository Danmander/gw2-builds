import { defineStore } from 'pinia';
import { debouncedBatch } from '../services/batchService';

export const useDataStore = defineStore('data', () => {
    // Batches
    const batchWaitInMs = 250;
    const batchSkillRequest = debouncedBatch((requests) => getResources('skills', requests), batchWaitInMs);
    const batchTraitRequest = debouncedBatch((requests) => getResources('traits', requests), batchWaitInMs);
    const batchTraitLineRequest = debouncedBatch((requests) => getResources('specializations', requests), batchWaitInMs);
    const batchItemRequest = debouncedBatch((requests) => getResources('items', requests), batchWaitInMs);
    const batchItemStatRequest = debouncedBatch((requests) => getResources('itemstats', requests), batchWaitInMs);

    // Cache
    const resourceCache = {
        skills: {},
        traits: {},
        specializations: {},
        items: {},
        itemstats: {}
    };

    /**
     * @param {String} resourceType Which API resource to retrieve
     * @param {{ id: Number, resolve: (value: any) => void, reject: (reason?: any) => void }[]} skillIdRequests 
     */
    function getResources(resourceType, requests) {
        fetch(`https://api.guildwars2.com/v2/${resourceType}?ids=${requests.map(request => request.id).join(',')}`)
            .then(async (response) => {
                const data = await response.json();
                requests.forEach(resourceRequest => {
                    const resourceData = data.find((item) => item.id === resourceRequest.id);
                    resourceRequest.resolve(resourceData);
                });
            }).catch((error) => {
                requests.forEach(skillRequest => skillRequest.reject(error));
            });
    }

    function getSkill(skillId) {
        return new Promise((resolve, reject) => {
            if (resourceCache.skills[skillId] !== undefined) {
                resolve(resourceCache.skills[skillId]);
                return;
            }

            batchSkillRequest({
                id: skillId,
                resolve: (skillData) => {
                    resourceCache.skills[skillId] = skillData;
                    resolve(skillData);
                },
                reject: reject
            });
        });
    }
    function getTrait(traitId) {
        return new Promise((resolve, reject) => {
            if (resourceCache.traits[traitId] !== undefined) {
                resolve(resourceCache.traits[traitId]);
                return;
            }

            batchTraitRequest({
                id: traitId,
                resolve: (traitData) => {
                    resourceCache.traits[traitId] = traitData;
                    resolve(traitData);
                },
                reject: reject
            });
        });
    }
    function getTraitLine(traitLineId) {
        return new Promise((resolve, reject) => {
            if (resourceCache.specializations[traitLineId] !== undefined) {
                resolve(resourceCache.specializations[traitLineId]);
                return;
            }

            batchTraitLineRequest({
                id: traitLineId,
                resolve: (traitLineData) => {
                    resourceCache.specializations[traitLineId] = traitLineData;
                    resolve(traitLineData);
                },
                reject: reject
            });
        });
    }
    function getItem(itemId) {
        return new Promise((resolve, reject) => {
            if (resourceCache.items[itemId] !== undefined) {
                resolve(resourceCache.items[itemId]);
                return;
            }

            batchItemRequest({
                id: itemId,
                resolve: (itemData) => {
                    resourceCache.items[itemId] = itemData;
                    resolve(itemData);
                },
                reject: reject
            });
        });
    }
    function getItemStat(infixId) {
        return new Promise((resolve, reject) => {
            if (resourceCache.itemstats[infixId] !== undefined) {
                resolve(resourceCache.itemstats[infixId]);
                return;
            }

            batchItemStatRequest({
                id: infixId,
                resolve: (itemStatData) => {
                    resourceCache.itemstats[infixId] = itemStatData;
                    resolve(itemStatData);
                },
                reject: reject
            });
        });
    }

    function getAllTraitLines() {
        return new Promise((resolve, reject) => {
            fetch("https://api.guildwars2.com/v2/specializations?ids=all")
                .then(async (response) => {
                    resolve(await response.json());
                }).catch((error) => {
                    reject(error);
                });
        });
    }

    return {
        getSkill, getTrait, getTraitLine, getItem, getItemStat, getAllTraitLines // actions
    }
});