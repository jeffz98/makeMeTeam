const Engineer = require('../lib/Engineer');

test('test the getId() function', function(){
    const testId = new Engineer('John Doe', 21, 'johndoe@gmail.com');
    expect(testId.getId()).toEqual(21);
})