import React from 'react';
import { string, bool, oneOf, shape, func, any } from 'prop-types';
import classNames from 'classnames';

import { DropDownField } from '../../index';
import { getTwelveHoursTimeList } from '../../../helpers';
import styles from './component.scss';

const getTimeOptions = step => ([
    ...getTwelveHoursTimeList(step, 'AM'),
    ...getTwelveHoursTimeList(step, 'PM')
]).map(time => ({ label: time, value: time }));

const TimePickerField = props => (
    <DropDownField
        label={props.label}
        hidden={props.hidden}
        autoFocus={props.autoFocus}
        required={props.required}
        isDisabled={props.disabled}
        isClearable={false}

        field={props.field}

        placeholder=""
        options={getTimeOptions(props.step)}

        icon="time"
        className={classNames(styles.root, props.className)}
        onChange={props.onChange}
    />
);

TimePickerField.propTypes = {
    label: string,

    hidden: bool,
    autoFocus: bool,
    required: bool,
    disabled: bool,

    field: shape({
        name: string.isRequired,
        value: any,
        error: any
    }).isRequired,

    step: oneOf([5, 10, 15, 30]),
    icon: string,
    className: string,

    onChange: func.isRequired
};

TimePickerField.defaultProps = {
    label: undefined,

    hidden: false,
    autoFocus: false,
    required: false,
    disabled: false,

    value: undefined,
    error: undefined,

    step: 30,
    icon: undefined,
    placeholder: undefined,
    className: undefined

};

export default TimePickerField;
