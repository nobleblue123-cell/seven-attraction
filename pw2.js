const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if(m.type()==='error') errors.push(m.text()); });

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(2500);
  await page.screenshot({ path: 'C:/Users/user/AppData/Local/Temp/ss1_landing.png' });

  await page.click('button:has-text("테스트 시작")');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/Users/user/AppData/Local/Temp/ss2_gender.png' });

  await page.click('button:has-text("남자")');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/Users/user/AppData/Local/Temp/ss3_age.png' });

  await page.click('button:has-text("20대")');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/Users/user/AppData/Local/Temp/ss4_quiz.png' });

  // answer all 20 questions picking first option
  for (let i = 0; i < 20; i++) {
    await page.click('.opt:first-child');
    await page.waitForTimeout(450);
  }
  await page.waitForTimeout(3500);
  await page.screenshot({ path: 'C:/Users/user/AppData/Local/Temp/ss5_result.png' });

  console.log('ERRORS:', JSON.stringify(errors));
  await browser.close();
})();
