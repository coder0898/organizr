import "./style.css";

const tableData = document.getElementById("tableData");

let fetchData = [];

async function getJSONData() {
  try {
    const res = await fetch("./MOCK_DATA.json");
    if (!res.ok) throw new Error("Failed to load JSON data.");
    fetchData = await res.json();
    // console.log(fetchData);
    displayData();
  } catch (error) {
    console.error("Error fetching data:", error);
    tableData.innerHTML = "<tr><td colspan='8'>Failed to load data.</td></tr>";
  }
}

function displayData() {
  tableData.innerHTML = ""; // Clear existing data

  fetchData.forEach((data, index) => {
    const { task_name, category, priority, due_date, assigned_to, status } =
      data;

    // Create row
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${task_name}</td>
      <td>${category}</td>
      <td>${priority}</td>
      <td>${due_date}</td>
      <td>${assigned_to}</td>
      <td>${status}</td>
      <td>
        <div class="button-group">
          <button class="edit-btn" data-id='${index}'>Edit</button>
          <button class="delete-btn" data-id='${index}'>Delete</button>
        </div>
      </td>
    `;

    tableData.appendChild(row); // Append row to table body
  });
}

window.addEventListener("DOMContentLoaded", getJSONData);
