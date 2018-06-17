import React, { Component } from 'react';
import { string, func } from 'prop-types';

import { RadioGroup, RadioField } from '../../../form';
import { SELECTED_NESTED_FIELD_NAME } from '../../constants';
import { Hourly } from './hourly';
import { Daily } from './daily';
import { Weekly } from './weekly';
import { Monthly } from './monthly';
import styles from './component.scss';

class Repeat extends Component {
    static propTypes = {
        name: string.isRequired,
        shouldShow: func.isRequired,
        getField: func.isRequired,
        getFieldValue: func.isRequired,
        destroyForm: func.isRequired,
        onChange: func.isRequired
    };

    componentWillUnmount() {
        this.props.destroyForm(this.props.name);
    }

    render() {
        return (
            <div>
                <RadioGroup
                    required
                    title="REPEAT"
                    className={styles.row}
                    field={this.props.getField(`${this.props.name}.${SELECTED_NESTED_FIELD_NAME}`)}
                    onChange={this.props.onChange}
                >
                    <RadioField value="hourly">Hourly</RadioField>
                    <RadioField value="daily">Daily</RadioField>
                    <RadioField value="weekly">Weekly</RadioField>
                    <RadioField value="monthly">Monthly</RadioField>
                </RadioGroup>
                {this.props.shouldShow(`${this.props.name}.${SELECTED_NESTED_FIELD_NAME}`, 'hourly') &&
                    <Hourly {...this.props} name={`${this.props.name}.hourly`} />
                }
                {this.props.shouldShow(`${this.props.name}.${SELECTED_NESTED_FIELD_NAME}`, 'daily') &&
                    <Daily {...this.props} name={`${this.props.name}.daily`} />
                }
                {this.props.shouldShow(`${this.props.name}.${SELECTED_NESTED_FIELD_NAME}`, 'weekly') &&
                    <Weekly {...this.props} name={`${this.props.name}.weekly`} />
                }
                {this.props.shouldShow(`${this.props.name}.${SELECTED_NESTED_FIELD_NAME}`, 'monthly') &&
                    <Monthly {...this.props} name={`${this.props.name}.monthly`} />
                }
            </div>
        );
    }
}

export default Repeat;
