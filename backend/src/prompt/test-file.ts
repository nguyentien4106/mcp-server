export const getGenerateTestSuitePrompt = (scenario: string, url: string, userName: string, password: string) => {
    return `Generate a TypeScript test suite for the scenario: ${scenario}, using the mockup text only. Access the app at ${url}. On the login page, use ${userName} as the username and ${password} as the password.`;
}

