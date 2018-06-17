import React, { Component } from 'react';
import { func, string } from 'prop-types';
import moment from 'moment';

import {
    FieldsGroup,
    RadioGroup,
    RadioField,
    DatePickerField
} from '../../form';

import styles from './component.scss';
import { TimeZone } from '../shared/time-zone';
import { SELECTED_NESTED_FIELD_NAME } from '../constants';
import { Repeat } from './repeat';

class RunRecurrently extends Component {
    static propTypes = {
        name: string.isRequired,
        getField: func.isRequired,
        getFieldValue: func.isRequired,
        destroyForm: func.isRequired,
        onChange: func.isRequired
    };

    componentWillUnmount() {
        this.props.destroyForm(this.props.name);
    }

    render() {
        const endDateFieldName = `${this.props.name}.endDate.${SELECTED_NESTED_FIELD_NAME}`;

        return (
            <FieldsGroup className={styles.root}>
                <DatePickerField
                    required
                    showTimeSelect
                    label="STARTING"
                    className={styles.row}
                    minDate={moment()}
                    field={this.props.getField(`${this.props.name}.startDate`)}
                    onChange={this.props.onChange}
                />
                <TimeZone {...this.props} name={`${this.props.name}.timeZone`} className={styles.row} />
                <Repeat {...this.props} name={`${this.props.name}.repeat`} />
                <RadioGroup
                    required
                    title="END ON"
                    className={styles.row}
                    field={this.props.getField(`${this.props.name}.endDate.${SELECTED_NESTED_FIELD_NAME}`)}
                    onChange={this.props.onChange}
                >
                    <RadioField value="date">
                        <DatePickerField
                            required
                            showTimeSelect
                            minDate={moment()}
                            field={this.props.getField(`${this.props.name}.endDate.date`)}
                            disabled={this.props.getFieldValue(endDateFieldName) !== 'date'}
                            onChange={this.props.onChange}
                        />
                    </RadioField>
                    <RadioField value="never">Never</RadioField>
                </RadioGroup>
            </FieldsGroup>
        );
    }
}

export default RunRecurrently;
