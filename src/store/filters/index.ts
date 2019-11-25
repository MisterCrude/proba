import FiltersTypes from "./types";
import { EApiStatuses } from "@src/types/api";
import { ICityFilter } from "@src/types/filters";
import { IAction } from "@src/types/store";

export interface IFiltersState {
  fields: {
    cities: ICityFilter[];
  };
  fetchStatus: EApiStatuses;
}

export const initialState: IFiltersState = {
  fields: {
    cities: [],
  },
  fetchStatus: EApiStatuses.IDLE,
};

export default (
  state: IFiltersState = initialState,
  { type, payload }: IAction,
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

    default:
      return state;
  }
};