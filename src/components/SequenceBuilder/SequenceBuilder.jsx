import { useState } from 'react';
import { useSortable } from '@dnd-kit/react/sortable';
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
        {currentSequence.map((item, index) => (
          <SequenceItem
            id={item.id}
            index={index}
            text={item.text}
            currentSequence={currentSequence}
            setCurrentSequence={setCurrentSequence}
          />
        ))}
      </div>
    </div>
  )
}

function SequenceItem({ id, index, text, currentSequence, setCurrentSequence }) {
  const {ref} = useSortable({id, index});

  const deleteItem = () => {
    setCurrentSequence(currentSequence.filter(item => item.id != id ))
  }

  return (
    <div className={styles.sequenceItem} ref={ref}>
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
}

function KeyboardButton({ value, text, spacing, currentSequence, setCurrentSequence }) {
  if (value === "") {
    return <span className={styles[spacing]}></span>
  } else {
    return <button value={value} className={styles[spacing]} onClick={() => setCurrentSequence([...currentSequence, {"id": currentSequence.length, "text": value}])}>{text}</button>
  }
}

export default SequenceBuilder