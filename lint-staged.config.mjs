import path from "path"

const buildEslintCommand = (filenames) =>
  `next lint --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`

const config = {
  "src/**/*.{ts,tsx}": [
    () => "yarn type-check",
    "yarn prettier",
    buildEslintCommand,
  ],
}

export default config
