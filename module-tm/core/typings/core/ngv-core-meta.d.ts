declare interface NgvViewClass extends Class<app.AbstractView<app.AbstractModel>> {
    new (options?: app.AbstractViewOptions): app.AbstractView<app.AbstractModel>
}

declare interface NgvModelClass extends Class<app.AbstractModel> {
    new (data?: ModelData, options?: app.AbstractModelOptions): app.AbstractModel
}

declare interface NgvObjectClass extends NgvModelClass {
    new (options?: app.AbstractObjectOptions): app.AbstractObject
}

declare interface NgvServiceClass extends NgvObjectClass {
    new (options?: app.services.impl.AbstractServiceOptions): app.services.impl.AbstractService
}

declare interface NgvCollectionClass extends Class<app.AbstractCollection> {
    new (data?: ModelDataList, options?: app.AbstractCollectionOptions): app.AbstractCollection
}

declare type NgvClass = NgvViewClass | NgvModelClass | NgvObjectClass | NgvServiceClass | NgvCollectionClass ;

declare type ModelData = Object;
declare type ModelDataList = Array<ModelData>;

declare type NgvInitOptions = app.AbstractViewOptions | app.AbstractModelOptions | app.AbstractCollectionOptions;

type ClassName = string;
type SearchPath = string;
type EventName = string;

declare interface AnyDescriptor {
    mixins?: Array<ClassName>;
}

declare interface LazyDescriptor extends AnyDescriptor {
    className: ShortLazyDescriptor;
}

declare type ShortLazyDescriptor = ClassName;

declare interface DirectDescriptor<T> extends AnyDescriptor {
    class: ShortDirectDescriptor<T>;
}

declare type ShortDirectDescriptor<T> = Class<T>;

declare type Descriptor<T> = (LazyDescriptor & T)
    | ShortLazyDescriptor
    | (DirectDescriptor<T> & T)
    | ShortDirectDescriptor<T>;

declare type ViewDescriptor<T extends app.AbstractViewOptions> = Descriptor<T>;

declare interface NgvPromise<T> extends JQueryPromise<T> {

}