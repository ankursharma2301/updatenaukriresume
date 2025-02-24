import { test, expect } from '@playwright/test'
import path from 'path';

test('Resume update', async ({ page }) => {
    // Step 1: Navigate to the website
    await page.goto('https://www.naukri.com/');

    // Step 2: Login
    await page.locator("#login_Layer").click();
    await page.getByPlaceholder("Enter your active Email ID / Username").fill('ankursharma2301@gmail.com');
    await page.getByPlaceholder("Enter your password").fill("Admin@1234");
    await page.locator(".btn-primary.loginButton").click();

    // Step 3: Click on "View Profile"
    await page.getByText("View Profile").click();

    // Step 4: Wait for the Profile page to load
    await expect(page).toHaveURL("https://www.naukri.com/mnjuser/profile");

    // Step 5: Wait for the file input to appear
    const fileInputSelector = 'input[type="file"]';
    await page.waitForSelector(fileInputSelector, { state: 'visible' });

    // Step 6: Upload the resume file
    const resumeFilePath = path.resolve('uploads/Ankur_Sharma_8_years.pdf');
    const fileInput = await page.$(fileInputSelector); // Select the file input
    if (fileInput) {
        await fileInput.setInputFiles(resumeFilePath);
    } else {
        console.log('File input element not found!');
    }

    // Step 7: Verify the success message
    await expect(page.locator('text=Resume has been successfully uploaded')).toBeVisible();
    console.log("Resume updated successfully!");
});
