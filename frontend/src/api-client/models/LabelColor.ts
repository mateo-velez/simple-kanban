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


/**
 * 
 * @export
 */
export const LabelColor = {
    Red: 'red',
    Orange: 'orange',
    Yellow: 'yellow',
    Green: 'green',
    Blue: 'blue',
    Purple: 'purple',
    Gray: 'gray'
} as const;
export type LabelColor = typeof LabelColor[keyof typeof LabelColor];


export function instanceOfLabelColor(value: any): boolean {
    for (const key in LabelColor) {
        if (Object.prototype.hasOwnProperty.call(LabelColor, key)) {
            if (LabelColor[key as keyof typeof LabelColor] === value) {
                return true;
            }
        }
    }
    return false;
}

export function LabelColorFromJSON(json: any): LabelColor {
    return LabelColorFromJSONTyped(json, false);
}

export function LabelColorFromJSONTyped(json: any, ignoreDiscriminator: boolean): LabelColor {
    return json as LabelColor;
}

export function LabelColorToJSON(value?: LabelColor | null): any {
    return value as any;
}

export function LabelColorToJSONTyped(value: any, ignoreDiscriminator: boolean): LabelColor {
    return value as LabelColor;
}

