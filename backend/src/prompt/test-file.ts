export const getGenerateTestSuitePrompt = (scenario: string, url: string, userName: string, password: string) => {
    return `Generate a test suite for ${scenario} in typescript in this url: ${url}, the action in test suite only depend text in mockup. In login page, the userName is ${userName} and the password is ${password} `;
}

