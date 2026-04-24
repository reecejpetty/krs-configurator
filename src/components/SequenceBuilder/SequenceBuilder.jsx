import { useState } from 'react';
import { DragDropProvider, DragOverlay } from '@dnd-kit/react';
import { useSortable, isSortable } from '@dnd-kit/react/sortable';
import { useSequence, useSequenceDispatch } from '../../context/sequence';
import { Tooltip } from '../Snippets';
import styles from "./SequenceBuilder.module.css"

function SequenceBuilder() {
  const [string, setString] = useState("")
  const [modifiers, setModifiers] = useState(
    {
      "ctrl": false,
      "shift": false,
      "alt": false,
      "win": false
    }
  )

  return (
    <div>
      <div className={styles.flexApart}>
        <h1>Sequence Builder</h1>
        <SequenceOptions />
      </div>
      <div className={styles.flexColumn}>
        <CurrentSequence/>
        <div className={styles.modifierRow}>
          <KeypressModifiers
            modifiers={modifiers}
            setModifiers={setModifiers}
          />
          <AddRepeat />
          <AddPause />
        </div>
        <StringEntry
          string={string}
          setString={setString}
        />
        <KeyboardFunctions />
      </div>
    </div>
  )
}

function SequenceOptions() {
  const sequence = useSequence();
  const sequenceDispatch = useSequenceDispatch();

  const handleReset = () => {
    if (sequence.sequence.length > 0) {
      sequenceDispatch({type: "reset"})
    }
  }

  const handleSubmit = () => {
    if (sequence.sequence.length > 0) {
      sequenceDispatch({type: "submitted"})
    }
  }

  return (
    <div className={styles.sequenceOptions}>
      <div
        className={sequence.sequence.length > 0 ? `${styles.optionButton} ${styles.resetOption}` : `${styles.optionButton} ${styles.disabled}`}
        onClick={handleReset}
      >Reset Current Sequence</div>
      <div
        className={sequence.sequence.length > 0 ? `${styles.optionButton} ${styles.addOption}` : `${styles.optionButton} ${styles.disabled}`}
        onClick={handleSubmit}
      >Add to Bumpbar Button</div>
    </div>
  )
}

function CurrentSequence() {
  const sequence = useSequence();
  const sequenceDispatch = useSequenceDispatch();

  if (sequence.sequence.length == 0) {
    return (
      <div className={styles.currentSequence}>
        <h2>Current Sequence</h2>
        <div className={styles.currentSequenceItems}>
          <div className={`${styles.sequenceItem} ${styles.emptySequence}`}>
            <div className={styles.sequenceItemText}>Your</div>
          </div>
          <div className={`${styles.sequenceItem} ${styles.emptySequence}`}>
            <div className={styles.sequenceItemText}>new</div>
          </div>
          <div className={`${styles.sequenceItem} ${styles.emptySequence}`}>
            <div className={styles.sequenceItemText}>sequence</div>
          </div>
          <div className={`${styles.sequenceItem} ${styles.emptySequence}`}>
            <div className={styles.sequenceItemText}>here</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;
  
          const {source} = event.operation;
  
          if (isSortable(source)) {
            const {initialIndex, index} = source;
  
            if (initialIndex !== index) {
              sequenceDispatch({
                type: "reordered",
                initialIndex: initialIndex,
                index: index
              })
            }
          }
        }}
      >
        <div className={styles.currentSequence}>
          <h2>Current Sequence</h2>
          <div className={styles.currentSequenceItems}>
            {sequence.sequence.map((item, index) => (
              <SequenceItem
                key={item.id}
                id={item.id}
                index={index}
                text={item.text}
              />
            ))}
            <DragOverlay>
              {source => (
                <div className={`${styles.dragOverlay} ${styles.sequenceItem}`}>
                  <div className={styles.sequenceItemText}>{source.data["dragText"]}</div>
                  <div className={styles.deleteItem} style={{visibility: "hidden"}}>✕</div>
                </div>
              )}
            </DragOverlay>
          </div>
        </div>
      </DragDropProvider>
    )
  }

}

function SequenceItem({ id, index, text }) {
  const sequenceDispatch = useSequenceDispatch();
  const {ref, isDragSource} = useSortable({id, index, data:{["dragText"]: text}});

  const deleteItem = () => {
    sequenceDispatch({
      type: "deleted",
      id: id
    })
  }

  return (
    <>
      <div className={(isDragSource) ? `${styles.dropzone} ${styles.sequenceItem}` : styles.sequenceItem} ref={ref} >
        <div className={styles.sequenceItemText}>{text}</div>
        <div className={styles.deleteItem} onClick={deleteItem}>✕</div>
      </div>
    </>
  )
}

