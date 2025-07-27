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

    /**
     * @param {String} resourceType Which API resource to retrieve
     * @param {{ id: Number, resolve: (value: any) => void, reject: (reason?: any) => void }[]} skillIdRequests 
     */
    function getResources(resourceType, requests) {
        fetch(`https://api.guildwars2.com/v2/${resourceType}?ids=${requests.map(request => request.id).join(',')}`).then(async (response) => {
            const data = await response.json();
            requests.forEach(skillRequest => {
                const skillData = data.find((item) => item.id === skillRequest.id);
                skillRequest.resolve(skillData);
            });
        }).catch((error) => {
            requests.forEach(skillRequest => skillRequest.reject(error));
        });
    }

    function getSkill(skillId) {
        return new Promise((resolve, reject) => {
            batchSkillRequest({
                id: skillId,
                resolve: resolve,
                reject: reject
            });
        });
    }
    function getTrait(traitId) {
        return new Promise((resolve, reject) => {
            batchTraitRequest({
                id: traitId,
                resolve: resolve,
                reject: reject
            });
        });
    }
    function getTraitLine(traitLineId) {
        return new Promise((resolve, reject) => {
            batchTraitLineRequest({
                id: traitLineId,
                resolve: resolve,
                reject: reject
            });
        });
    }
    function getItem(itemId) {
        return new Promise((resolve, reject) => {
            batchItemRequest({
                id: itemId,
                resolve: resolve,
                reject: reject
            });
        });
    }
    function getItemStat(infixId) {
        return new Promise((resolve, reject) => {
            batchItemStatRequest({
                id: infixId,
                resolve: resolve,
                reject: reject
            });
        });
    }

    return {
        getSkill, getTrait, getTraitLine, getItem, getItemStat // actions
    }
});