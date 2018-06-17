import { Component } from 'react';
import { string, bool, number, shape, func, any } from 'prop-types';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';

import { TextField, Placement } from '../../../index';
import styles from './component.scss';

class DatePickerField extends Component {
    static propTypes = {
        label: string,
        field: shape({
            name: string.isRequired,
            value: any,
            error: string
        }).isRequired,
        placeholder: string,
        required: bool,
        disabled: bool,

        className: string,
        fieldWrapperClassName: string,
        fieldClassName: string,

        monthsShown: number,
        excludeDates: shape(any),
        minDate: shape(any),
        maxDate: shape(any),
        dateFormat: string,
        showTimeSelect: bool,
        timeIntervals: number,

        onSelect: func,
        onChange: func.isRequired
    };

    static defaultProps = {
        label: undefined,
        disabled: false,
        required: false,

        className: undefined,
        fieldWrapperClassName: undefined,
        fieldClassName: undefined,
        monthsShown: 1,
        excludeDates: undefined,
        minDate: undefined,
        maxDate: undefined,

        placeholder: 'DD/MM/YYYY HH:MM',
        dateFormat: 'DD/MM/YYYY hh:mm A',
        showTimeSelect: false,
        timeIntervals: 15,

        onSelect: undefined
    };

    state = {
        isOpen: false
    };

    getRefs = el => {
        this.datePickerRef = el;
    };

    datePickerRef = null;

    handleOpen = () => {
        this.setState({ isOpen: true });
    };

    handleClose = () => {
        this.setState({ isOpen: false });
    };

    handleSelect = () => {
        if (!this.props.showTimeSelect) {
            this.handleClose();
        }

        if (this.props.onSelect) {
            this.props.onSelect();
        }
    };

    render() {
        const value = this.props.field.value
            ? this.props.field.value.format(this.props.dateFormat)
            : '';

        return (
            <div className={classNames(styles.root, this.props.className)}>
                <TextField
                    icon="calendar"
                    label={this.props.label}
                    name={this.props.field.name}
                    value={value}
                    error={this.props.field.error}
                    placeholder={this.props.placeholder}

                    fieldClassName={classNames(
                        styles.field,
                        this.props.fieldClassName
                    )}

                    readOnly
                    disabled={this.props.disabled}
                    required={this.props.required}

                    refField={this.getRefs}
                    onClick={this.handleOpen}
                />
                <Placement
                    isOpen={this.state.isOpen}
                    target={this.datePickerRef}
                    onDismiss={this.handleClose}
                    position="bottom-start"
                >
                    <DatePicker
                        inline
                        readOnly
                        showTimeSelect={this.props.showTimeSelect}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onSelect={this.handleSelect}
                        monthsShown={this.props.monthsShown}
                        excludeDates={this.props.excludeDates}
                        minDate={this.props.minDate}
                        maxDate={this.props.maxDate}
                        onChange={val => this.props.onChange(this.props.field.name, val)}
                        selected={this.props.field.value}
                        dateFormat={this.props.dateFormat}
                        timeIntervals={this.props.timeIntervals}
                    />
                </Placement>
            </div>
        );
    }
}

export default DatePickerField;
