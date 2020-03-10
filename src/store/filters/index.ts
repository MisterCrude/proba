import FiltersTypes from "./types";
import { EApiStatuses } from "@src/types/api";
import { IRecord } from "@src/types/main";
import { IAction } from "@src/types/store";

export interface IFiltersAction extends IAction<FiltersTypes> {}

export interface IFiltersState {
    fields: {
        cities: IRecord[];
    };
    values: {
        searchQuery: string;
        cityArea: string;
        priceFrom: string;
    };
    fetchStatus: EApiStatuses;
}

export const initialState: IFiltersState = {
    fields: {
        cities: [],
    },
    values: {
        searchQuery: "",
        cityArea: "",
        priceFrom: "",
    },
    fetchStatus: EApiStatuses.IDLE,
};

export default (
    state: IFiltersState = initialState,
    { type, payload }: IFiltersAction,
): IFiltersState => {
    switch (type) {
        case FiltersTypes.FILTERS_FETCH_SUCCESS:
            return {
                ...state,
                fields: payload,
                fetchStatus: EApiStatuses.SUCCESS,
            };

        case FiltersTypes.FILTERS_FETCH_REJECT:
            return {
                ...state,
                fields: {
                    cities: [],
                },
                fetchStatus: EApiStatuses.ERROR,
            };

        case FiltersTypes.FILTERS_SET_FIELDS:
            return {
                ...state,
                values: payload,
            };

        default:
            return state;
    }
};
