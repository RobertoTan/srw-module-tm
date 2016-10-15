declare type JsonType = JsonPrimitive | JsonArray | JsonObject;

declare type JsonPrimitive = string | number | boolean;

declare interface JsonObject {
    [key: string]: JsonType
}

declare interface JsonArray {
    [key: number]: JsonType
}

declare interface Class<T> extends Function {
    new (...args: Array<any>): T;
}
