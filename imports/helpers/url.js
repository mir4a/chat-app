const urlRegexp = /((https?|ftp):\/\/|www\.)[^\s/$.?#].[^\s]*/ig;
const getUrls = (message) => {
  const spaceSplit = message.split(' ');
  const urls = [];

  spaceSplit.forEach((str) => {
    if (urlRegexp.test(str)) {
      urls.push(str);
    }
  });

  return urls;
};

const urlToLinks = (urls) => {
  const links = [];
  urls.forEach((url) => {
    const link = `<a href='${url}' target='_blank'>${url}</a>`;
    links.push(link);
  });
  return links;
};

const generateLinkList = (urls) => {
  const links = urlToLinks(urls);
  let markup = '<ul>';
  links.forEach((link) => {
    markup += `<li>${link}</li>`;
  });
  markup += '</ul>';
  return markup;
};

export {
  getUrls,
  urlToLinks,
  generateLinkList,
};
