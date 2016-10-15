declare namespace app.services.impl {
    type DrawerGroup = string;
    type DrawerGroups = DrawerGroup[];

    interface DrawerConfig {
    }

    type TileWidgetDrawerConfigType = 'tile-widget';

    interface ITileWidgetDrawerConfig<T> extends DrawerConfig {
        type: TileWidgetDrawerConfigType;
        tile: ViewDescriptor<T>;
    }

    type SmallWidgetDrawerConfigType = 'small-widget';

    interface ISmallWidgetDrawerConfig<T, U> extends DrawerConfig {
        type: SmallWidgetDrawerConfigType;
        tile: ViewDescriptor<T>;
        widget: ViewDescriptor<U>;
    }

    type LargeWidgetDrawerConfigType = 'large-widget';

    interface ILargeWidgetDrawerConfig<T, U> extends DrawerConfig {
        type: LargeWidgetDrawerConfigType;
        tile: ViewDescriptor<T>;
        widget: ViewDescriptor<U>;
        modalOptions?: app.widgets.layer.views.ModalOptions;
    }

    interface IDrawerService extends AbstractService {
        addConfig<T extends DrawerConfig>(drawerGroups: DrawerGroups, config: T): void;
    }

    class DrawerService extends AbstractService implements IDrawerService {
        addConfig<T extends DrawerConfig>(drawerGroups: DrawerGroups, config: T): void;
    }
}

declare namespace app.widgets.drawer {
    namespace views {
        namespace elements {
            import AbstractAction = app.common.views.AbstractAction;
            import AbstractActionOptions = app.common.views.AbstractActionOptions;

            interface TileOptions extends AbstractActionOptions {

            }

            type StringTileContent = string;

            interface TileContent {
                contentTitle?: string;
                footer?: string;
                contents: Array<{
                    title?: string;
                    content: string;
                }>
            }

            class Tile extends AbstractAction implements TileOptions {
                setDataContent(model: StringTileContent | TileContent): void;
            }
        }
    }
}