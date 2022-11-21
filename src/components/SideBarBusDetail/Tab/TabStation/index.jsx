import { useQuery } from "@tanstack/react-query";
import { Radio } from "antd";
import styled from "styled-components";
import { useContext, useState } from "react";
import { getListStation } from "../../../../apis/station";
import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { mapActions } from "../../../../store/map/slice";
import { BusDetailContext } from "../../../../contexts/busDetailContext";

const TabStation = () => {
  const { routeKey } = useContext(BusDetailContext);
  const dispatch = useDispatch();
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
    dispatch(mapActions.setDirection({ direction: value }));
  };

  const handleStationClick = (index, item) => {
    setSelected(index);
    const currentStation = [item.lat, item.lng];
    dispatch(mapActions.setCurrentStation({ currentStation }));
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
        background-color: $cl-green;
        &:hover {
          background-color: $cl-green;
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
                  onClick={() => handleStationClick(index, item)}
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
