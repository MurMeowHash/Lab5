const cookieExists = document.cookie
  .split("; ")
  .find((row) => row.startsWith("maxValue="));
if (cookieExists) {
  alert("Після натискання кнопки ОК cookie буде видалено");
  document.cookie = "maxValue=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = "minValue=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}
const sideBar = document.getElementById("sideBar");
const fontWeight = localStorage.getItem("fontWeight");
if (fontWeight) {
  sideBar.style.fontWeight = fontWeight;
}

const x = document.getElementById("x");
const y = document.getElementById("y");
const temp = x.innerHTML;
x.innerHTML = y.innerHTML;
y.innerHTML = temp;

const a = 10,
  b = 20,
  c = 15;
const p = (a + b + c) / 2;
const s = Math.sqrt(p * (p - a) * (p - b) * (p - c));
const area = document.getElementById("area");
area.innerHTML = `<strong>Area of triangle is ${s.toFixed(2)}</strong>`;

let form = document.getElementById("Form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.getElementById("formInput").value;
  const splittedValues = input.split(",");
  const maxValue = Math.max(...splittedValues);
  const minValue = Math.min(...splittedValues);
  alert(`Max value is ${maxValue} and Min value is ${minValue}`);

  document.cookie = "maxValue=" + maxValue;
  document.cookie = "minValue=" + minValue;
});

const checkBox = document.getElementById("check");
let saveToLocalStorage = false;
checkBox.addEventListener("change", () => {
  saveToLocalStorage = !saveToLocalStorage;
});

window.addEventListener("focusin", (e) => {
  if (e.target.tagName === "INPUT") {
    return;
  }
  const sideBar = document.getElementById("sideBar");
  sideBar.style.fontWeight = "bold";
  if (saveToLocalStorage) {
    localStorage.setItem("fontWeight", "bold");
  }
});

window.addEventListener("focusout", () => {
  const sideBar = document.getElementById("sideBar");
  sideBar.style.fontWeight = "normal";
  if (saveToLocalStorage) {
    localStorage.removeItem("fontWeight");
  }
});

const formHtml = `
  <div style="display: flex; flex-direction: column;">
    <h4>Enter new row value</h4>
    <form class="table-form">
      <input />
      <button type="submit">Submit</button>
    </form>
  </div>
  <table class="table">
    <tbody id="table-body"></tbody>
  </table>
`;

const blocks = document.querySelectorAll("#article");
blocks.forEach((block) => {
  let tmp = block.innerHTML;
  let image = document.querySelector(".articleImage");

  function renderForm() {
    block.innerHTML = formHtml;

    const form = document.querySelector(".table-form");
    const renderTable = () => {
      const tableBody = document.getElementById("table-body");
      tableBody.innerHTML = "";
      const values = localStorage.getItem("values");
      if (values) {
        const parsedValues = JSON.parse(values);
        parsedValues.forEach((value) => {
          const tr = document.createElement("tr");
          const td = document.createElement("td");
          td.textContent = value;
          tr.appendChild(td);
          tableBody.appendChild(tr);
        });
      }
    };
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = document.querySelector(".table-form input").value;
      const storedValues = localStorage.getItem("values");
      let values = [];
      if (storedValues) {
        values = JSON.parse(storedValues);
      }
      values.push(input);
      localStorage.setItem("values", JSON.stringify(values));
      renderTable();
      form.reset();
    });

    renderTable();
  }

  image.addEventListener("mouseenter", renderForm);
  block.addEventListener("mouseleave", () => {
    block.innerHTML = tmp;
    image = document.querySelector(".articleImage");
    image.addEventListener("mouseenter", renderForm);
  });
});
