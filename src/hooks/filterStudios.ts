import { useState, useEffect } from "react";
import { IStudio } from "@src/types/studio";
import { IFieldsData } from "@src/types/filters";
import { hasSubsring } from "@src/utils/common";

export const useFilterStudios = (
    studios: IStudio[],
    fields: Omit<IFieldsData, "city">,
) => {
    const [filteredStudios, setFilteredStudios] = useState<IStudio[]>(studios);

    useEffect(() => {
        const { searchQuery, cityArea, priceTo } = fields;

        const studiosList = studios.filter((studio: IStudio) => {
            const {
                name,
                price: { from },
                address: { cityArea: area, street },
            } = studio;

            const filterBySearchQuery: boolean =
                hasSubsring(name, searchQuery) ||
                hasSubsring(street, searchQuery);
            const filterByPrice = from <= priceTo || priceTo === "all";
            const filterByCityArea =
                cityArea === area.key || cityArea === "all";

            return filterBySearchQuery && filterByPrice && filterByCityArea;
        });

        setFilteredStudios(studiosList);
    }, [setFilteredStudios, fields, studios]);

    return filteredStudios;
};