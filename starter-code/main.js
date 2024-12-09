// Select DOM elements
const passwordLengthInput = document.querySelector(".password-length-input");
const characterLengthDisplay = document.querySelector(
  ".character-length-display"
);
const generateButton = document.querySelector(".generate-button");
const generatedPasswordDisplay = document.querySelector(".generated-password");
const strengthIndicatorLevel = document.querySelector(
  ".strength-indicator-level"
);
const bars = document.querySelectorAll(".bar");
const copyIcon = document.querySelector(".copy-icon");
const checkboxes = document.querySelectorAll(".checkbox");

// Strength levels mapping
const strengthLevels = {
  "TOO WEAK!": 1,
  WEAK: 2,
  MEDIUM: 3,
  STRONG: 4,
};

// Character sets
const charTypes = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?/",
};

// Update password length display when slider value changes
passwordLengthInput.addEventListener("input", function () {
  characterLengthDisplay.textContent = this.value;
});

// Generate password when the button is clicked
generateButton.addEventListener("click", () => {
  const length = parseInt(passwordLengthInput.value, 10);
  const selectedTypes = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.id)
    .filter((id) => charTypes[id]);

  if (selectedTypes.length === 0) {
    alert("Please select at least one character type.");
    return;
  }

  const availableChars = selectedTypes.map((type) => charTypes[type]).join("");

  let password = "";
  for (let i = 0; i < length; i++) {
    password += availableChars.charAt(
      Math.floor(Math.random() * availableChars.length)
    );
  }

  generatedPasswordDisplay.textContent = password;

  updateStrengthIndicator(length, selectedTypes.length);
});

// Copy generated password to clipboard
copyIcon.addEventListener("click", () => {
  const password = generatedPasswordDisplay.textContent;
  if (!password) {
    alert("No password to copy!");
    return;
  }

  navigator.clipboard
    .writeText(password)
    .then(() => {
      alert("Password copied to clipboard!");
    })
    .catch(() => {
      alert("Failed to copy password. Please try again.");
    });
});

// Update strength indicator
function updateStrengthIndicator(length, types) {
  let strength = "TOO WEAK!";
  if (length >= 8 && types >= 2) strength = "WEAK";
  if (length >= 12 && types >= 3) strength = "MEDIUM";
  if (length >= 16 && types === 4) strength = "STRONG";

  strengthIndicatorLevel.textContent = strength;

  // Reset bars
  bars.forEach((bar) => (bar.className = "bar"));

  // Update filled bars
  const filledBars = strengthLevels[strength];
  bars.forEach((bar, index) => {
    if (index < filledBars) {
      bar.classList.add(`bar--${strength.toLowerCase().replace("!", "")}`);
    }
  });
}

// Update password length display and green line dynamically
passwordLengthInput.addEventListener("input", function () {
  const value = this.value;
  characterLengthDisplay.textContent = value;

  // Update the --value custom property
  this.style.setProperty("--value", value);
});
