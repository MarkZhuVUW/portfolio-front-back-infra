const { test, expect, afterEach } = require("@playwright/test");
require("dotenv").config();

test("test can login and access landing page.", async ({ page }) => {
  await page.goto(`${process.env.REACT_APP_URL}`);

  // Wait for the element containing the text "Google SSO Sign In" to be visible
  await page.waitForSelector("#google-sso-button");
  await page.click("#google-sso-button");


  await expect(page.getByText("Mark Zhu")).toBeTruthy();

  //header
  await page.click("#demo-positioned-button");
  await expect(page.getByText("profile")).toBeTruthy();
  await expect(page.getByText("logout")).toBeTruthy();
});

test("test can logout from landing page", async ({ page }) => {
  await page.goto(`${process.env.REACT_APP_URL}`);

  // Wait for the element containing the text "Google SSO Sign In" to be visible
  await page.waitForSelector("#google-sso-button");
  await page.click("#google-sso-button");


  await expect(page.getByText("Mark Zhu")).toBeTruthy();
  //header
  await page.click("#demo-positioned-button");
  await expect(page.getByText("profile")).toBeTruthy();
  await expect(page.getByText("logout")).toBeTruthy();
  await page.click("#logout-button");

  //goes back to login page
  await page.waitForSelector("#google-sso-button");
});

test("test can view profile page.", async ({ page }) => {
  await page.goto(`${process.env.REACT_APP_URL}`);

  // Wait for the element containing the text "Google SSO Sign In" to be visible
  await page.waitForSelector("#google-sso-button");
  await page.click("#google-sso-button");

  await expect(page.getByText("Mark Zhu")).toBeTruthy();

  //header
  await page.click("#demo-positioned-button");
  await expect(page.getByText("profile")).toBeTruthy();
  await expect(page.getByText("logout")).toBeTruthy();

  // go to profile

  await page.click("#profile-button");

  await expect(page.getByText("Profile")).toBeTruthy();
});
