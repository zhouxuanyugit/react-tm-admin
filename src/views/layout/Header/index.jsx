import React from "react";
import { connect } from "react-redux";
import { Menu, Dropdown, Modal, Layout, Avatar } from "antd";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { logout, getUserInfo } from "@/store/actions";
import Hamburger from "@/components/Hamburger";
import BreadCrumb from "@/components/BreadCrumb";
import "./index.less";
const { Header } = Layout;

const LayoutHeader = (props) => {
  const {
    token,
    avatar,
    sidebarCollapsed,
    logout,
    getUserInfo
  } = props;
  token && getUserInfo(token);
  const handleLogout = (token) => {
    Modal.confirm({
      title: "退出",
      content: "确定要退出系统吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        logout(token);
      },
    });
  };
  const onClick = ({ key }) => {
    switch (key) {
      case "logout":
        handleLogout(token);
        break;
      default:
        break;
    }
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="logout">退出</Menu.Item>
    </Menu>
  );
  const computedStyle = () => {
    let styles;
    if (sidebarCollapsed) {
      styles = {
        width: "calc(100% - 80px)",
      };
    } else {
      styles = {
        width: "calc(100% - 200px)",
      };
    }
    return styles;
  };
  return (
    <>
      <Header />
      <Header
        style={computedStyle()}
        className="fix-header"
      >
        <Hamburger />
        <BreadCrumb />
        <div className="right-menu">
          <div className="dropdown-wrap">
            <Dropdown overlay={menu}>
              <div>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                <DownOutlined style={{ color: "rgba(0,0,0,.3)" }} />
              </div>
            </Dropdown>
          </div>
        </div>
      </Header>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.user,
  };
};
export default connect(mapStateToProps, { logout, getUserInfo })(LayoutHeader);
