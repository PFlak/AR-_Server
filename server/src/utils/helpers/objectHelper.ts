export class ObjectHelper {
    constructor(){}

    public static concatObject(obj: Record<string,any>, obj2: Record<string,any>): Record<string,any>{
        return Object.assign(obj, obj2);
    }
}