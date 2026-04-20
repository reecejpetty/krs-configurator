import { useState } from 'react'
import './App.css'
import ConfigOptions from './components/ConfigOptions'
import BumpbarLayout from './components/BumpbarLayout'
import ButtonActions from './components/ButtonActions'
import SequenceBuilder from './components/SequenceBuilder'

function App() {
  return (
    <>
      <ConfigOptions />
      <BumpbarLayout />
      <ButtonActions />
      <SequenceBuilder />
    </>
  )
}

export default App
