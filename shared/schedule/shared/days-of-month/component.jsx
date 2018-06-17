import { string, bool, node, func, number, arrayOf } from 'prop-types';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';

import { FieldWithLabel, FieldWithError } from '../../../form';
import { DayCell } from '../index';
import styles from './component.scss';

const DaysOfMonth = props => {
    const handleChange = day => {
        const daysOfMonth = [...new Set([...props.value, day])];

        props.onChange(props.fieldName, daysOfMonth);
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
                    <div className={styles.dateCard}>
                        {[...Array(31).keys()].map(day => (
                            <DayCell
                                key={uuid()}
                                className={styles.dayCell}
                                value={day + 1}
                                label={`${day + 1}`}
                                isSelected={props.value.includes(day + 1)}
                                isDisabled={props.isDisabled}
                                onChange={handleChange}
                            />
                        ))}
                    </div>
                </FieldWithLabel>
            </FieldWithError>
            <div className={styles.description}>{props.description}</div>
        </div>
    );
};

DaysOfMonth.propTypes = {
    fieldName: string,
    className: string,
    labelClassName: string,
    description: string,
    label: string,

    value: arrayOf(number),

    error: node,

    isRequired: bool,
    isDisabled: bool,

    onChange: func
};

DaysOfMonth.defaultProps = {
    fieldName: '',
    className: undefined,
    labelClassName: undefined,
    description: undefined,
    label: '',

    value: [],

    error: null,

    isRequired: false,
    isDisabled: false,

    onChange: undefined
};

export default DaysOfMonth;
