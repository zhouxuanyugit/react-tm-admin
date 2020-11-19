import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import "./index.less";
const SubMenu = Menu.SubMenu;

class Meun extends Component {
  render() {
    const path = this.props.location.pathname;
    return (
      <div className="sidebar-menu-container">
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
          <div>
            <Menu
              mode="inline"
              theme="dark"
              selectedKeys={[path]}
              defaultOpenKeys={['/familyManagement']}
            >
              <SubMenu
                key='/familyManagement'
                title={
                  <span>
                    <Icon type='appstore' />
                    <span>家庭管理</span>
                  </span>
                }
              >
                <Menu.Item key='/familyManagement/index'>
                  <Link to='/familyManagement/index'>
                    <span>家庭列表管理</span>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key='/user'>
                <Link to='/user'>
                  <span>
                    <Icon type='usergroup-add' />
                    <span>用户管理</span>
                  </span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        </Scrollbars>
      </div>
    );
  }
}

export default connect((state) => state.user)(withRouter(Meun));
