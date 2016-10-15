import {Module} from 'com_sabre_ngv_core/modules/Module';
import getService = app.getService;
import DrawerService = app.services.impl.DrawerService;
import {SampleTile} from './views/SampleTile';
import {SampleView} from './views/SampleView';
import {LargeWidgetDrawerConfig} from 'com_sabre_ngv_core/configs/drawer/LargeWidgetDrawerConfig';
import registerService = app.registerService;


export class Main extends Module {
    init(): void {
        super.init();
        // initialize your module here
        const drawerConfig = new LargeWidgetDrawerConfig(SampleTile, SampleView, {
            title: 'SB1'
        });
        getService(DrawerService).addConfig(['shopping-response'], drawerConfig);
    }
}
