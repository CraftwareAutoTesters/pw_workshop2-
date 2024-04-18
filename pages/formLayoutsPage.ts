import {Page} from '@playwright/test'

export class FormLayoutsPage {
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    /**
     * Ta metoda uzupełnia The Grid Form
     * @param email - podaj email uzytkownika
     * @param password - podaj jego hasło
     * @param optionText - podaj która radio ma byc zaznaczone
     */
    async submitUsingtheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string){
        const usingGridForm = this.page.locator('nb-card', {hasText: 'Using the Grid'})
        await usingGridForm.getByRole('textbox', {name: 'Email'}).fill(email)
        await usingGridForm.getByRole('textbox', {name: 'Password'}).fill(password)
        await usingGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingGridForm.getByRole('button').click()
    }

}