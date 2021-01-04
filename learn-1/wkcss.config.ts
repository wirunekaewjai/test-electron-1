import config from '@wirunekaewjai/css/config';

export default config({
  packages: [
    '@wirunekaewjai/css',
  ],

  sources: [
    {
      directory: 'src',
    },
  ],

  module: {
    inputs: ['.m.js'],
    output: '.ts',
  },

  build: {
    directory: '.',
    entries: {
      'styles': [
        'src/preload/index.ts',
      ],
    },
  },
});