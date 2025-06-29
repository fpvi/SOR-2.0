document
  .getElementById("registerForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const data = {
      discordName: form.discordName.value,
      costUsed: form.costUsed.value,
      characterScene: form.characterScene.value,
      submissionLink: form.submissionLink.value,
      categories: Array.from(
        form.querySelectorAll('input[name="categories"]:checked')
      ).map((cb) => cb.value),
      musicLink: form.musicLink.value,
      notes: form.notes.value,
    };

    const params = new URLSearchParams();
    params.append("data", JSON.stringify(data));

    const endpoint =
      "https://script.google.com/macros/s/AKfycbyv42d5zQQ95NqhR835bN-p_BWI2lZiunwOoxQLH5DzEa3jFjIz1c8kvc1GYyCucfQvVA/exec";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: params,
      });

      const text = await res.text();
      console.log("Response:", text);
      const result = JSON.parse(text);
      document.getElementById("result").textContent =
        result.status === "success"
          ? "✔️ Gửi thành công!"
          : "❌ Có lỗi xảy ra!";
    } catch (err) {
      console.error("Error:", err);
      document.getElementById("result").textContent =
        "⚠️ Gửi thất bại. Vui lòng thử lại.";
    }
  });
