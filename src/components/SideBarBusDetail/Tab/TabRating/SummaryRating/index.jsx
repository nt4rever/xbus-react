import styles from "./index.module.scss";

const SummaryRating = ({ statis }) => {
  const colors = ["#4ba34f", "#9fcd2e", "#efe140", "#f39e20", "#e73a1a"];

  const barChart = statis.barChart.map((item) => (
    <div className={styles["summary__chart--row"]} key={item.index}>
      <div className={styles["chart-rank"]}>{item.index}</div>
      <div
        className={styles["chart-bar"]}
        style={{
          width: `${item.percent}%`,
          background: `${colors[5 - item.index]}`,
        }}
      />
    </div>
  ));

  const ratingStar = (
    <>
      {Array.from({ length: Math.round(statis.ratingAvg) }).map((_, index) => (
        <span key={index} className={styles["star"]}>
          ★
        </span>
      ))}
      {Array.from({ length: 5 - Math.round(statis.ratingAvg) }).map(
        (_, index) => (
          <span
            key={index}
            className={`${styles["star"]} ${styles["disable"]}`}
          >
            ★
          </span>
        )
      )}
    </>
  );
  return (
    <div className={styles["summary"]}>
      <div className={styles["summary__statistical"]}>
        <h1>{statis.ratingAvg}</h1>
        <div className={styles["summary__statistical--star"]}>{ratingStar}</div>
        <div className={styles["summary__statistical--count"]}>
          <svg
            role="img"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="user"
            className="svg-inline--fa fa-user fa-w-14"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
            />
          </svg>
          <span>{statis.total}</span>
        </div>
      </div>
      <div className={styles["summary__chart"]}>{barChart}</div>
    </div>
  );
};

export default SummaryRating;
