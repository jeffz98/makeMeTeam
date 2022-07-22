// storing the imported classes into variables to be used later
const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');
var team = [];


// uses inquirer to prompt for only manager questions
function managerQuestions() {
  inquirer.prompt(
    [{
      type: 'input',
      message: "What is the team manager's name?",
      name: 'name',
    },
    {
      type: 'input',
      message: "What is the team manager's id",
      name: 'id',
    },
    {
      type: 'input',
      message: "What is the team manager's email?",
      name: 'email',
    },
    {
      type: 'input',
      message: "What is the team manager's office number?",
      name: 'officeNum',
    },
    {
      type: 'list',
      message: 'Which type of team member would you like to add?',
      name: 'teamType',
      choices: ['Intern', 'Engineer', "I don't want to add any more team members"]
    },
    ]
    // returns a promise that creates a new Manager object with answers, adds to team array, then checks if User wants to further add people to team
  ).then((managerAnswers) => {
    const manager = new Manager(managerAnswers.name, managerAnswers.id, managerAnswers.email, managerAnswers.officeNum);
    team.push(manager);

    if (managerAnswers.teamType === 'Intern') {
      internQuestions();
    } else if (managerAnswers.teamType === 'Engineer') {
      engineerQuestions();
    } else {
      buildTeam();
    }


  }
  )
}

// prompts user for intern questions with inquirer
function internQuestions() {
  inquirer.prompt([
    {
      type: 'input',
      message: "What is the intern's name?",
      name: 'name',
    },
    {
      type: 'input',
      message: "What is the intern's id",
      name: 'id',
    },
    {
      type: 'input',
      message: "What is the intern's email?",
      name: 'email',
    },
    {
      type: 'input',
      message: "What is the intern's school?",
      name: 'school',
    },
    {
      type: 'list',
      message: 'Which type of team member would you like to add?',
      name: 'teamType',
      choices: ['Intern', 'Engineer', "I don't want to add any more team members"]
    },
    // creates a promise that generates an Intern object, adds to team array, then checks if User wants to further add people to team
  ]).then((internAnswers) => {
    const intern = new Intern(internAnswers.name, internAnswers.id, internAnswers.email, internAnswers.school);
    team.push(intern);

    if (internAnswers.teamType === 'Intern') {
      internQuestions();
    } else if (internAnswers.teamType === 'Engineer') {
      engineerQuestions();
    } else {
      buildTeam();
    }


  })
}

// function to prompt user to add an engineer to team, checks if user wants to further add people to the team
function engineerQuestions() {
  inquirer.prompt([
    {
      type: 'input',
      message: "What is the engineer's name?",
      name: 'name',
    },
    {
      type: 'input',
      message: "What is the engineer's id",
      name: 'id',
    },
    {
      type: 'input',
      message: "What is the engineer's email?",
      name: 'email',
    },
    {
      type: 'input',
      message: "What is your engineer's Github username?",
      name: 'githubName',
    },
    {
      type: 'list',
      message: 'Which type of team member would you like to add?',
      name: 'teamType',
      choices: ['Intern', 'Engineer', "I don't want to add any more team members"]
    },
    // awaits a promise to create a new Engineer object, adds to team array, checks if user wants to further add members
  ]).then((engineerAnswers) => {
    const engineer = new Engineer(engineerAnswers.name, engineerAnswers.id, engineerAnswers.email, engineerAnswers.githubName);
    team.push(engineer);
    if (engineerAnswers.teamType === 'Intern') {
      internQuestions();
    } else if (engineerAnswers.teamType === 'Engineer') {
      engineerQuestions();
    } else {
      buildTeam();
    }


  })
}


// function that writes to index.html in the dist folder containing team member info in cards, split into three parts
function buildTeam() {


  fs.writeFileSync('./dist/index.html',
    `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <link href = './style.css'>
      <title>Team</title>
  </head>
  <body class="container">
      <div class = "jumbotron text-center text-white bg-danger"><h1>My Team</h1></div>
    <div class="container">
      <div class="row">
 
  `
    
  )
  // loops through team array of extended Employee objects
  for (var i = 0; i < team.length; i++) {
    var employee = team[i];
    console.log(employee)
    // gets the last key and value and stores them in variables 
    var lastPropVal = Object.values(employee).pop();
    var lastPropKey = Object.keys(employee).pop();
    
    // handling what to display depending on what the last key value pair contains
    var str;
    if (lastPropKey === 'officeNumber') {
      str = "Office number: " + lastPropVal;
    } else if (lastPropKey === 'school') {
      str = "School: " + lastPropVal;
    } else if (lastPropKey === 'github') {
      str = "Github: " + `<a href="https://github.com/${lastPropVal}">${lastPropVal}</a>`;
    }
    // appends to file the dynamically generated cards using bootstrap css
    fs.appendFileSync('./dist/index.html',
      `
    
        <div class="col-1"></div>
        <div class="card col-3 shadow-lg" >
            <div class="card-header bg-primary text-white">
                <h3>${employee.name}</h3>
                <h4>${employee.getRole()}</h4>
            </div>
            <section class="card-body bg-light">
                <p class="bg-white border-1 border-dark">ID: ${employee.id}</p>
                <p class="bg-white border-1 border-dark">Email:<a href = "mailto:${employee.email}" >${employee.email}</a></p>
                <p class="bg-white border-1 border-dark">${str}</p>
            </section>
          </div>
        
`
    
    )

// appends to file the closing tags of html
  }
  fs.appendFileSync('./dist/index.html', `
  
        
        <div class="col-1"></div>
    </div>
  </div>
  </body>
  </html>`)
  


}

function init() {
  
  managerQuestions();

}


init();

