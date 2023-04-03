import React from 'react';
import { TextField } from '@material-ui/core';
import './emailInput.css'

function EmailInput(props) {
    return (
        <TextField 
        className = "mat-Input"
        type = "email" 
        name = "email" 
        label = {props.label || "Email"}
        placeholder = {props.placeholder || "Enter email"}
        variant = "standard" 
        error={props.error} 
        helperText={props.helperText} 
        required 
        onChange = {props.onChange}
      />
    );
  }
  
  export default EmailInput;