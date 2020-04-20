import {LatLng} from "../types/lat-lng";

export const createIndexArray = (maxIndex: number, minIndex: number = 0) =>
    Array.from(Array(maxIndex - minIndex).keys()).map(index => index + minIndex);

export const shuffleArray = <T>(array: T[]): T[] => {
    let currentIndex: number = array.length;
    let temporaryValue: T;
    let randomIndex: number;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

const calculateDistance = (first: LatLng, second: LatLng): number => {
    const xDistance: number = Math.abs(first[0] - second[0]);
    const yDistance: number = Math.abs(first[1] - second[1]);
    return Math.sqrt((xDistance ** 2) + (yDistance ** 2));
};

export const calculateRouteDistance = (route: LatLng[]): number => {
    return route.reduce((acc: number, curr: LatLng, index: number) =>
        acc + calculateDistance(curr, route[(index + 1) % route.length]), 0);
};
