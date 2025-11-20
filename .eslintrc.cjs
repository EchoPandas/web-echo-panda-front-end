module.exports = {
    overrides: [
        {
            files: ['vite.config.ts'],
            rules: {
                '@typescript-eslint/no-unsafe-call': 'off',
                '@typescript-eslint/no-unsafe-assignment': 'off',
                '@typescript-eslint/no-unsafe-member-access': 'off'
            }
        }
    ]
};
