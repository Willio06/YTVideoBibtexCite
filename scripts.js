async function generate() {
  const video = document.getElementById("video").value;
  const key = document.getElementById("key").value;

  if (!video.trim()) {
    alert("Please enter a video URL");
    return;
  }

  try {
    const res = await fetch(
      "https://ytvideobibtex-worker.tuur-willio.workers.dev/?id=" +
        encodeURIComponent(video) +
        "&key=" +
        encodeURIComponent(key)
    );

    const text = await res.text();

    document.getElementById("result").textContent = text;
    document.getElementById("outputSection").style.display = "block";
  } catch (error) {
    alert("Error fetching citation. Please check the URL and try again.");
    console.error(error);
  }
}

function copyToClipboard() {
  const resultText = document.getElementById("result").textContent;
  navigator.clipboard.writeText(resultText).then(() => {
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => {
      btn.textContent = originalText;
    }, 2000);
  }).catch(() => {
    alert("Failed to copy to clipboard");
  });
}