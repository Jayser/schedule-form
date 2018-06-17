import { string, func } from 'prop-types';
import classNames from 'classnames';
import { get } from 'lodash';

import { DropDownField, RadioGroup, RadioField } from '../../../form';
import { timeZones } from '../../../helpers';

import { dropDownWithBadge } from './drop-down-with-badge';
import { initialValues, SELECTED_NESTED_FIELD_NAME } from '../../constants';
import styles from './component.scss';


const timeZoneOptions = timeZones.map(timeZone => ({ label: timeZone.label, value: timeZone.name }));

const TimeZone = props => (
    <RadioGroup
        required
        title="TIME ZONE"
        description="(APPLIES TO ALL TIME SETTINGS FOR THIS SCHEDULE)"
        field={props.getField(`${props.name}.${SELECTED_NESTED_FIELD_NAME}`)}
        className={classNames(styles.root, props.className)}
        onChange={props.onChange}
    >
        <RadioField value="machineTime">Locale Machine Time</RadioField>
        <RadioField value="locale">
            <DropDownField
                isClearable
                field={props.getField(`${props.name}.locale`)}
                defaultValue={get(initialValues, `${props.name}.locale`)}
                isDisabled={props.getFieldValue(`${props.name}.${SELECTED_NESTED_FIELD_NAME}`) !== 'locale'}
                valueComponent={dropDownWithBadge}
                optionComponent={dropDownWithBadge}
                options={timeZoneOptions}
                onChange={props.onChange}
            />
        </RadioField>
    </RadioGroup>
);

TimeZone.propTypes = {
    name: string.isRequired,
    className: string,
    getField: func.isRequired,
    getFieldValue: func.isRequired,
    onChange: func.isRequired
};

TimeZone.defaultProps = {
    className: undefined
};

export default TimeZone;
