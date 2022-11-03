import ItemBusRoute from "./ItemBusRoute";
import styles from "./styles.module.scss";

const data = [
  {
    backwardTrip:
      "Bến xe Đại Lộc (TT Ái Nghĩa) – Hòa Khương – Hòa Cầm – Cách mạng Tháng 8 – Đường 2/9 – Núi Thành – Trưng Nữ Vương – Hoàng Diệu – Ông Ích Khiêm – Hùng Vương – Ngô Gia Tự – Lê Duẩn – Ông Ích Khiêm – Nguyễn Tất Thành - Hà Khê - Trần Cao Vân – Nguyễn Đức Trung – Điện Biên Phủ – Tôn Đức Thắng–BX.Trung tâm Đà Nẵng.",
    betweenTwoBus: "30 phút/chuyến",
    forwardTrip:
      "Bến xe Trung tâm Đà Nẵng – Tôn Đức Thắng – Điện Biên Phủ – Nguyễn Đức Trung – Trần Cao Vân – Hà Khê - Nguyễn Tất Thành - Ông Ích Khiêm – Lê Duẩn – Ngô Gia Tự – Hùng Vương – Ông Ích Khiêm – Hoàng Diệu – Trưng Nữ Vương – Núi Thành – Đường 2/9 – Cách Mạng tháng 8 – Hòa Cầm – Hòa Khương – Bến xe Đại Lộc (TT Ái Nghĩa).",
    numberOfTrips: "42 chuyến",
    operatingTime: "05:30 - 17:00",
    rating: "5",
    routeCode: "Tuyến xe 03",
    routeLength: "40.5 km",
    routeName: "Bến xe Đà Nẵng - Bến xe Ái Nghĩa",
    status: "true",
    ticketPrice: "17,000 VND",
  },
  {
    backwardTrip:
      "Bến xe Hội An – Trần Đại Nghĩa – Lê Văn Hiến – Ngũ Hành Sơn – Cầu Trần Thị Lý – Duy Tân – Đường 2 Tháng 9 – Bạch Đằng – Hùng Vương – Chi Lăng – Lê Duẩn – Ông Ích Khiêm – Nguyễn Tất Thành – Hà Khê – Hà Huy Tập – Điện Biên Phủ – Tôn Đức Thắng – Bến xe TT",
    betweenTwoBus: "20 phút/chuyến",
    forwardTrip:
      "Bến xe Trung tâm Đà Nẵng – Tôn Đức Thắng – Điện Biên Phủ – Hà Huy Tập – Hà Khê – Nguyễn Tất Thành – Ông Ích Khiêm – Lê Duẩn – Chi Lăng – Hùng Vương –Trần Phú – Trưng Nữ Vương – Núi Thành – Duy Tân – Cầu Trần Thị Lý – Ngũ Hành Sơn – Lê Văn Hiến – Trần Đại Nghĩa – Bến xe Hội An.",
    numberOfTrips: "76 chuyến",
    operatingTime: "05:30 - 17:50",
    rating: "5",
    routeCode: "Tuyến xe 01",
    routeLength: "36 km",
    routeName: "Bến xe Đà Nẵng - Bến xe Hội An",
    status: "true",
    ticketPrice: "18,000 VNĐ",
  },
  {
    backwardTrip:
      "954 Phan Châu Trinh (Tam Kỳ) – Phan Châu Trinh – Quốc Lộ 1A – Cầu Cẩm Lệ – CMT8 – Nguyễn Hữu Thọ – Nguyễn Tri Phương – Nguyễn Văn Linh – Hoàng Diệu – Thái Phiên – Nguyễn Chí Thanh – Hùng Vương – Nguyễn Thị Minh Khai – Lý Tự Trọng–Đống Đa – 3 Tháng 2 – 45 Nguyễn Tất Thành (Cầu Thuận Phước).",
    betweenTwoBus: "15 phút /chuyến",
    forwardTrip:
      "45 Nguyễn Tất Thành (Cầu Thuận Phước) – Đường 3/2 – Đống Đa – Lý Tự Trọng – Nguyễn Thị Minh Khai – Hùng Vương – Phan Châu Trinh – Nguyễn Văn Linh – Nguyễn Tri Phương – Nguyễn Hữu Thọ – CMT8 – Cầu Cẩm Lệ – Quốc Lộ 1A – Phan Bội Châu – Phan Châu Trinh – 954 Phan Châu Trinh (Tam Kỳ).",
    numberOfTrips: "112 chuyến",
    operatingTime: "05:30 - 18:00",
    rating: "5",
    routeCode: "Tuyến xe 04",
    routeLength: "70 km",
    routeName: "Đà Nẵng - Tam Kỳ",
    status: "true",
    ticketPrice: "28,000 VND",
  },
  {
    backwardTrip:
      "954 Phan Châu Trinh (Tam Kỳ) – Phan Châu Trinh – Quốc Lộ 1A – Cầu Cẩm Lệ – CMT8 – Nguyễn Hữu Thọ – Nguyễn Tri Phương – Nguyễn Văn Linh – Hoàng Diệu – Thái Phiên – Nguyễn Chí Thanh – Hùng Vương – Nguyễn Thị Minh Khai – Lý Tự Trọng–Đống Đa – 3 Tháng 2 – 45 Nguyễn Tất Thành (Cầu Thuận Phước).",
    betweenTwoBus: "15 phút /chuyến",
    forwardTrip:
      "45 Nguyễn Tất Thành (Cầu Thuận Phước) – Đường 3/2 – Đống Đa – Lý Tự Trọng – Nguyễn Thị Minh Khai – Hùng Vương – Phan Châu Trinh – Nguyễn Văn Linh – Nguyễn Tri Phương – Nguyễn Hữu Thọ – CMT8 – Cầu Cẩm Lệ – Quốc Lộ 1A – Phan Bội Châu – Phan Châu Trinh – 954 Phan Châu Trinh (Tam Kỳ).",
    numberOfTrips: "112 chuyến",
    operatingTime: "05:30 - 18:00",
    rating: "5",
    routeCode: "Tuyến xe 04",
    routeLength: "70 km",
    routeName: "Đà Nẵng - Tam Kỳ",
    status: "true",
    ticketPrice: "28,000 VND",
  },
  {
    backwardTrip:
      "954 Phan Châu Trinh (Tam Kỳ) – Phan Châu Trinh – Quốc Lộ 1A – Cầu Cẩm Lệ – CMT8 – Nguyễn Hữu Thọ – Nguyễn Tri Phương – Nguyễn Văn Linh – Hoàng Diệu – Thái Phiên – Nguyễn Chí Thanh – Hùng Vương – Nguyễn Thị Minh Khai – Lý Tự Trọng–Đống Đa – 3 Tháng 2 – 45 Nguyễn Tất Thành (Cầu Thuận Phước).",
    betweenTwoBus: "15 phút /chuyến",
    forwardTrip:
      "45 Nguyễn Tất Thành (Cầu Thuận Phước) – Đường 3/2 – Đống Đa – Lý Tự Trọng – Nguyễn Thị Minh Khai – Hùng Vương – Phan Châu Trinh – Nguyễn Văn Linh – Nguyễn Tri Phương – Nguyễn Hữu Thọ – CMT8 – Cầu Cẩm Lệ – Quốc Lộ 1A – Phan Bội Châu – Phan Châu Trinh – 954 Phan Châu Trinh (Tam Kỳ).",
    numberOfTrips: "112 chuyến",
    operatingTime: "05:30 - 18:00",
    rating: "5",
    routeCode: "Tuyến xe 04",
    routeLength: "70 km",
    routeName: "Đà Nẵng - Tam Kỳ",
    status: "true",
    ticketPrice: "28,000 VND",
  },
];

const BusRoute = () => {
  const listBusRoute = (
    <>
      {data.map((item, index) => (
        <ItemBusRoute key={index} busRoute={item} />
      ))}
    </>
  );

  return (
    <div className={styles["bus-route"]}>
      <div className={styles["bus-route__search"]}>
        <input type="text" placeholder="Tìm tuyến xe" />
      </div>
      <div className={styles["bus-route__list--container"]}>{listBusRoute}</div>
    </div>
  );
};

export default BusRoute;
