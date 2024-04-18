import { test, expect } from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('https://conduit.bondaracademy.com/')
})

test('delete article', async ({page, request}) => {
    // const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    //     data: {"user":{"email":"lukas1032@test.com","password":"test1234"}}
    // })
    // const responseBody = await response.json()
    // const accessToken = responseBody.user.token

    const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            "article":{
                "title":"Lewandowski Test",
                "description":"Lewandowski description test",
                "body":"Lewandowski description body test",
                "tagList":["Lewandowski"]
            }
        },
        // headers: {
        //     "Authorization": `Token ${process.env.ACCESS_TOKEN}`
        // }
    })
    await expect(articleResponse.status()).toEqual(201)

    await page.getByText('Global Feed').click()
    await page.getByText('Lewandowski Test').click()
    await page.getByRole('button', {name: 'Delete Article'}).first().click()
    await expect(page.getByText('Lewandowski Test')).toBeVisible()
})
