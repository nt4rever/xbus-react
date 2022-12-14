import { useQuery } from "@tanstack/react-query";
import { Radio } from "antd";
import styled from "styled-components";
import { useContext, useState } from "react";
import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { mapActions } from "../../../../store/map/slice";
import { BusDetailContext } from "../../../../contexts/busDetailContext";
import { stationService } from "../../../../apis/station";
import { useMemo } from "react";
import Loader from "../../../Loader";

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
    queryFn: () => stationService.getList(routeKey),
  });

  const optionOnChange = ({ target: { value } }) => {
    setSelected(0);
    setOptionValue(value);
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

  const listStationRender = useMemo(() => {
    if (isLoading) return <Loader />;
    if (data === null || data?.length === 0) return null;
    const stations = data
      .filter((item) => item.direction === optionValue)
      .sort((a, b) => a.order - b.order);
    const currentStation = [stations[selected].lat, stations[selected].lng];
    dispatch(mapActions.setCurrentStation({ currentStation }));
    dispatch(mapActions.setDirection({ direction: optionValue }));
    return (
      <>
        {stations.map((item, index) => (
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
    );
  }, [data, optionValue, selected]);

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
      <div className={styles["station"]}>{listStationRender}</div>
    </>
  );
};

export default TabStation;
