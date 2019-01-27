import { Theme } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput/OutlinedInput";
import Select from "@material-ui/core/Select/Select";
import Typography from "@material-ui/core/Typography/Typography";
import LanguageIcon from "@material-ui/icons/Language";
import { useTheme } from "@material-ui/styles";
import gql from "graphql-tag";
import React, { useState } from "react";
import { graphql } from "react-apollo";
import { LanguagePicker } from "../graphql/types/LanguagePicker";
import { UpdateLanguage, UpdateLanguageVariables } from "../graphql/types/UpdateLanguage";

const getLanguageQuery = gql`
  query LanguagePicker {
    language @client
    configuration {
      images {
        base_url
      }
    }
  }
`;

const withLanguage = graphql<{}, LanguagePicker>(getLanguageQuery);

const updateLanguageMutation = gql`
  mutation UpdateLanguage($language: String!) {
    updateLanguage (language: $language) @client
  }
`;

const withUpdateLanguage = graphql<{}, UpdateLanguage, UpdateLanguageVariables>(updateLanguageMutation);

const LanguagePicker = withUpdateLanguage(withLanguage((props) => {
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
        onChange={(event) => {
          props.mutate!({
            variables: {
              language: event.target.value,
            },
          });
          setIsExpanded(false);
        }}
        value={props.data!.language}
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
  </React.Fragment>;
}));

export default withUpdateLanguage(withLanguage(LanguagePicker));
