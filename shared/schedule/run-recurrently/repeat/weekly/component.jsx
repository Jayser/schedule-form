import { Component } from 'react';
import { string, func } from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import { FieldsGroup, NumberField, TimePickerField } from '../../../../form';
import { DaysOfWeek } from '../../../shared';
import i18n from '../i18n';
import styles from './component.scss';

class Weekly extends Component {
    static propTypes = {
        name: string.isRequired,
        getField: func.isRequired,
        getFieldValue: func.isRequired,
        destroyForm: func.isRequired,
        onChange: func.isRequired,
        intl: intlShape
    };

    componentWillUnmount() {
        this.props.destroyForm(this.props.name);
    }

    render() {
        const field = this.props.getField(`${this.props.name}.every`);
        const dayOfWeek = this.props.getField(`${this.props.name}.dayOfWeek`);

        return (
            <FieldsGroup inline className={styles.root} contentClassName={styles.content}>
                <NumberField
                    required
                    label={this.props.intl.formatMessage(i18n.every)}
                    fieldClassName={styles.hourly}
                    maxLength={2}
                    max={12}
                    name={field.name}
                    value={field.value}
                    error={field.error}
                    onChange={this.props.onChange}
                >
                    <span>{this.props.intl.formatMessage(i18n.weeks)}</span>
                </NumberField>
                <DaysOfWeek
                    isRequired
                    format="short"
                    label={this.props.intl.formatMessage(i18n.daysOfWeek)}
                    error={dayOfWeek.error}
                    value={dayOfWeek.value}
                    fieldName={dayOfWeek.name}
                    onChange={this.props.onChange}
                />
                <TimePickerField
                    required
                    label={this.props.intl.formatMessage(i18n.runTime)}
                    field={this.props.getField(`${this.props.name}.runTime`)}
                    onChange={this.props.onChange}
                />
            </FieldsGroup>
        );
    }
}

export default injectIntl(Weekly);
