import { useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./TouchKeyboard.css";

interface TouchKeyboardProps {
  inputName: string;
  onChange: (input: string) => void;
  onClose: () => void;
  layout?: "default" | "email" | "number"; // basic layout options
  initialValue?: string;
}

export default function TouchKeyboard({ 
  inputName, 
  onChange, 
  onClose, 
  layout = "default",
  initialValue = ""
}: TouchKeyboardProps) {
  
  const [layoutName, setLayoutName] = useState("default");

  const onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName(layoutName === "default" ? "shift" : "default");
    }
    if (button === "{enter}") {
      onClose(); // Close keyboard on Enter
    }
  };

  // Custom layouts for specific needs
  const customLayout = {
    default: [
      "1 2 3 4 5 6 7 8 9 0",
      "q w e r t y u i o p",
      "a s d f g h j k l",
      "{shift} z x c v b n m {backspace}",
      "{numbers} @ .com {space} {enter}" 
    ],
    shift: [
      "! @ # $ % ^ & * ( )",
      "Q W E R T Y U I O P",
      "A S D F G H J K L",
      "{shift} Z X C V B N M {backspace}",
      "{numbers} @ .com {space} {enter}"
    ],
    number: [
      "1 2 3",
      "4 5 6",
      "7 8 9",
      "{backspace} 0 {enter}"
    ]
  };

  return (
    <div className="keyboard-drawer">
      <div className="keyboard-header">
        <span className="keyboard-title">Typing: {inputName}</span>
        <button className="close-kb-btn" onClick={onClose}>Done</button>
      </div>
      <Keyboard
        onChange={onChange}
        onKeyPress={onKeyPress}
        layoutName={layoutName}
        layout={layout === "number" ? { default: customLayout.number } : customLayout}
        display={{
          "{shift}": "⇧",
          "{enter}": "DONE",
          "{backspace}": "⌫",
          "{numbers}": "123",
          "{space}": "SPACE"
        }}
        theme={"hg-theme-default my-custom-keyboard"}
      />
    </div>
  );
}