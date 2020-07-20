import React, { useState, useEffect } from "react";
import { IFilters, IFieldsData } from "@src/types/filters";
import { STUDIOS } from "@src/config/constants";
import { useDebounce } from "@src/hooks/debounce";
import { isEqual } from "lodash/fp";
import useStyles from "./styles";

import { Grid, Box, IconButton } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import Select from "@src/components/common/Select";
import SortMenu from "@src/components/common/SortMenu";
import ChipsList from "@src/components/common/ChipsList";
import SearchField from "./SearchField";

const INIT_FILTERS: IFieldsData = {
    searchQuery: "",
    city: "waw",
    cityArea: "all",
    services: [],
};

interface IProps {
    fields: IFilters;
    onCityChange: (city: string) => void;
    onFieldsChange: (filters: Omit<IFieldsData, "city">) => void;
}

export const Filters: React.FC<IProps> = ({
    onCityChange,
    onFieldsChange,
    fields: { cities, cityAreas, services },
}) => {
    const classes = useStyles();
    const [dataIsLoading, setDataIsLoading] = useState<boolean>(false);
    const [showClearButton, setShowClearButton] = useState<boolean>(false);
    const [filterData, setFilterData] = useState<IFieldsData>(INIT_FILTERS);

    const [
        debouncedSearchQuery,
        debouncedCity,
        debouncedCityArea,
        debouncedServices,
    ] = [
        useDebounce<string>(
            filterData.searchQuery,
            STUDIOS.FILTERS_DEBOUNCED_INTERVAL,
        ),
        useDebounce<string>(
            filterData.city,
            STUDIOS.FILTERS_DEBOUNCED_INTERVAL,
        ),
        useDebounce<string>(
            filterData.cityArea,
            STUDIOS.FILTERS_DEBOUNCED_INTERVAL,
        ),
        useDebounce<string[]>(
            filterData.services,
            STUDIOS.FILTERS_DEBOUNCED_INTERVAL,
        ),
    ];

    const handleFieldChange = (value: string | string[], fieldName: string) => {
        switch (fieldName) {
            case "city":
                setFilterData({
                    city: value as string,
                    cityArea: "all",
                    searchQuery: "",
                    services: [],
                });
                break;
            case "services":
                setFilterData((prevState: IFieldsData) => ({
                    ...prevState,
                    [fieldName]: value as string[],
                }));
                break;
            default:
                setFilterData((prevState: IFieldsData) => ({
                    ...prevState,
                    [fieldName]: value,
                }));
        }
        setDataIsLoading(true);
    };

    const handleClear = () => {
        setShowClearButton(false);
        setFilterData(INIT_FILTERS);
    };

    useEffect(() => {
        if (debouncedCity) {
            onCityChange(debouncedCity);
            setDataIsLoading(false);
        }
    }, [onCityChange, debouncedCity]);

    useEffect(() => {
        if (debouncedSearchQuery || debouncedCityArea || debouncedServices) {
            onFieldsChange({
                searchQuery: debouncedSearchQuery,
                cityArea: debouncedCityArea,
                services: debouncedServices,
            });
        }
        setDataIsLoading(false);
    }, [
        debouncedSearchQuery,
        debouncedCityArea,
        onFieldsChange,
        debouncedServices,
    ]);

    useEffect(() => setShowClearButton(!isEqual(INIT_FILTERS, filterData)), [
        filterData,
    ]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={5} className={classes.searchFiledWrapper}>
                    <SearchField
                        name="searchQuery"
                        value={filterData.searchQuery}
                        onChange={handleFieldChange}
                        showThrobber={dataIsLoading}
                    />
                </Grid>

                <Grid item xs={7}>
                    <Box display="flex">
                        <Box mr={2}>
                            <Select
                                setDefault
                                name="city"
                                value={filterData.city}
                                options={cities}
                                label="Miasto"
                                labelWidth={50}
                                onChange={handleFieldChange}
                            />
                        </Box>
                        <Box mr={2}>
                            <Select
                                setDefault
                                name="cityArea"
                                value={filterData.cityArea}
                                options={cityAreas[filterData.city]}
                                label="Dzielnica"
                                labelWidth={68}
                                onChange={handleFieldChange}
                            />
                        </Box>
                        {showClearButton && (
                            <Box
                                display="flex"
                                alignItems="center"
                                onClick={handleClear}
                            >
                                <IconButton size="small" color="secondary">
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        )}
                        <Box
                            display="flex"
                            flexGrow={1}
                            alignItems="center"
                            justifyContent="flex-end"
                        >
                            <SortMenu />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item>
                    <ChipsList
                        name="services"
                        allOptionKey="all"
                        value={filterData.services}
                        options={services}
                        onChange={handleFieldChange}
                    />
                </Grid>
            </Grid>
        </>
    );
};
