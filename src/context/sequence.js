import { useContext, createContext } from "react";
import keyboardHexMap from "../keyboardhexmap.json"

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
    case "added string": {
      const keypressArray = [];
      for (let char of action.string) {
        if (char == "&") {
            char = "&amp;";
        }
        if (char == "<") {
            char = "&lt;";
        }
        if (char == ">") {
            char = "&gt;";
        }
        keypressArray.push({
          "string": char,
          "usage": keyboardHexMap[char].usage,
          "modifier": keyboardHexMap[char].modifier
        })
      }
      return {
        ...state,
        sequence: [
          ...state.sequence,
          {
            id: state.nextId,
            string: action.string,
            keypresses: keypressArray
          }
        ],
        nextId: state.nextId + 1
      };
    }
    case "added key": {
      const shift_modifiers = ["02", "03", "06", "07", "0A", "0B", "0E", "0F"];
      let modifier = "";
      if (shift_modifiers.includes(action.modifier)) {
        modifier = action.modifier;
      } else {
        const modifierNum = parseInt(action.modifier, 16);
        const stringNum = parseInt(keyboardHexMap[action.value].modifier, 16);
        modifier = `0${(modifierNum + stringNum).toString(16).toUpperCase()}`;
      }
      return {
        ...state,
        sequence: [
          ...state.sequence,
          {
            id: state.nextId,
            string: action.string,
            keypresses: [
              {
                "string": action.value,
                "usage": keyboardHexMap[action.value].usage,
                "modifier": modifier
              }
            ]
          }
        ],
        nextId: state.nextId + 1
      };
    }
    case "added special": {
      return {
        ...state,
        sequence: [
          ...state.sequence,
          {
            id: state.nextId,
            string: action.string,
            keypresses: [
              {
                "string": action.string,
                "usage": action.value,
                "modifier": action.modifier
              }
            ]
          }
        ],
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
        sequence: [],
        nextId: 0
      };
    }
    case "edit": {
      return {
        ...state,
        sequence: action.sequence,
        nextId: action.sequence.length
      }
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