import React, { useState } from 'react'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setSignboardColor } from '../../reducers/signBoardSlice';



const ColorModal: React.FC = () => {
   const [selectedColor, setSelectedColor] = useState('#000000')

   const dispatch = useDispatch()

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let color = event.target.value    
    setSelectedColor(color)
    dispatch(setSignboardColor({color}))

  }

  return (
    <div className='absolute top-40 z-50 left-40 w-96 h-64 bg-white shadow-lg flex rounded-lg'>
     <label>
              Choose a color:
              <input
                type="color"
                value={selectedColor}
                onChange={handleColorChange}
              />
            </label>
   </div>
  );
};

export default ColorModal;