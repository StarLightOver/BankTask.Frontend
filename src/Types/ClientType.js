export type ClientFoundersType = {
    id: number,
};

export type ClientType = {
    id: number,
    inn: number,
    name: string,
    type: string,
    founders: Array<ClientFoundersType>,
};