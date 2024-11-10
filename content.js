function addListeners() {
  document.addEventListener("keydown", handleKeydown, true);
}

function removeListeners() {
  document.removeEventListener("keydown", handleKeydown, true);
}

let cachedAppendText;

function handleKeydown(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    const inputBox = document.querySelector("#prompt-textarea > p:last-child");

    if (inputBox) {
      event.preventDefault();
      inputBox.textContent += " " + cachedAppendText;

      const sendButton = document.querySelector(
        "button[data-testid='send-button']"
      );
      if (sendButton) {
        setTimeout(() => sendButton.click(), 50);
      }
    }
  }
}

// Initial checks
chrome.storage.sync.get(
  ["isEnabled", "appendText"],
  ({ isEnabled, appendText }) => {
    // Listener setup based on `isEnabled` status
    if (isEnabled) {
      addListeners();
    }

    // Initialize value of `appendText`
    cachedAppendText = appendText;
  }
);

// Listen for changes in the extension settings
chrome.storage.onChanged.addListener((changes) => {
  // Check for changes to `isEnabled` and add/remove listeners as needed
  if (changes.isEnabled) {
    if (changes.isEnabled.newValue) {
      addListeners();
    } else {
      removeListeners();
    }
  }

  // Check for changes to `appendText` and recache it
  if (changes.appendText) {
    cachedAppendText = changes.appendText.newValue;
  }
});
