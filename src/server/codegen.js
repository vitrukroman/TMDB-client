const {execSync} = require("child_process");
const dotenv = require("dotenv");

dotenv.config();

execSync(`apollo client:codegen --target=typescript ` +
  `--endpoint=${process.env.API_URL} --outputFlat=src/graphql/types`, {
  stdio: "inherit",
});
