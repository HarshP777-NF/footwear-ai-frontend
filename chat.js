function checkAuth() {
  if (localStorage.getItem("auth") !== "ok") {
    window.location.href = "login.html";
  }
}

async function sendQuery() {
  const input = document.getElementById("userInput").value;
  const responseBox = document.getElementById("responseBox");

  responseBox.innerText = "Loading...";

  const res = await fetch("https://your-n8n-domain.com/webhook/footwear-bot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: input })
  });

  const data = await res.json();
  responseBox.innerText = data.reply || JSON.stringify(data, null, 2);
}
