/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LanguagePicker
// ====================================================

export interface LanguagePicker_configuration_images {
  __typename: "ImageConfiguration";
  base_url: string;
}

export interface LanguagePicker_configuration {
  __typename: "Configuration";
  images: LanguagePicker_configuration_images;
}

export interface LanguagePicker {
  language: string;
  configuration: LanguagePicker_configuration;
}
