import styles from "./SequenceBuilder.module.css"

function SequenceBuilder() {
 return (
  <>
    <h1>Sequence Builder</h1>
    <CurrentSequence />
    <div className={styles.modifierRow}>
      <KeypressModifiers />
      <AddRepeat />
      <AddPause />
    </div>
  </>
 )
}

function CurrentSequence() {
  return (
    <div className={styles.currentSequence}>
      <h2>Current Sequence</h2>
      <div className={styles.currentSequenceItems}>
        <SequenceItem text="test" />
        <SequenceItem text="[CTRL + A]" />
        <SequenceItem text="[ESC]" />
        <SequenceItem text="This is a string" />
        <SequenceItem text="[PAUSE: 10]" />
      </div>
    </div>
  )
}

function SequenceItem({ text }) {
  return (
    <div className={styles.sequenceItem}>
      <div className={styles.sequenceItemText}>{text}</div>
      <div className={styles.deleteItem}>✕</div>
    </div>
  )
}

function KeypressModifiers() {
  return (
    <div className={styles.keypressModifiers}>
      <h2>Modifiers</h2>
      <div className={styles.modifierCheckboxes}>
        <label htmlFor="ctrl">
          <input type="checkbox" id="ctrl" />CTRL
        </label>
        <label htmlFor="shift">
          <input type="checkbox" id="shift" />SHIFT
        </label>
        <label htmlFor="alt">
          <input type="checkbox" id="alt" />ALT
        </label>
        <label htmlFor="win">
          <input type="checkbox" id="win" />WIN
        </label>
      </div>
    </div>
  )
}

function AddRepeat() {
  return (
    <div className={styles.addBlock}>
      <h2>Repeat Keypress</h2>
      <div className={styles.addBlockContent}>
        <div><b>Delay:</b></div>
        <div>
          <select>
            <option value="1">1 (Slow)</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5 (Fast)</option>
          </select>
        </div>
        <button>ADD</button>
      </div>
    </div>
  )
}

function AddPause() {
  return (
    <div className={styles.addBlock}>
      <h2>Pause</h2>
        <div className={styles.addBlockContent}>
        <div><b>Seconds (1-60):</b></div>
        <div>
          <input type="number" min="1" max="60" />
        </div>
        <button>ADD</button>
      </div>
    </div>
  )
}

function StringEntry() {
  return (
    <>
      
    </>
  )
}

function KeyboardFunctions() {
  return (
    <>
      
    </>
  )
}

export default SequenceBuilder