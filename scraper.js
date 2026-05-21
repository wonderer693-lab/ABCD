const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const targets = [
  { name: 'Cursor', category: 'AI Code Editors', url: 'https://www.cursor.com/' },
  { name: 'GitHub Copilot', category: 'AI Code Editors', url: 'https://github.com/features/copilot' },
];

async function scrapeSaaS() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  const scrapedData = [];

  for (const target of targets) {
    console.log(`Scraping ${target.name}...`);
    const page = await context.newPage();

    try {
      await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 30000 });

      let startingPrice = '$0 (Free Tier)';
      const priceElement = page.locator('text=/\\$[0-9]+(\\.[0-9]{2})?/').first();
      if (await priceElement.isVisible()) {
        startingPrice = (await priceElement.innerText()).trim();
      }

      const features = await page.locator('ul li, h3').allTextContents();
      const filteredPros = features
        .map(f => f.trim())
        .filter(f => f.length > 10 && f.length < 100)
        .slice(0, 4);

      const saasItem = {
        saas_id: target.name.toLowerCase().replace(/\s+/g, '-'),
        toolName: target.name,
        category: target.category,
        startingPrice: startingPrice.includes('/') ? startingPrice : `${startingPrice}/month`,
        pros: filteredPros.length > 0 ? filteredPros : ["Advanced AI integration", "Developer-friendly interface", "High performance"],
        cons: ["Requires internet connection", "Premium features require subscription"],
        affiliateUrl: `${target.url}?via=saaspole`,
        topAlternatives: []
      };

      scrapedData.push(saasItem);
      console.log(`  Processed ${target.name}`);
    } catch (error) {
      console.error(`  Failed to scrape ${target.name}: ${error.message}`);
    } finally {
      await page.close();
    }
  }

  const outputPath = path.join(__dirname, 'data', 'saas_data.json');
  fs.writeFileSync(outputPath, JSON.stringify(scrapedData, null, 2), 'utf-8');
  console.log(`\nDone! Data saved to: ${outputPath}`);

  await browser.close();
}

scrapeSaaS();
