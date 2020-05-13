const pluginState = {
  active: false,
};

module.exports.responseHooks = [
  ({ response }) => {
    if (pluginState.active) {
      const bodyXml = response.getBody().toString();
      const textJson = getContent(bodyXml);
      const buffer = Buffer.from(textJson);
      response.setBody(buffer);
    }
  },
];

module.exports.workspaceActions = [
  {
    label: "XML-JSON",
    action: ({ app }) => {
      pluginState.active = !pluginState.active;

      app.alert(
        "XML-JSON",
        pluginState.active ? "Plugin activated" : "Plugin inactived"
      );
    },
  },
];

function getContent(xml) {
  const parser = new DOMParser();

  const doc = parser.parseFromString(xml, "text/xml");

  const strings = doc.getElementsByTagName("string");

  if (strings.length > 0) {
    let textContent = strings.item(0).firstChild.textContent;

    return textContent;
  }

  return xml;
}
