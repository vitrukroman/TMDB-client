const {execSync} = require("child_process");
const dotenv = require("dotenv");
const argv = require("minimist")(process.argv.slice(2));

dotenv.config();


const doCodegen = () => execSync(`apollo client:codegen --target=typescript ` +
  `--endpoint=${process.env.API_URL} --outputFlat=src/graphql/types`, {
  stdio: "inherit",
});

if (argv.constantly) {
  (async () => {
    while (true) {
      doCodegen();
      await new Promise((resolve) => setTimeout(resolve, argv.interval));
    }
  })();
} else {
  doCodegen();
}

