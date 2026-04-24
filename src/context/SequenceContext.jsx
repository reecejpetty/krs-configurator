import { createContext, useContext, useReducer } from "react";

const SequenceContext = createContext(null);
const SequenceDispatchContext = createContext(null);

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

export function useSequence() {
  return useContext(SequenceContext);
}

export function useSequenceDispatch() {
  return useContext(SequenceDispatchContext);
}

function sequenceReducer(state, action) {
  switch (action.type) {
    case "added": {
      return {
        ...state,
        sequence: [...state.sequence, {id: state.nextId, text: action.text}],
        nextId: state.nextId + 1
      };
    }
    case "deleted": {
      return {
        ...state,
        sequence: state.sequence.filter(item => item.id !== action.id)
      };
    }
    case "reordered": {
      const newItems = [...state.sequence];
      const [removed] = newItems.splice(action.initialIndex, 1);
      newItems.splice(action.index, 0, removed);
      return {
        ...state,
        sequence: newItems
      };
    }
    default: {
      throw Error("Unknown action: " + action.type)
    }
  }
}

const initialState = {
  sequence: [],
  nextId: 0
}