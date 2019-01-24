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
import { ChildDataProps, graphql } from "react-apollo";
import { LanguagePicker } from "../../graphql/types/LanguagePicker";
import Typography from "@material-ui/core/Typography/Typography";


const getLanguageQuery = gql`
  query LanguagePicker {
    language @client
  }
`;

type ChildProps = ChildDataProps<{}, LanguagePicker>
const LanguagePicker = graphql<{}, LanguagePicker, {}, ChildProps>(getLanguageQuery)((props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme<Theme>();

  if (props.data!.loading) {
    return <Typography>loading...</Typography>;
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
        value={props.data.language}
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
})


export default LanguagePicker;