const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSdkIwjFYy4nbR2UAYAJtPUxPRh5sykxaN4VS389L_gUjEdkqnMbMIDhv-_7lN8hxVMjqePfkU9XBrN/pub?output=csv";

async function fetchPosts() {
  try {
    const response = await fetch(sheetURL);
    const data = await response.text();
    const rows = data.split("\n").slice(1);
    const postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = "";

    rows.forEach(row => {
      const [date, school, sport, opponent, ourScore, oppScore, summary] = row.split(",");
      if (!school) return;

      const postCard = document.createElement("div");
      postCard.className = "post-card";
      postCard.innerHTML = `
        <h2>${school} - ${sport}</h2>
        <p>${date}</p>
        <p><strong>${ourScore}</strong> - ${oppScore} vs ${opponent}</p>
        <p>${summary}</p>
      `;
      postsContainer.appendChild(postCard);
    });
  } catch (err) {
    console.error("Error fetching sheet:", err);
    document.getElementById("postsContainer").innerText = "⚠️ Error loading data.";
  }
}

fetchPosts();
