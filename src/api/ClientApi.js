import type {ClientType} from "../Types/ClientType";
import {httpRequest} from "./httpRequest";

export async function getClient(id: number): ClientType {
    const url = `api/client/GetClientById?id=${id}`;

    return await httpRequest(url, 'GET')
        .catch((error) => console.log(`Произошла ошибка при распаковке объекта: ${error}`));
}

export async function deleteClient(id: number) {
    const url = `api/client/DeleteClient?id=${id}`;

    return await httpRequest(url, 'DELETE')
        .catch((error) => console.log(`Произошла ошибка при распаковке объекта: ${error}`));
}

export async function getClients(): Array<ClientType> {
    const url = `api/client/GetClients`;

    return await httpRequest(url, 'GET')
        .catch((error) => console.log(`Произошла ошибка при распаковке объекта: ${error}`));
}

export async function createClient(client: ClientType) {
    const url = `api/client/EditClient`;
    
    const body = JSON.stringify({
            ...client,
            id: null
        });

    return await httpRequest(url, 'POST', body)
        .catch((error) => console.log(`Произошла ошибка при распаковке объекта: ${error}`));
}

export async function editClient(client: ClientType) {
    const url = `api/client/EditClient`;

    const body = JSON.stringify({
        ...client
    });

    return await httpRequest(url, 'POST', body)
        .catch((error) => console.log(`Произошла ошибка при распаковке объекта: ${error}`));
}