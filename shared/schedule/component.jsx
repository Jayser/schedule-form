import React from 'react';
import { string, func } from 'prop-types';

import { withForm, RadioGroup, RadioField } from '../form';

import { RunLater } from './run-later';
import { RunRecurrently } from './run-recurrently';

import { SCHEDULE_STEPS_NAME, validationSchema, initialValues, SELECTED_NESTED_FIELD_NAME } from './constants';
import styles from './component.scss';

const Schedule = props => (
    <form id={props.id} onSubmit={props.onSubmit} className={styles.root} noValidate>
        <RadioGroup
            required
            title="SCHEDULE"
            field={props.getField(`schedule.${SELECTED_NESTED_FIELD_NAME}`)}
            onChange={props.onChange}
        >
            <RadioField value={SCHEDULE_STEPS_NAME.RUN_NOW}>Run now</RadioField>
            <RadioField value={SCHEDULE_STEPS_NAME.RUN_ONE_TIME}>Run later</RadioField>
            <RadioField value={SCHEDULE_STEPS_NAME.RUN_RECURRENTLY}>Run recurrently</RadioField>
        </RadioGroup>

        {props.shouldShow(`schedule.${SELECTED_NESTED_FIELD_NAME}`, SCHEDULE_STEPS_NAME.RUN_ONE_TIME) &&
            <RunLater {...props} name={`schedule.${SCHEDULE_STEPS_NAME.RUN_ONE_TIME}`} />
        }
        {props.shouldShow(`schedule.${SELECTED_NESTED_FIELD_NAME}`, SCHEDULE_STEPS_NAME.RUN_RECURRENTLY) &&
            <RunRecurrently {...props} name={`schedule.${SCHEDULE_STEPS_NAME.RUN_RECURRENTLY}`} />
        }
    </form>
);

Schedule.propTypes = {
    id: string.isRequired,
    getField: func.isRequired,
    shouldShow: func.isRequired,
    onChange: func.isRequired,
    onSubmit: func.isRequired
};

export default withForm({
    validationSchema,
    initialValues
})(Schedule);
