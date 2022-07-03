const auth = require('../middleware/auth');


describe('', () =>{
    it("", () => {
        try {
        /*  const jwks = createJWKSMock('https://ressourcesrel.alwaysdata.net/users/testAuth');*/
          let req = JSON.stringify({
            method: 'POST',
            body: JSON.stringify({
                email: 'this@email',
                password: 'this.password'
            }),
            headers: {
              'Content-Type': 'application/json',
              authorization : true
            },
          });
          beforeEach(() => {
            jwks.start();
          });
          auth.user(req, res, next)
          expect(res.token).toEqual()
          afterEach(() => {
            jwks.stop();
          });
        }
        catch (err) {
          throw new Error(err)
        }
      })
});