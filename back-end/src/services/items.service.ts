import { BaseItem, Item,Items } from "../models/items.model";

let items: Items = {
    1: {
        id: 1,
        name: "Newspaper",
        price: 15,
        description: "The jornal of today",
        image: "https://test.com"
    },
    2: {
        id: 2,
        name: "Mangá Naruto",
        price: 35,
        description: "Volume 0",
        image: "https://test.com"
    },
    3: {
        id: 3,
        name: "HQ Antman",
        price: 89,
        description: "Informative",
        image: "https://test.com"
    }
};

export const findAll = async (): Promise<Item[]> => Object.values(items);

export const find = async (id: number): Promise<Item> => items[id];

export const create = async (newItem: BaseItem): Promise<Item> => {

    const id = new Date().valueOf();

    items[id] = {
        id,
        ...newItem,
    };

    return items[id];

};

export const update = async (id: number, itemUpdate: BaseItem): Promise<Item | null> => {

    const item = await find(id);

    if (!item) {
        return null;
    }

    items[id] = { id, ...itemUpdate };

    return items[id];

};

export const remove = async (id: number): Promise<null | void> => {
    const item = await find(id);

    if (!item) {
        return null;
    }

    delete items[id];
    
};