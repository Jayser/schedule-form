import { Component } from 'react';
import { string, func } from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import {
    FieldsGroup,
    NumberField,
    RadioGroup,
    RadioField,
    TimePickerField
} from '../../../../form';
import { DaysOfMonth, UNSPECIFIC_INDICATORS, unspecificDatesOptions } from '../../../shared';
import { SELECTED_NESTED_FIELD_NAME } from '../../../constants';
import { UnspecificDates } from './unspecific-dates';
import i18n from '../i18n';
import styles from './component.scss';

class Monthly extends Component {
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
        const unspecificIndicatorField = this.props.getField(`${this.props.name}.unspecificIndicator`);
        const unspecificDateField = this.props.getField(`${this.props.name}.unspecificDate`);
        const dateOfMonth = this.props.getField(`${this.props.name}.dateOfMonth`);
        const runOnSelected = this.props.getFieldValue(`${this.props.name}.runOn.${SELECTED_NESTED_FIELD_NAME}`);
        const unspecificDatesSelected = runOnSelected === 'unspecificDates';
        const specificDatesSelected = runOnSelected === 'specificDates';

        return (
            <FieldsGroup className={styles.root}>
                <NumberField
                    required
                    label={this.props.intl.formatMessage(i18n.every)}
                    fieldClassName={styles.hourly}
                    className={styles.field}
                    maxLength={2}
                    max={12}
                    name={field.name}
                    value={field.value}
                    error={field.error}
                    onChange={this.props.onChange}
                >
                    <span>{this.props.intl.formatMessage(i18n.months)}</span>
                </NumberField>
                <RadioGroup
                    required
                    title={this.props.intl.formatMessage(i18n.runOn)}
                    className={styles.field}
                    field={this.props.getField(`${this.props.name}.runOn.${SELECTED_NESTED_FIELD_NAME}`)}
                    onChange={this.props.onChange}
                >
                    <RadioField value="specificDates">
                        <span>{this.props.intl.formatMessage(i18n.specificDates)}</span>
                    </RadioField>
                    <RadioField value="unspecificDates">
                        <UnspecificDates
                            isRequired={unspecificDatesSelected}
                            isDisabled={!unspecificDatesSelected}
                            unspecificIndicatorOptions={UNSPECIFIC_INDICATORS}
                            unspecificDateOptions={unspecificDatesOptions}
                            unspecificIndicatorField={unspecificIndicatorField}
                            unspecificDateField={unspecificDateField}
                            onChange={this.props.onChange}
                        />
                    </RadioField>
                </RadioGroup>
                <DaysOfMonth
                    isRequired={specificDatesSelected}
                    isDisabled={!specificDatesSelected}
                    className={styles.field}
                    error={dateOfMonth.error}
                    value={dateOfMonth.value}
                    fieldName={dateOfMonth.name}
                    label={this.props.intl.formatMessage(i18n.daysOfMonth)}
                    description={this.props.intl.formatMessage(i18n.daysOfMonthDescription)}
                    onChange={this.props.onChange}
                />
                <TimePickerField
                    required
                    className={styles.field}
                    label={this.props.intl.formatMessage(i18n.runTime)}
                    field={this.props.getField(`${this.props.name}.runTime`)}
                    onChange={this.props.onChange}
                />
            </FieldsGroup>
        );
    }
}

export default injectIntl(Monthly);
