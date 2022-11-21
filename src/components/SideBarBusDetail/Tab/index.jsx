import { useState } from "react";
import styles from "./styles.module.scss";
import TabInformation from "./TabInformation";
import TabRating from "./TabRating";
import TabStation from "./TabStation";

const tabItems = [
  {
    key: 0,
    title: "Thông tin",
    content: <TabInformation />,
  },
  {
    key: 1,
    title: "Trạm dừng",
    content: <TabStation />,
  },
  {
    key: 2,
    title: "Đánh giá",
    content: <TabRating />,
  },
];

const Tab = () => {
  const [tabView, setTabView] = useState(tabItems[0].content);
  const [tabAcitve, setTabAcitve] = useState(0);

  const handleTabClick = (tab) => {
    setTabAcitve(tab.key);
    setTabView(tab.content);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["tab"]}>
        {tabItems?.map((item) => (
          <div
            key={item.key}
            onClick={() => handleTabClick(item)}
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
