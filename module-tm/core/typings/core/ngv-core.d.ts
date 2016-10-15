declare namespace app {
    interface AbstractMixinOptions {
    }

    class AbstractMixin {
        protected _stopEvent(e?: Event): void;

        /* Event handling - BEGIN */

        triggerOnEventBus(eventName: string, ...args: any[]): void;

        listenToEventBus(eventName: string, listener: (...args: any[]) => void): void;

        listenToEventBusOnce(eventName: string, listener: (...args: any[]) => void): void;

        trigger(eventName: string, ...args: any[]): void;

        on(eventName: string, listener: (...args: any[]) => void): void;

        once(eventName: string, listener: (...args: any[]) => void): void;

        listenTo(target: AbstractMixin, eventName: string, listener: (...args: any[]) => void): void;

        listenToOnce(target: AbstractMixin, eventName: string, listener: (...args: any[]) => void): void;

        /* Event handling - END */

        toJSON(): JsonType;
    }

    interface AbstractViewOptions extends AbstractMixinOptions {
        events?: {
            [event: string]: string
        };
    }

    class AbstractView<TModel extends AbstractModel> extends AbstractMixin implements AbstractViewOptions {
        events?: {
            [event: string]: string
        };

        constructor(options?: AbstractViewOptions);

        getModel(): TModel;

        render(): void;

        set(attrName: string, value: any): void;

        get(attrName: string): any;

        setCssClass(cssClass: string): void;

        getCssClass(): string;

        addCssClass(cssClass: string): void;
    }

    interface AbstractModelOptions extends AbstractMixinOptions {
        autoPropagateData?: boolean;
    }

    class AbstractModel extends AbstractMixin implements AbstractModelOptions {
        constructor(data?: ModelData, options?: AbstractModelOptions);

        set(attrName: string, value: any): void;

        get(attrName: string): any;
    }

    interface AbstractObjectOptions extends AbstractModelOptions {
    }

    class AbstractObject extends AbstractModel implements AbstractObjectOptions {
        constructor(options?: AbstractObjectOptions);
    }

    type ModelDescriptor<T extends AbstractModelOptions> = Descriptor<T>;

    interface Silenceable {
        silent?: boolean;
    }

    interface AbstractCollectionOptions extends AbstractMixinOptions {
    }

    class AbstractCollection<TModel extends AbstractModel> extends AbstractMixin implements AbstractCollectionOptions {
        constructor(data?: ModelDataList, options?: AbstractCollectionOptions);

        /* Copied and MODIFIED from Backbone typings - BEGIN */

        comparator: ((element: TModel) => number) | ((compare: TModel, to?: TModel) => number);

        add(model: {}|TModel): TModel;
        add(models: ({}|TModel)[]): TModel[];

        pluck(attribute: string): any[];

        push(model: TModel): TModel;

        pop(options?: Silenceable): TModel;

        remove(model: {}|TModel, options?: Silenceable): TModel;
        remove(models: ({}|TModel)[], options?: Silenceable): TModel[];

        reset(models?: TModel[], options?: Silenceable): TModel[];

        set(models?: TModel[], options?: Silenceable): TModel[];

        shift(options?: Silenceable): TModel;

        sort(options?: Silenceable): AbstractCollection<TModel>;

        unshift(model: TModel): TModel;

        where(properties: any): TModel[];

        findWhere(properties: any): TModel;

        all(iterator?: _.ListIterator<TModel, boolean>, context?: any): boolean;

        any(iterator?: _.ListIterator<TModel, boolean>, context?: any): boolean;

        chain(): any;

        collect<TResult>(iterator: _.ListIterator<TModel, TResult>, context?: any): TResult[];

        contains(value: TModel): boolean;

        countBy(iterator?: _.ListIterator<TModel, any>): _.Dictionary<number>;
        countBy(iterator: string): _.Dictionary<number>;

        detect(iterator: _.ListIterator<TModel, boolean>, context?: any): TModel;

        difference(others: TModel[]): TModel[];

        drop(n?: number): TModel[];

        each(iterator: _.ListIterator<TModel, void>, context?: any): TModel[];

        every(iterator: _.ListIterator<TModel, boolean>, context?: any): boolean;

        filter(iterator: _.ListIterator<TModel, boolean>, context?: any): TModel[];

        find(iterator: _.ListIterator<TModel, boolean>, context?: any): TModel;

        findIndex(predicate: _.ListIterator<TModel, boolean>, context?: any): number;

        findLastIndex(predicate: _.ListIterator<TModel, boolean>, context?: any): number;

        first(): TModel;
        first(n: number): TModel[];

        foldl<TResult>(iterator: _.MemoIterator<TModel, TResult>, memo?: TResult, context?: any): TResult;

        foldr<TResult>(iterator: _.MemoIterator<TModel, TResult>, memo?: TResult, context?: any): TResult;

        forEach(iterator: _.ListIterator<TModel, void>, context?: any): TModel[];

        groupBy(iterator: _.ListIterator<TModel, any>, context?: any): _.Dictionary<TModel[]>;
        groupBy(iterator: string, context?: any): _.Dictionary<TModel[]>;

        head(): TModel;
        head(n: number): TModel[];

        include(value: TModel): boolean;

        includes(value: TModel): boolean;

        indexBy(iterator: _.ListIterator<TModel, any>, context?: any): _.Dictionary<TModel>;
        indexBy(iterator: string, context?: any): _.Dictionary<TModel>;

        indexOf(value: TModel, isSorted?: boolean): number;

        initial(): TModel;
        initial(n: number): TModel[];

        inject<TResult>(iterator: _.MemoIterator<TModel, TResult>, memo?: TResult, context?: any): TResult;

        invoke(methodName: string, ...args: any[]): any;

        isEmpty(): boolean;

        last(): TModel;
        last(n: number): TModel[];

        lastIndexOf(value: TModel, from?: number): number;

        map<TResult>(iterator: _.ListIterator<TModel, TResult>, context?: any): TResult[];

        max(iterator?: _.ListIterator<TModel, any>, context?: any): TModel;

        min(iterator?: _.ListIterator<TModel, any>, context?: any): TModel;

        partition(iterator: _.ListIterator<TModel, boolean>): TModel[][];

        reduce<TResult>(iterator: _.MemoIterator<TModel, TResult>, memo?: TResult, context?: any): TResult;

        reduceRight<TResult>(iterator: _.MemoIterator<TModel, TResult>, memo?: TResult, context?: any): TResult;

        reject(iterator: _.ListIterator<TModel, boolean>, context?: any): TModel[];

        rest(n?: number): TModel[];

        sample(): TModel;
        sample(n: number): TModel[];

        select(iterator: _.ListIterator<TModel, boolean>, context?: any): TModel[];

        shuffle(): TModel[];

        size(): number;

        some(iterator?: _.ListIterator<TModel, boolean>, context?: any): boolean;

        sortBy<TSort>(iterator?: _.ListIterator<TModel, TSort>, context?: any): TModel[];
        sortBy(iterator: string, context?: any): TModel[];

        tail(n?: number): TModel[];

        take(): TModel;
        take(n: number): TModel[];

        toArray(): TModel[];

        without(...values: TModel[]): TModel[];

        /* Copied and MODIFIED from Backbone typings - END */
    }

    function registerService(serviceClass: NgvServiceClass, options?: app.services.impl.AbstractServiceOptions): void;

    function getService<T>(serviceClass: NgvServiceClass & Class<T>): T;

    namespace services {
        namespace impl {
            class AbstractService extends AbstractObject implements AbstractServiceOptions {
                constructor(options?: AbstractServiceOptions);
            }

            interface AbstractServiceOptions extends AbstractObjectOptions {
            }

            interface IObjectsService {
                getClassByPath(className: string): NgvClass;
            }

            class ObjectsService extends AbstractService implements IObjectsService {
                getClassByPath(className: string): NgvClass;
            }

            interface IDatesService {
                toIsoDate(date: Date | moment.MomentStatic | string): string;
            }

            class DatesService extends AbstractService implements IDatesService {
                toIsoDate(date: Date | moment.MomentStatic | string): string;
            }

            interface DataModelMatcher {
                (rawData: Object): boolean
            }

            interface IDtoService {
                registerDataModel<T>(matcher: SearchPath | DataModelMatcher, modelDescriptor: ModelDescriptor<T>): void;
            }

            class DtoService extends AbstractService implements IDtoService {
                registerDataModel<T>(matcher: SearchPath | DataModelMatcher, modelDescriptor: ModelDescriptor<T>): void;
            }

            interface IHistoryService {
                fetchHistoricalData(): void;
                addCommand(commandModel: app.common.data.dto.CommandFlow, options: Object): void;
                getCommands(): Array<app.common.data.dto.CommandFlow>;
                getCommand(index: number): app.common.data.dto.CommandFlow;
                getLastCommand(): app.common.data.dto.CommandFlow;
                removeFirstCommand(): void;
                clearCommands(): void;
                isManualCommand(commandFlow: app.common.data.dto.CommandFlow): void;
            }

            class HistoryService extends AbstractService implements IHistoryService {
                fetchHistoricalData(): void

                addCommand(commandModel: app.common.data.dto.CommandFlow, options: Object): void

                getCommands(): Array<app.common.data.dto.CommandFlow>

                getCommand(index: number): app.common.data.dto.CommandFlow

                getLastCommand(): app.common.data.dto.CommandFlow

                removeFirstCommand(): void

                clearCommands(): void

                isManualCommand(commandFlow: app.common.data.dto.CommandFlow): void

            }

            interface IModeService {
                isBrandedFaresEnableMode(): boolean;
                isFexMode(): boolean;
                isFlightVacancyPathFEX(): boolean;
                isMultipleResponseDisplayMode(): boolean;
                isFexDeletePqMode(): boolean;
                isMemoAreaMode(): boolean;
                isPfKeyEditMode(): boolean;
                isPfKeyMode(): boolean;
                isMaskMode(): boolean;
                isExpertOutputMode(): boolean;
                isNoviceOutputMode(): boolean;
                isExpertInputMode(): boolean;
                isNoviceInputMode(): boolean;
                isLayerMode(): boolean;
                isStandardMode(): boolean;
            }

            class ModeService extends AbstractService implements IModeService {
                isBrandedFaresEnableMode(): boolean

                isFexMode(): boolean

                isFlightVacancyPathFEX(): boolean

                isMultipleResponseDisplayMode(): boolean

                isFexDeletePqMode(): boolean

                isMemoAreaMode(): boolean

                isPfKeyEditMode(): boolean

                isPfKeyMode(): boolean

                isMaskMode(): boolean

                isExpertOutputMode(): boolean

                isNoviceOutputMode(): boolean

                isExpertInputMode(): boolean

                isNoviceInputMode(): boolean

                isLayerMode(): boolean

                isStandardMode(): boolean

            }

            interface IAbstractSrwApi {
                sws(url: string, action: string): string;
                swsWithLock(xml: string, action: string, lockId: number): string;
            }

            class AbstractSrwApi extends AbstractService implements IAbstractSrwApi {
                sws(xml: string, action: string): string;
                swsWithLock(xml: string, action: string, lockId: number): string;
            }

            class SrwSyncApi extends AbstractSrwApi {
                sws(xml: string, action: string): string;
                swsWithLock(xml: string, action: string, lockId: number): string;
            }

            class SrwAsyncApi extends AbstractService {
                sws(xml: string, action: string, callback: Object): void;
                swsWithLock(xml: string, action: string, lockId: number, callback: Object): void;
            }

            class ExternalServiceConnector extends AbstractService {
                callService(url: string, method: string, body: string, headers: Object): NgvPromise<Object>;
            }
        }
    }

    namespace common {
        namespace mixins {
            interface WithModeRelatedWidgetOptions<TNovice, TExpert> {
                modeRelatedWidgets: {
                    'novice-output-mode': ViewDescriptor<TNovice>;
                    'expert-output-mode': ViewDescriptor<TExpert>;
                };
            }

            class WithModeRelatedWidget<TNovice, TExpert> implements WithModeRelatedWidgetOptions<TNovice, TExpert> {
                modeRelatedWidgets: {
                    'novice-output-mode': ViewDescriptor<TNovice>;
                    'expert-output-mode': ViewDescriptor<TExpert>;
                };
            }

            class WithoutFocusOnClick {
            }

            class WithHighlightableChildren {
            }

            class WithRetryButton {

            }

            interface WithStickyElementOptions {
                stickySelector?: string;
                stickToTop?: boolean;
                stickToBottom?: boolean;
                stickyScrollWidth?: number;
                scrollContainer?: JQuery;
            }

            class WithStickyElement implements WithStickyElementOptions {
                stickySelector?: string;
                stickToTop?: boolean;
                stickToBottom?: boolean;
                stickyScrollWidth?: number;
                scrollContainer?: JQuery;
            }

            class WithTooltips {

            }

            class Closable {
                open(): void;

                close(): void;

                clopen(): void;
            }
        }

        namespace views {
            interface AbstractActionOptions extends AbstractViewOptions {
                caption?: string;
            }

            class AbstractAction extends AbstractView<AbstractModel> implements AbstractActionOptions {
            }
			
			interface IFrameOptions {
                url:string;
            }

            class IFrame extends AbstractView<AbstractModel> implements IFrameOptions {
                url: string;
            }

        }

        namespace data {
            namespace dto {
                namespace request {
                    abstract class RequestData extends app.AbstractModel {
                        abstract getRequestStructure(): RequestDataStruct;
                    }
                }

                class WithRemotePreferences {

                }

                interface DataOptions extends AbstractModelOptions {
                    dataRoot?: string;
                }

                class Data extends AbstractModel implements DataOptions, WithRemotePreferences {
                    protected fromRoot(): _Chain<Object>;
                }

                class ResponseData extends Data {
                    isScreenOnly(): boolean;
                }

                class EnhancedResponseData extends Data {
                }

                type RequestDataStruct = Object;

                type DataObjectMatcher = (object: app.common.data.dto.Data) => boolean;
                type DataClass<T extends app.common.data.dto.Data> = Class<T>;
                type DataObjectIndex = number;
                type DataFindCondition<T extends app.common.data.dto.Data> = DataObjectMatcher | DataClass<T> | DataObjectIndex;

                type LocalPreference = 'uiBlocking' | 'silent' | 'silentRequest' | 'silentResponse' | 'silentErrors' | 'commandBarInput' | 'manualCommandEquivalent' | 'capture' | 'alreadyHandled' | 'requestSource' | 'shouldRedirectResponsePartition' | 'addToPnrModalConfig'| 'pnrSubjectArea' | string;

                class CommandFlow extends app.AbstractModel {
                    addRequestDataObject<T>(requestDataObject: (RequestDataStruct & T) | app.common.data.dto.request.RequestData): CommandFlow;

                    retrieveData<T extends app.common.data.dto.Data>(condition: DataFindCondition<T>): NgvPromise<T>;

                    cloneRequest(): CommandFlow;

                    setLocalPreference(name: LocalPreference, value: any): CommandFlow;

                    getLocalPreference(name: LocalPreference): any;

                    setLocalPreferences(preferences: {[name: string]: any}): CommandFlow;

                    getLocalPreferences(): {[name: string]: any};
                }
            }

            namespace flight {
                abstract class AbstractFlightSegment extends AbstractModel {
                    getOriginIata(): string;

                    getDestinationIata(): string;

                    getMarketingAirline(): string;

                    getFlightNumber(): number;

                    getDepartureDate(): Date;

                    getLegId(): string;

                    getFlightDetails(): NgvPromise<AbstractFlightSegment>;
                }

                class FlightConnections extends AbstractCollection<FlightConnection> {
                    static createFromSubsegments(subsegments: Array<Object>): FlightConnections;
                }

                class FlightConnection extends AbstractFlightSegment {
                    getFlightSegments(): FlightSegments
                }

                class FlightSegments extends AbstractCollection<FlightSegment> {

                }

                class FlightSegment extends AbstractFlightSegment {
                    getSegmentId(): string;
                }

                class FlightSubsegment extends AbstractFlightSegment {
                }

                interface FlightSegmentStructCommon {
                    '[@StopQuantity]'?: string | number;
                    [key: string]: any
                }

                interface FlightSegmentStructWithFlightNumber extends FlightSegmentStructCommon {
                    '[@FlightNumber]': string | number;
                }

                interface FlightSegmentStructWithDepartureDateTime extends FlightSegmentStructCommon {
                    '[@DepartureDateTime]': string;
                }

                interface FlightSegmentStructWithMarketingAirline extends FlightSegmentStructCommon {
                    '[dx.MarketingAirline]': string;
                }

                type FlightSegmentStruct = FlightSegmentStructWithFlightNumber
                    | FlightSegmentStructWithDepartureDateTime
                    | FlightSegmentStructWithMarketingAirline;

                type FlightSegmentStructs = Array<FlightSegmentStruct>;

                type NormalizedFlightSegmentStructs = Array<Array<FlightSegmentStruct>>;
            }
        }
    }

    namespace widgets {
        namespace container {
            interface OldContainersInterface<TItem> extends AbstractViewOptions {
                enhancedDataPath?: string;
                itemsProperty: string;
                itemDescriptor: ViewDescriptor<TItem>;
            }

            interface ListViewOptions<TItem> extends OldContainersInterface<TItem> {
            }

            class ListView<TItem> extends AbstractView<AbstractModel> implements ListViewOptions<TItem>, app.common.mixins.WithRetryButton {
                itemsProperty: string;
                itemDescriptor: ViewDescriptor<TItem>;
            }

            interface ContainerViewOptions<TItem> extends OldContainersInterface<TItem> {

            }

            class ContainerView<TItem> extends AbstractView<AbstractModel> implements ContainerViewOptions<TItem> {
                itemsProperty: string;
                itemDescriptor: ViewDescriptor<TItem>;
            }
        }
    }
}

declare namespace key {
    const CHANGE: string;
    const END_ITEM: string;
    const NEW_LINE: string;

    const CROSS: string;
    const CROSS_REAL: string;
    const CROSS_HOST: string;

    const END_OF_SELECTION: string;
    const NOT_SIGN: string;
    const POUND: string;

    const CHEVRON: string;

    const BACKSPACE: number;
    const TAB: number;
    const ENTER: number;
    const ESC: number;
    const SPACE: number;
    const ARROW_LEFT: number;
    const ARROW_UP: number;
    const ARROW_RIGHT: number;
    const ARROW_DOWN: number;
}
