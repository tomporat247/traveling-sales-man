import React, {useState} from "react";
import SliderInput from "./slider-input/SliderInput";
import {AlgoParams} from "../../types/algo-params";

const AlgoParameters = (props: { disabled: boolean, onAlgoParamsChange: (value: AlgoParams) => any}) => {
    const [populationSize, setPopulationSize] = useState(20);
    const [mutationRate, setMutationRate] = useState(0.02);

    const updatePopulationSize = (size: number) => {
        setPopulationSize(size);
        props.onAlgoParamsChange({mutationRate, populationSize});
    };

    const updateMutationRate = (rate: number) => {
        setMutationRate(rate);
        props.onAlgoParamsChange({mutationRate, populationSize});
    };

    return (
        <div>
            <SliderInput title='Population size' value={populationSize} disabled={props.disabled}
                         onValueChange={updatePopulationSize}
                         step={5} max={300}/>
            <SliderInput title='Mutation rate' value={mutationRate} disabled={props.disabled}
                         onValueChange={updateMutationRate}
                         step={0.01} max={1}/>
        </div>
    );
};

export default AlgoParameters;
