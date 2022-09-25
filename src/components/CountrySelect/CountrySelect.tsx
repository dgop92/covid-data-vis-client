import { Autocomplete, TextField } from "@mui/material";
import { COUNTRIES, Country } from "./countries";

export interface CountrySelectProps {
  onCountryChange(country: Country): void;
  id: string;
}

export default function CountrySelect({ onCountryChange, id }: CountrySelectProps) {
  const onDataChange = (e: React.SyntheticEvent<Element>, v: null | Country) => {
    if (v) {
      onCountryChange(v);
    }
  };

  return (
    <Autocomplete
      id={`country-select-${id}`}
      sx={{
        width: 300,
        ".MuiAutocomplete-popupIndicator": {
          color: "white",
        },
        ".MuiAutocomplete-clearIndicator": {
          color: "white",
        },
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
          borderRadius: "1rem",
        },
      }}
      options={COUNTRIES}
      autoHighlight
      onChange={onDataChange}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
          sx={{
            ".MuiInputLabel-root.Mui-focused": {
              // color: (theme) => theme.palette.primary.light,
              color: (theme) => theme.palette.primary.contrastText,
            },
          }}
        />
      )}
    />
  );
}

/*
".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "red",
        },
*/
