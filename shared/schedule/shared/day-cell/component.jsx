import { string, bool, oneOfType, func, number, shape } from 'prop-types';
import classNames from 'classnames';

import styles from './component.scss';

const DayCell = props => (
    <button
        type="button"
        value={props.value}
        className={classNames(
            styles.root,
            {
                [styles.selected]: props.isSelected,
                [styles.disabled]: props.isDisabled
            },
            props.className
        )}
        disabled={props.isDisabled}
        onClick={() => props.onChange(props.value)}
    >
        {props.label}
    </button>
);

DayCell.propTypes = {
    className: string,
    label: string,

    isSelected: bool,
    isDisabled: bool,

    value: oneOfType([number, string, shape({})]),

    onChange: func
};

DayCell.defaultProps = {
    className: undefined,
    label: '',

    isSelected: false,
    isDisabled: false,

    value: undefined,

    onChange: undefined
};

export default DayCell;
