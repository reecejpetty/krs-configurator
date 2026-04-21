import { useState } from 'react';
import styles from './BumpbarLayout.module.css'

function BumpbarLayout() {
  // User will be able to set rowCount to either 2 or 3
  const [activeSwitch, setActiveSwitch] = useState(3);
  const rowCount = activeSwitch;
  const rowArray = Array.from({ length: rowCount });
  const buttonArray = Array.from({ length: 10 })
  const mode1 = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t']

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
              <BumpbarButton key={(rowIndex * 10) + colIndex} number={(rowIndex * 10) + colIndex + 1} text={mode1[(rowIndex * 10) + colIndex] } />
            ))
          ))}
        </div>
      </div>
      <ButtonActions />
    </>
  )
}

function BumpbarButton({number, text}) {
  return (
    <button className={styles.bumpbarButton} data-number={number}>
      <span className={styles.bumpbarButtonText}>{text}</span>
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
    <div className={active == 2 ? styles.switch20 : styles.switch}>
      <label className={styles.switchOption}>
        <input type='radio' id='20-switch' name='button-count-switch' value='2' onChange={e => setActive(e.target.value)} />20 Button
      </label>
      <label className={styles.switchOption}>
        <input type='radio' id='30-switch' name='button-count-switch' value='3' onChange={e => setActive(e.target.value)} />30 Button
      </label>
    </div>
  )
}

export default BumpbarLayout