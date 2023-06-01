describe("addItemForm", () => {
  it("base example, visually looks correct", async () => {
    // APIs from jest-puppeteer
    await page.goto(
      "http://localhost:9009/iframe.html?args=&id=addform--add-item-form-example&viewMode=story"
    );
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});

describe("App", () => {
  it("base example, visually looks correct", async () => {
    // APIs from jest-puppeteer
    await page.goto(
      "http://localhost:9009/iframe.html?args=&id=app--app-example&viewMode=story"
    );
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});

describe("EditableSpan", () => {
  it("base example, visually looks correct", async () => {
    // APIs from jest-puppeteer
    await page.goto(
      "http://localhost:9009/iframe.html?args=&id=editablespan--editable-span-example&viewMode=story"
    );
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});

describe("Task", () => {
  it("base example, visually looks correct", async () => {
    // APIs from jest-puppeteer
    await page.goto(
      "http://localhost:9009/iframe.html?args=&id=task--task-item-example&viewMode=story"
    );
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});
