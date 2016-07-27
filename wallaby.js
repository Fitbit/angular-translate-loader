export default wallaby => {
    return {
        files: [
            'src/**/*.js',
            'test/helpers/**/*.js',
            'test/fixtures/**/*.json'
        ],
        tests: [
            'test/**/*.spec.js'
        ],
        testFramework: 'jasmine',
        env: {
            type: 'node'
        },
        compilers: {
            '**/*.js': wallaby.compilers.babel({
                babelrc: true
            })
        }
    };
};
