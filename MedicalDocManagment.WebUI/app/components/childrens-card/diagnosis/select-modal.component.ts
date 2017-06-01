import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export default class DiagnosisSelectModalComponent {
    @Output() diagnosisChange: EventEmitter<DiagnosisModel>;

    private _blocksObservable: Observable<BlocksModel>;
    private _classesObservable: Observable<ClassesModel>;
    private _diagnoses: DiagnosesModel;
    private _lastErrorMessage: string;
    private _mkhsService: MkhsService;
    private _modalResultDiagnosis: DiagnosisModel;
    private _nosologiesObservable: Observable<NosologiesModel>;
    private _selectedBlockIdValue: string;
    private _selectedClassIdValue: string;
    private _selectedDiagnosisIdValue: string;
    private _selectedNosologyIdValue: string;

    constructor(mkhsService: MkhsService) {
        this.diagnosisChange = new EventEmitter<DiagnosisModel>();

        this._blocksObservable = this._lastErrorMessage =
            this._modalResultDiagnosis = this._nosologiesObservable =
            this._selectedBlockIdValue = this._selectedClassIdValue =
            this._selectedDiagnosisIdValue = this._selectedNosologyIdValue = null;

        this._diagnoses = [];

        this._classesObservable = mkhsService.getClasses();
        this._mkhsService = mkhsService;
    }

    @Input()
    get diagnosis(): DiagnosisModel {
        return this._modalResultDiagnosis;
    }
    set diagnosis(value: DiagnosisModel) {
        this._modalResultDiagnosis = value;
        this._loadMkhTreeForDiagnosis();
        this.diagnosisChange.emit(value);
    }

    _loadMkhTreeForDiagnosis(): void {
        if (this._modalResultDiagnosis) {
            var classSubscription = this._mkhsService.getClassByDiagnosisId(
                this._modalResultDiagnosis.id)
                .subscribe((classModel: ClassModel) => {
                    this._selectedClassId = classModel.id;
                    classSubscription.unsubscribe();

                    var blockSubscription = this._mkhsService.getBlockByDiagnosisId(
                        this._modalResultDiagnosis.id)
                        .subscribe((block: BlockModel) => {
                            this._selectedBlockId = block.id;
                            blockSubscription.unsubscribe();

                            var nosologySubscription = this._mkhsService.getNosologyByDiagnosisId(
                                this._modalResultDiagnosis.id)
                                .subscribe((nosology: NosologyModel) => {
                                    this._selectedNosologyId = nosology.id;
                                    this._selectedDiagnosisId = this._modalResultDiagnosis.id;
                                    nosologySubscription.unsubscribe();
                                })
                        })
                });
        }
        else {
            this._blocksObservable = this._nosologiesObservable =
                this._selectedBlockIdValue = this._selectedClassIdValue =
                this._selectedDiagnosisIdValue = this._selectedNosologyIdValue = null;

            this._diagnoses = [];
        }
    }

    _selectDiagnosis(form: FormGroup): void {
        if (this._selectedDiagnosisId)
        {
            this.diagnosisChange.emit(this._diagnoses.find(x => x.id == this._selectedDiagnosisId));
        }
        else {
            this.diagnosisChange.emit(null);
        }
    }

    get _selectedBlockId(): string {
        return this._selectedBlockIdValue;
    }
    set _selectedBlockId(newValue: string) {
        if (this._selectedBlockIdValue != newValue) {
            this._selectedBlockIdValue = newValue;
            this._selectedNosologyId = null;
            if (newValue) {
                this._nosologiesObservable = this._mkhsService.getNosologiesByBlockId(newValue);
            }
            else {
                this._nosologiesObservable = Observable.of(null);
            }
        }
    }

    get _selectedClassId(): string {
        return this._selectedClassIdValue;
    }
    set _selectedClassId(newValue: string) {
        if (this._selectedClassIdValue != newValue) {
            this._selectedClassIdValue = newValue;
            this._selectedBlockId = null;
            if (newValue) {
                this._blocksObservable = this._mkhsService.getBlocksByClassId(newValue);
            }
            else {
                this._blocksObservable = Observable.of(null);
            }
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
            this._selectedDiagnosisId = null;
            if (newValue) {
                this._diagnoses = [];
                var subscription = this._mkhsService.getDiagnosesByNosologyId(newValue)
                    .subscribe(
                        (diagnoses: DiagnosesModel) => {
                            this._diagnoses = this._diagnoses.concat(diagnoses);
                        },
                        () => { },
                        () => { subscription.unsubscribe(); }
                    );
            }
            else {
                this._diagnoses = [];
            }
        }
    }
}
