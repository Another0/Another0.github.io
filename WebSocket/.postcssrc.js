// https://github.com/michael-ciniawsky/postcss-load-config

var salad = require('postcss-salad')
module.exports = {
  "plugins": [
    // to edit target browsers: use "browserlist" field in package.json
    salad({
        browser: ['ie > 9', 'last 2 version'],
        features: {
            'bem': {
                'shortcuts': {
                    'component': 'b',
                    'modifier': 'm',
                    'descendent': 'e'
                },
                'separators': {
                    'descendent': '__',
                    'modifier': '--'
                }
            }
        }
    })
  ]
}