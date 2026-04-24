import { useState } from 'react'
import './App.css'
import ConfigOptions from './components/ConfigOptions/ConfigOptions'
import BumpbarLayout from './components/BumpbarLayout/BumpbarLayout'
import SequenceBuilder from './components/SequenceBuilder/SequenceBuilder'
import GenerateFile from "./components/GenerateFile/GenerateFile"
import { SequenceProvider } from './context/SequenceContext'

function App() {
  const [connection, setConnection] = useState("auto");
  const [mode, setMode] = useState("4");
  const [volume, setVolume] = useState("3");
  const [lockSound, setLockSound] = useState("scroll");

  const [currentButton, setCurrentButton] = useState();

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
        currentButton={currentButton}
        setCurrentButton={setCurrentButton}
      />
      <SequenceProvider>
        <SequenceBuilder/>
      </SequenceProvider>
      <GenerateFile />
    </>
  )
}

export default App
