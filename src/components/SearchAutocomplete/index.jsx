import { AutoComplete } from "antd";
import { useMemo } from "react";
import { useState } from "react";
import { getGeocodeAutocomplete } from "../../apis/autocomplete/geocode";
import useDebounce from "../../hooks/useDebounce";
import styles from "./index.module.scss";

const SearchAutocomplete = ({
  inputName,
  icon,
  placeholder,
  onChooseLocation,
}) => {
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 300);

  useMemo(async () => {
    if (debouncedValue !== "") {
      const data = await getGeocodeAutocomplete({ address: debouncedValue });
      const features = data.features;
      const options = features.map((item, index) => {
        return {
          key: index,
          value: item.properties.label,
          coordinates: item.geometry.coordinates,
        };
      });
      setOptions(options);
    }
  }, [debouncedValue]);

  const handleSearch = async (value) => {
    if (value === "") setOptions([]);
    else setSearchValue(value);
  };

  const onSelect = (value, data) => {
    const obj = {
      [inputName]: {
        label: value,
        coordinates: data.coordinates,
      },
    };
    onChooseLocation(obj);
  };

  return (
    <div className={styles.searchItem}>
      <div className={styles.iconContainer}>{icon}</div>
      <div className={styles.inputContainer}>
        <AutoComplete
          options={options}
          style={{
            width: "100%",
          }}
          onSelect={onSelect}
          onSearch={handleSearch}
        >
          <input type="text" name={inputName} placeholder={placeholder} />
        </AutoComplete>
      </div>
    </div>
  );
};

export default SearchAutocomplete;
