var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import 'rxjs/add/operator/combineLatest';
import { Injectable } from '@angular/core';
import { Overlay, Modal as Modal_, CSSBackdrop, PromiseCompleter } from 'angular2-modal';
import { BSModalContainer } from './modal-container.component';
import { OneButtonPresetBuilder } from './../bootstrap/presets/one-button-preset';
import { TwoButtonPresetBuilder, PromptPresetBuilder } from './../bootstrap/presets/two-button-preset';
export var Modal = (function (_super) {
    __extends(Modal, _super);
    function Modal(overlay) {
        _super.call(this, overlay);
    }
    Modal.prototype.alert = function () {
        return new OneButtonPresetBuilder(this, { isBlocking: false });
    };
    Modal.prototype.prompt = function () {
        return new PromptPresetBuilder(this, { isBlocking: true, keyboard: null });
    };
    Modal.prototype.confirm = function () {
        return new TwoButtonPresetBuilder(this, { isBlocking: true, keyboard: null });
    };
    Modal.prototype.create = function (dialogRef, content, bindings) {
        var _this = this;
        var backdropRef = this.createBackdrop(dialogRef, CSSBackdrop);
        var containerRef = this.createContainer(dialogRef, BSModalContainer, content, bindings);
        var overlay = dialogRef.overlayRef.instance;
        var backdrop = backdropRef.instance;
        var container = containerRef.instance;
        dialogRef.inElement ? overlay.insideElement() : overlay.fullscreen();
        // add body class if this is the only dialog in the stack
        if (!document.body.classList.contains('modal-open')) {
            document.body.classList.add('modal-open');
        }
        if (dialogRef.inElement) {
            backdrop.setStyle('position', 'absolute');
        }
        backdrop.addClass('modal-backdrop fade', true);
        backdrop.addClass('in');
        container.addClass('in');
        if (containerRef.location.nativeElement) {
            containerRef.location.nativeElement.focus();
        }
        overlay.beforeDestroy(function () {
            var completer = new PromiseCompleter();
            backdrop.removeClass('in');
            container.removeClass('in');
            backdrop.myAnimationEnd$()
                .combineLatest(container.myAnimationEnd$(), function (s1, s2) { return [s1, s2]; })
                .subscribe(function (sources) {
                _this.overlay.groupStackLength(dialogRef) === 1 && document.body.classList.remove('modal-open');
                completer.resolve();
            });
            return completer.promise;
        });
        return dialogRef;
    };
    Modal.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Modal.ctorParameters = function () { return [
        { type: Overlay, },
    ]; };
    return Modal;
}(Modal_));
//# sourceMappingURL=modal.js.map