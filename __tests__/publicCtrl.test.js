const publicCtrl = require('../controllers/publicCtrl');

describe('publicCtrl', () =>{
    it('vérifier inscription',() =>{
        
    });
    it('vérifier calcul',()=>{
        resultat = publicCtrl.calculcarré(2);
        expect(resultat).toEqual(4);
    })
});

