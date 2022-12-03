import { useState } from "react";
import "antd/dist/antd.less";
import styles from "./styles.module.scss";
import { Tabs } from "antd";
import { sideBarItems } from "./sideBarItems";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { mapActions } from "../../store/map/slice";

const SideBar = () => {
  const dispatch = useDispatch();
  const [isCollapse, setIsCollapse] = useState(false);

  useEffect(() => {
    dispatch(mapActions.clearDirection());
  }, []);

  const sidebarControlHandleClick = () => {
    setIsCollapse((x) => !x);
  };

  const TabCustom = styled(Tabs)`
    .ant-tabs-nav-list {
      width: 100%;
      flex-wrap: wrap;

      & .ant-tabs-tab {
        flex: 1;
        justify-content: center;
        align-items: center;
      }
    }
  `;
  return (
    <div className={styles["sidebar"]}>
      <div
        className={`${styles["sidebar__main"]} ${
          isCollapse && styles["is-collapse"]
        }`}
      >
        <TabCustom
          defaultActiveKey="1"
          centered
          size="middle"
          items={sideBarItems.map((item) => {
            return {
              label: (
                <span>
                  {item.icon}
                  {item.lable}
                </span>
              ),
              key: item.id,
              children: item.children,
            };
          })}
        />
      </div>
      <div
        className={styles["sidebar__control"]}
        onClick={sidebarControlHandleClick}
      >
        <svg
          className={isCollapse ? styles["is-collapse"] : undefined}
          role="img"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="caret-left"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 192 512"
        >
          <path
            fill="currentColor"
            d="M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SideBar;
