import classNames from 'classnames';

import DesktopIcon from '@assets/icons/settings/desktop-icon.svg';
import MobileIcon from '@assets/icons/settings/mobile-icon.svg';
import MetamaskIcon from '@assets/icons/metamask-icon.png';
import AddIcon from '@assets/icons/settings/add-icon.svg';
import ConnectIcon from '@assets/icons/settings/connect-icon.svg';
import FacebookIcon from '@assets/icons/settings/facebook-icon.svg';
import TwitterIcon from '@assets/icons/settings/twitter-icon.svg';
import GoogleIcon from '@assets/icons/settings/google-icon.svg';
import styles from './style.module.scss';

const Settings = () => (
  <div className={styles.root}>
    <h1 className={styles.root__title}>
      Profile settings
    </h1>
    <div className={styles.root__wrapper}>
      <div className={styles.root__block}>
        <h2 className={styles.root__subtitle}>
          Account information
        </h2>
        <div className={styles.root_group}>
          <div className={styles.root_group__item}>
            <label className={styles.root_group__label}>
              Username
            </label>
            <input type="text" className={styles.root_group__input} placeholder="@sebastianbennett" />
          </div>
          <div className={styles.root_group__item}>
            <label className={styles.root_group__label}>
              Full name
            </label>
            <input type="text" className={styles.root_group__input} placeholder="Sebastian Bennett" />
          </div>
          <div className={styles.root_group__item}>
            <label className={styles.root_group__label}>
              Username
            </label>
            <input type="text" className={styles.root_group__input} placeholder="January 24, 1983" />
          </div>
        </div>
      </div>
      <div className={styles.root__block}>
        <h2 className={styles.root__subtitle}>
          Contact details
        </h2>
        <div className={styles.root_group}>
          <div className={styles.root_group__item}>
            <label className={styles.root_group__label}>
              Email address
            </label>
            <input type="text" className={styles.root_group__input} placeholder="seb.bennett@gmail.com" />
          </div>
          <div className={styles.root_group__item}>
            <label className={styles.root_group__label}>
              Phone number
            </label>
            <input type="text" className={styles.root_group__input} placeholder="+995 590 558 124" />
          </div>
          <div className={styles.root_group__item}>
            <label className={styles.root_group__label}>
              Address
            </label>
            <input
              type="text"
              className={styles.root_group__input}
              placeholder="Boulevard Crescent retail 1 - Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai"
            />
          </div>
        </div>
      </div>
      <div className={styles.root__wrap}>
        <button className={classNames(styles.root__btn, styles.root__btn_dark)}>
          Update Settings
        </button>
        <button className={classNames(styles.root__btn, styles.root__btn_light)}>
          Cancel
        </button>
      </div>
    </div>
    <br />
    {/* Security */}
    <div className={styles.root__wrapper}>
      <div className={styles.root__block}>
        <h2 className={styles.root__subtitle}>
          Login details
        </h2>
        <div className={styles.root_group}>
          <div className={styles.root_group__item}>
            <label className={styles.root_group__label}>
              Current password
            </label>
            <input type="password" className={styles.root_group__input} placeholder="••••••" />
          </div>
          <div className={styles.root_group__item}>
            <label className={styles.root_group__label}>
              Security questions
            </label>
            <input type="text" className={styles.root_group__input} placeholder="Your fathers name" />
          </div>
          <div className={styles.root_group__item}>
            <label className={styles.root_group__label}>
              2-Step verification
            </label>
            <input type="text" className={styles.root_group__input} value="Enabled" readOnly />
          </div>
        </div>
      </div>
      <div className={styles.root__block}>
        <h2 className={styles.root__subtitle}>
          Security credentials
        </h2>
        <div className={styles.root_group}>
          <div className={styles.root_group__item}>
            <div className={styles.root_group__item__inner}>
              <div className={styles.root_group__item__icon}>
                <img src={DesktopIcon} alt="" />
              </div>
              <div className={styles.root_group__info}>
                <p className={styles.root_group__info__subtitle}>
                  01 Apr 2021 at 06:25PM
                </p>
                <p className={styles.root_group__info__text}>
                  Mac OS Safari 15.1
                </p>
              </div>
              <button className={styles.root_group__item__btn}>
                Current session
              </button>
            </div>
          </div>
          <div className={styles.root_group__item}>
            <div className={styles.root_group__item__inner}>
              <div className={styles.root_group__item__icon}>
                <img src={MobileIcon} alt="" />
              </div>
              <div className={styles.root_group__info}>
                <p className={styles.root_group__info__subtitle}>
                  01 Apr 2021 at 06:25PM
                </p>
                <p className={styles.root_group__info__text}>
                  Mac OS Safari 15.1
                </p>
              </div>
              <button className={styles.root_group__item__btn}>
                Current session
              </button>
            </div>
          </div>
          <div className={styles.root_group__item}>
            <div className={styles.root_group__item__inner}>
              <div className={styles.root_group__item__icon}>
                <img src={MobileIcon} alt="" />
              </div>
              <div className={styles.root_group__info}>
                <p className={styles.root_group__info__subtitle}>
                  01 Apr 2021 at 06:25PM
                </p>
                <p className={styles.root_group__info__text}>
                  Mac OS Safari 15.1
                </p>
              </div>
              <button className={styles.root_group__item__btn}>
                Current session
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.root__wrap}>
        <button className={classNames(styles.root__btn, styles.root__btn_dark)}>
          Update Settings
        </button>
        <button className={classNames(styles.root__btn, styles.root__btn_light)}>
          Cancel
        </button>
      </div>
    </div>
    <br />
    {/* Apps */}
    <div className={styles.root__wrapper}>
      <div className={styles.root__block}>
        <h2 className={styles.root__subtitle}>
          Crypto wallet
        </h2>
        <div className={styles.root_group}>
          <div className={styles.root_group__item}>
            <div className={styles.root_group__item__inner}>
              <div className={styles.root_group__item__icon}>
                <img src={MetamaskIcon} alt="" />
              </div>
              <div className={styles.root_group__info}>
                <p className={styles.root_group__info__subtitle}>
                  Metamask
                </p>
                <p className={styles.root_group__info__text}>
                  0xd6647Eeec0c8D810C546f2ab8e025D4664d833Ac
                </p>
              </div>
              <button className={styles.root_group__item__disconnect}>
                Disconnect
              </button>
            </div>
          </div>
          <div className={styles.root_group__item}>
            <button className={styles.root_group__item__add}>
              <img src={AddIcon} alt="" />
              Add More
            </button>
          </div>
        </div>
      </div>
      <div className={styles.root__block}>
        <h2 className={styles.root__subtitle}>
          Social profiles
        </h2>
        <div className={styles.root_group}>
          <div className={styles.root_group__item}>
            <div className={styles.root_group__item__inner}>
              <div className={styles.root_group__item__icon}>
                <img src={FacebookIcon} alt="" />
              </div>
              <div className={styles.root_group__info}>
                <p className={styles.root_group__info__subtitle}>
                  Facebook
                </p>
                <p className={styles.root_group__info__text}>
                  Not connected
                </p>
              </div>
              <button className={styles.root_group__item__connect}>
                <img src={ConnectIcon} alt="" />
                Connect
              </button>
            </div>
          </div>
          <div className={styles.root_group__item}>
            <div className={styles.root_group__item__inner}>
              <div className={styles.root_group__item__icon}>
                <img src={TwitterIcon} alt="" />
              </div>
              <div className={styles.root_group__info}>
                <p className={styles.root_group__info__subtitle}>
                  Twitter
                </p>
                <p className={styles.root_group__info__text}>
                  Not connected
                </p>
              </div>
              <button className={styles.root_group__item__connect}>
                <img src={ConnectIcon} alt="" />
                Connect
              </button>
            </div>
          </div>
          <div className={styles.root_group__item}>
            <div className={styles.root_group__item__inner}>
              <div className={styles.root_group__item__icon}>
                <img src={GoogleIcon} alt="" />
              </div>
              <div className={styles.root_group__info}>
                <p className={styles.root_group__info__subtitle}>
                  Instagram
                </p>
                <p className={styles.root_group__info__text}>
                  Not connected
                </p>
              </div>
              <button className={styles.root_group__item__connect}>
                <img src={ConnectIcon} alt="" />
                Connect
              </button>
            </div>
          </div>
          <div className={styles.root_group__item}>
            <button className={styles.root_group__item__add}>
              <img src={AddIcon} alt="" />
              Add More
            </button>
          </div>
        </div>
      </div>
      <div className={styles.root__wrap}>
        <button className={classNames(styles.root__btn, styles.root__btn_dark)}>
          Update Settings
        </button>
        <button className={classNames(styles.root__btn, styles.root__btn_light)}>
          Cancel
        </button>
      </div>
    </div>
    {/* Notifications */}
    <div className={styles.root__wrapper}>
      <div className={styles.root__block}>
        <h2 className={styles.root__subtitle}>
          Notifications
        </h2>
        <div className={styles.root_group}>
          <div className={styles.root_group__item}>
            <div className={styles.root_group__item__inner}>
              <div className={styles.root_group__info}>
                <p className={styles.root_group__info__subtitle}>
                  Product updates
                </p>
                <p className={styles.root_group__info__text}>
                  Receive messages from our platform
                </p>
              </div>
              <button className={styles.root_group__item__switch}>
                switcher here
              </button>
            </div>
          </div>
          <div className={styles.root_group__item}>
            <div className={styles.root_group__item__inner}>
              <div className={styles.root_group__info}>
                <p className={styles.root_group__info__subtitle}>
                  Reminders
                </p>
                <p className={styles.root_group__info__text}>
                  Receive booking reminders, pricing notices
                </p>
              </div>
              <button className={styles.root_group__item__switch}>
                switcher here
              </button>
            </div>
          </div>
          <div className={styles.root_group__item}>
            <div className={styles.root_group__item__inner}>
              <div className={styles.root_group__info}>
                <p className={styles.root_group__info__subtitle}>
                  Promotions and tips
                </p>
                <p className={styles.root_group__info__text}>
                  Receive coupons, promotions, surveys
                </p>
              </div>
              <button className={styles.root_group__item__switch}>
                switcher here
              </button>
            </div>
          </div>
          <div className={styles.root_group__item}>
            <div className={styles.root_group__item__inner}>
              <div className={styles.root_group__info}>
                <p className={styles.root_group__info__subtitle}>
                  Policy and community
                </p>
                <p className={styles.root_group__info__text}>
                  Receive updates on job regulations
                </p>
              </div>
              <button className={styles.root_group__item__switch}>
                switcher here
              </button>
            </div>
          </div>
          <div className={styles.root_group__item}>
            <div className={styles.root_group__item__inner}>
              <div className={styles.root_group__info}>
                <p className={styles.root_group__info__subtitle}>
                  Account support
                </p>
                <p className={styles.root_group__info__text}>
                  Receive messages about your account, your trips, legal alerts
                </p>
              </div>
              <button className={styles.root_group__item__switch}>
                switcher here
              </button>
            </div>
          </div>
          <div className={styles.root_group__item}>
            <div className={styles.root_group__item__inner}>
              <div className={styles.root_group__info}>
                <p className={styles.root_group__info__subtitle}>
                  Reminders
                </p>
                <p className={styles.root_group__info__text}>
                  Upcoming paymennts and balance changes
                </p>
              </div>
              <button className={styles.root_group__item__switch}>
                switcher here
              </button>
            </div>
          </div>
          <div className={styles.root_group__item}>
            <div className={styles.root_group__item__inner}>
              <div className={styles.root_group__info}>
                <p className={styles.root_group__info__subtitle}>
                  Policy and community
                </p>
                <p className={styles.root_group__info__text}>
                  Receive updates on government regulations
                </p>
              </div>
              <button className={styles.root_group__item__switch}>
                switcher here
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.root__wrap}>
        <button className={classNames(styles.root__btn, styles.root__btn_dark)}>
          Update Settings
        </button>
        <button className={classNames(styles.root__btn, styles.root__btn_light)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default Settings;
