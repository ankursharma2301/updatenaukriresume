import { test, expect } from '@playwright/test'
import path from 'path';

test('Resume update', async ({ page }) => {

    await page.goto('https://www.naukri.com/');
    await page.locator("#login_Layer").click();
    await page.getByPlaceholder("Enter your active Email ID / Username").fill('ankursharma2301@gmail.com');
    await page.getByPlaceholder("Enter your password").fill("Admin@1234");
    await page.locator(".btn-primary.loginButton").click();
    await page.getByText("View Profile").click();
    await expect(page).toHaveURL("https://www.naukri.com/mnjuser/profile")
    const resumeFilePath = path.resolve('uploads/Ankur_Sharma_8_years.pdf');
    const fileInput = await page.$('input[type="file"]'); // Select the file input
    await fileInput.setInputFiles(resumeFilePath);
    await expect(page.locator('text=Resume has been successfully uploaded')).toBeVisible();
    console.log("Resume updated successfully!");
})