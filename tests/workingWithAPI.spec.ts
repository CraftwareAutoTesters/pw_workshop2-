import { test, expect } from '@playwright/test'
import tagsFromFile from './../test-data/tagi.json'

test.beforeEach(async({page}) => {
    await page.route('*/**/api/tags', async route => {
        // const tagi = {
        //     "tags": ["Craftware", "Playwright"]
        // }
        // await route.fulfill({body: JSON.stringify(tagi)})
        await route.fulfill({body: JSON.stringify(tagsFromFile)}) //mockowanie odpowiedzi API
    })

    await page.goto('https://conduit.bondaracademy.com/')
})

test('has title', async ({page}) => {
    await page.route('*/**/api/articles*', async route => {
        const resposne = await route.fetch()
        const responseBody = await resposne.json()
        responseBody.articles[0].title = "Craftware testing playwright!"
        responseBody.articles[1].description = "My description!"

        await route.fulfill({
            body: JSON.stringify(responseBody)
        })
    })

    await page.waitForTimeout(3000)
    await expect(page.locator('.navbar-brand')).toHaveText('conduit')
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