import React, { Component } from 'react';
import { string, oneOfType, number, bool, node, func } from 'prop-types';
import { isEmpty } from 'lodash';
import { KEY_CODES, isKeyCodeNumber, getClipboardData } from '../../../helpers';

import { TextField } from '../index';

class NumberField extends Component {
    static propTypes = {
        name: string,
        value: string,
        label: node,
        placeholder: string,
        children: node,
        icon: string,
        decimals: number,

        autoFocus: bool,
        disabled: bool,
        readOnly: bool,
        required: bool,
        hidden: bool,
        error: node,

        maxLength: number,
        max: number,
        min: oneOfType([string, number]),
        step: number,

        className: string,
        labelClassName: string,
        fieldWrapperClassName: string,
        fieldClassName: string,
        contentClassName: string,
        iconClassName: string,

        onKeyDown: func,
        onPaste: func,
        onBlur: func,
        onClick: func,
        onChange: func
    };

    static defaultProps = {
        name: undefined,
        value: undefined,
        label: undefined,
        placeholder: undefined,
        children: undefined,
        decimals: 0,
        icon: '',

        autoFocus: false,
        disabled: false,
        readOnly: false,
        required: false,
        hidden: false,
        error: undefined,

        maxLength: 255,
        max: Infinity,
        min: '',
        step: 1,

        className: undefined,
        labelClassName: undefined,
        fieldWrapperClassName: undefined,
        fieldClassName: undefined,
        contentClassName: undefined,
        iconClassName: undefined,

        onKeyDown: undefined,
        onPaste: undefined,
        onBlur: undefined,
        onClick: undefined,
        onChange: undefined
    };

    static allowedKeys = {
        [KEY_CODES.ARROW_UP]: true,
        [KEY_CODES.ARROW_DOWN]: true,
        [KEY_CODES.ARROW_LEFT]: true,
        [KEY_CODES.ARROW_RIGHT]: true,
        [KEY_CODES.BACKSPACE]: true,
        [KEY_CODES.DELETE]: true,
        [KEY_CODES.END]: true,
        [KEY_CODES.HOME]: true,
        [KEY_CODES.TAB]: true
    };

    static allowedKeysCopyPasteSelect = {
        [KEY_CODES.C]: true,
        [KEY_CODES.V]: true,
        [KEY_CODES.A]: true
    };

    static allowedDecimalsKeys = {
        [KEY_CODES.PERIOD]: true,
        [KEY_CODES.DECIMAL_POINT]: true
    };

    static START_LINE_POSITION = 0;

    static EMPTY_STRING = '';

    static CURRENCY_VALIDATION_PATTERN = /^(-?\d{1,16})(\.\d{1,2})?$/g;

    isAllowedDash = (key, value, min, caretPos, isShift) => {
        const isDash = [KEY_CODES.DASH, KEY_CODES.SUBTRACT].includes(key) && !isShift;
        const allowNegativeNumbers = min < 0;

        return isDash && allowNegativeNumbers && caretPos === NumberField.START_LINE_POSITION && !value.includes('-');
    };

    toNumberValue = value => (
        value === NumberField.EMPTY_STRING ? NumberField.START_LINE_POSITION : parseFloat(value)
    );

    isAllowedDecimal = (key, value, decimals, caretPos) => {
        const isDecimalAllowed = Number(decimals) !== 0;
        const hasDecimal = String(value).includes('.');

        // allows only 1 decimal symbol
        if (NumberField.allowedDecimalsKeys[key]) {
            if (!hasDecimal && isDecimalAllowed) {
                return true;
            }
        }

        const decimalPos = String(value).indexOf('.');

        // allows only 2 numbers after decimal
        if (hasDecimal) {
            if (caretPos > decimalPos) {
                const decimalPlaces = value.length - decimalPos - 1;
                if (decimalPlaces >= decimals) {
                    return false;
                }
            }
        }

        return isKeyCodeNumber(key);
    };

    increaseValue = e => {
        e.preventDefault();
        this.applyStep(this.props.step);
    };

    decreaseValue = e => {
        e.preventDefault();
        this.applyStep(this.props.step * -1);
    };

