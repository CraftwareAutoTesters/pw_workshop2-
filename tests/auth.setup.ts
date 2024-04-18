import { test as setup } from '@playwright/test'
import user from '../.auth/user.json'
import fs from 'fs'

const authFile = '.auth/user.json'

// setup('authentication', async({page}) => {
//     await page.goto('https://conduit.bondaracademy.com/')
//     await page.getByText('Sign in').click()
//     await page.getByRole('textbox', {name: 'Email'}).fill('lukas1032@test.com')
//     await page.getByRole('textbox', {name: 'Password'}).fill('test1234')
//     await page.getByRole('button').click()
//     await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')

//     await page.context().storageState({path: authFile})
// })


setup('authentication', async({request}) => {
    
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { //normaly is body, but playwright need data
            "user": {email: "lukas1032@test.com", password: "test1234"}
        }
    })
    var responseBody = await response.json()
    const accessToken = responseBody.user.token
    user.origins[0].localStorage[0].value = accessToken
    fs.writeFileSync(authFile, JSON.stringify(user))

    process.env['ACCESS_TOKEN'] = accessToken
})