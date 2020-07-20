import { IIdNameRecord } from "@src/types/api";

export const createCityFields = (obj: any) =>
    obj.reduce(
        (acc: any, next: any) => ({
            ...acc,
            [next.key]: false,
        }),
        {} as { [key: string]: boolean },
    );

export const convertToOptionsList = (list: IIdNameRecord[]) =>
    list.map(({ id, name }) => ({ key: id, name }));
