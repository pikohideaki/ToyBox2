import { ToyBox2Page } from './app.po';

describe('toy-box2 App', () => {
  let page: ToyBox2Page;

  beforeEach(() => {
    page = new ToyBox2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
