import React, { Component } from 'react';
import { string, func } from 'prop-types';

import { FieldsGroup, NumberField, TimePickerField } from '../../../../form';
import styles from './component.scss';

class Daily extends Component {
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
        const field = this.props.getField(`${this.props.name}.every`);

        return (
            <FieldsGroup inline className={styles.root} contentClassName={styles.content}>
                <NumberField
                    required
                    label="EVERY"
                    fieldClassName={styles.hourly}
                    maxLength={2}
                    max={12}
                    name={field.name}
                    value={field.value}
                    error={field.error}
                    onChange={this.props.onChange}
                >
                    hour(s)
                </NumberField>
                <TimePickerField
                    required
                    label="RUN TIME"
                    field={this.props.getField(`${this.props.name}.runTime`)}
                    onChange={this.props.onChange}
                />
            </FieldsGroup>
        );
    }
}

export default Daily;
