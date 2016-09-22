var gifvRegex = /^http.*gifv$/i;

function buildGifvVideoEmbed(gifvLink) {
  var defaultVideo = "https://i.imgur.com/kMEYLEY.gifv";

  // validate the given link
  if (!gifvLink.match(gifvRegex)) {
    console.log("Not a valid gifv link, falling back to default video..");
    gifvLink = defaultVideo;
  }

  gifvLink = gifvLink.replace("gifv", "mp4");
  console.log("Using " + gifvLink);

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

  return videoElem;
}

function replaceGifvLinks(comments) {
  console.log("Searching for comments in current page..")
  var comments = document.getElementsByClassName("comment-body");

  if (comments.length === 0) {
    console.log("No comments found..");
    return;
  }

  var comment = comments[0];

  // Search for <a> tags
  var anchors = comment.getElementsByTagName("a");
  if (anchors.length === 0) {
    console.log("No links in comment..");
    return;
  }

  var anchor = anchors[0];

  if (!anchor.href.match(gifvRegex)) {
    console.log("Not a gifv link..");
    return
  }

  // Add an element after the link
  var newVideo = buildGifvVideoEmbed(anchor.href);
  comment.appendChild(newVideo);

  // Start all videos
  newVideo.play();
}

console.log("replacing gifs");
replaceGifvLinks();
