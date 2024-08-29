document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".carousel_container");
  const items = document.querySelectorAll(".carousel_item");
  const totalItems = items.length;
  let index = 0;

  const updateCarousel = () => {
    container.style.transform = `translateX(-${index * 100}%)`;
  };

  document
    .querySelector(".carousel_button--left")
    .addEventListener("click", () => {
      index = index > 0 ? index - 1 : totalItems - 1;
      updateCarousel();
    });

  document
    .querySelector(".carousel_button--right")
    .addEventListener("click", () => {
      index = index < totalItems - 1 ? index + 1 : 0;
      updateCarousel();
    });
});

// validation form on submit
document.getElementById("contactForm").addEventListener("submit", (e) => {
  event.preventDefault(); // Mencegah halaman reload

  // Ambil nilai input
  const name = document.getElementById("name").value;
  const birthdate = document.getElementById("birthdate").value;
  const gender = document.getElementById("gender").value;
  const message = document.getElementById("message").value;

  // Validasi input
  let err = [];
  if (name === "") {
    err.push("Name is required");
  }
  if (birthdate === "") {
    err.push("Birthdate is required");
  }
  if (gender === "") {
    err.push("Gender is required");
  }
  if (message === "") {
    err.push("Message is required");
  }

  // jika tidak ada error maka hasil form akan di tampilkan pada canvas
  if (err.length === 0) {
    const dateNow = new Date();
    const canvas = document.getElementById("resultCanvas");
    const ctx = canvas.getContext("2d");
    ctx.font = "20px Arial";
    ctx.fillText(`Date: ${dateNow.toDateString()}`, 10, 30); // Date dipindahkan ke paling atas
    ctx.fillText(`Name: ${name}`, 10, 70);
    ctx.fillText(`Birthdate: ${birthdate}`, 10, 110);
    ctx.fillText(`Gender: ${gender}`, 10, 150);
    ctx.fillText(`Message:`, 10, 190);
    const messageLines = wrapText(ctx, message || "-", 20, 230, 360, 20);
    messageLines.forEach((line, index) => {
      ctx.fillText(line, 20, 230 + index * 20);
    });
    // sweetalert success
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Form submitted",
    });
    // ubah id username menjadi name
    document.getElementById("username").innerText = name;
  } else {
    // sweetalert error
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.join("\n"),
    });
  }
});

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  const lines = [];

  words.forEach((word) => {
    const testLine = line + word + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && line !== "") {
      lines.push(line);
      line = word + " ";
    } else {
      line = testLine;
    }
  });

  lines.push(line);
  return lines;
}
