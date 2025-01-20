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

import { mapValues } from '../runtime';
import type { CardColumn } from './CardColumn';
import {
    CardColumnFromJSON,
    CardColumnFromJSONTyped,
    CardColumnToJSON,
    CardColumnToJSONTyped,
} from './CardColumn';
import type { LabelColor } from './LabelColor';
import {
    LabelColorFromJSON,
    LabelColorFromJSONTyped,
    LabelColorToJSON,
    LabelColorToJSONTyped,
} from './LabelColor';

/**
 * 
 * @export
 * @interface CardOut
 */
export interface CardOut {
    /**
     * 
     * @type {number}
     * @memberof CardOut
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof CardOut
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof CardOut
     */
    description: string;
    /**
     * 
     * @type {number}
     * @memberof CardOut
     */
    boardId: number;
    /**
     * 
     * @type {CardColumn}
     * @memberof CardOut
     */
    column: CardColumn;
    /**
     * 
     * @type {Array<LabelColor>}
     * @memberof CardOut
     */
    labels: Array<LabelColor>;
    /**
     * 
     * @type {Date}
     * @memberof CardOut
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof CardOut
     */
    updatedAt: Date;
}



/**
 * Check if a given object implements the CardOut interface.
 */
export function instanceOfCardOut(value: object): value is CardOut {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('description' in value) || value['description'] === undefined) return false;
    if (!('boardId' in value) || value['boardId'] === undefined) return false;
    if (!('column' in value) || value['column'] === undefined) return false;
    if (!('labels' in value) || value['labels'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('updatedAt' in value) || value['updatedAt'] === undefined) return false;
    return true;
}

export function CardOutFromJSON(json: any): CardOut {
    return CardOutFromJSONTyped(json, false);
}

export function CardOutFromJSONTyped(json: any, ignoreDiscriminator: boolean): CardOut {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'title': json['title'],
        'description': json['description'],
        'boardId': json['boardId'],
        'column': CardColumnFromJSON(json['column']),
        'labels': ((json['labels'] as Array<any>).map(LabelColorFromJSON)),
        'createdAt': (new Date(json['createdAt'])),
        'updatedAt': (new Date(json['updatedAt'])),
    };
}

export function CardOutToJSON(json: any): CardOut {
    return CardOutToJSONTyped(json, false);
}

export function CardOutToJSONTyped(value?: CardOut | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'title': value['title'],
        'description': value['description'],
        'boardId': value['boardId'],
        'column': CardColumnToJSON(value['column']),
        'labels': ((value['labels'] as Array<any>).map(LabelColorToJSON)),
        'createdAt': ((value['createdAt']).toISOString()),
        'updatedAt': ((value['updatedAt']).toISOString()),
    };
}

