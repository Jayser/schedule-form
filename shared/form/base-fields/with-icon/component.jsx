import React from 'react';
import { string, node } from 'prop-types';
import classNames from 'classnames';
import { Icon } from 'platform-common-ui';

import styles from './component.scss';

const WithIconField = props => (
    <div className={classNames(styles.root, props.className)}>
        {props.children}
        {props.icon &&
            <i className={classNames(styles.icon, props.iconClassName)}>
                <Icon icon={props.icon} />
            </i>
        }
    </div>
);

WithIconField.propTypes = {
    icon: string,
    className: string,
    iconClassName: string,
    children: node.isRequired
};

WithIconField.defaultProps = {
    icon: '',
    className: undefined,
    iconClassName: undefined
};

export default WithIconField;
