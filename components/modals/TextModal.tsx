import React, { useState } from 'react'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faClose} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addSignboardText, selectSignboard} from '../../reducers/signboardSlice';
import { setSelectedOption } from '../../reducers/toolbarSlice';



const TextModal: React.FC = () => {
  const [text, setText] = useState({string: "", font: "Arial", color: "Black", rendered:false})
  const fonts = ["Arial", "Verdana", "Tahoma", "Trebuchet MS", "Georgia", "Times New Roman", "Garmond", "Courier New", "Brush Script"]
  const colors = [{name:"Black", hex:"#000000"}, {name:"White", hex:"#ffffff"}]
  const dispatch = useDispatch()

  const handleAddText = () => {
    let string = document.getElementById("text-input").value
    let font = document.getElementById("font-select").value
    let color = document.getElementById("color-select").value
    let t = {string: string, font: font, fontSize: 30, color: color, rendered:false}
    setText(t)
    dispatch(addSignboardText({text: t}))
    
  }
 
 const handleClose = () => {
    let selectedOption = null
    dispatch(setSelectedOption({selectedOption}))
  }

  return (
    <div className='absolute top-40 z-50 left-40 w-96 h-64 bg-white shadow-lg flex rounded-lg'>
     <div className="absolute -top-3 -left-3 bg-red-500 rounded-full z-50 hover:scale-110 ease-in-out duration-300" onClick={() => handleClose()} >
     <FontAwesomeIcon className="w-8 h-8 p-1" icon={faClose} color="#fff"/>
     </div>
     <div className='flex flex-col w-8/12 p-5 space-y-2'>
      <div className='flex items-center justify-center'>   
        <label className="text-sm text-gray-900">Text: </label>
        <input id="text-input" type="text" className="flex-1 ml-2 p-2 text-gray-900 text-sm border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div>
        <label className="text-sm text-gray-900">Font:</label>
        <select id="font-select" className="flex-1 ml-2 p-2 text-gray-900 text-sm border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500">
          {fonts.map(font =>{
            if(font === text.font){
              return(<option key={font} selected>{font}</option>)
            }else{
              return(<option key={font}>{font}</option>)
            }
          })}
        </select>
      </div>
      <div>
        <label className="text-sm text-gray-900">Color:</label>
        <select id="color-select" className="flex-1 ml-2 p-2 text-gray-900 text-sm border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500">
          {colors.map(color =>{
            if(color.hex === text.color){
              return(<option key={color.name} selected>{color.name}</option>)
            }else{
              return(<option key={color.name}>{color.name}</option>)
            }
          })}
        </select>
      </div>
      <button onClick={handleAddText}className='ml-2 p-2 px-4 w-fit text-gray-900 text-sm border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500'>Add</button>    


     </div>
            
   </div>
  );
};

export default TextModal;