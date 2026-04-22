// import { useState } from 'react'
import './App.css'
import ConfigOptions from './components/ConfigOptions/ConfigOptions'
import BumpbarLayout from './components/BumpbarLayout/BumpbarLayout'
import SequenceBuilder from './components/SequenceBuilder/SequenceBuilder'
import GenerateFile from "./components/GenerateFile/GenerateFile"

function App() {
  return (
    <div className="pageLayout">
      <ConfigOptions />
      <BumpbarLayout />
      <SequenceBuilder />
      <GenerateFile />
    </div>
  )
}

export default App
