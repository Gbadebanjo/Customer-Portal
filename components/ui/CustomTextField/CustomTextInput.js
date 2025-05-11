'use client';
import { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import EyeIcon from "@/components/ui/icons/EyeIcon";
import EyeSlashIcon from "@/components/ui/icons/EyeSlashIcon";

export default function CustomTextField({
  label,
  value,
  onChange,
  isPassword = false,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      fullWidth
      variant="filled"
      type={isPassword && !showPassword ? 'password' : 'text'}
      label={label}
      value={value}
      onChange={onChange}
      margin="dense"
      InputProps={{
        endAdornment: isPassword && (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePassword} edge="start">
              {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        input: {
          backgroundColor: '#123751',
          color: '#E1E7ED',
          borderRadius: '10px',
          height: '30px',
          fontSize: '20px',
        //   textAlign: 'center',
        },
        label: {
          color: '#E1E7ED',
          '&.Mui-focused': {
            color: '#ff7d70',
          },
        },
        '& .MuiFilledInput-root': {
          backgroundColor: '#123751',
          color: '#123751',
          borderRadius: '10px',
        },
      }}
    />
  );
}
