export default function flexiblePhoneMask(rawValue: string): (string | RegExp)[] {
    // TODO
    console.log(rawValue);

    let result: (string | RegExp)[] = [];
    if (!rawValue || !rawValue.length) {
        result = localPhoneMask(rawValue);
    }
    else {
        // +123-123-123-123456
        if (rawValue[0] == '+' || rawValue.match(/^\d{3}\-\d{3}\-\d{6}/)) {
            result = internationalPhoneMask(rawValue);
        }
        else {
            // 123-123-123456
            if (rawValue.match(/^\d{3}\-\d{6}/)) {
                result = countryPhoneMask(rawValue);
            }
            else {
                let partsCount = rawValue.split('-').length;
                if (partsCount < 3) {
                    result = localPhoneMask(rawValue);
                }
                else {
                    result = countryPhoneMask(rawValue);
                }
            }
        }
    }


    //TODO
    console.log(result);
    return result;
}

function countryPhoneMask(rawValue: string = null): (string | RegExp)[] {
    let countryPart: (string | RegExp)[] = [/\d/];
    if (rawValue) {
        let countryMatchRes = rawValue.match(/\d{1,3}/);
        if (countryMatchRes) {
            countryPart.push(/\d/);
            if (countryMatchRes[0].length > 2) {
                countryPart.push(/\d/);
            }
        }
    }
    countryPart.push('-');

    let localPart: (string | RegExp)[] = [];
    if (rawValue) {
        let localMatchRes = rawValue.match(/\d{3}\-\d{4,6}/);
        localPart = localMatchRes? localPhoneMask(localMatchRes[0]) : localPhoneMask();
    }
    else {
        localPart = localPhoneMask();
    }

    return countryPart.concat(localPart);
}

function internationalPhoneMask(rawValue: string): (string | RegExp)[] {
    let internationalPart = ['+', /\d/];

    if (rawValue) {
        let internationalMatchRes = rawValue.match(/^\+\d{1,3}/);
        if (internationalMatchRes) {
            internationalPart.push(/\d/);
            if (internationalMatchRes[0].length > 3) {
                internationalPart.push(/\d/);
            }
        }
    }
    internationalPart.push('-');

    let restPart: (string | RegExp)[] = [];
    if (rawValue) {
        let restMatchRes = rawValue.match(/\d{1,3}\-\d{3}\-\d{4,6}/);
        restPart = restMatchRes ?
            countryPhoneMask(restMatchRes[0]) : countryPhoneMask();
    }
    else {
        restPart = countryPhoneMask();
    }

    return internationalPart.concat(restPart);
}

function localPhoneMask(rawValue: string = null): (string | RegExp)[] {
    let result = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    if (rawValue) {
        let secondPartMatchRes = rawValue.match(/\-\d{4,6}/);
        if (secondPartMatchRes) {
            result.push(/\d/);
            if (secondPartMatchRes[0].length > 5) {
                result.push(/\d/);
            }
        }
    }

    return result;
}