// 🔧 Replace with your real backend URL later
// A static frontend that you can deploy straight to Vercel.

// Ready to integrate with your backend later (just update API_BASE_URL)

// console.log(" script.js loaded");

const API_BASE_URL = "https://quick-file-share-backend.onrender.com"; //connecting to render(this is an API link)

// your existing upload code here...


const uploadForm = document.getElementById("uploadForm");
const fileInput = document.getElementById("fileInput");
const linkContainer = document.getElementById("linkContainer");
const downloadLink = document.getElementById("downloadLink");
const countdownEl = document.getElementById("countdown");

let countdownTimer;

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file first!");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    // 🔧 This is the real fetch call
    const res = await fetch(`${API_BASE_URL}/uploads`, {
      method: "POST",
      body: formData,
    });

    //Mock response if backend not ready
    // const res = { ok: true, json: async () => ({ link: "https://rik.com/123" }) };

    if (!res.ok) {
      throw new Error("Upload failed");
    }

   const data = await res.json();
   showLink(data.link);


  } catch (err) {
    console.error(err);
    alert("Error uploading file.");
  }
});

function showLink(link) {
  downloadLink.href = link;
  downloadLink.textContent = link;
  linkContainer.classList.remove("hidden");

  startCountdown(10 * 60); // 10 minutes
}

function startCountdown(duration) {
  clearInterval(countdownTimer);
  let timeLeft = duration;

  countdownTimer = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    countdownEl.textContent = `Expires in ${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;

    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      downloadLink.removeAttribute("href");
      downloadLink.style.color = "gray";
      countdownEl.textContent = "Link expired";
    }

    timeLeft--;
  }, 1000);
}
