// How to generate
const testsController = {};

testsController.testFunc = (num) => {
  return num * 2;
};

// How to generate text based on what is being sent to us in a response object?

/*
Could use if statements for simple requests? We know what is going to be in our dropdowns so we could always
just generate the code based on what is being sent back in our response object? 

so like:
*/

//Middlewware to verify that we have the properties we are looking for in our input object. If it fails, return 400 error code.

/*
    {
        header: {input : '/',
                method: 'GET},
        body: [// array of individual assertions]

    }

*/

// //Middleware to
// function generateCompleteTestCode() {
//     const route = res.locals.header.input;
//     const method = res.locals.header.dropdown;
//     if (method === 'POST') return (describe('/${route}', () => {
//         //This stuff will come from information in the middlepart of our front-end. So we can have a middleware that parses this already and feeds into here as an object.
//         // it('responds with 200 status and application/json content type', () => {
//         //     return request(server)
//         //       .get('/${route}')
//         //       .expect('Content-Type', /application\/json/)
//         //       .expect(200);
//           });
//     if (method == 'GET') return ('describe('/${route}', () => {});
// });

module.exports = testsController;
