module.exports = function() {
    var config = {
        /**
         * File paths
         */
        // all javascript that we want to vet
        alljs: [
            './www/app/**/*.js',
            './*.js',
            // '!' + './src/client/app/core/api.js',
            // '!' + './src/client/template/*'
        ],
    };
    return config;
};
