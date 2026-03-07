async function generate() {
  const video = document.getElementById("video").value;
  const key = document.getElementById("key").value;

  if (!video.trim()) {
    alert("Please enter a video URL");
    return;
  }

  try {
    const selectedFields = Array.from(
    document.querySelectorAll('input[name="fields"]:checked')
  ).map(cb => cb.value);

  let url =
    "https://ytvideobibtex-worker.tuur-willio.workers.dev/?id=" +
    encodeURIComponent(video) +
    "&key=" +
    encodeURIComponent(key);
  if (selectedFields.length) {
    url += "&fields=" + encodeURIComponent(selectedFields.join(","));
  }

  const res = await fetch(url);

    const text = await res.text();

    document.getElementById("result").textContent = text;
    document.getElementById("outputSection").style.display = "block";
  } catch (error) {
    alert("Error fetching citation. Please check the URL and try again.");
    console.error(error);
  }
}

function copyToClipboard(button) {
  const resultText = document.getElementById("result").textContent;
  navigator.clipboard.writeText(resultText).then(() => {
    const originalText = button.textContent;
    button.textContent = "Copied!";
    setTimeout(() => {
      button.textContent = originalText;
    }, 2000);
  }).catch(() => {
    alert("Failed to copy to clipboard");
  });
}