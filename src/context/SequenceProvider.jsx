import { useReducer } from "react";
import { sequenceReducer, initialState } from "./sequence"; 
import { SequenceContext, SequenceDispatchContext } from "./sequence";

export function SequenceProvider({ children }) {
  const [state, dispatch] = useReducer(sequenceReducer, initialState);

  return (
    <SequenceContext value={state}>
      <SequenceDispatchContext value={dispatch}>
        {children}
      </SequenceDispatchContext>
    </SequenceContext>
  )
}