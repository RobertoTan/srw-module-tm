import Tile = app.widgets.drawer.views.elements.Tile;
import TileOptions = app.widgets.drawer.views.elements.TileOptions;
import {Initial} from 'com_sabre_ngv_core/decorators/classes/Initial';
import WithoutFocusOnClick = app.common.mixins.WithoutFocusOnClick;
import FlightConnections = app.common.data.flight.FlightConnections;
import {Mixin} from 'com_sabre_ngv_core/decorators/classes/Mixin';

@Initial<TileOptions>({
    caption: 'Drawer Sample'
})

@Mixin(WithoutFocusOnClick)
export class SampleTile extends Tile implements WithoutFocusOnClick {
    selfDrawerContextModelPropagated(cpa: FlightConnections) {
    this.setDataContent('Decision Support');
    }
}
