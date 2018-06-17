import React from 'react';
import { string, bool, arrayOf, node, shape, func, any } from 'prop-types';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';
import Select from 'react-select';

import { FieldWithError, FieldWithLabel } from '../../index';
import styles from './component.scss';

const DropDownField = props => {
    const id = uuid();

    return props.hidden ? null : (
        <div className={classNames(styles.root, props.className)}>
            <FieldWithError error={props.field.error}>
                <FieldWithLabel
                    label={props.label}
                    id={id}
                    required={props.required}
                    className={props.labelClassName}
                >
                    <Select
                        id={id}
                        name={props.field.name}
                        placeholder={props.placeholder}
                        value={props.options.find(({ value }) => value === props.field.value)}
                        options={props.options}
                        defaultValue={props.defaultValue}
                        formatGroupLabel={props.formatGroupLabel}

                        autoFocus={props.autoFocus}
                        required={props.required}
                        isMulti={props.isMulti}
                        isDisabled={props.isDisabled}
                        isLoading={props.isLoading}
                        isClearable={props.isClearable}
                        isSearchable={props.isSearchable}

                        classNamePrefix={classNames(styles.dropDown, props.dropDownClassName)}

                        onBlur={props.onBlur}
                        onOpen={props.onOpen}
                        onClose={props.onClose}
                        onInputChange={props.onInputChange}
                        onChange={option => {
                            const value = option ? option.value : props.defaultValue;
                            props.onChange(props.field.name, value);
                        }}
                    />
                </FieldWithLabel>
            </FieldWithError>
        </div>
    );
};

DropDownField.propTypes = {
    label: string,
    placeholder: string,
    field: shape({
        name: string,
        value: any,
        error: string
    }).isRequired,
    options: arrayOf(any),
    defaultValue: string,

    hidden: bool,
    autoFocus: bool,
    required: bool,
    isMulti: bool,
    isDisabled: bool,
    isLoading: bool,
    isClearable: bool,
    isSearchable: bool,

    className: string,
    labelClassName: string,
    dropDownClassName: string,

    formatGroupLabel: func,

    onBlur: func,
    onOpen: func,
    onClose: func,
    onChange: func,
    onInputChange: func
};

DropDownField.defaultProps = {
    label: undefined,
    placeholder: undefined,
    options: undefined,
    defaultValue: undefined,

    hidden: false,
    autoFocus: false,
    required: false,
    isMulti: false,
    isDisabled: false,
    isLoading: false,
    isClearable: false,
    isSearchable: true,

    className: undefined,
    labelClassName: undefined,
    dropDownClassName: undefined,

    formatGroupLabel: node,

    onBlur: undefined,
    onOpen: undefined,
    onClose: undefined,
    onChange: undefined,
    onInputChange: undefined
};

export default DropDownField;
