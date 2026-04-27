import { useState } from 'react';
import { DragDropProvider, DragOverlay } from '@dnd-kit/react';
import { useSortable, isSortable } from '@dnd-kit/react/sortable';
import { useSequence, useSequenceDispatch } from '../../context/sequence';
import { Tooltip } from '../Snippets';
import styles from "./SequenceBuilder.module.css"


const modifierArray = [
  {"name": "ctrl", "value": "1"},
  {"name": "shift", "value": "2"},
  {"name": "alt", "value": "4"},
  {"name": "win", "value": "8"}
]


function SequenceBuilder({ bumpbarButtons, setBumpbarButtons, currentButton }) {
  const [string, setString] = useState("");
  const [modifiers, setModifiers] = useState(
    {
      "ctrl": false,
      "shift": false,
      "alt": false,
      "win": false
    }
  );

  const modifierValue = (() => {
    let i = 0;
    for (const [key, value] of Object.entries(modifiers)) {
      if (value) {
        for (const modifier of modifierArray) {
          if (modifier.name == key) {
            i += parseInt(modifier.value);
          }
        }
      }
    }
    return `0${i.toString(16).toUpperCase()}`;
  })();

  let modifierString = "";
  if (Object.values(modifiers).some(Boolean)) {
    modifierString = "[" + Object.entries(modifiers)
      // eslint-disable-next-line no-unused-vars
      .filter(([key, active]) => active)
      .map(([key]) => key.toUpperCase())
      .join(" + ") + "] + "
  }

  return (
    <div>
      <div className={styles.flexApart}>
        <h1>Sequence Builder</h1>
        <SequenceOptions 
          bumpbarButtons={bumpbarButtons}
          setBumpbarButtons={setBumpbarButtons}
          currentButton={currentButton}
          setModifiers={setModifiers}
        />
      </div>
      <div className={styles.flexColumn}>
        <CurrentSequence/>
        <StringEntry
          string={string}
          setString={setString}
          modifiers={modifiers}
          modifierString={modifierString}
          modifierValue={modifierValue}
        />
        <div className={styles.modifierRow}>
          <KeypressModifiers
            modifiers={modifiers}
            setModifiers={setModifiers}
            string={string}
          />
          <div className={styles.addSpecial}>
            <AddRepeat />
            <AddPause />
          </div>
        </div>
        <KeyboardFunctions 
          modifierString={modifierString}
          modifierValue={modifierValue}
        />
      </div>
    </div>
  )
}


