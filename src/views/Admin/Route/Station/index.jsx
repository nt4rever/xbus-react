import { Drawer } from "antd";
import { useMemo } from "react";
import { useContext } from "react";
import TableStation from "../../../../components/Admin/Station/Table";
import { RouteAdminContext } from "../../../../contexts/routeAdminContext";

const RouteStation = () => {
  const { isStation, closeStation, record } = useContext(RouteAdminContext);

  const onClose = () => {
    closeStation();
  };

  const tableStation = useMemo(() => {
    if (record) {
      return <TableStation id={record?.id} />;
    } else {
      return undefined;
    }
  }, [record]);
  return (
    <>
      <Drawer
        title={`Station: ${record?.routeCode}`}
        placement="right"
        width={"70%"}
        open={isStation}
        onClose={onClose}
      >
        {tableStation}
      </Drawer>
    </>
  );
};

export default RouteStation;
