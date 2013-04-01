(function($) {
  var enabled = "classic-retweet-enabled", script = null;
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
      var replyAction = $(this).find(".action-reply-container").first(); // guard against embedded copy ("permalink-tweet" vs "original-tweet") on individual tweet page
      var classicRetweetAction = replyAction.clone();
      var link = classicRetweetAction.find(".js-action-reply");
      link.removeClass("js-action-reply");
      link.removeAttr("data-modal");
      var label = "Classic RT";
      link.attr("title", label);
      link.find("b").text(label);
      link.find("span").attr("class", "icon sm-rt");
      replyAction.after(classicRetweetAction);

      link.on("click", function(event) {
        var tweet = $(this).closest(".tweet");
        var text = tweet.find(".js-tweet-text").first(); // guard as above
        text.find("a").each(function(index) {
          $(this).text($(this).data("expanded-url"));
        });
        var title = "Classic Retweet", content = "RT @" + tweet.data("screen-name") + ": " + text.text().trim();
        var dialog = $("#global-tweet-dialog");
        // if we have the new tweet dialog, use that
        if (dialog.length) {
          $("#global-new-tweet-button").trigger("click");
          dialog.find("h3").text(title);
          dialog.find("#tweet-box-global").text(content).focus();
          dialog.find("textarea.tweet-box-shadow").val(content);
          // placeCaretAtEnd(dialog.find("#tweet-box-global").get(0));
        }
        // else use the old one
        else if ($(".twttr-dialog-wrapper").length) {
          // if we have direct access to page vars (e.g. chrome and firefox), open the dialog directly
          if (window.twttr && twttr.widget && twttr.widget.TweetDialog) {
            new twttr.widget.TweetDialog({
              basic: false,
              modal: false,
              draggable: true,
              template: {
                title: title
              },
              defaultContent: content,
              origin: "new-tweet-titlebar-button"
            }).open().focus();
          }
        }
        event.preventDefault();
        event.stopPropagation();
        return false;
      });
    }
  });
})($);
