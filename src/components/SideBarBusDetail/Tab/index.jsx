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
    name: "information",
    title: "Thông tin",
    content: <TabInformation />,
  },
  {
    key: 1,
    name: "station",
    title: "Trạm dừng",
    content: <TabStation />,
  },
  {
    key: 2,
    name: "rating",
    title: "Đánh giá",
    content: <TabRating />,
  },
  {
    key: 3,
    name: "qr",
    title: "Mã QR",
    content: <TabQRCode />,
  },
];

const Tab = () => {
  const [tabView, setTabView] = useState({
    information: true,
    station: false,
    rating: false,
    qr: false,
  });

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
    setTabView({
      information: false,
      station: false,
      rating: false,
      qr: false,
      [tab.name]: true,
    });
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
                ? `${styles["tab-item"]} active`
                : styles["tab-item"]
            }
          >
            {item.title}
          </div>
        ))}
      </div>

      <div
        className={styles["main"]}
        style={{ display: tabView.information ? "block" : "none" }}
      >
        <TabInformation />
      </div>
      <div
        className={styles["main"]}
        style={{ display: tabView.station ? "block" : "none" }}
      >
        <TabStation isVisible={tabView.station} />
      </div>
      <div
        className={styles["main"]}
        style={{ display: tabView.rating ? "block" : "none" }}
        ref={mainRef}
        onScroll={handleScroll}
      >
        <TabRating isVisible={tabView.rating} />
      </div>
      <div
        className={styles["main"]}
        style={{ display: tabView.qr ? "block" : "none" }}
      >
        <TabQRCode isVisible={tabView.qr} />
      </div>
    </div>
  );
};

export default Tab;
