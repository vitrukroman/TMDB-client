import { Theme } from "@material-ui/core";
import unstable_useMediaQuery from "@material-ui/core/useMediaQuery/unstable_useMediaQuery";
import { useTheme } from "@material-ui/styles";

export const useBreakPoint = () => {
  const theme = useTheme<Theme>();
  const xs = unstable_useMediaQuery(theme.breakpoints.down("xs"));
  const sm = unstable_useMediaQuery(theme.breakpoints.down("sm"));
  const md = unstable_useMediaQuery(theme.breakpoints.down("md"));
  const lg = unstable_useMediaQuery(theme.breakpoints.down("lg"));

  return (xs && "xs") ||
    (sm && "sm") ||
    (md && "md") ||
    (lg && "lg") ||
    "xl";
};
