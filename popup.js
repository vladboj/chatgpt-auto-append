document.addEventListener("DOMContentLoaded", () => {
  const extensionToggle = document.getElementById("extension-toggle");
  const appendTextInput = document.getElementById("append-text-input");

  // Load saved settings
  chrome.storage.sync.get(["isEnabled", "appendText"], (data) => {
    extensionToggle.checked = data.isEnabled ? true : false;
    appendTextInput.value = data.appendText || "";
  });

  // Update settings
  extensionToggle.addEventListener("change", () => {
    chrome.storage.sync.set({ isEnabled: extensionToggle.checked });
  });
  appendTextInput.addEventListener("change", () => {
    chrome.storage.sync.set({ appendText: appendTextInput.value });
  });
});
