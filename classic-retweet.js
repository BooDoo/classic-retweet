(function($) {
  var enabled = "classic-retweet-enabled", script = null;
  
  //Hide location data, "expand" icon, "More..." action menu to clear up some real estate
  var hideThings = $('<style id="hide-details-labels" class="js-user-style">.js-icon-container {visibility:hidden;} .js-details *, .more-tweet-actions {display:none !important;}</style>');
  $('head').append(hideThings);
  
  /*
  // To place caret at end of tweet
  var placeCaretAtEnd = function(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    // el.focus();
  };
  // To reset global tweet dialog, if necessary
  if (dialog.length) {
    dialog.find(".modal-close").on("click", function(event) {
      dialog.find("#tweet-box-global").empty();
      dialog.find(".tweet-counter").removeClass("superwarn").text("140");
    });
  }
  */
  
  $("#page-container").delegate(".tweet", "mouseover", function() {
    if (!$(this).attr(enabled)) {
      $(this).attr(enabled, "true");
      var replyAction = $(this).find(".action-reply-container").first(),  // guard against embedded copy ("permalink-tweet" vs "original-tweet") on individual tweet page
          classicRetweetAction = replyAction.clone(),
          link = classicRetweetAction.find(".js-action-reply"),
          label = "RT";    
      classicRetweetAction.removeClass('action-reply-container');
      classicRetweetAction.addClass('action-classicrt-container');
      link.removeClass("js-action-reply");
      link.addClass('js-action-classicrt');
      link.removeAttr("data-modal");
      link.attr("title", label);
      link.find("b").text(label);
      link.find("span").attr("class", "icon sm-rt");
      replyAction.after(classicRetweetAction);
      link.on("click", function(event) {
        var tweet = $(this).closest(".tweet"),
            text = tweet.find(".js-tweet-text").first().clone(),          // guard as above
            replyLink = $(tweet).find(".action-reply-container .js-action-reply"),
            title = "RT @" + tweet.data("screen-name"), 
            content = "RT @" + tweet.data("screen-name") + ": " + text.text().trim();
        text.find("a").each(function() {
          $(this).text($(this).data("expanded-url"));
        });
        //Populate either in-line reply or modal window reply with old-school RT content
        $(document).one("uiPrepareTweetBox", function (uiEvent) {
          var replyForm = $(uiEvent.target),
              replyTextBox = replyForm.find(".rich-editor");
          $("#global-tweet-dialog").find("h3").text(title);               //only has effect if modal
          replyTextBox.text(content).focus();
          replyForm.find("textarea.tweet-box-shadow").val(content);
        });
        replyLink.click();
        event.preventDefault();
        event.stopPropagation();
        return false;
      });
    }
  });
})($);
