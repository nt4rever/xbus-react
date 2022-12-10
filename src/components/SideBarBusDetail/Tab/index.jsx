import { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import { BusDetailContext } from "../../../contexts/busDetailContext";
import styles from "./styles.module.scss";
import TabInformation from "./TabInformation";
import TabQRCode from "./TabQRCode";
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
  {
    key: 3,
    title: "Mã QR",
    content: <TabQRCode />,
  },
];

const Tab = () => {
  const [tabView, setTabView] = useState(tabItems[0].content);
  const [tabActive, setTabActive] = useState(0);
  const { setCurrentList } = useContext(BusDetailContext);
  const mainRef = useRef(null);

  const handleScroll = () => {
    const clientHeight = mainRef.current?.clientHeight;
    const scrollHeight = mainRef.current?.scrollHeight;
    const scrollTop = mainRef.current?.scrollTop;
    if (scrollHeight - clientHeight - scrollTop < 10 && tabActive === 2) {
      setCurrentList();
    }
  };

  const handleTabClick = (tab) => {
    setTabActive(tab.key);
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
              tabActive === item.key
                ? `${styles["tab-item"]} ${styles["active"]}`
                : styles["tab-item"]
            }
          >
            {item.title}
          </div>
        ))}
      </div>
      <div className={styles["main"]} ref={mainRef} onScroll={handleScroll}>
        {tabView}
      </div>
    </div>
  );
};

export default Tab;
