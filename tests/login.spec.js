const {test, expect} = require("@playwright/test")
test.describe("Navigation to RTPay and accept the certificate manually", ()=>{
    test.beforeEach(async({ page})=>{
        await page.goto("https://1connect.incommagentsolutions.biz/#/")
    })
    test("Login to RTPay", async({page})=>{
        await page.pause()
        const username = 'j1'
        const password = 'Miami123'
        await expect(page).toHaveURL("URL")
        //expect username password and sign in button to be displayed await expect(page.)
        const email = await page.getByPlaceholder('Username')
        await email.click()
        await email.type(username)
        await page.$('#Password').click()
        await page.$('#Passsword').type(password)
        await page.$('role=button[name="Sign In"]').click()
        await expect(page).toHaveURL('The new URL')
    })

})