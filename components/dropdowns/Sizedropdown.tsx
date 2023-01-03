import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCommand } from "../../reducers/editorSlice";
import { getSignVisual } from "../../reducers/signSlice";

const Sizedropdown: React.FC = () => {
  const [width, setWidth] = useState(useSelector(getSignVisual).width);
  const [height, setHeight] = useState(useSelector(getSignVisual).height);

  const dispatch = useDispatch();
  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let width = event.target.valueAsNumber;
    setWidth(width);
    if (5 <= width && width <= 400) {
      dispatch(
        addCommand({
          command: "setSize",
          value: { width: width, height: height },
        })
      );
    }
  };
  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let height = event.target.valueAsNumber;
    setHeight(height);
    if (5 <= height && height <= 200) {
      dispatch(
        addCommand({
          command: "setSize",
          value: { width: width, height: height },
        })
      );
    }
  };

  return (
    <div className="dropdown">
      <label
        tabIndex={0}
        className="btn btn-primary m-1 flex space-x-2 btn-outline"
      >
        <p className="text-content-primary">Storlek</p>

        <FontAwesomeIcon icon={faExpand} />
      </label>
      <div
        tabIndex={0}
        className="dropdown-content card card-compact p-2 shadow bg-neutral"
      >
        <div className="card-body">
          <h3 className="card-title text-neutral-content">Ändra storlek</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text"></span>
            </label>
            <label className="input-group">
              <span>Bredd</span>
              <input
                className="input-md input-bordered"
                type="number"
                value={width}
                onChange={handleWidthChange}
                min={5}
                max={400}
                step={5}
              />
              <span>mm</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text"></span>
            </label>
            <label className="input-group">
              <span className="">Höjd </span>
              <input
                className="input-md input-bordered"
                type="number"
                value={height}
                onChange={handleHeightChange}
                min={5}
                max={200}
                step={5}
              />
              <span>mm</span>
            </label>
          </div>
          <div className="form-control mt-4">
            <div className="input-group">
              <span>Djup</span>
              <select className="select select-bordered">
                <option selected>1.0</option>
                <option>0.5</option>
              </select>
              <span>mm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sizedropdown;
