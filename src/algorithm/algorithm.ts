import {AlgoParams} from "./types/algo-params";
import {DNA} from "./types/DNA";
import {calculateRouteDistance, createIndexArray, shuffleArray} from "./algorithm-utils";
import {LatLng} from "../types/lat-lng";
import {crossoverDNAs, mutateDNA} from "./dna-utils";

let params: AlgoParams;
let points: LatLng[];
let population: DNA[];
let generation: number;

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
    generation++;
};

export const getGeneratoion = () => generation;

export const getBestRoute = (): LatLng[] =>
    population.reduce((acc: DNA, curr: DNA) => acc.fitness > curr.fitness ? acc : curr).route
        .map(pointIndex => points[pointIndex]);

export const evolve = () => {
    naturalSelection();
    calculatePopulationFitness();
};

export const initAlgorithm = (algoParams: AlgoParams, travelPoints: LatLng[]) => {
    params = algoParams;
    population = [];
    points = travelPoints;
    generation = 0;

    for (let i = 0; i < params.populationSize; i++) {
        population.push({fitness: -1, route: randomizeRoute()})
    }
    calculatePopulationFitness();
};
