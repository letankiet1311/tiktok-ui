import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { DISCOVER_LIST, FOOTER_LIST } from '~/utils/data';
import suggested from '../../api/suggestedApi';
import AccountMenu from '../AccountMenu/AccountMenu';
import Footer from './Footer/Footer';
import NavMenu from './NavMenu/NavMenu';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const Sidebar = () => {
    const [suggestedAccounts, setSuggestedAccount] = useState([]);

    useEffect(() => {
        (async function () {
            try {
                const suggestedAccounts = await suggested(1, 5);
                setSuggestedAccount(suggestedAccounts);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <NavMenu />

                <AccountMenu
                    data={suggestedAccounts}
                    title='Suggested accounts'
                    tooltip
                    small
                    moreTitle='See All'
                    sidebar
                />

                <AccountMenu
                    data={suggestedAccounts}
                    title='Following accounts'
                    small
                    moreTitle='See More'
                    sidebar
                />

                <div className={cx('discover')}>
                    <h3 className={cx('discover-header')}>Discover</h3>
                    {DISCOVER_LIST.map((item, index) => (
                        <div key={index} className={cx('discover-keyword')}>
                            {item.icon}
                            <span>{item.title}</span>
                        </div>
                    ))}
                </div>

                <Footer data={FOOTER_LIST} />
            </div>
        </div>
    );
};

export default Sidebar;
