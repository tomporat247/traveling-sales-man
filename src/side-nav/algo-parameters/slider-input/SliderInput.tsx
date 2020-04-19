import './SliderInput.css';
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input/Input";
import React from "react";

const SliderInput = (props: { title: string, value: number, onValueChange: (value: number) => any, step?: number, max?: number, min?: number }) => {
    return (
        <div className='slider-input-container'>
            <div className='content'>
                <Typography gutterBottom>
                    {props.title}
                </Typography>
                <Slider
                    value={props.value}
                    step={props.step}
                    min={props.min}
                    max={props.max}
                    onChange={(event: any, newValue: number | number[]) => props.onValueChange(newValue as number)}
                />
            </div>
            <div className='trailing'>
                <Input
                    value={props.value}
                    margin="dense"
                    onChange={(event: any) => props.onValueChange(+event.target.value)}
                    inputProps={{
                        step: props.step,
                        min: props.min,
                        max: props.max,
                        type: 'number',
                    }}
                />
            </div>
        </div>
    );
};

export default SliderInput;
