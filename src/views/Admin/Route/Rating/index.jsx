import { Drawer } from "antd";
import { useMemo } from "react";
import { useContext } from "react";
import TableRating from "../../../../components/Admin/Rating/Table";
import { RouteAdminContext } from "../../../../contexts/routeAdminContext";

const RouteRating = () => {
  const { isRating, closeRating, record } = useContext(RouteAdminContext);

  const tableRating = useMemo(() => {
    if (record) return <TableRating id={record.id} />;
    return undefined;
  }, [isRating, record]);
  const onClose = () => {
    closeRating();
  };
  return (
    <>
      <Drawer
        title={`Rating: ${record?.routeCode}`}
        placement="right"
        width={"60%"}
        open={isRating}
        onClose={onClose}
      >
        {tableRating}
      </Drawer>
    </>
  );
};

export default RouteRating;
