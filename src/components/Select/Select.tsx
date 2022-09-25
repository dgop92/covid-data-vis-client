import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import BaseSelect, { SelectProps as BaseSelectProps } from "@mui/material/Select";

export type MenuItemPair = {
  text: string;
  value: number | string;
};

export interface SelectProps<T> extends BaseSelectProps<T> {
  name: string;
  label: string;
  items: MenuItemPair[];
}

export function Select<T>({
  name,
  label,
  items,
  value: currentValue,
  onChange: handleChange,
  ...props
}: SelectProps<T>): JSX.Element {
  const inputId = `${name}-id`;
  const labelId = `${name}-label-id`;

  return (
    <FormControl>
      <InputLabel
        sx={{
          "&.Mui-focused": {
            color: (theme) => theme.palette.primary.contrastText,
          },
        }}
        id={labelId}
      >
        {label}
      </InputLabel>
      <BaseSelect
        labelId={labelId}
        id={inputId}
        value={currentValue}
        label={label}
        onChange={handleChange}
        {...props}
        sx={{
          width: 300,
          ".MuiSelect-icon": {
            color: "white",
          },
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
            borderRadius: "1rem",
          },
        }}
      >
        {items.map((itemData, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <MenuItem key={index} value={itemData.value}>
            {itemData.text}
          </MenuItem>
        ))}
      </BaseSelect>
    </FormControl>
  );
}
