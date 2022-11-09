import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import Tab from "./Tab";

const SideBarBusDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const routeKey = params.key;

  const [isCollapse, setIsCollapse] = useState(false);

  const sidebarControlHandleClick = () => {
    setIsCollapse((x) => !x);
  };

  return (
    <div className={styles["sidebar"]}>
      <div
        className={`${styles["sidebar__main"]} ${
          isCollapse && styles["is-collapse"]
        }`}
      >
        <div className={styles["bus-header"]}>
          <div className={styles["back-button"]} onClick={() => navigate(-1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </div>
          <div className={styles["name"]}>Tuyen so 01</div>
        </div>
        <div className={styles["bus-container"]}>
          <Tab routeKey={routeKey} />
        </div>
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

export default SideBarBusDetail;
