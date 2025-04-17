import { useState, useEffect, ReactNode } from "react";

import {
  Breadcrumb,
  Layout,
  Menu,
  MenuProps,
  theme,
  Dropdown,
  Avatar,
} from "antd";
import { AppLogo } from "@/components/AppLogo";
import { menu } from "@/App/Menu";

import useAuthStore from "@/store/auth";
import { useNavigate, useLocation } from "react-router-dom";

const { Header, Content, Footer } = Layout;

interface IMainLayout {
  children: ReactNode;
}

interface IBreadCrumb {
  title: ReactNode;
}

const MainLayout: React.FC<IMainLayout> = ({ children }) => {
  const { logout, user } = useAuthStore((state) => state);

  const [menuState, setMenuState] = useState<string>("");
  const [breadCrumbd, setBreadCrumb] = useState<IBreadCrumb[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname) {
      const path = location.pathname.split("/").slice(1)[0];
      const breadCrumbdData = location.pathname
        .split("/")
        .slice(1)
        .map((item, idx, arr) => {
          const formattedItem = item.replace(/-/g, " ");
          if (idx !== arr.length - 1) {
            return {
              title: (
                <a className="capitalize" href={`/${formattedItem}`}>
                  • {formattedItem}
                </a>
              ),
            };
          }
          return {
            title: (
              <p className="capitalize">
                {formattedItem.length !== 0
                  ? `• ${formattedItem}`
                  : "• Dashboard"}
              </p>
            ),
          };
        });

      setMenuState(path);
      setBreadCrumb(breadCrumbdData);
    }
  }, [location]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(`/${e.key}`);
  };

  const DropdownItem = [
    {
      key: 1,
      label: <div onClick={() => navigate("/my-profile")}>My Profile</div>,
    },
    {
      key: 2,
      label: <div onClick={() => logout()}>Logout</div>,
    },
  ];

  return (
    <Layout>
      <Header
        style={{
          backgroundColor: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <AppLogo height={30} />
        <Menu
          activeKey={menuState}
          mode="horizontal"
          items={menu}
          onClick={onClick}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Dropdown
          className="cursor-pointer"
          menu={{ items: DropdownItem }}
          trigger={["click"]}
          placement="bottomRight"
          overlayStyle={{
            zIndex: 1052,
            minWidth: 150,
          }}
        >
          <Avatar style={{ backgroundColor: "#1677ff" }} className="capitalize">
            {user.name[0]}
          </Avatar>
        </Dropdown>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb
          separator="/"
          items={breadCrumbd}
          style={{ margin: "16px 0" }}
        />
        <div
          style={{
            padding: 24,
            minHeight: 380,
            // height: "calc(100vh - 180px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Storix ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default MainLayout;
