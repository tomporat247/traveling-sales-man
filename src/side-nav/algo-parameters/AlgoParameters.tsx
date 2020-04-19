import React from "react";
import SliderInput from "./slider-input/SliderInput";

const AlgoParameters = (props: { disabled: boolean, populationSize: number, onPopulationSizeChange: (size: number) => any, mutationRate: number, onMutationRateChange: (rate: number) => any}) => {

    return (
        <div>
            <SliderInput title='Population size' value={props.populationSize} disabled={props.disabled}
                         onValueChange={props.onPopulationSizeChange}
                         step={5} max={800}/>
            <SliderInput title='Mutation rate' value={props.mutationRate} disabled={props.disabled}
                         onValueChange={props.onMutationRateChange}
                         step={0.01} max={1}/>
        </div>
    );
};

export default AlgoParameters;