import { InputAdornment, InputLabel, TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface TextInputProps {
  error?: string;
  label?: string;
  fieldName: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any, Element>) => void;
  value?: string;
  showCheckedIcon: boolean;
  required: boolean;
  className?: string
}

export const TextInput = ({
  error,
  label,
  fieldName,
  handleChange,
  handleBlur,
  showCheckedIcon = false,
  required = false,
  value,
  className,
}: TextInputProps) => {
  return (
    <div className={`mb-5 mt-5 ${className}`}>
      <InputLabel className="mb-2" required={required}>{label}</InputLabel>
      <TextField
        className="w-full"
        name={fieldName}
        error={!!error}
        required={required}
        label={error ? error : null}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        InputProps={{
          endAdornment: showCheckedIcon && (
            <InputAdornment position="end">
              <CheckCircleIcon color="success" />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
    </div>
  );
};