function SequenceOptions({ bumpbarButtons, setBumpbarButtons, currentButton, setModifiers }) {
  const sequence = useSequence();
  const sequenceDispatch = useSequenceDispatch();

  const handleReset = () => {
    if (sequence.sequence.length > 0) {
      sequenceDispatch({type: "reset"})
      setModifiers({
        "ctrl": false,
        "shift": false,
        "alt": false,
        "win": false
      })
    }
  }

  const handleSubmit = () => {
    if (sequence.sequence.length > 0) {
      const updatedArray = [...bumpbarButtons];
      updatedArray[currentButton] = {
        string: sequence.sequence.map(item => item.string).join(""),
        keypresses: sequence.sequence.flatMap(item => item.keypresses)
      }
      setBumpbarButtons(updatedArray);
    }
  }

  return (
    <div className={styles.sequenceOptions}>
      <button
        className={`${styles.optionButton} ${styles.resetOption}`}
        onClick={handleReset}
        disabled={sequence.sequence.length === 0}
      >Reset Sequence</button>
      <button
        className={`${styles.optionButton} ${styles.addOption}`}
        onClick={handleSubmit}
        disabled={sequence.sequence.length === 0 || currentButton === null}
      >Save to Button</button>
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
                text={item.string}
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


function KeypressModifiers({ modifiers, setModifiers, string }) {
  const handleChange = (e) => {
    const { id, checked } = e.target;
    setModifiers({
      ...modifiers,
      [id]: checked
    });
  }

  return (
    <div className={styles.keypressModifiers}>
      <div className={styles.flexRow}>
        <h2>Modifiers</h2>
        <Tooltip name="modifiers" text={<span>Enter any keypress with modifiers. Useful for sending multi-keypress inputs like <b>CTRL+ALT+DEL</b> or <b>CTRL+a</b>. Check any modifier needed and then either click desired keyboard function or enter key in Text Entry box.<br/>(<b>NOTE:</b> Only one keypress can be assigned with modifiers at a time. Checkboxes are disabled if Text Entry box is longer than one character.)</span>} />
      </div>
      <div className={styles.modifierCheckboxes}>
        {modifierArray.map((modifier) => (
          <label htmlFor={modifier.name} key={modifier.name}>
            <input
              type="checkbox"
              id={modifier.name}
              value={modifier.value}
              checked={modifiers[modifier.name]}
              onChange={handleChange}
              disabled={string.length > 1}
            />{modifier.name.toUpperCase()}
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
        type: "added special",
        string: `[REPEAT: ${delay}]`,
        value: "FD",
        modifier: parseInt(delay).toString(16).toUpperCase().padStart(2, "0")
      })
    }
  }

  return (
    <div className={styles.addBlock}>
      <div className={styles.flexRow}>
        <h2>Repeat Keypress</h2>
        <Tooltip name="repeat" text={<span><b>For Wireless Bumpbars Only</b><br/>Speed at which Bumpbar button keypress is repeated. Must be the first part of sequence, and only one keypress can follow.</span>} />
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
          className={styles.addButton}
          disabled={sequence.sequence.length > 0}
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
    if (pause === "" || pause == 0 || pause > 60) {
      return
    } else {
      sequenceDispatch({
        type: "added special",
        string: `[PAUSE: ${pause}]`,
        value: "FE",
        modifier: parseInt(pause).toString(16).toUpperCase().padStart(2, "0")
      })
      setPause("");
    }
  }

  return (
    <div className={styles.addBlock}>
      <div className={styles.flexRow}>
        <h2>Pause</h2>
        <Tooltip name="pause" text={<span>Your sequence will be paused for the desired amount of time before the next input is sent.</span>} />
      </div>
      <form className={styles.addBlockContent} onSubmit={handleSubmit}>
        <div><b>Seconds (1-60):</b></div>
        <div>
          <input id="pause" type="number" min="1" max="60" value={pause} onChange={(e) => setPause(e.target.value)} />
        </div>
        <button
          type="submit"
          className={styles.addButton}
          disabled={(pause === "" || pause == 0 || pause > 60)}
        >ADD</button>
      </form>
    </div>
  )
}


function StringEntry({ string, setString, modifiers, modifierString, modifierValue }) {
  const sequenceDispatch = useSequenceDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setString("");
    sequenceDispatch({
      type: "added string",
      string: `${modifierString}${string}`
    })
  }

  const handleChange = (e) => {
    if ((Object.values(modifiers).some(Boolean)) && string.length === 0) {
      sequenceDispatch({
        type: "added key",
        string: `${modifierString}${e.target.value[0]}`,
        value: e.target.value[0],
        modifier: modifierValue
      })
    } else {
      setString(e.target.value);
    }
  }

  return (
    <div className={styles.stringEntry}>
      <h2>Text Entry</h2>
      <form className={styles.stringEntryInput} onSubmit={handleSubmit}>
        <input type="text" value={string} onChange={handleChange} />
        <button type="submit" className={styles.addButton} disabled={string.length === 0}>ADD</button>
      </form>
    </div>
  )
}


function KeyboardFunctions({ modifierString, modifierValue }) {
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
        {"value": "[SPACE]", "text": "Spacebar", "spacing": "spacebar"},
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
                modifierString={modifierString}
                modifierValue={modifierValue}
                />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}


function KeyboardButton({ value, text, spacing, modifierString, modifierValue }) {
  const sequenceDispatch = useSequenceDispatch();

  if (value === "") {
    return <span className={styles[spacing]}></span>
  } else {
    return <button value={value} className={styles[spacing]} onClick={() => {
      sequenceDispatch({
        type: "added key",
        string: `${modifierString}${value}`,
        value: value,
        modifier: modifierValue
      })
    }}>{text}</button>
  }
}


export default SequenceBuilder