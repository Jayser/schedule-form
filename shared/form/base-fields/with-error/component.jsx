import React from 'react';
import { string, node } from 'prop-types';
import classNames from 'classnames';

import styles from './component.scss';

const WithErrorField = props => (
    <div className={classNames(styles.root, { [styles['with-error']]: props.error })}>
        {props.children}
        {props.error && <span className={styles.error}>{props.error}</span>}
    </div>
);

WithErrorField.propTypes = {
    error: string,
    children: node.isRequired
};

WithErrorField.defaultProps = {
    error: undefined
};

export default WithErrorField;
