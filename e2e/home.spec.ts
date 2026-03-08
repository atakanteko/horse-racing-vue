import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Horse Racing/)
  })

  test('should render header with title and buttons', async ({ page }) => {
    const headerTitle = page.getByTestId('app-header-title')
    await expect(headerTitle).toBeVisible()
    await expect(headerTitle).toHaveText('Horse Racing')

    const generateButton = page.getByTestId('app-header-start-button')
    const startButton = page.getByTestId('app-header-toggle-button')

    await expect(generateButton).toBeVisible()
    await expect(generateButton).toHaveText('GENERATE PROGRAM')
    await expect(startButton).toBeVisible()
    await expect(startButton).toHaveText('START')
  })

  test('should disable START button when no program exists', async ({ page }) => {
    const startButton = page.getByTestId('app-header-toggle-button')

    await expect(startButton).toBeDisabled()
  })

  test('should enable START button after generating program', async ({ page }) => {
    const generateButton = page.getByTestId('app-header-start-button')
    const startButton = page.getByTestId('app-header-toggle-button')

    await generateButton.click()

    await expect(startButton).toBeEnabled()
  })

  test('should disable GENERATE PROGRAM button when race is running', async ({ page }) => {
    const generateButton = page.getByTestId('app-header-start-button')
    const startButton = page.getByTestId('app-header-toggle-button')

    await generateButton.click()

    await startButton.click()

    await expect(generateButton).toBeDisabled()
  })

  test('should show STOP button when race is running', async ({ page }) => {
    const generateButton = page.getByTestId('app-header-start-button')
    const startButton = page.getByTestId('app-header-toggle-button')

    await generateButton.click()

    await startButton.click()

    await expect(startButton).toHaveText('STOP')
  })

  test('should display horse list after generating program', async ({ page }) => {
    const generateButton = page.getByTestId('app-header-start-button')

    await generateButton.click()

    const horseList = page.locator('table').first()
    await expect(horseList).toBeVisible()
  })
})
