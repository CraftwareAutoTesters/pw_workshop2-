import { test, expect } from '@playwright/test'
import { NavigationPage } from '../pages/navigationPage'
import { FormLayoutsPage } from '../pages/formLayoutsPage'
import { DatePickerPage } from '../pages/datePickerPage'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200')
})

test('navigate on menu', async ({page}) => {
    const navigationTo = new NavigationPage(page)

    await navigationTo.goToFormLayoutsPage()
    await navigationTo.goToSmartTablePage()
    await navigationTo.goToTooltipPage()
    await navigationTo.goToDatePickerPage()
   // await expect(page.locator('nb-card', {hasText: "Inline form"})).toBeVisible()
})

test('parametrized methods', async({page}) => {
    const navigationTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)

    await navigationTo.goToFormLayoutsPage()
    await onFormLayoutsPage.submitUsingtheGridFormWithCredentialsAndSelectOption("test@test.com", "test1234", "Option 2")
    await onFormLayoutsPage.submitUsingtheGridFormWithCredentialsAndSelectOption("test3@test.com", "test1234", "Option 1")
})

test('select date by method', async({page}) => {
    const navigationTo = new NavigationPage(page)
    const onDatePickerPage = new DatePickerPage(page)

    await navigationTo.goToDatePickerPage()
    await onDatePickerPage.selectCommonDatePickerDateFromToday(420)
})