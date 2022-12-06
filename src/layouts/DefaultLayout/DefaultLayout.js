import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';

import Header from '~/components/Header/Header';
import Sidebar from '~/components/Sidebar/Sidebar';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')} id='homeScrollable'>
                    {children}
                </div>
            </div>
            <Button outline rounded className={cx('get-app')}>
                Get app
            </Button>
        </div>
    );
};

export default DefaultLayout;
