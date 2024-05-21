import { HttpPostParams } from "@/data/protocols/http";
import { AxiosHttpClient } from "./axios-http-client";
import { faker } from "@faker-js/faker";
import axios from 'axios';
import { mockAxios } from "@/infra/mocks";
import { mockPostRequest } from "@/data/mocks";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosResult = { data: faker.helpers.objectEntry({name: faker.person.firstName}), status: faker.string.numeric() };
mockedAxios.post.mockResolvedValue(mockedAxiosResult);

type SutTypes = {
    sut: AxiosHttpClient;
    mockedAxios: jest.Mocked<typeof axios>;
}

const makeSut = (): SutTypes => {
    const sut = new AxiosHttpClient();
    const mockedAxios = mockAxios();
    return {
        sut,
        mockedAxios
    }
}

describe('AxiosHttpClient', () => {
    test('Should call axios with correct values', async () => {
        const request = mockPostRequest();
        const {sut, mockedAxios} = makeSut();
        await sut.post(request);
        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    })

    test('Should return the correct statusCode and body', async () => {
        const {sut, mockedAxios}  = makeSut();
        const promise =  sut.post(mockPostRequest());
        expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    })
});