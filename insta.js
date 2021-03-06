var term ="";
var access="1466806393.0df994a.8455411c809a4cfdb20ca94b4d46521f";

$(document).ready( function() {
$.ajax({
  type: "GET",
  dataType: "jsonp",
  cache: false,
  url: "https://api.instagram.com/v1/media/popular?access_token="+access,
  success: function(data) {
    for (var i = 0; i < 9; i++) {
      $(".popular").append("<li><a target='_blank' href='" + data.data[i].link + "'title='Username: "+data.data[i].user.username+"\nText: "+data.data[i].caption.text+"\nLiked: "+data.data[i].likes.count+"'><img src='" + data.data[i].images.low_resolution.url +"'></img></a></li>");
    }
  }
});

$.ajax({
  type: "GET",
  dataType: "jsonp",
  url: "https://api.instagram.com/v1/users/25025320/?access_token="+access,
  success: function(data) {
    $('.name').text(data.data.username);
    $('.tagline').text(data.data.bio);
  }
});

$('#search').bind('keypress', function(e) {
    //console.log(e);
	if(e.keyCode==13){
		$("#searchButton").trigger("click");
	}
  });
    
  $("#searchButton").click(function(event) {
      term = $("#search").val()
      var response = null;
      console.log(term);
      $(".latest").empty();
      var searching = document.querySelector("#searched");
      removeClass(searching,"searching");
      
      if(term != "") {
                $.ajax({
                  type: "GET",
                  dataType: "jsonp",
                  cache: false,
                  url: "https://api.instagram.com/v1/tags/"+term+"/media/recent?access_token="+access,
                  success: function(data) {
                    $("html, body").animate({ scrollTop: 1200 }, 700);
                    for (var i = 0; i < 9; i++) {
                    $(".latest").append("<li><a target='_blank' href='" + data.data[i].link +"' title='"+data.data[i].user.username+"\nText: "+data.data[i].caption.text+"\nLiked: "+data.data[i].likes.count+" '><img src='" + data.data[i].images.low_resolution.url +"'></img></a></li>");
                    }
                  }
                });

}
    else 
    });

function removeClass(element, classToRemove) {
    var currentClassValue = element.className;
 
    if (currentClassValue == classToRemove) {
        element.className = "";
        return;
    }
 
    var classValues = currentClassValue.split(" ");
    var filteredList = [];
 
    for (var i = 0 ; i < classValues.length; i++) {
        if (classToRemove != classValues[i]) {
            filteredList.push(classValues[i]);
        }
    }
 
    element.className = filteredList.join(" ");
}
});
