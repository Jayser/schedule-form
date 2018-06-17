import React from 'react';
import { string, bool, func, node } from 'prop-types';
import classNames from 'classnames';
import uuid4 from 'uuid';

import { FieldWithError } from '../index';
import styles from './component.scss';

const Radio = props => {
    const className = classNames(styles.root, props.className, {
        [styles.disabled]: props.disabled,
        [styles.checked]: props.checked
    });

    const onChange = () => props.onChange(props.name, props.value);
    const id = uuid4();

    return props.hidden ? null : (
        <span className={className}>
            <FieldWithError error={props.error}>
                <label htmlFor={id} className={classNames(styles.label, props.labelClassName)}>
                    <input
                        hidden
                        id={id}
                        type="radio"
                        name={props.name}
                        value={props.value}
                        checked={props.checked}
                        disabled={props.disabled}
                        onChange={onChange}
                    />
                    <span className={styles.radio} />
                    {props.children &&
                        <span
                            tabIndex={-1}
                            role="radio"
                            aria-checked={props.checked}
                            className={classNames(styles.container, props.containerClassName)}
                            onClick={onChange}
                        >
                            {props.children}
                        </span>
                    }
                </label>
            </FieldWithError>
        </span>
    );
};

Radio.propTypes = {
    name: string,
    labelClassName: string,
    containerClassName: string,
    value: string,
    checked: bool,
    disabled: bool,
    hidden: bool,
    className: string,
    children: node.isRequired,
    error: string,
    onChange: func
};

Radio.defaultProps = {
    name: undefined,
    value: undefined,
    checked: false,
    disabled: false,
    hidden: false,
    className: undefined,
    containerClassName: undefined,
    error: undefined,
    onChange: undefined
};

export default Radio;
