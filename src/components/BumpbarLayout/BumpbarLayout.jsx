import styles from './BumpbarLayout.module.css'

function BumpbarLayout() {
  // User will be able to set rowCount to either 2 or 3
  const rowCount = 3;
  const rowArray = Array.from({ length: rowCount });
  const buttonArray = Array.from({ length: 10 })

  return (
    <>
      <h1>Bumpbar Buttons</h1>
      <div className={styles.bumpbar}>
        <div className={styles.bumpbarLayout}>
          {rowArray.map((_, rowIndex) => (
            buttonArray.map((_, colIndex) => (
              <BumpbarButton key={(rowIndex * 10) + colIndex} number={(rowIndex * 10) + colIndex + 1} />
            ))
          ))}
        </div>
      </div>
      <ButtonActions />
    </>
  )
}

function BumpbarButton({number}) {
  return (
    <button className={styles.bumpbarButton} data-number={number}>
      <span className={styles.bumpbarButtonText}>x</span>
    </button>
  )
}

function ButtonActions() {
  return (
    <div className={styles.buttonActions}>
      <button className={styles.updateButton}>Update</button>
      <button className={styles.eraseButton}>Erase</button>
      <button className={styles.resetButton}>Reset All</button>
    </div>
  )
}

export default BumpbarLayout