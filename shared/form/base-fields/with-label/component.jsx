import React from 'react';
import { string, bool, node } from 'prop-types';
import classNames from 'classnames';
import { LabelField } from '../index';
import styles from './component.scss';

const WithLabelField = props => (
    <div className={classNames(styles.root, props.className)}>
        {props.label &&
            <LabelField
                id={props.id}
                description={props.description}
                required={props.required}
                className={props.labelClassName}
                descriptionClassName={props.descriptionClassName}
            >
                {props.label}
            </LabelField>
        }
        {props.children}
    </div>
);

WithLabelField.propTypes = {
    id: string,
    description: string,
    descriptionClassName: string,
    label: string,
    labelClassName: string,
    className: string,
    required: bool,
    children: node.isRequired
};

WithLabelField.defaultProps = {
    id: undefined,
    description: undefined,
    descriptionClassName: undefined,
    label: undefined,
    className: undefined,
    labelClassName: undefined,
    required: false
};

export default WithLabelField;
