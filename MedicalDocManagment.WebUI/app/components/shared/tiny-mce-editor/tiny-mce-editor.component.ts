import {
    Component,
    OnDestroy,
    AfterViewInit,
    EventEmitter,
    Input,
    Output
} from '@angular/core';

import './tiny-mce-editor.translate';

@Component({
    selector: 'tiny-mce-editor',
    template: `<textarea id="{{elementId}}"></textarea>`
})
export default class TinyMceEditorComponent implements AfterViewInit, OnDestroy {
    @Input() elementId: String;
    @Output() onEditorKeyup = new EventEmitter<any>();

    editor;

    ngAfterViewInit() {
        tinymce.init({
            selector: '#' + this.elementId,
            plugins: ['table'],
            setup: editor => {
                this.editor = editor;
                editor.on('keyup', () => {
                    this.onEditorKeyup.emit(editor);
                });
            },
        });
    }

    ngOnDestroy() {
        tinymce.remove(this.editor);
    }
}
