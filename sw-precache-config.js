module.exports = {
  staticFileGlobs: [
    'dist/webmidi-app/**.html',
    'dist/webmidi-app/**.js',
    'dist/webmidi-app/**.css',
    'dist/webmidi-app/assets/layout/**.css',
    'dist/webmidi-app/assets/layout/fonts/**',
    'dist/webmidi-app/assets/layout/images/**',
    'dist/webmidi-app/assets/layout/js/**',
    'dist/webmidi-app/assets/layout/css/**.css',
    'dist/webmidi-app/assets/pages/**',
    'dist/webmidi-app/assets/theme/**.css',
    'dist/webmidi-app/images/**',
    'dist/webmidi-app/images/icons/**'
  ],
  root: 'dist/webmidi-app',
  stripPrefix: 'dist/webmidi-app/',
  navigateFallback: '/index.html',
  runtimeCaching: [
    {
      urlPattern: /\/example\/api\/start/,
      handler: 'networkFirst'
    }
    ,
    {
      urlPattern: /\/example\/api\/get/,
      handler: 'networkFirst'
      , options: {
        cache: {
          maxEntries: 30,
          name: 'provider-list-cache'
        }
      }
    }
  ]
}
/** https://houssein.me/progressive-angular-applications */
