/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import { MENU_ITEM_SHARE } from '~/utils/data';
import Button from '../Button/Button';
import { CommentIcon, HeartIcon, MusicIcon, ShareIcon } from '../Icons';
import Image from '../Image/Image';
import ShareMenu from '../ShareMenu/ShareMenu';
import Name from './Name/Name';
import styles from './PostItem.module.scss';
import PostVideo from './PostVideo/PostVideo';

const cx = classNames.bind(styles);

const PostItem = ({ data = {} }) => {
    const [isLiked, setIsLiked] = useState(data.is_liked || false);
    const videoRef = useRef();
    const postRef = useRef();

    useEffect(() => {
        if (postRef.current) {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.7,
            };
            const observer = new IntersectionObserver((entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        videoRef.current.handlePlay();
                    } else {
                        videoRef.current.handlePause();
                    }
                }
            }, options);
            observer.observe(postRef.current);
        }
    }, []);

    // useEffect(() => {
    //     postRef.current.addEventListener('mouseover', () => {
    //         videoRef.current.handlePlay();
    //     });
    //     postRef.current.addEventListener('mouseleave', () => {
    //         videoRef.current.handlePause();
    //     });
    //     return () => {
    //         postRef.current.removeEventListener('mouseover', () => {
    //             videoRef.current.handlePlay();
    //         });
    //         // eslint-disable-next-line react-hooks/exhaustive-deps
    //         postRef.current.removeEventListener('mouseleave', () => {
    //             videoRef.current.handlePause();
    //         });
    //     };
    // }, []);

    return (
        <div className={cx('post-item')} ref={postRef}>
            <div className={cx('header')}>
                <Image
                    className={cx('avatar')}
                    src={data.user?.avatar}
                    alt={data.uuid}
                />
                <div>
                    <Name user={data.user} />
                    <p className={cx('description')}>{data.description}</p>
                    <strong className={cx('music')}>
                        <MusicIcon />
                        {data.music || 'music'}
                    </strong>
                </div>

                <Button primary outline small className={cx('follow-btn')}>
                    Follow
                </Button>
            </div>

            <div className={cx('body')}>
                <PostVideo src={data.file_url} ref={videoRef} />
                <div className={cx('react-field')}>
                    <div
                        className={cx('like', { active: isLiked })}
                        onClick={() => setIsLiked(!isLiked)}
                    >
                        <div className={cx('icon')}>
                            <HeartIcon />
                        </div>
                        <p className={cx('count')}>{data.likes_count}</p>
                    </div>

                    <div className={cx('comment')}>
                        <div className={cx('icon')}>
                            <CommentIcon />
                        </div>
                        <p className={cx('count')}>{data.comments_count}</p>
                    </div>

                    <ShareMenu
                        data={MENU_ITEM_SHARE}
                        tippyProps={{
                            placement: 'top-start',
                            offset: [-16, 10],
                        }}
                    >
                        <div className={cx('share')}>
                            <div className={cx('icon')}>
                                <ShareIcon />
                            </div>
                            <p className={cx('count')}>{data.shares_count}</p>
                        </div>
                    </ShareMenu>
                </div>
            </div>
        </div>
    );
};

PostItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default PostItem;
