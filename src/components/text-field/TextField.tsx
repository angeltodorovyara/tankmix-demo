import React from 'react'
import { TextField } from '@material-ui/core'

interface InputProps {
    autoFocus?: true
    id: string
    type: string
    label: string
    name?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    placeholder: string
    required?: false
    multiline?: true
    value: string | number
}

const InputElement: React.FC<InputProps> = props => {
    return <TextField
        type={props.type}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e)}
        onBlur={(e) => props.onBlur(e)}
        error={props.label ? true : false}
        label={props.label}
        multiline={props.multiline ? props.multiline : false}
        autoFocus={props.autoFocus ? props.autoFocus : false}
        required={!props.required ? true : props.required}
        color="primary"
        margin="dense"
        fullWidth={true}
        size="medium"
        variant="outlined"
    />
}

export default InputElement