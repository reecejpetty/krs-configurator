import { useState } from 'react'
import './App.css'
import ConfigOptions from './components/ConfigOptions/ConfigOptions'
import BumpbarLayout from './components/BumpbarLayout/BumpbarLayout'
import SequenceBuilder from './components/SequenceBuilder/SequenceBuilder'
import GenerateFile from "./components/GenerateFile/GenerateFile"
import { SequenceProvider } from './context/SequenceProvider'
import keyboardHexMap from "./keyboardhexmap.json"

function App() {
  const [connection, setConnection] = useState("auto");
  const [mode, setMode] = useState("4");
  const [volume, setVolume] = useState("3");
  const [lockSound, setLockSound] = useState("scroll");

  const [currentButton, setCurrentButton] = useState(null);

  const [bumpbarButtons, setBumpbarButtons] = useState(initialState);

  return (
    <>
      <ConfigOptions 
        connection={connection}
        setConnection={setConnection}
        mode={mode}
        setMode={setMode}
        volume={volume}
        setVolume={setVolume}
        lockSound={lockSound}
        setLockSound={setLockSound}
      />
      <BumpbarLayout 
        bumpbarButtons={bumpbarButtons}
        setBumpbarButtons={setBumpbarButtons}
        currentButton={currentButton}
        setCurrentButton={setCurrentButton}
      />
      <SequenceProvider>
        <SequenceBuilder
          bumpbarButtons={bumpbarButtons}
          setBumpbarButtons={setBumpbarButtons}
          currentButton={currentButton}
        />
      </SequenceProvider>
      <GenerateFile />
    </>
  )
}


const initialState = (() => {
  const mode1Array = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t'];
  return mode1Array.map(key => {
    return {
      string: key,
      keypresses: [
        {
          string: key,
          usage: keyboardHexMap[key].usage,
          modifier: keyboardHexMap[key].modifier
        }
      ]
    }
  })
})


export default App
