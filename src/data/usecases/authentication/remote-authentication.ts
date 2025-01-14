import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'

export class RemoteAuthentication implements Authentication{
    constructor(
        private readonly url: string, 
        private httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
    ) {}

    async auth(params: AuthenticationParams): Promise<AccountModel> {
        const url = this.url
        const httpResponse = await this.httpPostClient.post({
            url,
            body: params
        })

        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok: return httpResponse.body
            case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
            default: throw new UnexpectedError()
        }
    } 
}