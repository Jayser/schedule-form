import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { withFormik } from 'formik';
import { last, get } from 'lodash';

import { SELECTED_NESTED_FIELD_NAME } from './constants';
import { createValidator, parseFormModel } from './utils';

const withForm = ({ initialValues, validationSchema, ...formikProps }) => Form => {
    class WrappedForm extends Component {
        static propTypes = {
            id: string.isRequired,
            handleSubmit: func.isRequired
        };

        getField = form => field => ({
            name: field,
            value: this.getFieldValue(form)(field),
            error: this.getFieldError(form)(field)
        });

        getFieldValue = form => field => get(form.values, field);

        getFieldError = form => field => get(form.errors, field, null);

        shouldShow = form => (field, value) => this.getFieldValue(form)(field) === value;

        destroyForm = form => field => {
            form.setErrors();
            form.setFieldValue(field, get(form.initialValues, field, {}), false);
        };

        handleChange = form => (name, value) => {
            const isNested = last(name.split('.')) === SELECTED_NESTED_FIELD_NAME;
            const shouldValidate = !isNested;

            form.setFieldValue(name, value, shouldValidate);
            form.setFieldTouched(name, true, shouldValidate);
        };

        render() {
            const { id, handleSubmit, ...formik } = this.props;

            return (
                <Form
                    id={id}
                    formik={formik}
                    onSubmit={handleSubmit}
                    getField={this.getField(this.props)}
                    shouldShow={this.shouldShow(this.props)}
                    destroyForm={this.destroyForm(this.props)}
                    getFieldValue={this.getFieldValue(this.props)}
                    getFieldError={this.getFieldError(this.props)}
                    onChange={this.handleChange(this.props)}
                />
            );
        }
    }

    return withFormik({
        ...formikProps,
        validate: (values, props) => createValidator(props.validationSchema || validationSchema)(values),
        handleSubmit: (values, formikBag) => formikBag.props.onSubmit(parseFormModel(values), formikBag),
        mapPropsToValues: props => props.initialValues || initialValues
    })(WrappedForm);
};

withForm.SELECTED_NESTED_FIELD_NAME = SELECTED_NESTED_FIELD_NAME;

export default withForm;
