/**
 * icon:菜单项图标
 * roles:标明当前菜单项在何种角色下可以显示，如果不写此选项，表示该菜单项完全公开，在任何角色下都显示
 */
const menuList = [
  {
    title: "家庭管理",
    path: "/familyManagement",
    children: [
      {
        title: "家庭列表管理",
        path: "/familyManagement/index",
      }
    ],
  },
  {
    title: "任务管理",
    path: "/taskManagement",
    children: [
      {
        title: "任务类型管理",
        path: "/taskManagement/type",
      },
      {
        title: "任务列表管理",
        path: "/taskManagement/list",
      }
    ],
  },
  {
    title: "用户管理",
    path: "/user",
    icon: "usergroup-add"
  }
];
export default menuList;
