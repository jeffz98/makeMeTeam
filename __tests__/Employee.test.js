
const Employee = require('../lib/Employee');

// tests the getName() function for Employee
test('test the getName() function', function(){
    const testName = new Employee('John Doe', 21, 'johndoe@gmail.com');
    expect(testName.getName()).toEqual('John Doe')
})