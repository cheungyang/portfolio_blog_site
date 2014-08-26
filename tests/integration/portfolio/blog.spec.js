'use strict';

describe('Main blog page', function() {
  var article;

  beforeEach(function() {
    browser.get('/blog/1');

    article = $('.blog-article');
  });

  it('should contain title, summary, content, cover_image', function() {
    expect(article.all(by.css('.blog-title')).first().getText()).toBe('Do you want to build a snowman?');
    expect(article.all(by.css('.blog-summary')).first().getText()).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tincidunt sapien in pulvinar ullamcorper. Vivamus placerat ipsum quis arcu posuere eleifend. Maecenas convallis fermentum dui. Nulla consectetur ac neque nec ullamcorper. Donec ac malesuada elit. Aenean');
    expect(article.all(by.css('.blog-content')).first().all(by.tagName('p')).first().getText()).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tincidunt sapien in pulvinar ullamcorper. Vivamus placerat ipsum quis arcu posuere eleifend. Maecenas convallis fermentum dui. Nulla consectetur ac neque nec ullamcorper. Donec ac malesuada elit. Aenean rutrum pretium placerat. Vivamus a bibendum arcu. Etiam eleifend sed turpis vitae mollis. Sed in dictum lectus. Sed mollis porta nibh, id euismod odio porttitor eget. Fusce vel magna vitae dolor ornare fringilla. Pellentesque vel ex vestibulum, posuere ante sit amet, ornare magna.');
    expect(article.all(by.css('.blog-cover')).first().element(by.tagName('img')).getAttribute('src')).toMatch(/21194.jpg$/);
  });

  it('should contain date and tags', function() {
    expect(article.$('.blog-date').getText()).toBe('2014-8-25');
    expect(article.$('.blog-tags').all(by.tagName('li')).count()).toBe(4);
  });

  it('should contain <a>, cover, title for related contents', function() {
    var all_related = article.$('.blog-related').all(by.tagName('li'));
    var one_related = all_related.get(0);

    // Number of related contents
    expect(all_related.count()).toBe(3);
    // Content of related contents
    expect(one_related.$('.blog-cover').element(by.tagName('img')).getAttribute('src')).toMatch(/Swan4.jpg$/);
    expect(one_related.$('.blog-title').getText()).toBe('Look at this beautiful swan');
    expect(one_related.element(by.tagName('a')).getAttribute('href')).toMatch(/blog\/2$/);
  });
});
