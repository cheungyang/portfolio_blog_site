'use strict';

describe('Main blog page', function() {
  var article;

  beforeEach(function() {
    browser.get('/blog/1');

    article = $('.article');
  });

  it('should contain title, summary, content, cover_image', function() {
    expect(article.all(by.css('.title')).first().getText()).toBe('Do you want to build a snowman?');
    expect(article.all(by.css('.summary')).first().getText()).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tincidunt sapien in pulvinar ullamcorper. Vivamus placerat ipsum quis arcu posuere eleifend. Maecenas convallis fermentum dui. Nulla consectetur ac neque nec ullamcorper. Donec ac malesuada elit. Aenean');
    expect(article.all(by.css('.content')).first().all(by.tagName('p')).first().getText()).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tincidunt sapien in pulvinar ullamcorper. Vivamus placerat ipsum quis arcu posuere eleifend. Maecenas convallis fermentum dui. Nulla consectetur ac neque nec ullamcorper. Donec ac malesuada elit. Aenean rutrum pretium placerat. Vivamus a bibendum arcu. Etiam eleifend sed turpis vitae mollis. Sed in dictum lectus. Sed mollis porta nibh, id euismod odio porttitor eget. Fusce vel magna vitae dolor ornare fringilla. Pellentesque vel ex vestibulum, posuere ante sit amet, ornare magna.');
    expect(article.all(by.css('.cover')).first().getAttribute('src')).toMatch(/21194.jpg$/);
  });

  it('should contain date and tags', function() {
    expect(article.$('.date').getText()).toBe('published: 2014-8-25');
    expect(article.$('.tags').all(by.tagName('li')).count()).toBe(4);
  });

  it('should contain <a>, cover, title for related contents', function() {
    var all_related = article.$('.related').all(by.tagName('li'));
    var one_related = all_related.get(1);

    // Number of related contents
    expect(all_related.count()).toBe(3);
    // Content of related contents
    expect(one_related.$('.cover').getAttribute('src')).toMatch(/twitter.png$/);
    expect(one_related.$('.title').getText()).toBe('the travis CI project');
    expect(one_related.element(by.tagName('a')).getAttribute('href')).toMatch(/portfolio_blog_site$/);
  });
});
