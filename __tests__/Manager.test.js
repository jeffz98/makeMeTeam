const Manager = require('../lib/Manager');

test('test the getRole() function', function(){
    const testRole = new Manager('John Doe', 21, 'johndoe@gmail.com');
    expect(testRole.getRole()).toEqual('Manager');
})