    handleKeyDown = e => {// eslint-disable-line
        const { keyCode: key, shiftKey: isShift, ctrlKey: isCtrl, metaKey: isMetaKey } = e;

        if (KEY_CODES.ARROW_UP === key) {
            return this.increaseValue(e);
        }

        if (KEY_CODES.ARROW_DOWN === key) {
            return this.decreaseValue(e);
        }

        // if min is zero, don't allow -
        // if decimals are zero, don't allow .

        const caretPos = this.fieldElem.selectionStart;
        const { decimals, value, min } = this.props;
        const isSelection = isShift && this.allowedKeys[key];
        const isCopyPaste = (isCtrl || isMetaKey) && NumberField.allowedKeysCopyPasteSelect[key];
        const isAllowedKeys = isSelection || isCopyPaste || NumberField.allowedKeys[key];
        const isAllowedNumbers = !isShift && this.isAllowedDecimal(key, value, decimals, caretPos);

        const isAllowed = isAllowedKeys || this.isAllowedDash(key, value, min, caretPos, isShift) || isAllowedNumbers;

        if (isAllowed) {
            return; // eslint-disable-line
        }

        e.preventDefault();
    };

    handlePaste = e => {
        const { max, min } = this.props;
        const value = this.toNumberValue(getClipboardData(e));
        const isValidPattern = NumberField.CURRENCY_VALIDATION_PATTERN.test(value);
        const isValidRange = value >= min && value <= max;

        if (isValidPattern && isValidRange) {
            return;
        }

        e.preventDefault();
    };

    handleBlur = e => {
        const { min, max, decimals } = this.props;

        // Get a valid number
        const targetValue = e.target.value;
        const testValue = targetValue.trim() === '' || Number.isNaN(targetValue) ? min : targetValue;

        if (isEmpty(testValue)) {
            if (this.props.onBlur) {
                this.props.onBlur(e);
            }

            return;
        }

        // Enforce min/max and decimal formatting
        let result = Math.min(Math.max(Number(testValue), min), max);

        // Ensure a string with the correct number of decimals
        result = decimals ? result.toFixed(decimals) : result.toString();

        // Broadcast any differences from what was in the event target
        if (result !== targetValue && this.props.onChange) {
            this.props.onChange(this.props.name, result);
        }

        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    };

    handleChange = e => {
        if (this.props.onChange) {
            this.props.onChange(this.props.name, e.target.value);
        }
    };

    applyStep(step) {
        const { decimals, max, min } = this.props;

        // The multiplier is used to offset Javascript floating point issues (e.g. 0.1 + 0.2 = 0.30000000000000004)
        const multiplier = decimals ? window.Math.pow(10, decimals) : 1;
        const currentValue = (Number(this.props.value) || 0) * multiplier;
        const stepValue = step * multiplier;
        const nextStep = (currentValue + stepValue) / multiplier;
        const nextValue = Math.min(Math.max(nextStep, min), max);
        const changeValue = nextValue && decimals ? nextValue.toFixed(decimals) : nextValue;

        if (this.props.onChange) {
            this.props.onChange(this.props.name, changeValue);
        }
    }

    render() {
        return this.props.hidden ? null : (
            <TextField
                name={this.props.name}
                value={this.props.value}
                label={this.props.label}
                placeholder={this.props.placeholder}
                icon={this.props.icon}

                autoFocus={this.props.autoFocus}
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
                required={this.props.required}
                hidden={this.props.hidden}
                error={this.props.error}

                maxLength={this.props.maxLength}

                className={this.props.className}
                labelClassName={this.props.labelClassName}
                fieldWrapperClassName={this.props.fieldWrapperClassName}
                fieldClassName={this.props.fieldClassName}
                iconClassName={this.props.iconClassName}

                refField={field => {
                    this.fieldElem = field;
                }}
                onKeyDown={this.handleKeyDown}
                onPaste={this.handlePaste}
                onBlur={this.handleBlur}
                onClick={this.props.onClick}
                onChange={this.handleChange}
            >
                {this.props.children}
            </TextField>
        );
    }
}

export default NumberField;
