import { useMemo } from "react";
import { useState } from "react";
import styles from "./styles.module.scss";
import TabInformation from "./TabInformation";
import TabRating from "./TabRating";
import TabStation from "./TabStation";

const tabItems = [
  {
    key: 0,
    title: "Thông tin",
  },
  {
    key: 1,
    title: "Trạm dừng",
  },
  {
    key: 2,
    title: "Đánh giá",
  },
];

const Tab = ({ data, routeKey }) => {
  const [tabAcitve, setTabAcitve] = useState(0);

  const tabView = useMemo(() => {
    switch (tabAcitve) {
      case 0:
        return <TabInformation data={data} />;
      case 1:
        return <TabStation data={data} />;
      case 2:
        return <TabRating routeKey={routeKey} />;
      default:
        return <TabInformation data={data} />;
    }
  }, [tabAcitve]);

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
      <div className={styles["main"]}>{tabView}</div>
    </div>
  );
};

export default Tab;
