import { HttpPostParams } from "@/data/protocols/http";
import { faker } from "@faker-js/faker";
import axios from "axios";

export const mockAxios = (): jest.Mocked<typeof axios> => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockResolvedValue({ 
        data: faker.helpers.objectEntry({name: faker.person.firstName}), 
        status: faker.string.numeric() 
    });

    return mockedAxios;
}