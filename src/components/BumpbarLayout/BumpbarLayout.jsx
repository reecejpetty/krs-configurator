import { useState } from 'react';
import { DragDropProvider, DragOverlay } from '@dnd-kit/react';
import { swap } from '@dnd-kit/helpers';
import { AutoScroller, Feedback } from '@dnd-kit/dom';
import { SortableKeyboardPlugin } from '@dnd-kit/dom/sortable';
import { pointerIntersection } from '@dnd-kit/collision';
import { useSortable, isSortableOperation } from '@dnd-kit/react/sortable';
import styles from './BumpbarLayout.module.css'
import { Tooltip } from '../Snippets';

function BumpbarLayout({ activeSwitch, setActiveSwitch, currentButton, setCurrentButton, bumpbarButtons, setBumpbarButtons, setMode }) {
  // User will be able to set rowCount to either 2 or 3
  const [sticky, setSticky] = useState(false);
  const rowCount = activeSwitch;
  const buttonArray = Array.from({ length: (10*rowCount) });

  return (
    <>
      <div className={styles.flexApart} style={{ columnGap: "30px" }}>
        <div className={styles.flexRow} style={{ flexGrow: 1 }}>
          <h1>Bumpbar Buttons</h1>
          <Tooltip name="bumpbar-buttons" text={<><p>The buttons below correspond to the buttons on your Bumpbar (use LED for alignment).</p><p>Select any button to configure and save a new sequence to it, or edit the button's current sequence (the button's currently configured sequence will appear below the Bumpbar when clicked).</p><p>You can toggle between a 20 and 30 button layout to match you Bumpbar.</p><p><b>Drag and drop buttons to swap them.</b></p></>} />
        </div>
        <ButtonCountToggle active={activeSwitch} setActive={setActiveSwitch} setMode={setMode} />
        <PinBumpbar sticky={sticky} setSticky={setSticky} />
      </div>
      <div className={sticky ? styles.bumpbarSticky : styles.bumpbar}>
        <DragDropProvider
          plugins={(defaults) => [
            ...defaults.filter((plugin) => plugin !== AutoScroller),
            Feedback.configure({feedback: "clone", dropAnimation: null}),
          ]}
          onDragOver={(event) => {
            event.preventDefault();
          }}
          onDragEnd={(event) => {
            if (event.canceled) return;
            
            if (isSortableOperation(event.operation)) {
              const updatedArray = swap([...bumpbarButtons], event);
              setBumpbarButtons(updatedArray);
              if (currentButton == event.operation.source.index) {
                setCurrentButton(event.operation.target.index);
              } else if (currentButton == event.operation.target.index) {
                setCurrentButton(event.operation.source.index)
              }
            }
          }}
        >
          <div className={activeSwitch == 2 ? styles.bumpbarLayout20 : styles.bumpbarLayout }>
            {buttonArray.map((_, index) => (
              <BumpbarButton
                key={bumpbarButtons[index].id}
                id={bumpbarButtons[index].id}
                index={index}
                number={index + 1}
                text={bumpbarButtons[index].string }
                currentButton={currentButton}
                setCurrentButton={setCurrentButton}
                active={index == currentButton}
              />
            ))}
          </div>
          <DragOverlay>
            {source => (
              <div className={styles.dragOverlay}>
                <span className={styles.bumpbarButtonText}>{source.data["dragText"]}</span>
              </div>
            )}
          </DragOverlay>
        </DragDropProvider>
      </div>
      <div className={styles.flexRow}>
        <SelectedButtonSequence currentButton={currentButton} bumpbarButtons={bumpbarButtons} />
      </div>
    </>
  )
}

function BumpbarButton({number, id, index, text, currentButton, setCurrentButton, active}) {
  const {ref, isDragSource, isDropTarget} = useSortable({id, index, data:{["dragText"]: text}, collisionDetector: pointerIntersection});

  const handleClick = () => {
    const button = index;
    setCurrentButton((currentButton != button ? button : null))
  }

  return (
    <div 
      id={id} 
      ref={ref} 
      className={`${active ? styles.activeButton : styles.bumpbarButton} ${isDragSource ? styles.dragSource : ""} ${(isDropTarget && !isDragSource) ? styles.dropTarget : ""}`}
      data-number={number}
      onClick={handleClick}
    >
      <span className={styles.bumpbarButtonText}>{text}</span>
    </div>
  )
}

function ButtonCountToggle({ active, setActive, setMode }) {
  const handleChange = (e) => {
    setMode("4");
    setActive(e.target.id === "20-switch" ? 2 : 3);
  }
  return (
    <div className={active == 2 ? styles.switch20 : styles.switch}>
      <label className={styles.switchOption} htmlFor='20-switch'>
        <input
          type='radio'
          id='20-switch'
          name='button-count-switch'
          checked={active == 2}
          onChange={handleChange}
        />20 Button
      </label>
      <label className={styles.switchOption} htmlFor='30-switch'>
        <input
          type='radio'
          id='30-switch'
          name='button-count-switch'
          checked={active == 3}
          onChange={handleChange}
        />30 Button
      </label>
    </div>
  )
}

function SelectedButtonSequence({ currentButton, bumpbarButtons }) {
  if (currentButton == null || bumpbarButtons[currentButton].keypresses.length === 0) {
    return null;
  }

  return (
    <div className={styles.selectedButtonSequence}>
      {bumpbarButtons[currentButton].sequenceItems.map((item, index) => (
        <div key={index} className={styles.sequenceItem}>
          <div className={styles.sequenceItemText}>{item.string}</div>
        </div>
      ))}
    </div>
  )

}

function PinBumpbar({ sticky, setSticky }) {
  const isIframe = window.self !== window.top;
  
  if (isIframe) {
    return null;
  }
  
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