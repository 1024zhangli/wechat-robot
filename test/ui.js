const robot = require('../src/ui-robot')
robot(() =>{
    console.log('success')
}, () => {
    console.log('error')
})