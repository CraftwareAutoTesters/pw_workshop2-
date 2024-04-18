import {expect, Locator, Page} from '@playwright/test'
import {NavigationPage} from "../pages/navigationPage"
import { FormLayoutsPage } from '../pages/formLayoutsPage'

export class PageManager {

    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoutPage: FormLayoutsPage

    constructor(page: Page){
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutPage = new FormLayoutsPage(this.page)
    }
}