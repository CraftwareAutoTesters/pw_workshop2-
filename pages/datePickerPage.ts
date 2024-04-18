import {expect, Page} from '@playwright/test'
import { HelperBase } from './helperBase'

export class DatePickerPage extends HelperBase {

    constructor(page: Page){
        super(page)
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const dateToAssert = await this.selectDateInOpenCalendar(numberOfDaysFromToday)
        await this.waitForNumberOfSeconds(5)
        await expect(calendarInputField).toHaveValue(dateToAssert)
        

    }

    private async selectDateInOpenCalendar(numberOfDaysFromToday:number){
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonth = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonth} ${expectedDate}, ${expectedYear}`

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
        while(!calendarMonthAndYear?.includes(expectedMonthAndYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }

        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click()
        return dateToAssert
    }
}