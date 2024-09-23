export const status = {EMPTY: "EMPTY", INVALID: "INVALID", VALID: "VALID"};
export const password = (val) => {
    if (val) {
        return (!/^(?=.*\d)(?=.*[a-zA-Z]).{8,255}$/.test(val))
            ? status.INVALID
            : status.VALID;
    } else return status.EMPTY;
};

export const match = (val, matchVal) => {
    if (val) {
        if (matchVal) {
            return (val !== matchVal)
                ? status.INVALID
                : status.VALID;
        } else return status.EMPTY;
    }
};

export const email = (val) => {
    if (val) {
        return (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val))
            ? status.INVALID
            : status.VALID;
    } else return status.EMPTY;
};

export const notEmpty = (val) => {
    return val
        ? status.VALID
        : status.EMPTY;
};

export const name = (val) => {
    if (val) {
        return (!/^[A-Za-z]+$/.test(val))
            ? status.INVALID
            : status.VALID;
    } else return status.EMPTY;
};

export const phone = (val) => {
    if (val) {
        return (!/^((\+44)|(0)) ?\d{4} ?\d{6}$/.test(val))
            ? status.INVALID
            : status.VALID;
    } else return status.EMPTY;
};