import { Theme } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput/OutlinedInput";
import Select from "@material-ui/core/Select/Select";
import Typography from "@material-ui/core/Typography/Typography";
import { capitalize } from "@material-ui/core/utils/helpers";
import LanguageIcon from "@material-ui/icons/Language";
import { useTheme } from "@material-ui/styles";
import gql from "graphql-tag";
import React, { useState } from "react";
import Mutation from "react-apollo/Mutation";
import Query from "react-apollo/Query";
import { useTranslation } from "react-i18next";
import { LanguagePicker } from "../graphql/types/LanguagePicker";

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

const updateLanguageMutation = gql`
  mutation UpdateLanguage($language: String!) {
    updateLanguage (language: $language) @client
  }
`;

class LanguagePickerQuery extends Query <LanguagePicker> {}
class UpdateLanguageMutation extends Mutation {}

const LanguagePicker = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme<Theme>();
  const [t, i18n] = useTranslation();

  return <LanguagePickerQuery
    query={getLanguageQuery}>
    {(result) => {
      if (result.loading) {
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
            {capitalize(t("language"))}
          </InputLabel>
          <UpdateLanguageMutation
            mutation={updateLanguageMutation}
          >
            {(mutate) => {
              return <Select
                onChange={(event) => {
                  i18n.changeLanguage(event.target.value);
                  mutate({
                    variables: {
                      language: event.target.value,
                    },
                  });
                  setIsExpanded(false);
                }}
                value={result.data!.language}
                input={
                  <OutlinedInput
                    id="outlined-age-simple"
                    labelWidth={75}
                  />
                }
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="uk">Українська</MenuItem>
              </Select>;
            }}
          </UpdateLanguageMutation>

        </FormControl>}
      </React.Fragment>;
    }}
  </LanguagePickerQuery>;

};

export default LanguagePicker;
