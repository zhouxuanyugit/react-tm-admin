import React, { Component } from "react";
import { Menu } from "antd";
import { HomeOutlined, ProfileOutlined } from '@ant-design/icons';
import { Link, withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import "./index.less";
const SubMenu = Menu.SubMenu;

class Meun extends Component {
  render() {
    console.log(this.props)
    const path = this.props.location.pathname;
    return (
      <div className="sidebar-menu-container">
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
          <div>
            <Menu
              mode="inline"
              theme="dark"
              selectedKeys={[path]}
              defaultOpenKeys={['/familyManagement', '/taskManagement']}
            >
              <SubMenu
                key='/familyManagement'
                title={
                  <span>
                    <HomeOutlined />
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
              <SubMenu
                key='/taskManagement'
                title={
                  <span>
                    <ProfileOutlined />
                    <span>任务管理</span>
                  </span>
                }
              >
                <Menu.Item key='/taskManagement/type'>
                  <Link to='/taskManagement/type'>
                    <span>任务类型管理</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key='/taskManagement/list'>
                  <Link to='/taskManagement/list'>
                    <span>任务列表管理</span>
                  </Link>
                </Menu.Item>
              </SubMenu>
              {/* <Menu.Item key='/user'>
                <Link to='/user'>
                  <span>
                    <span>用户管理</span>
                  </span>
                </Link>
              </Menu.Item> */}
            </Menu>
          </div>
        </Scrollbars>
      </div>
    );
  }
}

export default connect((state) => state.user)(withRouter(Meun));
