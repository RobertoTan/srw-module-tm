/* tslint:disable */
import * as _0 from "./com_unidiv_travelmoments/views/SampleTile"; namespace exposedClasses.com_unidiv_travelmoments.views { export let SampleTile: any = <any>((<{"SampleTile":any}>_0)["SampleTile"]); }
import * as _1 from "./com_unidiv_travelmoments/views/SampleView"; namespace exposedClasses.com_unidiv_travelmoments.views { export let SampleView: any = <any>((<{"SampleView":any}>_1)["SampleView"]); }

import {Main} from './com_unidiv_travelmoments/Main';

export default class com_unidiv_travelmoments_Module extends Main {
    getExposedClasses() : Object {
        if( this.autoExposeClasses ) {
            return $.extend({}, exposedClasses, super.getExposedClasses())
        } else {
            return super.getExposedClasses();
        }
    }
}
