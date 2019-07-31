import { PuppeteerController, LaunchOptions } from 'puppeteer-core-controller';

describe('Puppeteer Controller', (): void => {
  let pptc: PuppeteerController;
  beforeEach((): void => {
    jest.setTimeout(30000);
    pptc = new PuppeteerController();
  });
  afterEach(
    async (): Promise<void> => {
      await pptc.close();
    },
  );

  test('should type text on an existing input', async (): Promise<void> => {
    // Given
    const launchOptions: LaunchOptions = {
      headless: true,
    };
    const url = 'https://reactstrap.github.io/components/form';
    const emailInputSelector = 'input#exampleEmail';

    // When
    await pptc
      .initWith(launchOptions)
      .withMaxSizeWindow()
      .navigateTo(url)
      .click(emailInputSelector)
      .expectThat(emailInputSelector)
      .hasFocus({ timeoutInMilliseconds: 5000 })
      .typeText('foo.bar@baz.com');

    // Then
    const result = await pptc.getValueOf(emailInputSelector);
    expect(result).toBe('foo.bar@baz.com');
    expect(pptc.lastError).toBe(undefined);
  });
});
