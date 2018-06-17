import React, { Children } from 'react';
import { string, bool, node, func, any, shape } from 'prop-types';
import classNames from 'classnames';

import { FieldsGroup } from '../../index';
import { clonedRadio } from './cloned-radio';
import styles from './component.scss';

const RadioGroup = props => (props.hidden ? null : (
    <FieldsGroup
        title={props.title}
        description={props.description}
        className={classNames(styles.root, props.className)}
        contentClassName={classNames(styles.content, props.contentClassName)}
        required={props.required}
    >
        {Children.map(props.children, clonedRadio(props))}
    </FieldsGroup>
));

RadioGroup.propTypes = {
    title: node,
    description: node,
    field: shape({
        name: string.isRequired,
        value: any,
        error: string
    }).isRequired,
    required: bool,
    hidden: bool,
    className: string,
    contentClassName: string,
    children: node.isRequired,
    onChange: func.isRequired
};

RadioGroup.defaultProps = {
    title: undefined,
    description: undefined,
    required: false,
    hidden: false,
    className: undefined,
    contentClassName: undefined
};

export default RadioGroup;
