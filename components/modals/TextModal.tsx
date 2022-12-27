import React, { useState } from 'react'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setSignboard, setSignboardHeight, setSignboardText, setSignboardWidth } from '../../reducers/signBoardSlice';



const TextModal: React.FC = () => {
  const [text, setText] = useState({
      string: "Hello World!",
      font: "Helvetica",
      fontSize: 12,
      color: "#000"
    })

   const dispatch = useDispatch()

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let string = event.target.value 
    setText({string: string, font: text.font, fontSize: text.fontSize, color: text.color})
    dispatch(setSignboardText({text}))

  }
  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let fontSize = event.target.valueAsNumber  
    setText({string: text.string, font: text.font, fontSize: fontSize, color:text.color})
    dispatch(setSignboardText({text}))

  }
 
  return (
   <div className='absolute top-40 z-50 left-40 w-96 h-64 bg-white shadow-lg flex rounded-lg'>
            <label>
              Enter text:
              <input type="text" value={text.string} onChange={handleTextChange} />
            </label>
            <br />
            <label>
              Choose font size:
              <input
                type="number"
                value={text.fontSize}
                onChange={handleFontSizeChange}
                min={10}
                max={40}
                step={2}
              />
            </label>
   </div>
  );
};

export default TextModal;