import { useContext, createContext } from "react";

export const SequenceContext = createContext(null);
export const SequenceDispatchContext = createContext(null);

export function useSequence() {
  return useContext(SequenceContext);
}

export function useSequenceDispatch() {
  return useContext(SequenceDispatchContext);
}

export function sequenceReducer(state, action) {
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
    case "reset": {
      return {
        ...state,
        sequence: []
      };
    }
    case "submitted": {
      // Implement Add to Bumpbar Button logic
      return {
        ...state
      }
    }
    default: {
      throw Error("Unknown action: " + action.type)
    }
  }
}

export const initialState = {
  sequence: [],
  nextId: 0
}