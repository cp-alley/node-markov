"use strict";

const { MarkovMachine } = require("./markov");

describe("Test instantiating MarkovMachine class", function(){
    let machine;
    beforeEach(function (){
        machine = new MarkovMachine("The cat is in the hat. The cat is the cat. The hat is a cat.")
    })

    test("Test getChains method", function (){
        expect(machine.chains).toEqual({
            'The': [ 'cat', 'cat', 'hat' ],
            'cat': [ 'is', 'is' ],
            'is': [ 'in', 'the', 'a' ],
            'in': [ 'the' ],
            'the': [ 'hat.', 'cat.' ],
            'hat.': [ 'The' ],
            'cat.': [ 'The', null ],
            'hat': [ 'is' ],
            'a': [ 'cat.' ]
          })
    })

})