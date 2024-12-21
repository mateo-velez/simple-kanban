/* tslint:disable */
/* eslint-disable */
/**
 * Simple Kanban API
 * A simple kanban API
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  HTTPValidationError,
  Token,
} from '../models/index';
import {
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    TokenFromJSON,
    TokenToJSON,
} from '../models/index';

export interface LoginAuthTokensPostRequest {
    username: string;
    password: string;
    grantType?: string | null;
    scope?: string;
    clientId?: string | null;
    clientSecret?: string | null;
}

/**
 * 
 */
export class AuthApi extends runtime.BaseAPI {

    /**
     * Login
     */
    async loginAuthTokensPostRaw(requestParameters: LoginAuthTokensPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Token>> {
        if (requestParameters['username'] == null) {
            throw new runtime.RequiredError(
                'username',
                'Required parameter "username" was null or undefined when calling loginAuthTokensPost().'
            );
        }

        if (requestParameters['password'] == null) {
            throw new runtime.RequiredError(
                'password',
                'Required parameter "password" was null or undefined when calling loginAuthTokensPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const consumes: runtime.Consume[] = [
            { contentType: 'application/x-www-form-urlencoded' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters['grantType'] != null) {
            formParams.append('grant_type', requestParameters['grantType'] as any);
        }

        if (requestParameters['username'] != null) {
            formParams.append('username', requestParameters['username'] as any);
        }

        if (requestParameters['password'] != null) {
            formParams.append('password', requestParameters['password'] as any);
        }

        if (requestParameters['scope'] != null) {
            formParams.append('scope', requestParameters['scope'] as any);
        }

        if (requestParameters['clientId'] != null) {
            formParams.append('client_id', requestParameters['clientId'] as any);
        }

        if (requestParameters['clientSecret'] != null) {
            formParams.append('client_secret', requestParameters['clientSecret'] as any);
        }

        const response = await this.request({
            path: `/auth/tokens`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TokenFromJSON(jsonValue));
    }

    /**
     * Login
     */
    async loginAuthTokensPost(requestParameters: LoginAuthTokensPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Token> {
        const response = await this.loginAuthTokensPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
