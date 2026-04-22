import { useState } from 'react';
import styles from "./SequenceBuilder.module.css"

function SequenceBuilder({ currentSequence, setCurrentSequence }) {
  const [string, setString] = useState("")

 return (
  <div>
    <h1>Sequence Builder</h1>
    <div className={styles.flexColumn}>
      <CurrentSequence
        currentSequence={currentSequence}
        setCurrentSequence={setCurrentSequence}
      />
      <div className={styles.modifierRow}>
        <KeypressModifiers />
        <AddRepeat />
        <AddPause />
      </div>
      <StringEntry string={string} setString={setString} currentSequence={currentSequence} setCurrentSequence={setCurrentSequence} />
      <KeyboardFunctions />
    </div>
  </div>
 )
}

function CurrentSequence({ currentSequence, setCurrentSequence }) {

  return (
    <div className={styles.currentSequence}>
      <h2>Current Sequence</h2>
      <div className={styles.currentSequenceItems}>
        <SequenceItem text="test" />
        <SequenceItem text="[CTRL + A]" />
        <SequenceItem text="[ESC]" />
        <SequenceItem text="This is a string" />
        <SequenceItem text="[PAUSE: 10]" />
        {currentSequence.map((item) => (
          <SequenceItem text={item.text} />
        ))}
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

function StringEntry({ string, setString, currentSequence, setCurrentSequence }) {

  return (
    <div className={styles.stringEntry}>
      <h2>String Entry</h2>
      <div className={styles.stringEntryInput}>
        <input type="text" value={string} onChange={e => setString(e.target.value)} />
        <button onClick={() => setCurrentSequence([...currentSequence, {"text": string}])} className={styles.addButton}>ADD</button>
      </div>
    </div>
  )
}

function KeyboardFunctions() {
  return (
    <div>
      <h2>Keyboard Functions</h2>
      <div className={styles.keyboardFunctions}>
        <div className={styles.leftKeyboard}>
          <button value="[ESC]" className={styles.u1}>ESC</button>
          <span className={styles.u1_space}></span>
          <button value="[F1]" className={styles.u1}>F1</button>
          <button value="[F2]" className={styles.u1}>F2</button>
          <button value="[F3]" className={styles.u1}>F3</button>
          <button value="[F4]" className={styles.u1}>F4</button>
          <span className={styles.u0_5_space}></span>
          <button value="[F5]" className={styles.u1}>F5</button>
          <button value="[F6]" className={styles.u1}>F6</button>
          <button value="[F7]" className={styles.u1}>F7</button>
          <button value="[F8]" className={styles.u1}>F8</button>
          <span className={styles.u0_5_space}></span>
          <button value="[F9]" className={styles.u1}>F9</button>
          <button value="[F10]" className={styles.u1}>F10</button>
          <button value="[F11]" className={styles.u1}>F11</button>
          <button value="[F12]" className={styles.u1}>F12</button>
          <button value="[TAB]" className={styles.u1_5}>Tab</button>
          <span className={styles.tabRowSpace}></span>
          <button value="[BACKSPACE]" className={styles.u2}>Backspace</button>
          <button value="[CAPS_LOCK]" className={styles.u1_75}>Caps Lock</button>
          <span className={styles.capsRowSpace}></span>
          <button value="[ENTER]" className={styles.u2_25}>Enter</button>
          <button value="[L_SHIFT]" className={styles.u2_25}>Left Shift</button>
          <span className={styles.shiftRowSpace}></span>
          <button value="[R_SHIFT]" className={styles.u2_75}>Right Shift</button>
          <button value="[L_CTRL]" className={styles.u1_5}>Left Ctrl</button>
          <button value="[L_WIN]" className={styles.u1}>Left<br/>Win</button>
          <button value="[L_ALT]" className={styles.u1_25}>Left<br/>Alt</button>
          <span className={styles.spacebar}></span>
          <button value="[R_ALT]" className={styles.u1_25}>Right<br/>Alt</button>
          <button value="[R_WIN]" className={styles.u1}>Right<br/>Win</button>
          <button value="[MENU]" className={styles.u1}>Menu</button>
          <button value="[R_CTRL]" className={styles.u1_5}>Right Ctrl</button>
        </div>
        <div className={styles.middleKeyboard}>
          <button value="[PRINT_SCREEN]" className={styles.u1}>PrtSc</button>
          <button value="[SCROLL_LOCK]" className={styles.u1}>Scroll<br/>Lock</button>
          <button value="[PAUSE]" className={styles.u1}>Pause</button>
          <button value="[INSERT]" className={styles.u1}>Ins</button>
          <button value="[HOME]" className={styles.u1}>Home</button>
          <button value="[PAGE_UP]" className={styles.u1}>Page<br/>Up</button>
          <button value="[DELETE]" className={styles.u1}>Del</button>
          <button value="[END]" className={styles.u1}>End</button>
          <button value="[PAGE_DOWN]" className={styles.u1}>Page<br/>Down</button>
          <span className={styles.u1_space}></span>
          <span className={styles.u1_space}></span>
          <button value="[UP_ARROW]" className={styles.u1}>Up<br/>Arrow</button>
          <span className={styles.u1_space}></span>
          <span className={styles.u1_space}></span>
          <button value="[LEFT_ARROW]" className={styles.u1}>Left<br/>Arrow</button>
          <button value="[DOWN_ARROW]" className={styles.u1}>Down<br/>Arrow</button>
          <button value="[RIGHT_ARROW]" className={styles.u1}>Right<br/>Arrow</button>
        </div>
        <div className={styles.rightKeyboard}>
          <button value="[NUM_LOCK]" className={styles.u1}>Num<br/>Lock</button>
          <button value="[NUM_/]" className={styles.u1}>Num /</button>
          <button value="[NUM_*]" className={styles.u1}>Num *</button>
          <button value="[NUM_-]" className={styles.u1}>Num -</button>
          <button value="[NUM_7]" className={styles.u1}>Num 7</button>
          <button value="[NUM_8]" className={styles.u1}>Num 8</button>
          <button value="[NUM_9]" className={styles.u1}>Num 9</button>
          <button value="[NUM_+]" className={styles.u1} style={{ gridRow: "span 2" }}>Num +</button>
          <button value="[NUM_4]" className={styles.u1}>Num 4</button>
          <button value="[NUM_5]" className={styles.u1}>Num 5</button>
          <button value="[NUM_6]" className={styles.u1}>Num 6</button>
          <button value="[NUM_1]" className={styles.u1}>Num 1</button>
          <button value="[NUM_2]" className={styles.u1}>Num 2</button>
          <button value="[NUM_3]" className={styles.u1}>Num 3</button>
          <button value="[NUM_ENTER]" className={styles.u1} style={{ gridRow: "span 2" }}>Num<br/>Enter</button>
          <button value="[NUM_0]" style={{ gridColumn: "span 8" }}>Num 0</button>
          <button value="[NUM_.]" className={styles.u1}>Num .</button>
        </div>
      </div>
    </div>
  )
}

export default SequenceBuilder