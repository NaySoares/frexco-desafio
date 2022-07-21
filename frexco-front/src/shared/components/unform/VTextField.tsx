import { TextField, TextFieldProps } from '@mui/material';
import { useState, useEffect } from 'react';
import { useField } from '@unform/core';

type TVTextField = TextFieldProps & {
  name: string
}

export const VTextField: React.FC<TVTextField> = ({ name, defaultValue, ...rest }: TVTextField) => {
  const { fieldName, registerField, error, clearError } = useField(name);
  const [value, setValue] = useState(defaultValue || '');
  
  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue)
    });
  }, [value]);

  return (
    <TextField
      value={value}
      onChange={(e) => setValue(e.target.value)}
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}
      onKeyDown={() => error ? clearError() : undefined}
      {...rest}
    >

    </TextField>
  );
};