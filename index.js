// included packages needed
const fs = require('fs');
const inquirer = require('inquirer');


// created an array of questions to prompt user
const questions = [{
    type: 'input',
    message: 'What is your GitHub username?',
    name: 'username',
  },
  {
    type: 'input',
    message: 'What is your email address?',
    name: 'email',
  },
  {
    type: 'input',
    message: "What is your project's name?",
    name: 'projname',
  },
  {
    type: 'input',
    message: 'Please write a short description of your project',
    name: 'description',
  },
  {
    type: 'list',
    message: 'What kind of license should your project have?',
    name: 'license',
    choices: ['MIT', 'Apache', 'None']
  },
  {
    type: 'input',
    message: 'What command should be run to install dependencies?',
    name: 'commandDepend',
  },
  {
    type: 'input',
    message: 'What command should be run to run tests?',
    name: 'commandTest',
  },
  {
    type: 'input',
    message: 'What does the user need to know about using the repo?',
    name: 'repoInfo',
  },
  {
    type: 'input',
    message: 'What does the user need to know about contributing to the repo?',
    name: 'repoContrib',
  },];

function init() {
  // used inquirer to prompt the user to answer 
  inquirer
  .prompt(questions)
  .then((response) => {
    console.log(response)
  // writing to file previously written markdown"
      console.log('Generating README...')
      writeToFile('README.md', 
    `
# ${response.projname}  

## 

![${response.license}](https://img.shields.io/badge/license-${response.license}-blue)

## Description

${response.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Test](#test)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

---

To install necessary dependencies, run the following command:


${response.commandDepend}


## Usage

${response.repoInfo}

## Test

To run tests, use the command: ${response.commandTest}

## License

This project is licensed under the ${response.license} license.

---

## Contributing

How to contribute: ${response.repoContrib}

## Questions

https://github.com/${response.username}/
You can reach me here: ${response.email}

    `)

  }
  );
}

// function that writes README file
function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data)

}

init();

