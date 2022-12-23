import classNames from 'classnames';
import { nanoid } from 'nanoid';
import styles from './checkbox.module.scss';

function Checkbox({ onChange, checked = false, id = nanoid(), className }) {
    return (
        <label htmlFor={id} className={classNames(className, styles.checkbox)}>
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <span />
        </label>
    );
}

export default Checkbox;
