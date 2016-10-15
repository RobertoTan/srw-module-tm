declare module "com_sabre_ngv_core" {
    import { Main } from "com_sabre_ngv_core/Main";
    export default class com_sabre_ngv_core_Module extends Main {
        getExposedClasses(): Object;
    }
}
declare module "com_sabre_ngv_core/Main" {
    import { Module } from "com_sabre_ngv_core/modules/Module";
    export class Main extends Module {
    }
}
declare module "com_sabre_ngv_core/helpers/InitializeMethodWrapper" {
    import { MethodWrapper } from "com_sabre_ngv_core/helpers/MethodWrapper";
    import AbstractViewOptions = app.AbstractViewOptions;
    import AbstractModelOptions = app.AbstractModelOptions;
    import AbstractCollectionOptions = app.AbstractCollectionOptions;
    export type Argument0 = AbstractViewOptions | ModelData | ModelDataList;
    export type Argument1 = AbstractModelOptions | AbstractCollectionOptions;
    export type Signature = (data?: Argument0, options?: Argument1) => void;
    export class InitializeMethodWrapper<T> extends MethodWrapper {
        constructor(initialOptions: T);
    }
}
declare module "com_sabre_ngv_core/helpers/MethodWrapper" {
    export type Signature = (...args: any[]) => any;
    export type WrappingSignature = (originalMethod: Signature, ...args: any[]) => any;
    export class MethodWrapper {
        private methodName;
        private wrapper;
        constructor(methodName: string, wrapper: WrappingSignature);
        protected getWrapper(): WrappingSignature;
        protected getMethodName(): string;
        wrap(target: NgvClass): void;
    }
}
declare module "com_sabre_ngv_core/helpers/PrototypeExtender" {
    export type PrototypeExtension = {
        [key: string]: any;
    };
    export class PrototypeExtender {
        private prototypeExtension;
        constructor(prototypeExtension: PrototypeExtension);
        extend(target: Class<any>): void;
    }
}
declare module "com_sabre_ngv_core/modules/Module" {
    import { ModuleManifest } from "com_sabre_ngv_core/modules/ModuleManifest";
    export abstract class Module {
        private manifest;
        protected autoExposeClasses: boolean;
        constructor(manifest: ModuleManifest);
        init(): void;
        getManifest(): ModuleManifest;
        getName(): String;
        getExposedClasses(): Object;
    }
}
declare module "com_sabre_ngv_core/modules/ModuleManifest" {
    export interface ModuleManifest {
        name: string;
        meta?: Object;
        dependencies?: Array<string>;
    }
}
declare module "com_sabre_ngv_core/configs/drawer/LargeWidgetDrawerConfig" {
    import ILargeWidgetDrawerConfig = app.services.impl.ILargeWidgetDrawerConfig;
    import ModalOptions = app.widgets.layer.views.ModalOptions;
    export class LargeWidgetDrawerConfig<T, U> implements ILargeWidgetDrawerConfig<T, U> {
        type: app.services.impl.LargeWidgetDrawerConfigType;
        tile: ViewDescriptor<T>;
        widget: ViewDescriptor<U>;
        modalOptions?: ModalOptions;
        constructor(tile: ViewDescriptor<T>, widget: ViewDescriptor<U>, modalOptions?: ModalOptions);
    }
}
declare module "com_sabre_ngv_core/configs/drawer/SmallWidgetDrawerConfig" {
    import ISmallWidgetDrawerConfig = app.services.impl.ISmallWidgetDrawerConfig;
    export class SmallWidgetDrawerConfig<T, U> implements ISmallWidgetDrawerConfig<T, U> {
        type: app.services.impl.SmallWidgetDrawerConfigType;
        tile: ViewDescriptor<T>;
        widget: ViewDescriptor<U>;
        constructor(tile: ViewDescriptor<T>, widget: ViewDescriptor<U>);
    }
}
declare module "com_sabre_ngv_core/configs/drawer/TileWidgetDrawerConfig" {
    import ITileWidgetDrawerConfig = app.services.impl.ITileWidgetDrawerConfig;
    export class TileWidgetDrawerConfig<T> implements ITileWidgetDrawerConfig<T> {
        type: app.services.impl.TileWidgetDrawerConfigType;
        tile: ViewDescriptor<T>;
        constructor(tile: ViewDescriptor<T>);
    }
}
declare module "com_sabre_ngv_core/decorators/classes/Initial" {
    export function Initial<T extends NgvInitOptions>(initialOptions: T): (target: NgvClass & Class<T>) => void;
}
declare module "com_sabre_ngv_core/decorators/classes/Mixin" {
    import { PrototypeExtension } from "com_sabre_ngv_core/helpers/PrototypeExtender";
    export function Mixin(mixin: PrototypeExtension): (target: NgvClass) => void;
}
declare module "com_sabre_ngv_core/decorators/methods/Bound" {
    export function Bound(): (target: {
        [key: string]: any;
    }, methodName: string) => void;
}
declare module "com_sabre_ngv_core/decorators/methods/Cache" {
    export interface CacheDecoratorOptions {
        hashFunc?: (...args: any[]) => string;
        cacheFunc?: (currentValue: any) => any;
        id?: string;
        dismissEvents?: Array<EventName>;
    }
    export function Cache(options?: CacheDecoratorOptions): (target: {
        [key: string]: any;
    }, methodName: string) => void;
}
declare module "com_sabre_ngv_core/decorators/classes/view/CssClass" {
    export interface CssClassDecoratorOptions {
        overwrite?: boolean;
    }
    export function CssClass(cssClassName: string, options?: CssClassDecoratorOptions): (target: NgvViewClass) => void;
}
declare module "com_sabre_ngv_core/decorators/classes/view/Template" {
    export function Template(templateName: string): (target: NgvViewClass) => void;
}
