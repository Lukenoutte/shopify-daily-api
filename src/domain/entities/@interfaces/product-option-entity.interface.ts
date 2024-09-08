export interface IProductOptionData {
    id: number;
    product_id: number;
    name: string;
    position: number;
    values: string[];
}

export interface IProductOption {
    originId: number;
    originProductId: number;
    name: string;
    position: number;
    values: string[];
}

export interface IProductOptionEntity extends IProductOption {
    getArray: () => any[];
}