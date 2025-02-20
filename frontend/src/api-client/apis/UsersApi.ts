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
  UserInCreate,
  UserInSearch,
  UserInUpdate,
  UserOut,
  UserOutPublic,
} from '../models/index';
import {
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    UserInCreateFromJSON,
    UserInCreateToJSON,
    UserInSearchFromJSON,
    UserInSearchToJSON,
    UserInUpdateFromJSON,
    UserInUpdateToJSON,
    UserOutFromJSON,
    UserOutToJSON,
    UserOutPublicFromJSON,
    UserOutPublicToJSON,
} from '../models/index';

export interface CreateUserApiUsersPostRequest {
    userInCreate: UserInCreate;
}

export interface SearchUserApiUsersSearchPostRequest {
    userInSearch: UserInSearch;
}

export interface UpdateUserApiUsersMePatchRequest {
    userInUpdate: UserInUpdate;
}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI {

    /**
     * Create User
     */
    async createUserApiUsersPostRaw(requestParameters: CreateUserApiUsersPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserOut>> {
        if (requestParameters['userInCreate'] == null) {
            throw new runtime.RequiredError(
                'userInCreate',
                'Required parameter "userInCreate" was null or undefined when calling createUserApiUsersPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/users`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UserInCreateToJSON(requestParameters['userInCreate']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserOutFromJSON(jsonValue));
    }

    /**
     * Create User
     */
    async createUserApiUsersPost(requestParameters: CreateUserApiUsersPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserOut> {
        const response = await this.createUserApiUsersPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get Me
     */
    async getMeApiUsersMeGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserOut>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("OAuth2PasswordBearer", []);
        }

        const response = await this.request({
            path: `/api/users/me`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserOutFromJSON(jsonValue));
    }

    /**
     * Get Me
     */
    async getMeApiUsersMeGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserOut> {
        const response = await this.getMeApiUsersMeGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Search User
     */
    async searchUserApiUsersSearchPostRaw(requestParameters: SearchUserApiUsersSearchPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserOutPublic>> {
        if (requestParameters['userInSearch'] == null) {
            throw new runtime.RequiredError(
                'userInSearch',
                'Required parameter "userInSearch" was null or undefined when calling searchUserApiUsersSearchPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("OAuth2PasswordBearer", []);
        }

        const response = await this.request({
            path: `/api/users/search`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UserInSearchToJSON(requestParameters['userInSearch']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserOutPublicFromJSON(jsonValue));
    }

    /**
     * Search User
     */
    async searchUserApiUsersSearchPost(requestParameters: SearchUserApiUsersSearchPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserOutPublic> {
        const response = await this.searchUserApiUsersSearchPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update User
     */
    async updateUserApiUsersMePatchRaw(requestParameters: UpdateUserApiUsersMePatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserOut>> {
        if (requestParameters['userInUpdate'] == null) {
            throw new runtime.RequiredError(
                'userInUpdate',
                'Required parameter "userInUpdate" was null or undefined when calling updateUserApiUsersMePatch().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("OAuth2PasswordBearer", []);
        }

        const response = await this.request({
            path: `/api/users/me`,
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: UserInUpdateToJSON(requestParameters['userInUpdate']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserOutFromJSON(jsonValue));
    }

    /**
     * Update User
     */
    async updateUserApiUsersMePatch(requestParameters: UpdateUserApiUsersMePatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserOut> {
        const response = await this.updateUserApiUsersMePatchRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
