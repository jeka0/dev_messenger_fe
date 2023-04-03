import React from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import './passwordInput.css'

function PasswordInput(props) {
    return (
        <TextField 
            className = "mat-Input" 
            type = {props.showPassword ? "text" : "password"}  
            name = "password" 
            label = {props.label || "Password"}
            placeholder = {props.placeholder || "Enter password"} 
            variant = "standard" 
            error={props.error} 
            helperText={props.helperText} 
            required 
            onChange = {props.onChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    className='icon'
                    size='small'
                    onClick={props.onClick}>
                    {props.showPassword ? <VisibilityOff/> : <Visibility/>}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
    );
  }
  
  export default PasswordInput;
