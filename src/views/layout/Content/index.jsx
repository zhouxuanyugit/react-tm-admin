import React from "react";
import { Redirect, withRouter, Route, Switch } from "react-router-dom";
import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Layout } from "antd";
import routeList from "@/config/routeMap";
const { Content } = Layout;

const LayoutContent = (props) => {
  const { role, location } = props;
  const { pathname } = location;
  return (
    <Content style={{ height: "calc(100% - 100px)" }}>
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          timeout={500}
          classNames="fade"
          exit={false}
        >
          <Switch location={location}>
            <Redirect exact from="/" to="/familyManagement/index" />
            {routeList.map((route) => {
              return (
                <Route
                  component={route.component}
                  key={route.path}
                  path={route.path}
                />
              );
            })}
            <Redirect to="/error/404" />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Content>
  );
};

export default connect((state) => state.user)(withRouter(LayoutContent));
