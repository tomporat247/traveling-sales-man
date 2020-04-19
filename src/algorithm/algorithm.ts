import {AlgoParams} from "./types/algo-params";
import {DNA} from "./types/DNA";
import {calculateRouteDistance, createIndexArray, shuffleArray} from "./algorithm-utils";
import {LatLng} from "../types/lat-lng";
import {crossoverDNAs, mutateDNA} from "./dna-utils";
import {Generation} from "./types/generation";
import {BestRoute} from "./types/best-route";

let params: AlgoParams;
let points: LatLng[];
let population: DNA[];
let generation: Generation;

const randomizeRoute = (): number[] => {
    return shuffleArray(createIndexArray(points.length));
};

const calculateDNAFitness = (dna: DNA) => {
    if (dna.fitness === -1) {
        dna.fitness = 1 / calculateRouteDistance(dna.route.map(index => points[index]));
    }
};

const calculatePopulationFitness = () => {
    population.forEach(calculateDNAFitness);
};

// const sortPopulationByFitness = () => {
//     population.sort((a: DNA, b: DNA) => b.fitness - a.fitness);
// };

const selectDNAForBreeding = (totalFitness: number): DNA => {
    const random: number = Math.random();
    let probability = 0;

    for (const dna of population) {
        probability += (dna.fitness / totalFitness);
        if (random < probability) {
            return dna;
        }
    }

    return population[0];
};

const naturalSelection = () => {
    const total: number = population.reduce((acc: number, curr: DNA) => acc + curr.fitness, 0);
    const newPopulation: DNA[] = [];

    population.forEach(() => {
        const partnerA: DNA = selectDNAForBreeding(total);
        const partnerB: DNA = selectDNAForBreeding(total);
        const child: DNA = crossoverDNAs(partnerA, partnerB);
        mutateDNA(child, params.mutationRate);
        newPopulation.push(child);
    });
    population = newPopulation;
};

export const getGeneration = (): Generation => generation;

export const getBestRoute = (): BestRoute => {
    const bestDNA: DNA = population.reduce((acc: DNA, curr: DNA) => acc.fitness > curr.fitness ? acc : curr);
    return {
        route: bestDNA.route.map(pointIndex => points[pointIndex]),
        totalDistance: (1 / bestDNA.fitness)
    };
};

export const evolve = () => {
    const start: number = performance.now();
    naturalSelection();
    calculatePopulationFitness();
    const end: number = performance.now();

    generation.count++;
    generation.executionTimeInMS = end - start;
};

export const initAlgorithm = (algoParams: AlgoParams, travelPoints: LatLng[]) => {
    params = algoParams;
    population = [];
    points = travelPoints;
    generation = {count: 0, executionTimeInMS: -1};

    for (let i = 0; i < params.populationSize; i++) {
        population.push({fitness: -1, route: randomizeRoute()})
    }
    calculatePopulationFitness();
};