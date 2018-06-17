import { getMyTimeZone } from '../../shared/helpers';
import { required } from '../form/validate';
import { endDateMoreThenStartDate } from './validate';
import { UNSPECIFIC_INDICATORS, unspecificDatesOptions } from './shared';
import { withForm } from '../form';

export const SCHEDULE_STEPS_NAME = {
    RUN_NOW: 'RUN_NOW',
    RUN_ONE_TIME: 'RUN_ONE_TIME',
    RUN_RECURRENTLY: 'RUN_RECURRENTLY'
};

export const SELECTED_NESTED_FIELD_NAME = withForm.SELECTED_NESTED_FIELD_NAME;

const recurrentlyStartDataPath = `schedule.${SCHEDULE_STEPS_NAME.RUN_RECURRENTLY}.startDate`;

export const validationSchema = {
    schedule: {
        [SCHEDULE_STEPS_NAME.RUN_ONE_TIME]: {
            startDate: [required('Please select start date!')]
        },
        [SCHEDULE_STEPS_NAME.RUN_RECURRENTLY]: {
            startDate: [required('Please select start date!')],
            endDate: {
                date: [required('Please select end start date!'), endDateMoreThenStartDate(recurrentlyStartDataPath)]
            },
            repeat: {
                hourly: {
                    every: [required('is a required property')]
                },
                daily: {
                    every: [required('is a required property')],
                    runTime: [required('is a required property')]
                },
                weekly: {
                    every: [required('is a required property')],
                    runTime: [required('is a required property')],
                    dayOfWeek: [required('is a required property')]
                },
                monthly: {
                    every: [required('is a required property')],
                    runTime: [required('is a required property')],
                    dateOfMonth: [required('is a required property')]
                }
            }
        }
    }
};

export const initialValues = {
    schedule: {
        [SELECTED_NESTED_FIELD_NAME]: SCHEDULE_STEPS_NAME.RUN_RECURRENTLY,
        [SCHEDULE_STEPS_NAME.RUN_NOW]: [SCHEDULE_STEPS_NAME.RUN_NOW],
        [SCHEDULE_STEPS_NAME.RUN_ONE_TIME]: {
            startDate: null,
            timeZone: {
                [SELECTED_NESTED_FIELD_NAME]: 'machineTime',
                locale: getMyTimeZone().name,
                machineTime: null
            }
        },
        [SCHEDULE_STEPS_NAME.RUN_RECURRENTLY]: {
            startDate: null,
            timeZone: {
                [SELECTED_NESTED_FIELD_NAME]: 'machineTime',
                locale: getMyTimeZone().name,
                machineTime: null
            },
            repeat: {
                [SELECTED_NESTED_FIELD_NAME]: 'daily',
                hourly: {
                    every: ''
                },
                daily: {
                    runTime: '',
                    every: ''
                },
                weekly: {
                    every: '',
                    runTime: '',
                    dayOfWeek: undefined
                },
                monthly: {
                    every: '',
                    runTime: '',
                    unspecificIndicator: UNSPECIFIC_INDICATORS[0].value,
                    unspecificDate: unspecificDatesOptions[0].value,
                    dateOfMonth: undefined
                }
            },
            endDate: {
                [SELECTED_NESTED_FIELD_NAME]: 'never',
                date: null,
                never: null
            }
        }
    }
};
