var _color = require("./data/color.json");

var _string = require("./data/string.json");


var _content = tabris.ui.contentView;


tabris.ui.statusBar.background = _color.statusBar;


var navigation = new tabris.NavigationView({
  
left: 0, top: 0, right: 0, bottom: 0,
  
toolbarColor: _color.toolbar

}).appendTo(_content);


var page = new tabris.Page({

title: _string.title

}).appendTo(navigation);

  
var activityIndicator = new tabris.ActivityIndicator({
    
centerX: 0, centerY: 0
  
}).appendTo(_content);
  

fetch(_string.fetchURL).then(function(response) {
    
return response.json();
  
}).catch(function(err) {
  	
console.log(err);
}).then(function(json) {
	
activityIndicator.dispose();
	
var collectionView = new tabris.CollectionView({
  
left: 0, top: 0, right: 0, bottom: 0,
  
items: json.articles,
  itemHeight: 290,
  
refreshEnabled: true,
  initializeCell: function(cell) {
  
var imageView = new tabris.ImageView({

left:1,top:1,right:1

}).appendTo(cell);
    
var nameTextView = new tabris.TextView({
      
top: [imageView, 2], left:5,bottom:0,
      
font: 'bold 18px'
    
}).appendTo(cell);
    
new tabris.Composite({
      
left: 0, bottom: 0, right: 0, height: 1,
      
background: '#303030'
    
}).appendTo(cell);
    
cell.on('change:item', function(widget, item) {
      
nameTextView.text = item.title;
      
imageView.image = {src: item.urlToImage, height:200};
    
});
  
}
}).on('select', function(target, item) {
	
createDetailsPage(item);
}).appendTo(page);
	
});
	
	
function createDetailsPage(item) {
  
var detailPage = new tabris.Page({
    
title: item.title
  
}).appendTo(navigation);
  
var detailImageView = new tabris.ImageView({

left:1,top:1,right:1,

image: {src: item.urlToImage}

}).appendTo(detailPage);

var detailheader = new tabris.TextView({
      
top: [detailImageView, 5], left:5,
      
text: item.title,
      
font: 'bold 18px'
    
}).appendTo(detailPage);
    
var date = new tabris.TextView({
      
top: [detailheader, 5], left:5,
      
text: "PublishedAt "+":"+item.publishedAt,
      
font: 'bold 13px',
      textColor: _color.date
    
}).appendTo(detailPage);
    
var author = new tabris.TextView({
      
top: [date, 5], left:5,
      
text: "Author "+":"+item.author,
      
font: 'bold 13px',
      
textColor: _color.author
    
}).appendTo(detailPage);
    
var description = new tabris.TextView({
      
top: [author, 5], left:5,
      
text: item.description+"...."
    
}).appendTo(detailPage);
    
var btn = new tabris.Button({
    
left: 5, right: 5, top: 'prev() 12',
    
text: 'Read More'
  }).on('select', function() {
	
new tabris.WebView({
      
left: 0, top: 0, right: 0, bottom: 0,
      
url: item.url
    
}).appendTo(detailPage);

}).appendTo(detailPage);
  
};