import {DNA} from "./types/DNA";

const getDNARouteRandomIndex = (dna: DNA) => Math.floor(Math.random() * dna.route.length);

export const crossoverDNAs = (partnerA: DNA, partnerB: DNA): DNA => {
    const child: DNA = {fitness: -1, route: []};
    const firstRoutePart: number[] = [];

    const geneA: number = getDNARouteRandomIndex(partnerA);
    const geneB: number = getDNARouteRandomIndex(partnerB);

    const startGene: number = Math.min(geneA, geneB);
    const endGene: number = Math.max(geneA, geneB);

    for (let i = startGene; i < endGene; i++) {
        firstRoutePart.push(partnerA.route[i]);
    }

    const secondRoutePart: number[] = partnerB.route.filter(cityIndex => !firstRoutePart.includes(cityIndex));
    child.route = [...firstRoutePart, ...secondRoutePart];

    return child
};

export const mutateDNA = (dna: DNA, mutationRate: number) => {
    if (Math.random() < mutationRate) {
        const mutationsAmount: number = getDNARouteRandomIndex(dna);
        for (let i = 0; i < mutationsAmount; i++) {
            const firstIndex: number = getDNARouteRandomIndex(dna);
            const secondIndex: number = getDNARouteRandomIndex(dna);
            const firstValue: number = dna.route[firstIndex];
            dna.route[firstIndex] = dna.route[secondIndex];
            dna.route[secondIndex] = firstValue;
        }
    }
};
