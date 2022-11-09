import { useMemo } from "react";
import { useState } from "react";
import styles from "./styles.module.scss";
import { tabItems } from "./tabItems";

const Tab = ({ routeKey }) => {
  const [tabAcitve, setTabAcitve] = useState(0);

  const tabView = useMemo(
    () =>
      tabItems.map((item) => {
        if (item.key === tabAcitve) return item.content;
      }),
    [tabAcitve]
  );

  const handleTabClick = (key) => {
    setTabAcitve(key);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["tab"]}>
        {tabItems?.map((item) => (
          <div
            key={item.key}
            onClick={() => handleTabClick(item.key)}
            className={
              tabAcitve === item.key
                ? `${styles["tab-item"]} ${styles["active"]}`
                : styles["tab-item"]
            }
          >
            {item.title}
          </div>
        ))}
      </div>
      <div className={styles["main"]}>
        {tabView} {routeKey}
      </div>
    </div>
  );
};

export default Tab;
