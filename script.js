const panel = document.querySelector("#coach-panel");
const panelTitle = document.querySelector("#coach-title");
const panelBody = document.querySelector("#coach-body");
const closePanel = document.querySelector(".close-panel");
const result = document.querySelector("#result");
const choices = document.querySelectorAll(".choice");
const domainForm = document.querySelector("#domain-form");
const domainInput = document.querySelector("#domain-input");
const domainResult = document.querySelector("#domain-result");
const quizForm = document.querySelector("#quiz-form");
const quizResult = document.querySelector("#quiz-result");
const copyReport = document.querySelector("#copy-report");
const copyStatus = document.querySelector("#copy-status");
const reportTemplate = document.querySelector("#report-template");

const coachNotes = {
  url: {
    title: "Domain mismatch",
    body: "The registered domain is the part immediately before the public suffix. Here, that is rnicrosoft.com, not microsoft.com. Treat it as a different site."
  },
  urgency: {
    title: "Pressure is a cue",
    body: "Urgency is common in phishing because it lowers careful review. Pause, verify through a trusted bookmark or app, and report the message."
  },
  credentials: {
    title: "Never enter real secrets",
    body: "Safe training pages should not ask for passwords, recovery codes, MFA prompts, or payment details. This demo intentionally has no credential fields."
  }
};

const coaching = {
  report: {
    className: "is-correct",
    text: "Best choice. Reporting the message and opening the service from a trusted bookmark avoids interacting with the suspicious domain."
  },
  click: {
    className: "is-risky",
    text: "Risky choice. A familiar-looking page design does not prove the domain is legitimate. Inspect the registered domain first."
  },
  reply: {
    className: "is-risky",
    text: "Risky choice. Replying can confirm your address is active or keep you inside the attacker's conversation. Use your organization's reporting path instead."
  }
};

function openCoachPanel(noteKey) {
  const note = coachNotes[noteKey] || coachNotes.url;
  panelTitle.textContent = note.title;
  panelBody.textContent = note.body;
  panel.classList.add("is-open");
  panel.setAttribute("aria-hidden", "false");
  closePanel.focus();
}

function hideCoachPanel() {
  panel.classList.remove("is-open");
  panel.setAttribute("aria-hidden", "true");
}

document.querySelectorAll("[data-open-panel]").forEach((button) => {
  button.addEventListener("click", () => openCoachPanel(button.dataset.openPanel));
});

closePanel.addEventListener("click", hideCoachPanel);

panel.addEventListener("click", (event) => {
  if (event.target === panel) {
    hideCoachPanel();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && panel.classList.contains("is-open")) {
    hideCoachPanel();
  }
});

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    choices.forEach((item) => item.classList.remove("is-correct", "is-risky"));
    const response = coaching[choice.dataset.choice];
    choice.classList.add(response.className);
    result.textContent = response.text;
  });
});

function getRegisteredDomain(hostname) {
  const parts = hostname.toLowerCase().replace(/^www\./, "").split(".").filter(Boolean);
  if (parts.length <= 2) {
    return parts.join(".");
  }
  return parts.slice(-2).join(".");
}

domainForm.addEventListener("submit", (event) => {
  event.preventDefault();
  domainResult.classList.remove("is-safe", "is-warning");

  try {
    const parsed = new URL(domainInput.value);
    const registeredDomain = getRegisteredDomain(parsed.hostname);
    const isExpected = registeredDomain === "microsoft.com";

    domainResult.classList.add(isExpected ? "is-safe" : "is-warning");
    domainResult.textContent = isExpected
      ? `Registered domain: ${registeredDomain}. This matches the expected domain, but continue checking context and sign-in flow.`
      : `Registered domain: ${registeredDomain}. This does not match microsoft.com, so the safest action is to report it and navigate from a trusted bookmark.`;
  } catch {
    domainResult.classList.add("is-warning");
    domainResult.textContent = "That does not look like a complete URL. Include the protocol, such as https://example.com.";
  }
});

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  quizResult.classList.remove("is-pass", "is-review");

  const answers = ["q1", "q2", "q3"].map((name) => quizForm.querySelector(`input[name="${name}"]:checked`));
  if (answers.some((answer) => !answer)) {
    quizResult.classList.add("is-review");
    quizResult.textContent = "Answer all three questions before scoring.";
    return;
  }

  const score = answers.reduce((total, answer) => total + Number(answer.value), 0);
  const passed = score === 3;
  quizResult.classList.add(passed ? "is-pass" : "is-review");
  quizResult.textContent = passed
    ? "Score: 3 of 3. Good instincts: verify the domain, avoid pressure, and never enter real secrets in simulations."
    : `Score: ${score} of 3. Review the red flags above, especially domain matching and approved reporting paths.`;
});

copyReport.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(reportTemplate.textContent);
    copyStatus.textContent = "Report draft copied.";
  } catch {
    copyStatus.textContent = "Copy was blocked by the browser. Select the template text and copy it manually.";
  }
});
