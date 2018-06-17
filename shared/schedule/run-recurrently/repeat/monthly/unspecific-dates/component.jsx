import { arrayOf, shape, bool, string, func, number } from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import { isEmpty } from 'lodash';

import { DropDownField } from '../../../../../form';
import i18n from '../../i18n';
import styles from './component.scss';

const UnspecificDates = props => (
    <div className={classNames(styles.root, props.className)}>
        {!isEmpty(props.unspecificIndicatorOptions) &&
            <DropDownField
                options={props.unspecificIndicatorOptions}
                required={props.isRequired}
                isDisabled={props.isDisabled}
                placeholder={props.placeholder}
                field={props.unspecificIndicatorField}
                className={classNames(styles.unspecificDatesDropdown, props.dropdownClassName)}
                onChange={props.onChange}
            />
        }
        {!isEmpty(props.unspecificDateOptions) &&
            <DropDownField
                options={props.unspecificDateOptions}
                required={props.isRequired}
                isDisabled={props.isDisabled}
                placeholder={props.placeholder}
                field={props.unspecificDateField}
                className={classNames(styles.unspecificDatesDropdown, props.dropdownClassName)}
                onChange={props.onChange}
            />
        }
        <span>{props.intl.formatMessage(i18n.ofTheMonth)}</span>
    </div>
);

UnspecificDates.propTypes = {
    unspecificIndicatorOptions: arrayOf(shape({
        label: string,
        value: string
    })),
    unspecificDateOptions: arrayOf(shape({
        label: string,
        value: number
    })),
    unspecificIndicatorField: shape({
        name: string
    }),
    unspecificDateField: shape({
        name: string
    }),

    label: string,
    placeholder: string,
    className: string,
    dropdownClassName: string,

    isRequired: bool,
    isDisabled: bool,

    onChange: func.isRequired,

    intl: intlShape
};

UnspecificDates.defaultProps = {
    unspecificIndicatorOptions: [],
    unspecificDateOptions: [],
    unspecificIndicatorField: {},
    unspecificDateField: {},

    label: '',
    placeholder: '',
    className: undefined,
    dropdownClassName: undefined,

    isRequired: false,
    isDisabled: false,

    onChange: undefined
};

export default injectIntl(UnspecificDates);
