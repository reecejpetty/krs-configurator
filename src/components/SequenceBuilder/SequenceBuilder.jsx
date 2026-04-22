import styles from "./SequenceBuilder.module.css"

function SequenceBuilder() {
 return (
  <>
    <h1>Sequence Builder</h1>
    <div className={styles.flexColumn}>
      <CurrentSequence />
      <div className={styles.modifierRow}>
        <KeypressModifiers />
        <AddRepeat />
        <AddPause />
      </div>
      <StringEntry />
      <KeyboardFunctions />
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
        <button className={styles.addButton}>ADD</button>
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
        <button className={styles.addButton}>ADD</button>
      </div>
    </div>
  )
}

function StringEntry() {
  return (
    <div className={styles.stringEntry}>
      <h2>String Entry</h2>
      <div className={styles.stringEntryInput}>
        <input type="text"/>
        <button className={styles.addButton}>ADD</button>
      </div>
    </div>
  )
}

function KeyboardFunctions() {
  return (
    <div className={styles.keyboardFunctions}>
      <div className={styles.leftKeyboard}>
        <button value="[ESC]">ESC</button>
        <button value="[F1]">F1</button>
        <button value="[F2]">F2</button>
        <button value="[F3]">F3</button>
        <button value="[F4]">F4</button>
        <button value="[F5]">F5</button>
        <button value="[F6]">F6</button>
        <button value="[F7]">F7</button>
        <button value="[F8]">F8</button>
        <button value="[F9]">F9</button>
        <button value="[F10]">F10</button>
        <button value="[F11]">F11</button>
        <button value="[F12]">F12</button>
        <button value="[TAB]" style={{ gridColumn: "span 2" }}>Tab</button>
        <button style={{ gridColumn: "span 9", visibility: "hidden" }}></button>
        <button value="[BACKSPACE]" style={{ gridColumn: "span 2" }}>Backspace</button>
        <button value="[CAPS_LOCK]" style={{ gridColumn: "span 2" }}>Caps Lock</button>
        <button style={{ gridColumn: "span 9", visibility: "hidden" }}></button>
        <button value="[ENTER]" style={{ gridColumn: "span 2" }}>Enter</button>
        <button value="[L_SHIFT]" style={{ gridColumn: "span 3" }}>Left Shift</button>
        <button style={{ gridColumn: "span 7", visibility: "hidden" }}></button>
        <button value="[R_SHIFT]" style={{ gridColumn: "span 3" }}>Right Shift</button>
        <button value="[L_CTRL]" style={{ gridColumn: "span 2" }}>Left Ctrl</button>
        <button value="[L_WIN]">Left Win</button>
        <button value="[L_ALT]">Left Alt</button>
        <button style={{ gridColumn: "span 4", visibility: "hidden" }}></button>
        <button value="[R_ALT]">Right Alt</button>
        <button value="[R_WIN]">Right Win</button>
        <button value="[MENU]">Menu</button>
        <button value="[R_CTRL]" style={{ gridColumn: "span 2" }}>Right Ctrl</button>
      </div>
      <div className={styles.middleKeyboard}>
        <button value="[PRINT_SCREEN]">PrtSc</button>
        <button value="[SCROLL_LOCK]">Scroll Lock</button>
        <button value="[PAUSE]">Pause</button>
        <button value="[INSERT]">Ins</button>
        <button value="[HOME]">Home</button>
        <button value="[PAGE_UP]">Page Up</button>
        <button value="[DELETE]">Del</button>
        <button value="[END]">End</button>
        <button value="[PAGE_DOWN]">Page Down</button>
        <button style={{ visibility: "hidden" }}></button>
        <button value="[UP_ARROW]">Up Arrow</button>
        <button style={{ visibility: "hidden" }}></button>
        <button value="[LEFT_ARROW]">Left Arrow</button>
        <button value="[DOWN_ARROW]">Down Arrow</button>
        <button value="[RIGHT_ARROW]">Right Arrow</button>
      </div>
      <div className={styles.rightKeyboard}>
        <button value="[NUM_LOCK]">Num Lock</button>
        <button value="[NUM_/]">Num /</button>
        <button value="[NUM_*]">Num *</button>
        <button value="[NUM_-]">Num -</button>
        <button value="[NUM_7]">Num 7</button>
        <button value="[NUM_8]">Num 8</button>
        <button value="[NUM_9]">Num 9</button>
        <button value="[NUM_+]" style={{ gridRow: "span 2" }}>Num +</button>
        <button value="[NUM_4]">Num 4</button>
        <button value="[NUM_5]">Num 5</button>
        <button value="[NUM_6]">Num 6</button>
        <button value="[NUM_1]">Num 1</button>
        <button value="[NUM_2]">Num 2</button>
        <button value="[NUM_3]">Num 3</button>
        <button value="[NUM_ENTER]" style={{ gridRow: "span 2" }}>Num Enter</button>
        <button value="[NUM_0]" style={{ gridColumn: "span 2" }}>Num 0</button>
        <button value="[NUM_.]">Num .</button>
      </div>
    </div>
  )
}

export default SequenceBuilder