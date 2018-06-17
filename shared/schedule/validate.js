import { get } from 'lodash';
import moment from 'moment';

export const endDateMoreThenStartDate = (path, msg = 'End date should be more then start date') => (value, name, formValues) => {// eslint-disable-line
    const startDate = get(formValues, path);

    if (startDate && !moment(startDate).isBefore(moment(value))) {
        return msg;
    }
};
