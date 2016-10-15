declare module "com_sabre_sdk_sample_decisionbar" {
    import { Main } from "com_sabre_sdk_sample_decisionbar/Main";
    export default class com_sabre_sdk_sample_decisionbar_Module extends Main {
        getExposedClasses(): Object;
    }
}
declare module "com_sabre_sdk_sample_decisionbar/Main" {
    import { Module } from 'com_sabre_ngv_core/modules/Module';
    export class Main extends Module {
        init(): void;
    }
}
declare module "com_sabre_sdk_sample_decisionbar/views/HelloWorldTile" {
    import Tile = app.widgets.drawer.views.elements.Tile;
    import FlightConnection = app.common.data.flight.FlightConnection;
    export class HelloWorldTile extends Tile {
        selfDrawerContextModelPropagated(conn: FlightConnection): void;
    }
}