function KeypressModifiers({ modifiers, setModifiers }) {
  const modifierArray = ["ctrl", "shift", "alt", "win"]
  const handleChange = (e) => {
    const { value, checked } = e.target;
    setModifiers({
      ...modifiers,
      [value]: checked
    });
  }

  return (
    <div className={styles.keypressModifiers}>
      <h2>Modifiers</h2>
      <div className={styles.modifierCheckboxes}>
        {modifierArray.map((modifier) => (
          <label htmlFor={modifier}>
            <input
              type="checkbox"
              id={modifier}
              value={modifier}
              checked={modifiers[modifier]}
              onChange={handleChange}
            />{modifier.toUpperCase()}
          </label>
          )
        )}
      </div>
    </div>
  )
}

function AddRepeat() {
  // Need to add way to prevent sortability when using AddRepeat()
  const sequence = useSequence();
  const sequenceDispatch = useSequenceDispatch();
  const [delay, setDelay] = useState("1");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sequence.sequence.length > 0) {
      return
    } else {
      sequenceDispatch({
        type: "added",
        text: `[REPEAT: ${delay}]`
      })
    }
  }

  return (
    <div className={styles.addBlock}>
      <div className={styles.flexRow}>
        <h2>Repeat Keypress</h2>
        <Tooltip text={<span><b>For Wireless Bumpbars Only</b><br/>Speed at which Bumpbar button keypress is repeated. Must be the first part of sequence, and only one keypress can follow.</span>} />
      </div>
      <form className={styles.addBlockContent} onSubmit={handleSubmit}>
        <div><b>Delay:</b></div>
        <div>
          <select value={delay} onChange={(e) => setDelay(e.target.value)}>
            <option value="1">1 (Slow)</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5 (Fast)</option>
          </select>
        </div>
        <button
          type="submit"
          className={sequence.sequence.length === 0 ? styles.addButton : `${styles.addButton} ${styles.disabled}`}
        >ADD</button>
      </form>
    </div>
  )
}

function AddPause() {
  const sequenceDispatch = useSequenceDispatch();
  const [pause, setPause] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pause === "" || pause === 0 || pause > 60) {
      return
    } else {
      sequenceDispatch({
        type: "added",
        text: `[PAUSE: ${pause}]`
      })
    }
  }

  return (
    <div className={styles.addBlock}>
      <div className={styles.flexRow}>
        <h2>Pause</h2>
        <Tooltip text={<span>Your sequence will be paused by the desired time before the next input is sent.</span>} />
      </div>
      <form className={styles.addBlockContent} onSubmit={handleSubmit}>
        <div><b>Seconds (1-60):</b></div>
        <div>
          <input id="pause" type="number" min="1" max="60" value={pause} onChange={(e) => setPause(e.target.value)} />
        </div>
        <button
          type="submit"
          className={(pause !== "" && pause > 0 && pause <= 60) ? styles.addButton : `${styles.addButton} ${styles.disabled}` }
        >ADD</button>
      </form>
    </div>
  )
}

function StringEntry({ string, setString }) {
  const sequenceDispatch = useSequenceDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setString("");
    sequenceDispatch({
      type: "added",
      text: string
    })
  }

  return (
    <div className={styles.stringEntry}>
      <h2>Text Entry</h2>
      <form className={styles.stringEntryInput} onSubmit={handleSubmit}>
        <input type="text" value={string} onChange={e => setString(e.target.value)} />
        <button type="submit" className={styles.addButton}>ADD</button>
      </form>
    </div>
  )
}

function KeyboardFunctions() {
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
        {keyboardKeys.map((side, index) => (
          <div className={styles[side.keyboardSide]} key={index}>
            {side.keys.map((key, index) => (
              <KeyboardButton
                key={index}
                value={key.value}
                text={key.text}
                spacing={key.spacing}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function KeyboardButton({ value, text, spacing }) {
  const sequenceDispatch = useSequenceDispatch();

  if (value === "") {
    return <span className={styles[spacing]}></span>
  } else {
    return <button value={value} className={styles[spacing]} onClick={() => {
      sequenceDispatch({
        type: "added",
        text: value
      })
    }}>{text}</button>
  }
}

export default SequenceBuilder