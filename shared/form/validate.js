import { get, map, first, isEmpty } from 'lodash';

export const shouldValidateIf = condition => rules => (value, values, formValues) => {// eslint-disable-line
    if (get(formValues, condition.name) === condition.value) {
        return first(map(rules, rule => rule(value)));
    }
};

export const email = (msg = 'Invalid email address') => value => {// eslint-disable-line
    if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return msg;
    }
};

export const required = (msg = 'The field is required') => value => {// eslint-disable-line
    if (isEmpty(value)) {
        return msg;
    }
};

export const minLength = (msg = 'invalid minimum count of characters', min) => value => {// eslint-disable-line
    if (!isEmpty(value) && value.length < min) {
        return msg;
    }
};

export const maxLength = (msg = 'The field is exceeds the max length', max) => value => {// eslint-disable-line
    if (!isEmpty(value) && value.length > max) {
        return msg;
    }
};

export const integer = (msg = 'Must be an integer') => value => {// eslint-disable-line
    if (!isEmpty(value) && !Number.isInteger(value)) {
        return msg;
    }
};
