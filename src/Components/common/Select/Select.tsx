import React, { memo, ChangeEvent, useState } from "react";
import { IFilter } from "@src/types/filters";
import useStyles from "./styles";

import {
    FormControl,
    InputLabel,
    Select as SelectUI,
    MenuItem,
} from "@material-ui/core";

interface IProps {
    label: string;
    values: Array<IFilter>;
    labelWidth: number;
    onChange: (event: any) => void;
    setDefault?: boolean;
}

export const Select: React.FC<IProps> = memo(
    ({ label, values, onChange, labelWidth, setDefault }) => {
        const [chosenValue, setChoosenValue] = useState<string>(
            setDefault ? values[0].name : "",
        );

        const classes = useStyles();

        const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
            const chosenValue = event.target.value as string;

            onChange(
                (values.find(item => item.name === chosenValue) as IFilter).key,
            );
            setChoosenValue(chosenValue);
        };

        return (
            <FormControl variant="outlined" className={classes.root}>
                <InputLabel className={classes.label}>{label}</InputLabel>
                <SelectUI
                    labelWidth={labelWidth}
                    value={chosenValue}
                    onChange={handleChange}
                    classes={{ root: classes.select }}
                >
                    {values.map(({ name, key }) => (
                        <MenuItem key={key} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </SelectUI>
            </FormControl>
        );
    },
);
