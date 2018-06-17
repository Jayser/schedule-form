import moment from 'moment';
import { find, get, set, reduce, toPairs } from 'lodash';

import { is } from '../../helpers';
import { SELECTED_NESTED_FIELD_NAME } from './constants';

const treeMap = (tree, callback, _path = []) => (
    reduce(toPairs(tree), (waledTree, [name, value]) => {
        const path = [..._path, name];

        if (is.object(value) && !moment.isMoment(value)) {
            return { ...waledTree, ...callback(name, treeMap(value, callback, path), path) };
        }

        return { ...waledTree, ...callback(name, value, path) };
    }, {})
);

const treeWalk = (tree, callback, _path = []) => (
    reduce(toPairs(tree), (waledTree, [name, value]) => {
        const path = [..._path, name];
        if (is.object(value) && !moment.isMoment(value)) {
            return callback(name, treeWalk(value, callback, path));
        }

        return callback(name, value, path);
    }, {})
);

export const parseFormModel = formModel => treeMap(formModel, (name, value) => (
    value && value[SELECTED_NESTED_FIELD_NAME]
        ? { [name]: { [value[SELECTED_NESTED_FIELD_NAME]]: value[value[SELECTED_NESTED_FIELD_NAME]] } }
        : { [name]: value }
));

export const parseFormSchemaValidation = (schema, formValues) => {
    const result = {};

    treeWalk(formValues, (name, value, path) => {
        const schemaValue = get(schema, path);

        if (schemaValue) {
            set(result, path, schemaValue);
        }
    });

    return result;
};

export const createValidator = (schema = {}) => formValues => {
    const errors = {};
    const parsedFormModel = parseFormModel(formValues);
    const parsedFormSchemaValidation = parseFormSchemaValidation(schema, parsedFormModel);

    treeWalk(parsedFormSchemaValidation, (name, rules, path) => {
        const value = get(parsedFormModel, path);

        const error = find(rules, condition => condition(value, name, parsedFormModel, path));

        if (error) {
            set(errors, path, error(value, name, parsedFormModel, path));
        }
    });

    return errors;
};
