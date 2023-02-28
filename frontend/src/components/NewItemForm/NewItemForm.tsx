import React, { useState } from "react";
import "./newitemform.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const NewUserForm = ({ inputs, title }: any) => {
  const [file, setFile] = useState(new Blob([]));
  return (
    <div className="newUserForm">
      <div className="top">
        <h1>{title}</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
          />
        </div>
        <div className="right">
          <form>
            <div className="formInput">
              <label htmlFor="file">
                Image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                placeholder="john_doe"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </div>
            {inputs.map((input: any) => (
              <div className="formInput" key={input.id}>
                <label htmlFor="">{input.label}</label>
                <input type={input.type} placeholder={input.placeholder} />
              </div>
            ))}

            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUserForm;
