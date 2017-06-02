import {
    Component, ElementRef, EventEmitter, Input, NgZone, Output, ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
declare var $;

import MkhsService from "../../../services/mkhs.service";

import BlockModel from '../../../models/block.model';
import BlocksModel from '../../../models/blocks.model';
import ClassModel from "../../../models/class.model";
import ClassesModel from "../../../models/classes.model";
import DiagnosisModel from "../../../models/diagnosis.model";
import DiagnosesModel from "../../../models/diagnoses.model";
import NosologyModel from "../../../models/nosology.model";
import NosologiesModel from "../../../models/nosologies.model";

@Component({
    moduleId: module.id,
    selector: 'diagnosis-select-modal',
    templateUrl: 'select-modal.component.html',
    providers: [MkhsService],
    styleUrls: ['select-modal.component.css']

})
export default class DiagnosisSelectModalComponent{
    @Output() diagnosisIdChange: EventEmitter<string>;

    private _blocks: BlocksModel;
    private _blocksLoading: boolean;
    private _classes: ClassesModel;
    private _classesLoading: boolean;
    private _diagnoses: DiagnosesModel;
    private _diagnosesLoading: boolean;
    private _diagnosisLoading: boolean;
    private _mkhsService: MkhsService;
    private _ngZone: NgZone;
    private _resultDiagnosisId: string;
    private _nosologies: NosologiesModel;
    private _nosologiesLoading: boolean;
    private _selectedBlockIdValue: string;
    private _selectedClassIdValue: string;
    private _selectedDiagnosisIdValue: string;
    private _selectedNosologyIdValue: string;

    constructor(mkhsService: MkhsService, ngZone: NgZone) {
        this.diagnosisIdChange = new EventEmitter<string>();

        this._blocks = this._classes = this._diagnoses = this._nosologies = [];

        this._blocksLoading = this._classesLoading = this._diagnosesLoading =
            this._diagnosisLoading = this._nosologiesLoading = false;

        this._ngZone = ngZone;

        this._resultDiagnosisId = this._selectedBlockIdValue = this._selectedClassIdValue =
            this._selectedDiagnosisIdValue = this._selectedNosologyIdValue = null;

        this._mkhsService = mkhsService;
    }

    @Input()
    get diagnosisId(): string {
        return this._resultDiagnosisId;
    }
    set diagnosisId(value: string) {
        this._resultDiagnosisId = value;
        this._loadMkhTreeForDiagnosis(this._resultDiagnosisId);

        this.diagnosisIdChange.emit(value);
    }

    _diagnosisSelected(): void {
        this.diagnosisId = this._selectedDiagnosisId;
    }

    @ViewChild('diagnosisSelectModal')
    set _diagnosisSelectModal(elementRef: ElementRef) {
        $(elementRef.nativeElement).on('hide.bs.modal', () => {
            this._ngZone.run(() => {
                if (this._selectedDiagnosisId != this.diagnosisId) {
                    this._loadMkhTreeForDiagnosis(this.diagnosisId);
                }
            })
        });
    }

    _loadClasses(afterLoad: () => void = () => { }): void {
        this._classesLoading = true;
        this._classes = [];
        var subscription = this._mkhsService.getClasses()
            .subscribe(
            (classes: ClassesModel) => {
                this._classes = this._classes.concat(classes);
            },
            (error) => { },
            () => {
                this._classesLoading = false;
                afterLoad();
                subscription.unsubscribe();
            })
    }

    _loadBlocksForClass(classId: string, afterLoad: () => void = () => { }): void {
        this._blocks = [];
        if (classId) {
            this._blocksLoading = true;
            var subscription = this._mkhsService.getBlocksByClassId(classId)
                .subscribe(
                (blocks: BlocksModel) => {
                    this._blocks = this._blocks.concat(blocks);
                },
                (error) => { },
                () => {
                    this._blocksLoading = false;
                    afterLoad();
                    subscription.unsubscribe();
                })
        }
        else {
            afterLoad();
        }
    }

    _loadDiagnosesForNosology(nosologyId: string, afterLoad: () => void = () => { }): void {
        this._diagnoses = [];
        if (nosologyId) {
            this._diagnosesLoading = true;
            var subscription = this._mkhsService.getDiagnosesByNosologyId(nosologyId)
                .subscribe(
                (diagnoses: DiagnosesModel) => {
                    this._diagnoses = this._diagnoses.concat(diagnoses);
                },
                () => { },
                () => {
                    this._diagnosesLoading = false;
                    afterLoad();
                    subscription.unsubscribe();
                }
                );
        }
        else {
            afterLoad();
        }
    }

    _loadNosologiesForBlock(blockId: string, afterLoad: () => void = () => { }): void {
        this._nosologies = [];
        if (blockId) {
            this._nosologiesLoading = true;
            var subscription = this._mkhsService.getNosologiesByBlockId(blockId)
                .subscribe(
                (nosologies: NosologiesModel) => {
                    this._nosologies = this._nosologies.concat(nosologies);
                },
                (error) => { },
                () => {
                    this._nosologiesLoading = false;
                    afterLoad();
                    subscription.unsubscribe;
                })
        }
        else {
            afterLoad();
        }
    }

    _loadMkhTreeForDiagnosis(diagnosisId: string): void {
        if (diagnosisId) {
            if (this._selectedDiagnosisId != diagnosisId) {
                this._diagnosisLoading = true;
                this._loadClasses(() => {
                    this._selectClassForDiagnosis(diagnosisId, () => {
                        this._loadBlocksForClass(this._selectedClassId, () => {
                            this._selectBlockForDiagnosis(diagnosisId, () => {
                                this._loadNosologiesForBlock(this._selectedBlockId, () => {
                                    this._selectNosologyForDiagnosis(diagnosisId, () => {
                                        this._loadDiagnosesForNosology(this._selectedNosologyId, () => {
                                            this._selectedDiagnosisId = diagnosisId;
                                            this._diagnosisLoading = false;
                                        })
                                    })
                                })
                            })
                        })
                    })
                });
            }
        }
        else {
            this._loadClasses();
            this._blocks = this._diagnoses = this._nosologies = [];
            this._selectedBlockIdValue = this._selectedClassIdValue =
                this._selectedDiagnosisIdValue = this._selectedNosologyIdValue = null;
        }
    }

    _selectBlockForDiagnosis(diagnosisId: string,
        afterSelect: () => void = () => { }): void {
        var blockSubscription = this._mkhsService.getBlockByDiagnosisId(
            diagnosisId)
            .subscribe((block: BlockModel) => {
                this._selectedBlockIdValue = block.id;
            },
            (error) => { },
            () => {
                afterSelect();
                blockSubscription.unsubscribe();
            })
    }

    _selectClassForDiagnosis(diagnosisId: string,
        afterSelect: () => void = () => { }): void {
        var classSubscription = this._mkhsService.getClassByDiagnosisId(
            diagnosisId)
            .subscribe((classModel: ClassModel) => {
                this._selectedClassIdValue = classModel.id;
            },
            (error) => { },
            () => {
                    afterSelect();
                    classSubscription.unsubscribe();
                });
    }

    get _selectedBlockId(): string {
        return this._selectedBlockIdValue;
    }
    set _selectedBlockId(newValue: string) {
        if (this._selectedBlockIdValue != newValue) {
            this._selectedBlockIdValue = newValue;

            this._loadNosologiesForBlock(newValue, () => {                
                if (!this._nosologies.find(x => x.id == this._selectedNosologyId)) {
                    this._selectedNosologyId = null;
                }
            });
            this._diagnoses = [];
        }
    }

    get _selectedClassId(): string {
        return this._selectedClassIdValue;
    }
    set _selectedClassId(newValue: string) {
        if (this._selectedClassIdValue != newValue) {
            this._selectedClassIdValue = newValue;

            this._loadBlocksForClass(newValue, () => {
                if (!this._blocks.find(x => x.id == this._selectedBlockId)) {
                    this._selectedBlockId = null;
                }
            });
            this._nosologies = this._diagnoses = [];
        }
    }

    get _selectedDiagnosisId(): string {
        return this._selectedDiagnosisIdValue;
    }
    set _selectedDiagnosisId(newValue: string) {
        if (this._selectedDiagnosisIdValue != newValue) {
            this._selectedDiagnosisIdValue = newValue;
        }
    }

    get _selectedNosologyId(): string {
        return this._selectedNosologyIdValue;
    }
    set _selectedNosologyId(newValue: string) {
        if (this._selectedNosologyIdValue != newValue) {
            this._selectedNosologyIdValue = newValue;

            this._loadDiagnosesForNosology(newValue, () => {
                if (!this._diagnoses.find(x => x.id == this._selectedDiagnosisId)) {
                    this._selectedDiagnosisId = null;
                }
            });
        }
    }

    _selectNosologyForDiagnosis(diagnosisId: string,
        afterSelect: () => void = () => { }): void {
        var nosologySubscription = this._mkhsService.getNosologyByDiagnosisId(
            diagnosisId)
            .subscribe((nosology: NosologyModel) => {
                this._selectedNosologyIdValue = nosology.id;
            },
            (error) => { },
            () => {
                afterSelect();
                nosologySubscription.unsubscribe();
            })
    }
}
