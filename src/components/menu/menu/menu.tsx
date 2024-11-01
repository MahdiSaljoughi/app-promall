import classNames from 'classnames';
import styles from './menu.module.scss';
import React from 'react';

export interface MenuProps {
    className?: string;
}

export const Menu = ({ className }: MenuProps) => {
    return <div className={classNames(styles.menu, className)}></div>;
};
