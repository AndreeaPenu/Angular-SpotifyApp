import { SpotifyappPage } from './app.po';

describe('spotifyapp App', function() {
  let page: SpotifyappPage;

  beforeEach(() => {
    page = new SpotifyappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
