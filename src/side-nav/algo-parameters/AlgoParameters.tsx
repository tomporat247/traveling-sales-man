import React from "react";
import SliderInput from "./slider-input/SliderInput";

const AlgoParameters = (props: { populationSize: number, onPopulationSizeChange: (value: number) => any, mutationRate: number, onMutationRateChange: (value: number) => any }) => {

    return (
        <div>
            <SliderInput title='Population size' value={props.populationSize}
                         onValueChange={props.onPopulationSizeChange}
                         step={5} max={300}/>
            <SliderInput title='Mutation rate' value={props.mutationRate} onValueChange={props.onMutationRateChange}
                         step={0.01} max={1}/>
        </div>
    );
};

export default AlgoParameters;
