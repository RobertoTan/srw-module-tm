declare module "com_unidiv_travelmoments" {
    import { Main } from "com_unidiv_travelmoments/Main";
    export default class com_unidiv_travelmoments_Module extends Main {
        getExposedClasses(): Object;
    }
}
declare module "com_unidiv_travelmoments/Main" {
    import { Module } from 'com_sabre_ngv_core/modules/Module';
    export class Main extends Module {
        init(): void;
    }
}
declare module "com_unidiv_travelmoments/views/SampleTile" {
    import Tile = app.widgets.drawer.views.elements.Tile;
    import WithoutFocusOnClick = app.common.mixins.WithoutFocusOnClick;
    import FlightConnections = app.common.data.flight.FlightConnections;
    export class SampleTile extends Tile implements WithoutFocusOnClick {
        selfDrawerContextModelPropagated(cpa: FlightConnections): void;
    }
}
declare module "com_unidiv_travelmoments/views/SampleView" {
    import AbstractView = app.AbstractView;
    import AbstractModel = app.AbstractModel;
    import FlightSegment = app.common.data.flight.FlightSegment;
    export class SampleView extends AbstractView<AbstractModel> {
        selfDrawerContextModelPropagated(cpa: FlightSegment): void;
        processAgain(): void;
    }
}
