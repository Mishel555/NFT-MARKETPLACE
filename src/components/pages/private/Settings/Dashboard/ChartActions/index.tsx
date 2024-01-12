import styles from './style.module.scss';

interface IProps {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
  // date: {
  //   month: string;
  //   year: string;
  // };
  // dateMode: string;
}

const ChartActions = ({
  zoomIn,
  zoomOut,
  reset,
}: IProps) => (
  <div className={styles.root}>
    {/* <div className={styles.root__pickers}> */}
    {/*   {dateMode === 'day' && ( */}
    {/*     <Fragment> */}
    {/*       <DataCarousel data={['September', 'October']} /> */}
    {/*       <DataCarousel data={['2019', '2020', '2021', '2022']} /> */}
    {/*     </Fragment> */}
    {/*   )} */}

    {/*   {dateMode === 'month' && ( */}
    {/*     <DataCarousel data={['2019', '2020', '2021', '2022']} /> */}
    {/*   )} */}
    {/* </div> */}
    <div className={styles.root__actions}>
      <button onClick={zoomIn} className={styles.root__btn}>
        Zoom in
      </button>
      <button onClick={zoomOut} className={styles.root__btn}>
        Zoom out
      </button>
      <button onClick={reset} className={styles.root__btn}>
        reset
      </button>
    </div>
  </div>
);

export default ChartActions;
