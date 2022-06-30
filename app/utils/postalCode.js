export function isValidPostalCode(postalCode) {
    let postalCodeRegex = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/;
    return postalCodeRegex.test(postalCode);
}

// https://stackoverflow.com/questions/6319799/regex-for-validating-postcode-and-phone-number
