import { ChildBirthEnum } from './child-birth.enum';
import Trilean from './trilean';

export default class ChildBirthModel {
    value: ChildBirthEnum;

    constructor() {
        this.value = ChildBirthEnum.Unknown;
    }

    compareWithEnum(someEnum: ChildBirthEnum): Trilean {
        let result: Trilean = new Trilean();
        if (this.value != ChildBirthEnum.Unknown && someEnum != ChildBirthEnum.Unknown) {
            result.value = this.value == someEnum;
        }

        return result;
    }

    /**
     * Unknown => Urgent => Premature => Operative => Unknown
     */
    nextValue(): void {
        switch (this.value) {
            case ChildBirthEnum.Unknown: {
                this.value = ChildBirthEnum.Urgent;
                break;
            }
            case ChildBirthEnum.Urgent: {
                this.value = ChildBirthEnum.Premature;
                break;
            }
            case ChildBirthEnum.Premature: {
                this.value = ChildBirthEnum.Operative;
                break;
            }
            case ChildBirthEnum.Operative: {
                this.value = ChildBirthEnum.Unknown;
                break;
            }
        }
    }

    toJSON(): ChildBirthEnum {
        return this.value;
    }
}