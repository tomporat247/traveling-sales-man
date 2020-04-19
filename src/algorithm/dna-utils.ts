import {DNA} from "./types/DNA";

export const crossoverDNAs = (partnerA: DNA, partnerB: DNA): DNA => {
    const child: DNA = {fitness: -1, route: []};
    const childP1: number[] = [];

    const geneA: number = Math.floor(Math.random() * partnerA.route.length);
    const geneB: number = Math.floor(Math.random() * partnerA.route.length);

    const startGene: number = Math.min(geneA, geneB);
    const endGene: number = Math.max(geneA, geneB);

    for (let i = startGene; i < endGene; i++) {
        childP1.push(partnerA.route[i]);
    }

    const childP2: number[] =
        partnerB.route.filter(cityIndex => childP1.findIndex(index => index === cityIndex) === -1);

    child.route = childP1.concat(childP2);
    return child
};

export const mutateDNA = (dna: DNA, mutationRate: number) => {
    for (let i = 0; i < dna.route.length; i++) {
        if (Math.random() < mutationRate) {
            const swapWithIndex: number = Math.floor(Math.random() * dna.route.length);
            const currentCityIndex: number = dna.route[i];
            dna.route[i] = dna.route[swapWithIndex];
            dna.route[swapWithIndex] = currentCityIndex;
        }
    }
};
