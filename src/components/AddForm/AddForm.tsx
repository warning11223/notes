import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TextField from "@mui/material/TextField/TextField";
import IconButton from "@mui/material/IconButton/IconButton";
import s from "./AddForm.module.css";

type PropsType = {
  addTaskCallback: (title: string) => Promise<any>;
  placeholder: string;
  disabled?: boolean;
};

export const AddForm: React.FC<PropsType> = React.memo(({ addTaskCallback, placeholder, disabled }) => {
    let [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
      if (title.trim() !== "") {
        addTaskCallback(title.trim())
            .then(res => {
                setTitle("");
            })
            .catch(err => {
                console.log(err)
                setError('Maximum length \'100\'')
            })
      } else {
        setError("Title is required");
      }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) setError(null);
      if (e.charCode === 13 && title.trim() !== "") {
        addTask();
      }
      /*else {
            setError('Title is required')
        }*/
    };

    const onBlurHandler = () => {
      if (title.trim() === "") {
        setError("Title is required");
      }
    };

    return (
      <div>
        <div className={s.textContainer}>
          <TextField
            size="small"
            color={"warning"}
            label={`${error ? "Error" : `${placeholder}`}`}
            variant="outlined"
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            onBlur={onBlurHandler}
            error={!!error}
            className={`${error ? "error" : ""}`}
            helperText={error}
            disabled={disabled}
            sx={{marginBottom: '30px'}}
          />
          <IconButton color="warning" onClick={addTask} disabled={disabled}>
            <AddBoxIcon fontSize="large" style={{ cursor: "pointer" }} />
          </IconButton>
        </div>
      </div>
    );
  }
);
