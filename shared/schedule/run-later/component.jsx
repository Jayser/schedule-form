import React, { Component } from 'react';
import { string, func } from 'prop-types';
import moment from 'moment';

import { FieldsGroup, DatePickerField } from '../../form';
import { TimeZone } from '../shared/time-zone';
import styles from './component.scss';

class RunLater extends Component {
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
        return (
            <FieldsGroup required className={styles.root}>
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
            </FieldsGroup>
        );
    }
}

export default RunLater;
