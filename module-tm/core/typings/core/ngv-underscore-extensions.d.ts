interface _Chain<T> {
    get(path: string): _ChainSingle<any>;

    get<TResult>(path: string): _ChainSingle<TResult>;

    get<TResult extends Array<any>>(path: string): _Chain<TResult>;

    get<TArray extends Array<Array<any>>>(path: string): _ChainOfArrays<TArray>;
}