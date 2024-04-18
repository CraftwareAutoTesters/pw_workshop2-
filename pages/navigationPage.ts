import {Locator, Page} from '@playwright/test'

export class NavigationPage {

    readonly page: Page
    readonly formLayoutsMenu: Locator

    constructor(page: Page){
        this.page = page
        this.formLayoutsMenu = this.page.getByText('Form Layouts')
    }

    async goToFormLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        await this.formLayoutsMenu.click()
    }

    async goToDatePickerPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
    }

    async goToSmartTablePage(){
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async goToTooltipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expendedState = await groupMenuItem.getAttribute('aria-expanded')

        if (expendedState == 'false'){
            await groupMenuItem.click()
        }
    }
}