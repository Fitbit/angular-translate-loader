export default wallaby => {
    return {
        files: [
            'package.json',
            'src/**/*.js',
            'test/helpers/**/*.js',
            { pattern: 'test/fixtures/**/*.*', instrument: false }
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
