import { useState } from 'react';
import styles from './BumpbarLayout.module.css'

function BumpbarLayout() {
  // User will be able to set rowCount to either 2 or 3
  const [activeSwitch, setActiveSwitch] = useState(3);
  const rowCount = activeSwitch;
  const rowArray = Array.from({ length: rowCount });
  const buttonArray = Array.from({ length: 10 })

  return (
    <>
      <div className={styles.flexApart}>
        <h1>Bumpbar Buttons</h1>
        <ButtonCountToggle active={activeSwitch} setActive={setActiveSwitch} />
      </div>
      <div className={styles.bumpbar}>
        <div className={activeSwitch == 2 ? styles.bumpbarLayout20 : styles.bumpbarLayout }>
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

function ButtonCountToggle({ active, setActive }) {
  return (
    <div className={styles.switch}>
      <label className={active == 2 ? styles.switchOptionActive : styles.switchOption}>
        <input type='radio' id='20-switch' name='button-count-switch' value='2' onChange={e => setActive(e.target.value)} />20 Button
      </label>
      <label className={active == 3 ? styles.switchOptionActive : styles.switchOption}>
        <input type='radio' id='30-switch' name='button-count-switch' value='3' onChange={e => setActive(e.target.value)} />30 Button
      </label>
    </div>
  )
}

export default BumpbarLayout