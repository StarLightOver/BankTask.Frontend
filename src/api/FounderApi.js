import type {FounderType} from "../Types/FounderType";
import {httpRequest} from "./httpRequest";

export async function getFounder(id: number): FounderType {
    const url = `api/founder/GetFounderById?id=${id}`;

    return await httpRequest(url, 'GET')
        .catch((error) => console.log(`Произошла ошибка при распаковке объекта: ${error}`));
}

export async function deleteFounder(id: number): FounderType {
    const url = `api/founder/DeleteFounder?id=${id}`;

    return await httpRequest(url, 'DELETE')
        .catch((error) => console.log(`Произошла ошибка при распаковке объекта: ${error}`));
}

export async function getFounders(): Array<FounderType> {
    const url = `api/founder/GetFounders`;

    return await httpRequest(url, 'GET')
        .catch((error) => console.log(`Произошла ошибка при распаковке объекта: ${error}`));
}

export async function createFounder(client: FounderType): Promise {
    const url = `api/founder/EditFounder`;

    const body = JSON.stringify({
        ...client,
        id: null
    });

    return await httpRequest(url, 'POST', body)
        .catch((error) => console.log(`Произошла ошибка при распаковке объекта: ${error}`));
}

export async function editFounder(client: FounderType) {
    const url = `api/founder/EditFounder`;

    const body = JSON.stringify({
        ...client
    });

    return await httpRequest(url, 'POST', body)
        .catch((error) => console.log(`Произошла ошибка при распаковке объекта: ${error}`));
}