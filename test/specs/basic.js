// 3rd-party library example
// https://www.npmjs.com/package/got#gotgeturl-options
const { get } = require('got')

describe('suite sync', () => {
    // make sure to remove `async` keyword otherwise function treated as async
    // and you have to await every browser call.
    // The same is applicable to hooks in `wdio.conf.js` as well.
    it('test sync', () => {
        browser.pause(500)

        // wrap 3rd-party library calls with `browser.call`
        const response = browser.call(
            () => get('https://cat-fact.herokuapp.com/facts/', {
                responseType: 'json'
            })
        )
        console.log(response.body[0].type) // outputs: "cat"

        $('body').click() // You can chain functions in sync mode
    })

    // If you have `@wdio/sync` installed and configured, it is still possible to use async functions.
    // However, in such case you have to await every browser/element call like in async mode, and this can
    // be confusing when other tests are sync, so we discourage mixing modes, but it is possible to do so.
    // The best practice in sync mode is to wrap anything async with `browser.call`.
    // it('using async function in sync mode', async () => {
    //     await browser.pause(500)

    //     const response = await get('https://cat-fact.herokuapp.com/facts/')
    //     console.log(response.body[0].type) // outputs: "cat"

    //     const el = await $('body')
    //     await el.click()
    // })
})