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
      <KeyboardFunctions 
        currentSequence={currentSequence}
        setCurrentSequence={setCurrentSequence}
      />
    </div>
  </div>
 )
}

function CurrentSequence({ currentSequence, setCurrentSequence }) {

  return (
    <div className={styles.currentSequence}>
      <h2>Current Sequence</h2>
      <div className={styles.currentSequenceItems}>
        {currentSequence.map((item) => (
          <SequenceItem
            id={item.id}
            text={item.text}
            currentSequence={currentSequence}
            setCurrentSequence={setCurrentSequence}
          />
        ))}
      </div>
    </div>
  )
}

function SequenceItem({ id, text, currentSequence, setCurrentSequence }) {
  const deleteItem = () => {
    setCurrentSequence(currentSequence.filter(item => item.id != id ))
  }

  return (
    <div className={styles.sequenceItem}>
      <div className={styles.sequenceItemText}>{text}</div>
      <div className={styles.deleteItem} onClick={deleteItem}>✕</div>
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
  const handleSubmit = (e) => {
    e.preventDefault();
    setString("");
    setCurrentSequence([...currentSequence, {"id": currentSequence.length, "text": string}])
  }

  return (
    <div className={styles.stringEntry}>
      <h2>String Entry</h2>
      <form className={styles.stringEntryInput} onSubmit={handleSubmit}>
        <input type="text" value={string} onChange={e => setString(e.target.value)} />
        <button type="submit" className={styles.addButton}>ADD</button>
      </form>
    </div>
  )
}

function KeyboardFunctions({ currentSequence, setCurrentSequence }) {
  const keyboardKeys = [
    {
      "keyboardSide": "leftKeyboard",
      "keys": [
        {"value": "[ESC]", "text": "ESC", "spacing": "u1"},
        {"value": "", "text": "", "spacing": "u1_space"},
        {"value": "[F1]", "text": "F1", "spacing": "u1"},
        {"value": "[F2]", "text": "F2", "spacing": "u1"},
        {"value": "[F3]", "text": "F3", "spacing": "u1"},
        {"value": "[F4]", "text": "F4", "spacing": "u1"},
        {"value": "", "text": "", "spacing": "u0_5_space"},
        {"value": "[F5]", "text": "F5", "spacing": "u1"},
        {"value": "[F6]", "text": "F6", "spacing": "u1"},
        {"value": "[F7]", "text": "F7", "spacing": "u1"},
        {"value": "[F8]", "text": "F8", "spacing": "u1"},
        {"value": "", "text": "", "spacing": "u0_5_space"},
        {"value": "[F9]", "text": "F9", "spacing": "u1"},
        {"value": "[F10]", "text": "F10", "spacing": "u1"},
        {"value": "[F11]", "text": "F11", "spacing": "u1"},
        {"value": "[F12]", "text": "F12", "spacing": "u1"},
        {"value": "[TAB]", "text": "Tab", "spacing": "u1_5"},
        {"value": "", "text": "", "spacing": "tabRowSpace"},
        {"value": "[BACKSPACE]", "text": "Backspace", "spacing": "u2"},
        {"value": "[CAPS_LOCK]", "text": "Caps Lock", "spacing": "u1_75"},
        {"value": "", "text": "", "spacing": "capsRowSpace"},
        {"value": "[ENTER]", "text": "Enter", "spacing": "u2_25"},
        {"value": "[L_SHIFT]", "text": "Left Shift", "spacing": "u2_25"},
        {"value": "", "text": "", "spacing": "shiftRowSpace"},
        {"value": "[R_SHIFT]", "text": "Right Shift", "spacing": "u2_75"},
        {"value": "[L_CTRL]", "text": "Left Ctrl", "spacing": "u1_5"},
        {"value": "[L_WIN]", "text": "Left\nWin", "spacing": "u1"},
        {"value": "[L_ALT]", "text": "Left\nAlt", "spacing": "u1_25"},
        {"value": "", "text": "", "spacing": "spacebar"},
        {"value": "[R_ALT]", "text": "Right\nAlt", "spacing": "u1_25"},
        {"value": "[R_WIN]", "text": "Right\nWin", "spacing": "u1"},
        {"value": "[MENU]", "text": "Menu", "spacing": "u1"},
        {"value": "[R_CTRL]", "text": "Right Ctrl", "spacing": "u1_5"}
      ]
    },
    {
      "keyboardSide": "middleKeyboard",
      "keys": [
        {"value": "[PRINT_SCREEN]", "text": "PrtSc", "spacing": "u1"},
        {"value": "[SCROLL_LOCK]", "text": "Scroll\nLock", "spacing": "u1"},
        {"value": "[PAUSE]", "text": "Pause", "spacing": "u1"},
        {"value": "[INSERT]", "text": "Ins", "spacing": "u1"},
        {"value": "[HOME]", "text": "Home", "spacing": "u1"},
        {"value": "[PAGE_UP]", "text": "Page\nUp", "spacing": "u1"},
        {"value": "[DELETE]", "text": "Del", "spacing": "u1"},
        {"value": "[END]", "text": "End", "spacing": "u1"},
        {"value": "[PAGE_DOWN]", "text": "Page\nDown", "spacing": "u1"},
        {"value": "", "text": "", "spacing": "u1_space"},
        {"value": "", "text": "", "spacing": "u1_space"},
        {"value": "[UP_ARROW]", "text": "Up\nArrow", "spacing": "u1"},
        {"value": "", "text": "", "spacing": "u1_space"},
        {"value": "", "text": "", "spacing": "u1_space"},
        {"value": "[LEFT_ARROW]", "text": "Left\nArrow", "spacing": "u1"},
        {"value": "[DOWN_ARROW]", "text": "Down\nArrow", "spacing": "u1"},
        {"value": "[RIGHT_ARROW]", "text": "Right\nArrow", "spacing": "u1"}
      ]
    },
    {
      "keyboardSide": "rightKeyboard",
      "keys": [
        {"value": "[NUM_LOCK]", "text": "Num\nLock", "spacing": "u1"},
        {"value": "[NUM_/]", "text": "Num /", "spacing": "u1"},
        {"value": "[NUM_*]", "text": "Num *", "spacing": "u1"},
        {"value": "[NUM_-]", "text": "Num -", "spacing": "u1"},
        {"value": "[NUM_7]", "text": "Num 7", "spacing": "u1"},
        {"value": "[NUM_8]", "text": "Num 8", "spacing": "u1"},
        {"value": "[NUM_9]", "text": "Num 9", "spacing": "u1"},
        {"value": "[NUM_+]", "text": "Num +", "spacing": "u1_tall"},
        {"value": "[NUM_4]", "text": "Num 4", "spacing": "u1"},
        {"value": "[NUM_5]", "text": "Num 5", "spacing": "u1"},
        {"value": "[NUM_6]", "text": "Num 6", "spacing": "u1"},
        {"value": "[NUM_1]", "text": "Num 1", "spacing": "u1"},
        {"value": "[NUM_2]", "text": "Num 2", "spacing": "u1"},
        {"value": "[NUM_3]", "text": "Num 3", "spacing": "u1"},
        {"value": "[NUM_ENTER]", "text": "Num\nEnter", "spacing": "u1_tall"},
        {"value": "[NUM_0]", "text": "Num 0", "spacing": "u2"},
        {"value": "[NUM_.]", "text": "Num .", "spacing": "u1"}
      ]
    }
  ]

  return (
    <div>
      <h2>Keyboard Functions</h2>
      <div className={styles.keyboardFunctions}>
        {keyboardKeys.map((side) => (
          <div className={styles[side.keyboardSide]}>
            {side.keys.map((key) => (
              <KeyboardButton
                value={key.value}
                text={key.text}
                spacing={key.spacing}
                currentSequence={currentSequence}
                setCurrentSequence={setCurrentSequence}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )

  
  // return (
  //   <div>
  //     <h2>Keyboard Functions</h2>
  //     <div className={styles.keyboardFunctions}>
  //       <div className={styles.leftKeyboard}>
  //         <button value="[ESC]" className={styles.u1}>ESC</button>
  //         <span className={styles.u1_space}></span>
  //         <button value="[F1]" className={styles.u1}>F1</button>
  //         <button value="[F2]" className={styles.u1}>F2</button>
  //         <button value="[F3]" className={styles.u1}>F3</button>
  //         <button value="[F4]" className={styles.u1}>F4</button>
  //         <span className={styles.u0_5_space}></span>
  //         <button value="[F5]" className={styles.u1}>F5</button>
  //         <button value="[F6]" className={styles.u1}>F6</button>
  //         <button value="[F7]" className={styles.u1}>F7</button>
  //         <button value="[F8]" className={styles.u1}>F8</button>
  //         <span className={styles.u0_5_space}></span>
  //         <button value="[F9]" className={styles.u1}>F9</button>
  //         <button value="[F10]" className={styles.u1}>F10</button>
  //         <button value="[F11]" className={styles.u1}>F11</button>
  //         <button value="[F12]" className={styles.u1}>F12</button>
  //         <button value="[TAB]" className={styles.u1_5}>Tab</button>
  //         <span className={styles.tabRowSpace}></span>
  //         <button value="[BACKSPACE]" className={styles.u2}>Backspace</button>
  //         <button value="[CAPS_LOCK]" className={styles.u1_75}>Caps Lock</button>
  //         <span className={styles.capsRowSpace}></span>
  //         <button value="[ENTER]" className={styles.u2_25}>Enter</button>
  //         <button value="[L_SHIFT]" className={styles.u2_25}>Left Shift</button>
  //         <span className={styles.shiftRowSpace}></span>
  //         <button value="[R_SHIFT]" className={styles.u2_75}>Right Shift</button>
  //         <button value="[L_CTRL]" className={styles.u1_5}>Left Ctrl</button>
  //         <button value="[L_WIN]" className={styles.u1}>Left<br/>Win</button>
  //         <button value="[L_ALT]" className={styles.u1_25}>Left<br/>Alt</button>
  //         <span className={styles.spacebar}></span>
  //         <button value="[R_ALT]" className={styles.u1_25}>Right<br/>Alt</button>
  //         <button value="[R_WIN]" className={styles.u1}>Right<br/>Win</button>
  //         <button value="[MENU]" className={styles.u1}>Menu</button>
  //         <button value="[R_CTRL]" className={styles.u1_5}>Right Ctrl</button>
  //       </div>
  //       <div className={styles.middleKeyboard}>
  //         <button value="[PRINT_SCREEN]" className={styles.u1}>PrtSc</button>
  //         <button value="[SCROLL_LOCK]" className={styles.u1}>Scroll<br/>Lock</button>
  //         <button value="[PAUSE]" className={styles.u1}>Pause</button>
  //         <button value="[INSERT]" className={styles.u1}>Ins</button>
  //         <button value="[HOME]" className={styles.u1}>Home</button>
  //         <button value="[PAGE_UP]" className={styles.u1}>Page<br/>Up</button>
  //         <button value="[DELETE]" className={styles.u1}>Del</button>
  //         <button value="[END]" className={styles.u1}>End</button>
  //         <button value="[PAGE_DOWN]" className={styles.u1}>Page<br/>Down</button>
  //         <span className={styles.u1_space}></span>
  //         <span className={styles.u1_space}></span>
  //         <button value="[UP_ARROW]" className={styles.u1}>Up<br/>Arrow</button>
  //         <span className={styles.u1_space}></span>
  //         <span className={styles.u1_space}></span>
  //         <button value="[LEFT_ARROW]" className={styles.u1}>Left<br/>Arrow</button>
  //         <button value="[DOWN_ARROW]" className={styles.u1}>Down<br/>Arrow</button>
  //         <button value="[RIGHT_ARROW]" className={styles.u1}>Right<br/>Arrow</button>
  //       </div>
  //       <div className={styles.rightKeyboard}>
  //         <button value="[NUM_LOCK]" className={styles.u1}>Num<br/>Lock</button>
  //         <button value="[NUM_/]" className={styles.u1}>Num /</button>
  //         <button value="[NUM_*]" className={styles.u1}>Num *</button>
  //         <button value="[NUM_-]" className={styles.u1}>Num -</button>
  //         <button value="[NUM_7]" className={styles.u1}>Num 7</button>
  //         <button value="[NUM_8]" className={styles.u1}>Num 8</button>
  //         <button value="[NUM_9]" className={styles.u1}>Num 9</button>
  //         <button value="[NUM_+]" className={styles.u1} style={{ gridRow: "span 2" }}>Num +</button>
  //         <button value="[NUM_4]" className={styles.u1}>Num 4</button>
  //         <button value="[NUM_5]" className={styles.u1}>Num 5</button>
  //         <button value="[NUM_6]" className={styles.u1}>Num 6</button>
  //         <button value="[NUM_1]" className={styles.u1}>Num 1</button>
  //         <button value="[NUM_2]" className={styles.u1}>Num 2</button>
  //         <button value="[NUM_3]" className={styles.u1}>Num 3</button>
  //         <button value="[NUM_ENTER]" className={styles.u1} style={{ gridRow: "span 2" }}>Num<br/>Enter</button>
  //         <button value="[NUM_0]" style={{ gridColumn: "span 8" }}>Num 0</button>
  //         <button value="[NUM_.]" className={styles.u1}>Num .</button>
  //       </div>
  //     </div>
  //   </div>
  // )
}

function KeyboardButton({ value, text, spacing, currentSequence, setCurrentSequence }) {
  if (value === "") {
    return <span className={styles[spacing]}></span>
  } else {
    return <button value={value} className={styles[spacing]} onClick={() => setCurrentSequence([...currentSequence, {"id": currentSequence.length, "text": value}])}>{text}</button>
  }
}

export default SequenceBuilder