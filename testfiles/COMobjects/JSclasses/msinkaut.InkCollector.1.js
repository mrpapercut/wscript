class msinkaut_inkcollector_1 {
    constructor() {
        // bool AutoRedraw () {get} {set}
        this.AutoRedraw = undefined;

        // bool CollectingInk () {get}
        this.CollectingInk = undefined;

        // InkCollectionMode CollectionMode () {get} {set}
        this.CollectionMode = undefined;

        // IInkCursors Cursors () {get}
        this.Cursors = undefined;

        // IInkDrawingAttributes DefaultDrawingAttributes () {get} {set by ref}
        this.DefaultDrawingAttributes = undefined;

        // Variant DesiredPacketDescription () {get} {set}
        this.DesiredPacketDescription = undefined;

        // bool DynamicRendering () {get} {set}
        this.DynamicRendering = undefined;

        // bool Enabled () {get} {set}
        this.Enabled = undefined;

        // LONG_PTR hWnd () {get} {set}
        this.hWnd = undefined;

        // IInkDisp Ink () {get} {set by ref}
        this.Ink = undefined;

        // int MarginX () {get} {set}
        this.MarginX = undefined;

        // int MarginY () {get} {set}
        this.MarginY = undefined;

        // IPictureDisp MouseIcon () {get} {set} {set by ref}
        this.MouseIcon = undefined;

        // InkMousePointer MousePointer () {get} {set}
        this.MousePointer = undefined;

        // IInkRenderer Renderer () {get} {set by ref}
        this.Renderer = undefined;

        // bool SupportHighContrastInk () {get} {set}
        this.SupportHighContrastInk = undefined;

        // IInkTablet Tablet () {get}
        this.Tablet = undefined;

    }

    // bool GetEventInterest (InkCollectorEventInterest)
    GetEventInterest(InkCollectorEventInterest) {

    }

    // bool GetGestureStatus (InkApplicationGesture)
    GetGestureStatus(InkApplicationGesture) {

    }

    // void GetWindowInputRectangle (IInkRectangle)
    GetWindowInputRectangle(IInkRectangle) {

    }

    // void SetAllTabletsMode (bool)
    SetAllTabletsMode(bool) {

    }

    // void SetEventInterest (InkCollectorEventInterest, bool)
    SetEventInterest(InkCollectorEventInterest, bool) {

    }

    // void SetGestureStatus (InkApplicationGesture, bool)
    SetGestureStatus(InkApplicationGesture, bool) {

    }

    // void SetSingleTabletIntegratedMode (IInkTablet)
    SetSingleTabletIntegratedMode(IInkTablet) {

    }

    // void SetWindowInputRectangle (IInkRectangle)
    SetWindowInputRectangle(IInkRectangle) {

    }

}

module.exports = msinkaut_inkcollector_1;

