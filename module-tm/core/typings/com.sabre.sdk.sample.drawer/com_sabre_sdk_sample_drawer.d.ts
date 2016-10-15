declare module "com_sabre_sdk_sample_drawer" {
    import { Main } from "com_sabre_sdk_sample_drawer/Main";
    export default class com_sabre_sdk_sample_drawer_Module extends Main {
        getExposedClasses(): Object;
    }
}
declare module "com_sabre_sdk_sample_drawer/Main" {
    import { Module } from 'com_sabre_ngv_core/modules/Module';
    export class Main extends Module {
        init(): void;
    }
}
declare module "com_sabre_sdk_sample_drawer/services/ISampleDrawerService" {
    export interface ISampleDrawerService {
        sampleMethod(param: string): string;
    }
}
declare module "com_sabre_sdk_sample_drawer/services/SampleDrawerService" {
    import AbstractService = app.services.impl.AbstractService;
    import { ISampleDrawerService } from "com_sabre_sdk_sample_drawer/services/ISampleDrawerService";
    export class SampleDrawerService extends AbstractService implements ISampleDrawerService {
        static SERVICE_NAME: string;
        sampleMethod(param: string): string;
    }
}
declare module "com_sabre_sdk_sample_drawer/views/SampleDrawerTile" {
    import Tile = app.widgets.drawer.views.elements.Tile;
    import WithoutFocusOnClick = app.common.mixins.WithoutFocusOnClick;
    import FlightSegment = app.common.data.flight.FlightSegment;
    export class SampleDrawerTile extends Tile implements WithoutFocusOnClick {
        selfDrawerContextModelPropagated(cpa: FlightSegment): void;
    }
}
declare module "com_sabre_sdk_sample_drawer/views/SampleDrawerView" {
    import AbstractView = app.AbstractView;
    import AbstractModel = app.AbstractModel;
    import FlightSegment = app.common.data.flight.FlightSegment;
    export class SampleDrawerView extends AbstractView<AbstractModel> {
        selfDrawerContextModelPropagated(cpa: FlightSegment): void;
        private updateModel(data);
        private updateModel2(data);
    }
}
