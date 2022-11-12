import { useQuery } from "@tanstack/react-query";
import { Radio } from "antd";
import styled from "styled-components";
import { useState } from "react";
import { getListStation } from "../../../../apis/station";
import styles from "./index.module.scss";

const TabStation = ({ routeKey }) => {
  const [selected, setSelected] = useState(0);
  const [optionValue, setOptionValue] = useState("forward");

  const stationOption = [
    {
      label: "Lượt đi",
      value: "forward",
    },
    {
      label: "Lượt về",
      value: "back",
    },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ["get-list-station", routeKey],
    queryFn: () => getListStation(routeKey),
  });

  const optionOnChange = ({ target: { value } }) => {
    setSelected(0);
    setOptionValue(value);
  };

  const handleStationClick = (index) => {
    setSelected(index);
  };

  const StyledRadio = styled(Radio.Group)`
    & .ant-radio-button-wrapper {
      &:first-child {
        border-radius: 10px 0 0 10px;
      }
      &:last-child {
        border-radius: 0 10px 10px 0;
      }
      &.ant-radio-button-wrapper-checked {
        background-color: #4fa095;
        &:hover {
          background-color: #4fa095;
        }
      }
    }
  `;

  return (
    <>
      <div className={styles["option-station"]}>
        <StyledRadio
          options={stationOption}
          onChange={optionOnChange}
          value={optionValue}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      <div className={styles["station"]}>
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            {data
              .filter((item) => item.direction === optionValue)
              .map((item, index) => (
                <div
                  className={styles["station__item"]}
                  key={index}
                  onClick={() => handleStationClick(index)}
                >
                  <div
                    className={`${styles["outer-dot"]} ${
                      selected === index ? styles["selected"] : ""
                    }`}
                  >
                    <div className={styles["dot"]} />
                  </div>
                  <div className={styles["name"]}>{item.name}</div>
                </div>
              ))}
            <div className={styles["dot-line"]} />
          </>
        )}
      </div>
    </>
  );
};

export default TabStation;
