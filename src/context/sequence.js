import { useContext, createContext } from "react";
import keyboardHexMap from "../keyboardhexmap.json"

const modifierHexMap = {
    "0F": "CTRL+SHIFT+ALT+WIN+",
    "0E": "SHIFT+ALT+WIN+",
    "0D": "CTRL+ALT+WIN+",
    "0C": "ALT+WIN+",
    "0B": "CTRL+SHIFT+WIN+",
    "0A": "SHIFT+WIN+",
    "09": "CTRL+WIN+",
    "08": "WIN+",
    "07": "CTRL+SHIFT+ALT+",
    "06": "SHIFT+ALT+",
    "05": "CTRL+ALT+",
    "04": "ALT+",
    "03": "CTRL+SHIFT+",
    "02": "SHIFT+",
    "01": "CTRL+",
    "00": ""
  }

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
      const usage = keyboardHexMap[action.key].usage;
      const isShifted = keyboardHexMap[action.key].modifier == "02";
      let modifier = action.modifier;
      
      const string = () => {
        // No modifier string needed if no modifiers
        if (action.modifier == "00") {
          return action.key;
        }

        // Check if usage has a shifted value
        const hasShiftedValue = (() => {
          for (const [_key, value] of Object.entries(keyboardHexMap)) {
            if (value.usage == usage && value.modifier == "02") {
              return true;
            }
          }
        })();

        if (shift_modifiers.includes(action.modifier)) {
          // If SHIFT is the only modifier selected
          if (action.modifier == "02") {
            // Return shifted value
            if (hasShiftedValue) {
              const entry = Object.entries(keyboardHexMap).find(([_key, value]) => value.usage === usage && value.modifier == "02" );
              return entry[0];
            } else {
              // If no shifted value, just make modifier string with original key
              return `[${modifierHexMap[action.modifier]}${action.key}]`
            }
          } else {
            for (const [key, value] of Object.entries(keyboardHexMap)) {
              // If modifier in shift_modifiers && multiple modifiers, use non-shifted key
              if (value.usage == usage && value.modifier == "00") {
                return `[${modifierHexMap[action.modifier]}${key}]`;
              }
            }
          }
        }
        if (isShifted) {
          // Add SHIFT to modifier value and pair with non-shifted value
          const modNum = parseInt(action.modifier, 16);
          modifier = "0" + (modNum + 2).toString(16).toUpperCase();
          for (const [key, value] of Object.entries(keyboardHexMap)) {
            if (value.usage == usage && value.modifier == "00") {
              return `[${modifierHexMap[modifier]}${key}]`;
            }
          }
        }
        return `[${modifierHexMap[action.modifier]}${action.key}]`;
      }

      return {
        ...state,
        sequence: [
          ...state.sequence,
          {
            id: state.nextId,
            string: string(),
            keypresses: [
              {
                "string": string(),
                "usage": usage,
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