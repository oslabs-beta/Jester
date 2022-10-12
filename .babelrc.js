
const presets = [
  "@babel/preset-react", 
  "@babel/preset-flow", 
  "@babel/preset-typescript"
];

const plugins = [
  "@babel/plugin-proposal-class-properties",
  [
    'babel-plugin-import',
    {
      libraryName: '@mui/material',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'core',
  ],
  [
    'babel-plugin-import',
    {
      libraryName: '@mui/icons-material',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'icons',
  ],
];

module.exports = { presets, plugins };