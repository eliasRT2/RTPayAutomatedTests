const {test, expect} = require("@playwright/test")
const helper = require('../helper')
let username ='', password = ''
let randomString = ''
test.describe("Navigation to RTPay and accept the certificate manually", ()=>{
    test.beforeEach(async({ page})=>{
        await page.goto("https://1connect.incommagentsolutions.biz/#/")
    })
    test('Forgot Password - Negative Scenario with cancelling the operation', async({page})=>{
        username = 'j1'
        randomString = await helper.generateRandomText(5)
        await page.getByRole('button', { name: 'Forgot Password?' }).click();
        await page.locator('#txtUserName').click();
        await page.locator('#txtUserName').fill(username);
        await page.getByRole('button', { name: 'Submit' }).click();
        await page.locator('#txtAnswer_7_2').click();
        await page.locator('#txtAnswer_7_2').fill(randomString);
        await page.locator('#txtAnswer_12_1').click();
        await page.locator('#txtAnswer_12_1').fill(randomString);
        await page.getByRole('button', { name: 'Cancel' }).click();
        // await expect.soft(page).toHaveURL('https://1sso.qpay123.biz/?returnUrl=https%3A%2F%2F1connect.incommagentsolutions.biz%2F%23%2F&state=PHNhbWxwOkF1dGhuUmVxdWVzdCBJRD0iXzcxOURDQzZCNzQ4MjczOThDRDMxMkVEMDQ3NUM5NzFBIiBWZXJzaW9uPSIyLjAiIElzc3VlSW5zdGFudD0iMjAyMi0xMS0yNFQxMDoyMDo1OC43MjJaIiBGb3JjZUF1dGhuPSJmYWxzZSIgSXNQYXNzaXZlPSJmYWxzZSIgQXNzZXJ0aW9uQ29uc3VtZXJTZXJ2aWNlVVJMPSJodHRwczovLzFjb25uZWN0LmluY29tbWFnZW50c29sdXRpb25zLmJpei9XZWJBUEkvQ29ubmVjdEdhdGV3YXkvc2lnbkluIiB4bWxuczpzYW1scD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOnByb3RvY29sIj48c2FtbDpJc3N1ZXIgeG1sbnM6c2FtbD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI%2BPC9zYW1sOklzc3Vlcj48c2FtbHA6RXh0ZW5zaW9ucz48U3lzdGVtPjk8L1N5c3RlbT48Q2VydGlmaWNhdGVJc09wdGlvbmFsPkZhbHNlPC9DZXJ0aWZpY2F0ZUlzT3B0aW9uYWw%2BPC9zYW1scDpFeHRlbnNpb25zPjxzYW1scDpSZXF1ZXN0ZWRBdXRobkNvbnRleHQ%2BPHNhbWw6QXV0aG5Db250ZXh0Q2xhc3NSZWYgeG1sbnM6c2FtbD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI%2BdXJuOnFwYXk6YXV0aGVudGljYXRpb246ZXh0dXNlcjpjcmVkZW50aWFsczwvc2FtbDpBdXRobkNvbnRleHRDbGFzc1JlZj48L3NhbWxwOlJlcXVlc3RlZEF1dGhuQ29udGV4dD48L3NhbWxwOkF1dGhuUmVxdWVzdD4%3D')
    })
    test('Login to RTPay with wrong credentials', async({ page })=>{
        username = 'j2'
        password = await helper.generateRandomText(5)
        await expect(page).toHaveURL("https://1sso.qpay123.biz/Home/Authorize")
        const email = await page.locator('internal:attr=[placeholder="Username"i]')
        await expect(email).toBeVisible()
        const pass = await page.locator('#Password')
        await expect(pass).toBeVisible()
        const signInButton = await page.locator('role=button[name="Sign In"]')
        await expect(signInButton).toBeVisible()
        await email.click()
        await email.type(username)
        await pass.click()
        await pass.type(password)
        await signInButton.click()
        await expect(page.locator('#validationSummary')).toBeVisible()
        await expect.soft(page).toHaveURL('https://1sso.qpay123.biz/?ReturnUrl=https%3A%2F%2F1connect.incommagentsolutions.biz%2F%23%2F')
    })
    test("Login to RTPay", async({page})=>{
        username = 'j1'
        password = 'Miami123'
        await expect(page).toHaveURL("https://1sso.qpay123.biz/Home/Authorize")
        const email = await page.locator('internal:attr=[placeholder="Username"i]')
        await expect(email).toBeVisible()
        const pass = await page.locator('#Password');
        await expect(pass).toBeVisible()
        const signInButton = await page.locator('role=button[name="Sign In"]')
        await expect(signInButton).toBeVisible()
        await email.click()
        await email.type(username)
        await pass.click()
        await pass.type(password)
        await signInButton.click()
        await expect(page).toHaveURL('https://1connect.incommagentsolutions.biz/#/')
    })
})