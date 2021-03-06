import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { DialogRef } from 'angular2-modal';
/**
 * A Dialog is a
 */
export var VEXDialogButtons = (function () {
    function VEXDialogButtons() {
        /**
         * Emitted when a button was clicked
         * @type {EventEmitter<VEXButtonClickEvent>}
         */
        this.onButtonClick = new EventEmitter();
    }
    VEXDialogButtons.prototype.onClick = function (btn, $event) {
        $event.stopPropagation();
        this.onButtonClick.emit({ btn: btn, $event: $event });
    };
    VEXDialogButtons.decorators = [
        { type: Component, args: [{
                    selector: 'vex-dialog-buttons',
                    encapsulation: ViewEncapsulation.None,
                    template: "<div class=\"vex-dialog-buttons\">\n    <button type=\"button\" \n         *ngFor=\"let btn of buttons;\"\n         [class]=\"btn.cssClass\"\n         (click)=\"onClick(btn, $event)\">{{btn.caption}}</button>\n</div>"
                },] },
    ];
    /** @nocollapse */
    VEXDialogButtons.ctorParameters = function () { return []; };
    VEXDialogButtons.propDecorators = {
        'buttons': [{ type: Input },],
        'onButtonClick': [{ type: Output },],
    };
    return VEXDialogButtons;
}());
/**
 * A Dialog with customized buttons wrapped in a form.
 *
 */
export var DialogFormModal = (function () {
    function DialogFormModal(dialog) {
        this.dialog = dialog;
        this.context = dialog.context;
    }
    DialogFormModal.prototype.onButtonClick = function ($event) {
        $event.btn.onClick(this, $event.$event);
    };
    DialogFormModal.decorators = [
        { type: Component, args: [{
                    selector: 'modal-dialog',
                    encapsulation: ViewEncapsulation.None,
                    template: "<form class=\"vex-dialog-form\">\n    <template [swapCmp]=\"context.content\"></template>\n    <vex-dialog-buttons [buttons]=\"context.buttons\"\n                        (onButtonClick)=\"onButtonClick($event)\"></vex-dialog-buttons>\n</form>"
                },] },
    ];
    /** @nocollapse */
    DialogFormModal.ctorParameters = function () { return [
        { type: DialogRef, },
    ]; };
    return DialogFormModal;
}());
export var FormDropIn = (function () {
    function FormDropIn(dialog) {
        this.dialog = dialog;
        this.context = dialog.context;
    }
    FormDropIn.decorators = [
        { type: Component, args: [{
                    selector: 'drop-in-dialog',
                    encapsulation: ViewEncapsulation.None,
                    template: "<div class=\"vex-dialog-message\">{{context.message}}</div>\n <div *ngIf=\"context.showInput\" class=\"vex-dialog-input\">\n   <input #input\n          autofocus\n          name=\"vex\" \n          type=\"text\" \n          class=\"vex-dialog-prompt-input\"\n           (change)=\"context.defaultResult = input.value\" \n          placeholder=\"{{context.placeholder}}\">\n </div>\n <div *ngIf=\"context.showCloseButton\" \n      [class]=\"context.closeClassName\"\n      (click)=\"dialog.dismiss()\"></div>"
                },] },
    ];
    /** @nocollapse */
    FormDropIn.ctorParameters = function () { return [
        { type: DialogRef, },
    ]; };
    return FormDropIn;
}());
//# sourceMappingURL=dialog-form-modal.js.map