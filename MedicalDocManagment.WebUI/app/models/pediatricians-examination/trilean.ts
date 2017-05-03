export default class Trilean {
    value: boolean;

    constructor() {
        this.value = null;
    }

    /**
     * null => false => true => null
     */
    nextValue(): void {
        if (this.value == null) {
            this.value = false;
        } else {
            this.value = this.value ? null : true;
        }
    }

    not(): Trilean {
        let result: Trilean = new Trilean();
        if (this.value != null) {
            result.value = !this.value;
        }
        return result;
    }
}