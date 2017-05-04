export default class Trilean {
    value: boolean;

    constructor() {
        this.value = undefined;
    }

    /**
     * undefined => false => true => undefined
     */
    nextValue(): void {
        if (this.value == undefined) {
            this.value = false;
        } else {
            this.value = this.value ? undefined : true;
        }
    }

    not(): Trilean {
        let result: Trilean = new Trilean();
        if (this.value != null) {
            result.value = !this.value;
        }
        return result;
    }

    toJSON(): boolean {
        return this.value;
    }
}