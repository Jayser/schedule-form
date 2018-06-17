import { cloneElement } from 'react';
import { get } from 'lodash';

import styles from './component.scss';

export const clonedRadio = ({ field: { name, value = {}, error = {} }, onChange }) => Radio =>
    cloneElement(Radio, {
        name,
        checked: Radio.props.value === value,
        className: styles.radio,
        value: Radio.props.value,
        error: get(error, name),
        onChange
    });
