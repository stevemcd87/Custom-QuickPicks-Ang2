import { LatestQpPage } from './app.po';

describe('latest-qp App', () => {
  let page: LatestQpPage;

  beforeEach(() => {
    page = new LatestQpPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
