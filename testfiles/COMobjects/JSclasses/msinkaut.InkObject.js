class msinkaut_inkobject {
    constructor() {
        // IInkCustomStrokes CustomStrokes () {get}
        this.CustomStrokes = undefined;

        // bool Dirty () {get} {set}
        this.Dirty = undefined;

        // IInkExtendedProperties ExtendedProperties () {get}
        this.ExtendedProperties = undefined;

        // IInkStrokes Strokes () {get}
        this.Strokes = undefined;

    }

    // void AddStrokesAtRectangle (IInkStrokes, IInkRectangle)
    AddStrokesAtRectangle(IInkStrokes, IInkRectangle) {

    }

    // bool CanPaste (IDataObject)
    CanPaste(IDataObject) {

    }

    // void Clip (IInkRectangle)
    Clip(IInkRectangle) {

    }

    // IDataObject ClipboardCopy (IInkStrokes, InkClipboardFormats, InkClipboardModes)
    ClipboardCopy(IInkStrokes, InkClipboardFormats, InkClipboardModes) {

    }

    // IDataObject ClipboardCopyWithRectangle (IInkRectangle, InkClipboardFormats, InkClipboardModes)
    ClipboardCopyWithRectangle(IInkRectangle, InkClipboardFormats, InkClipboardModes) {

    }

    // IInkStrokes ClipboardPaste (int, int, IDataObject)
    ClipboardPaste(int, int, IDataObject) {

    }

    // IInkDisp Clone ()
    Clone() {

    }

    // IInkStrokeDisp CreateStroke (Variant, Variant)
    CreateStroke(Variant, Variant) {

    }

    // IInkStrokes CreateStrokes (Variant)
    CreateStrokes(Variant) {

    }

    // void DeleteStroke (IInkStrokeDisp)
    DeleteStroke(IInkStrokeDisp) {

    }

    // void DeleteStrokes (IInkStrokes)
    DeleteStrokes(IInkStrokes) {

    }

    // IInkDisp ExtractStrokes (IInkStrokes, InkExtractFlags)
    ExtractStrokes(IInkStrokes, InkExtractFlags) {

    }

    // IInkDisp ExtractWithRectangle (IInkRectangle, InkExtractFlags)
    ExtractWithRectangle(IInkRectangle, InkExtractFlags) {

    }

    // IInkRectangle GetBoundingBox (InkBoundingBoxMode)
    GetBoundingBox(InkBoundingBoxMode) {

    }

    // IInkStrokes HitTestCircle (int, int, float)
    HitTestCircle(int, int, float) {

    }

    // IInkStrokes HitTestWithLasso (Variant, float, Variant)
    HitTestWithLasso(Variant, float, Variant) {

    }

    // IInkStrokes HitTestWithRectangle (IInkRectangle, float)
    HitTestWithRectangle(IInkRectangle, float) {

    }

    // void Load (Variant)
    Load(Variant) {

    }

    // IInkStrokeDisp NearestPoint (int, int, float, float)
    NearestPoint(int, int, float, float) {

    }

    // Variant Save (InkPersistenceFormat, InkPersistenceCompressionMode)
    Save(InkPersistenceFormat, InkPersistenceCompressionMode) {

    }

}

module.exports = msinkaut_inkobject;

