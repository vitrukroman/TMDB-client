import React, { useState } from "react";
import LanguageIcon from "@material-ui/icons/Language";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { useTheme } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import gql from "graphql-tag";
import Query from "react-apollo/Query";
import Typography from "@material-ui/core/Typography/Typography";
import { LanguagePicker } from "../graphql/types/LanguagePicker";


const getLanguageQuery = gql`
  query LanguagePicker {
    language @client
  }
`;


class GetLanguageQuery extends Query<LanguagePicker> {}

const LanguagePicker = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme<Theme>();
  return <GetLanguageQuery
    query={getLanguageQuery}
  >
    {(result) => {
      if (result.loading) {
        return <Typography>loading...</Typography>
      }

      if (result.error) {
        return <Typography>error...</Typography>
      }

      if (!result.data) {
        return <span>movie not found</span>;
      }

      return <React.Fragment>
        {!isExpanded && <LanguageIcon style={{
          cursor: "pointer",
          position: "absolute",
          top: 8,
          right: 8,
        }} onClick={() => setIsExpanded(true)}/>}
        {isExpanded && <FormControl variant="outlined" style={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: theme.palette.background.default,
          width: 100,
        }}>
          <InputLabel
            htmlFor="outlined-age-simple"
          >
            Language
          </InputLabel>
          <Select

            onChange={() => {
              setIsExpanded(false)
            }}
            value={result.data.language}
            input={
              <OutlinedInput
                id="outlined-age-simple"
                labelWidth={75}
              />
            }
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="uk">Українська</MenuItem>
          </Select>
        </FormControl>}
      </React.Fragment>
    }}
  </GetLanguageQuery>;
}



export default LanguagePicker;