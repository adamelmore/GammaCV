import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Typography } from 'lib-react-components';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import getPath from '../../utils/get_build_path';
import CONFIG from '../../../sources/config.json';
import packageJSON from '../../../package.json';
import FullLogo from '../../assets/svg/full_logo';
import SimpleLogo from '../../assets/svg/simple_logo';
import BurgerIcon from '../../assets/svg/burger';
import CrossIcon from '../../assets/svg/basic/cross';
import MobileSidebar from '../docs/mobile_sidebar';
import s from './styles/index.sass';

class Header extends Component {
  static contextTypes = {
    theme: PropTypes.object,
    intl: PropTypes.object,
    device: PropTypes.object,
  };

  state = {
    showSidebar: false,
  };

  handleShowSidebar() {
    const { showSidebar } = this.state;

    this.setState({
      showSidebar: !showSidebar,
    });
  }

  hideSidebar() {
    this.setState({
      showSidebar: false,
    });
  }

  render() {
    const { theme, device, intl } = this.context;
    const { showSidebar } = this.state;

    return (
      <div
        className={classNames(s.wrapper, theme.fill_black)}
      >
        {device.type === 'mobile' && showSidebar && (
          <div className={s.sidebar}>
            <MobileSidebar
              hideSidebar={this.hideSidebar.bind(this)}
              docsList={CONFIG.docs}
            />
          </div>
        )}
        <div //eslint-disable-line
          onClick={this.hideSidebar.bind(this)}
          className={s.logo}
        >
          <NavLink
            exact
            onClick={this.hideSidebar.bind(this)}
            to={`${getPath}/`}
            className={classNames(s.nav_item, s.logo_padding)}
          >
            {device.type !== 'mobile' ? (
              <FullLogo className={classNames(s.full_logo_icon, theme.fill_white)} />
            ) : (
              <SimpleLogo className={s.simple_logo_icon} />
            )}
          </NavLink>
        </div>
        <div className={classNames(s.nav_block, 'clear')}>
          {
            device.type !== 'mobile'
            ? (
              <NavLink
                to={`${getPath}/docs`}
                className={classNames(
                  s.nav_item,
                  s.docs,
                  theme.b2,
                  theme.text_white,
                )}
              >
                {intl.getText('Header.Navigation', null, 'get')}
              </NavLink>
            )
            : (
              <Typography
                type="b2"
                color="white"
                className={classNames(s.docs, s.nav_item)}
                onClick={this.handleShowSidebar.bind(this)}
              >
                {intl.getText('Header.Navigation', null, 'get')}
                {showSidebar ? (
                  <CrossIcon className={classNames(theme.fill_white, s.burger)} />
                 ) : (
                   <BurgerIcon className={s.burger} />
                 )
                }
              </Typography>
            )
          }
          <NavLink
            onClick={this.hideSidebar.bind(this)}
            to={`${getPath}/examples`}
            className={classNames(
              s.nav_item,
              theme.b2,
              theme.text_white,
            )}
            activeClassName={theme.text_white}
          >
            {intl.getText('Header.Navigation', null, 'examples')}
          </NavLink>
          <a
            href={packageJSON.repository.url}
            target="_blank"
            rel="noopener noreferrer"
            className={classNames(
              s.nav_item,
              theme.b2,
              theme.text_white,
            )}
          >
            {intl.getText('Header.Navigation', null, 'github')}
          </a>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);