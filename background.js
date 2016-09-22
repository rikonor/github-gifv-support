function overrideGithubCSP() {
  var mediaHosts = [
    'http://i.imgur.com',
    'https://i.imgur.com'
  ].join(' ');

  function overrideDetails(details) {
    for (var i = 0; i < details.responseHeaders.length; i++) {
      var isCSPHeader = /content-security-policy/i.test(details.responseHeaders[i].name);
      if (isCSPHeader) {
        var csp = details.responseHeaders[i].value;
        csp = csp.replace('media-src', 'media-src ' + mediaHosts);
        details.responseHeaders[i].value = csp;
      }
    }

    return { responseHeaders: details.responseHeaders };
  }

  var filter = {
    urls: ['https://github.com/*'],
    types: ["main_frame", "sub_frame"]
  };

  var ctxs = ['blocking', 'responseHeaders'];

  chrome.webRequest.onHeadersReceived.addListener(overrideDetails, filter, ctxs);
}

overrideGithubCSP();
