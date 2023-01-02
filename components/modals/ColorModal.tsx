import React, { useEffect, useLayoutEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faT } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getSignMetadata,
  getSignVisual,
  setSignColorCombination,
} from "../../reducers/signSlice";
import { setSelectedOption } from "../../reducers/toolbarSlice";
import client from "../../sanity";
import { addCommand } from "../../reducers/editorSlice";

const ColorModal: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState(
    useSelector(getSignVisual).color
  );
  const product = useSelector(getSignMetadata).product;

  const [colorOptions, setColorOptions] = useState<any[]>([]);

  useEffect(() => {
    //https://www.sanity.io/docs/js-client
    //const query = '*[_type == "bike" && seats >= $minSeats] {name, seats}'
    const query = '*[_type == "colorOption"]';
    const params = {};

    client.fetch(query, params).then((data: any) => {
      setColorOptions(data);
    });
  }, []);

  const dispatch = useDispatch();

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let color = event.target.value;
    setSelectedColor(color);
    dispatch(
      addCommand({
        command: "setColor",
        value: color,
      })
    );
  };

  const handleEngravedColorChange = (option: any) => {
    dispatch(
      addCommand({
        command: "setColor",
        value: option.frontColorValue,
      })
    );
    dispatch(setSignColorCombination({ colorCombination: option.name }));
  };

  const handleClose = () => {
    dispatch(setSelectedOption({ selectedOption: null }));
  };

  return (
    <div className="absolute top-40 z-50 left-40 w-96 h-46 bg-white shadow-lg flex rounded-lg">
      <div
        className="absolute -top-3 -left-3 bg-red-500 rounded-full z-50 hover:scale-110 ease-in-out duration-300"
        onClick={() => handleClose()}
      >
        <FontAwesomeIcon className="w-8 h-8 p-1" icon={faClose} color="#fff" />
      </div>
      {product === "Engraved Sign" ? (
        <div className="flex w-full p-5 space-x-2 overflow-y-scroll">
          {colorOptions.map((option, key) => (
            <div
              key={key}
              className="flex flex-col items-center justify-center"
            >
              <div
                onClick={() => handleEngravedColorChange(option)}
                className="flex items-center justify-center w-12 h-12 rounded-full border-2 hover:cursor-pointer"
                style={{ backgroundColor: option.frontColorValue }}
              >
                <FontAwesomeIcon
                  className="w-8 h-8 p-1"
                  icon={faT}
                  color={option.backColorValue}
                />
              </div>
              <p className="text-xs text-gray-500 font-light">
                {option.name.split("/")[0]}
              </p>
              <p className="text-xs text-gray-500 font-light">
                {option.name.split("/")[1]}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-full p-5">
          <label>
            Color:
            <input
              className="rounded-lg ml-4"
              type="color"
              value={selectedColor}
              onChange={handleColorChange}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default ColorModal;
