import React from 'react';
import { string, bool, node } from 'prop-types';
import classNames from 'classnames';

import { Badge } from '../../../../../index';
import styles from './component.scss';

const DropDownWithBadge = props => (
    <div className={classNames(styles.root, props.className)}>
        <span className={classNames(styles.label, props.labelClassName)}>
            {props.label}
        </span>

        {props.selected &&
            <Badge className={classNames(styles.badge, props.badgeClassName)}>
                {props.children}
            </Badge>
        }
    </div>
);

DropDownWithBadge.propTypes = {
    label: string.isRequired,
    selected: bool,
    children: node,
    className: string,
    labelClassName: string,
    badgeClassName: string
};

DropDownWithBadge.defaultProps = {
    selected: false,
    children: node,
    className: undefined,
    labelClassName: undefined,
    badgeClassName: undefined
};

export default DropDownWithBadge;
