var gifvRegex = /^http.*gifv$/i;

function buildGifvVideoEmbed(gifvLink) {
  // validate the given link
  if (!gifvLink.match(gifvRegex)) {
    return null;
  }

  gifvLink = gifvLink.replace("gifv", "mp4");

  var sourceElem = document.createElement("source");
  sourceElem.setAttribute("src", gifvLink);
  sourceElem.setAttribute("type", "video/mp4");

  var videoElem = document.createElement("video");
  videoElem.appendChild(sourceElem);

  // Set attrs
  videoElem.setAttribute("muted", "");
  videoElem.setAttribute("loop", "");
  videoElem.setAttribute("poster", "");
  videoElem.className = "res-media-zoomable";

  videoElem.style["max-width"] = "1440px";
  videoElem.style["max-height"] = "320px";
  videoElem.style["display"] = "block";
  videoElem.style["margin-bottom"] = "5px";

  return videoElem;
}

function replaceGifvLinks(comments) {
  var comments = document.getElementsByClassName("comment-body");

  if (comments.length === 0) {
    // no comments on page
    return;
  }

  for (var i = 0; i < comments.length; i++) {
    var comment = comments[i];

    // Search for <a> tags
    var anchors = comment.getElementsByTagName("a");
    if (anchors.length === 0) {
      // no links in comment
      return;
    }

    for (var j = 0; j < anchors.length; j++) {
      var anchor = anchors[j];

      if (!anchor.href.match(gifvRegex)) {
        // not a gifv link
        return
      }

      // Replace the anchor text with the gifv
      var newVideo = buildGifvVideoEmbed(anchor.href);
      if (newVideo === null) {
        // failed to get a valid video
        return
      }
      anchor.textContent = '';
      anchor.appendChild(newVideo);

      // Start all videos
      newVideo.play();
    }
  }
}

replaceGifvLinks();
