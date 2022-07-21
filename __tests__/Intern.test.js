const Intern = require('../lib/Intern');

// tests the getSchool() function for Intern
test('test the getSchool() function', function(){
    const testSchool = new Intern('John Doe', 21, 'johndoe@gmail.com', 'UC Berkeley');
    expect(testSchool.getSchool()).toEqual('UC Berkeley');
})