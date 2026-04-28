import { useState } from 'react';
import styles from './BumpbarLayout.module.css'

function BumpbarLayout({ currentButton, setCurrentButton, bumpbarButtons }) {
  // User will be able to set rowCount to either 2 or 3
  const [activeSwitch, setActiveSwitch] = useState(3);
  const [sticky, setSticky] = useState(false);
  const rowCount = activeSwitch;
  const rowArray = Array.from({ length: rowCount });
  const buttonArray = Array.from({ length: 10 })

  return (
    <>
      <div className={styles.flexApart}>
        <h1>Bumpbar Buttons</h1>
        <ButtonCountToggle active={activeSwitch} setActive={setActiveSwitch} />
      </div>
      <div className={sticky ? styles.bumpbarSticky : styles.bumpbar}>
        <div className={activeSwitch == 2 ? styles.bumpbarLayout20 : styles.bumpbarLayout }>
          {rowArray.map((_, rowIndex) => (
            buttonArray.map((_, colIndex) => (
              <BumpbarButton
                key={(rowIndex * 10) + colIndex}
                id={(rowIndex * 10) + colIndex}
                number={(rowIndex * 10) + colIndex + 1}
                text={bumpbarButtons[(rowIndex * 10) + colIndex].string }
                currentButton={currentButton}
                setCurrentButton={setCurrentButton}
                active={(rowIndex * 10) + colIndex == currentButton}
              />
            ))
          ))}
        </div>
      </div>
      <PinBumpbar sticky={sticky} setSticky={setSticky} />
    </>
  )
}

function BumpbarButton({number, id, text, currentButton, setCurrentButton, active}) {
  const handleClick = (e) => {
    const button = e.currentTarget.id;
    setCurrentButton((currentButton != button ? button : null))
  }

  return (
    <button id={id} className={active ? styles.activeButton : styles.bumpbarButton} data-number={number} onClick={handleClick}>
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
      <label className={styles.switchOption} htmlFor='20-switch'>
        <input
          type='radio'
          id='20-switch'
          name='button-count-switch'
          checked={active == 2}
          onChange={() => setActive(2)}
          onClick={() => setActive(active == 2 ? 3 : 2)}
        />20 Button
      </label>
      <label className={styles.switchOption} htmlFor='30-switch'>
        <input
          type='radio'
          id='30-switch'
          name='button-count-switch'
          checked={active == 3}
          onChange={() => setActive(3)}
          onClick={() => setActive(active == 3 ? 2 : 3)}
        />30 Button
      </label>
    </div>
  )
}

function PinBumpbar({ sticky, setSticky }) {
  return (
    <div className={styles.pinBumpbar}>
      <label htmlFor="pinBumpbarCheckbox" className={sticky ? styles.pinBumpbarActive : styles.pinBumpbarLabel}>
        <input type="checkbox" id="pinBumpbarCheckbox" checked={sticky} onChange={e => setSticky(e.target.checked)} />
        Pin Bumpbar
      </label>
    </div>
  )
}

export default BumpbarLayout