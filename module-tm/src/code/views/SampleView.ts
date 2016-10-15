import {Template} from 'com_sabre_ngv_core/decorators/classes/view/Template';
import AbstractView = app.AbstractView;
import AbstractModel = app.AbstractModel;
import getService = app.getService;
import FlightSegment = app.common.data.flight.FlightSegment;

@Template('com_unidiv_travelmoments:SampleView')
export class SampleView extends AbstractView<AbstractModel> {

    selfDrawerContextModelPropagated(cpa: FlightSegment) {
        this.render();
    }

    processAgain() {
        this.render();
    }
}
