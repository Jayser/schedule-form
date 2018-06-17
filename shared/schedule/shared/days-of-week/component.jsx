import { string, bool, node, number, func, oneOf, arrayOf } from 'prop-types';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';

import { FieldWithLabel, FieldWithError } from '../../../form';
import { DayCell } from '../index';
import { DAYS_OF_WEEK } from '../constants';
import styles from './component.scss';

const DaysOfWeek = props => {
    const handleChange = day => {
        const daysOfWeek = [...new Set([...props.value, day])];

        props.onChange(props.fieldName, daysOfWeek);
    };

    return (
        <div className={classNames(styles.root, props.className)}>
            <FieldWithError error={props.error}>
                <FieldWithLabel
                    id={uuid()}
                    label={props.label}
                    required={props.isRequired}
                    className={props.labelClassName}
                >
                    <div className={styles.daysList}>
                        {DAYS_OF_WEEK.map(day => (
                            <DayCell
                                key={uuid()}
                                isDisabled={props.isDisabled}
                                className={styles.dayCell}
                                value={day.number}
                                label={props.format === 'short' ? day.shortName : day.name}
                                isSelected={props.value.includes(day.number)}
                                onChange={handleChange}
                            />
                        ))}
                    </div>
                </FieldWithLabel>
            </FieldWithError>
        </div>
    );
};

DaysOfWeek.propTypes = {
    fieldName: string,
    className: string,
    labelClassName: string,
    label: string,

    format: oneOf(['short', 'long']),

    value: arrayOf(number),

    error: node,

    isRequired: bool,
    isDisabled: bool,

    onChange: func
};

DaysOfWeek.defaultProps = {
    fieldName: '',
    className: undefined,
    labelClassName: undefined,
    label: '',

    format: 'short',

    value: [],

    error: null,

    isRequired: false,
    isDisabled: false,

    onChange: undefined
};

export default DaysOfWeek;
