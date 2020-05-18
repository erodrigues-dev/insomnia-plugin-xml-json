module.exports.responseHooks = [
  ({ response }) => {
    const responseBody = response.getBody().toString();
    const textJson = getContent(responseBody);

    if (textJson) {
      const buffer = Buffer.from(textJson);
      response.setBody(buffer);
    }
  },
];

function getContent(responseBody) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(responseBody, "text/xml");
    const strings = doc.getElementsByTagName("string");
    const textContent = strings.item(0).firstChild.textContent;

    return textContent;
  } catch {
    return null;
  }
}
