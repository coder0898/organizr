import "./style.css";

const tableData = document.getElementById("tableData");
const paginationList = document.getElementById("paginationList");

let fetchData = [];
let currentPage = 1;
let rowsPerPage = 10;
let totalPages = 0;

async function getJSONData() {
  try {
    const res = await fetch("./MOCK_DATA.json");
    if (!res.ok) throw new Error("Failed to load JSON data.");
    fetchData = await res.json();
    // console.log(fetchData);
    displayData();
    renderPagination();
  } catch (error) {
    console.error("Error fetching data:", error);
    tableData.innerHTML = "<tr><td colspan='8'>Failed to load data.</td></tr>";
  }
}

function displayData() {
  tableData.innerHTML = ""; // Clear existing data
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = fetchData.slice(start, end);

  pageData.forEach((data, index) => {
    const { task_name, category, priority, due_date, assigned_to, status } =
      data;
    // Create row
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}.</td>
      <td>${task_name}</td>
      <td>${category}</td>
      <td><span ${
        priority ? checkPriority(priority) : ""
      }>${priority}</span></td>
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

function checkPriority(priority) {
  let condition = priority.toLowerCase();
  if (condition == "high") {
    return `class='high'`;
  } else if (condition == "medium") {
    return `class='medium'`;
  } else {
    return `class='low'`;
  }
}

function renderPagination() {
  // Calculate total pages each time for safety, in case data changes
  totalPages = Math.ceil(fetchData.length / rowsPerPage);
  paginationList.innerHTML = ""; // Clear previous buttons

  // Previous button
  if (currentPage > 1) {
    const prevBtn = document.createElement("button");
    prevBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i> Prev`;
    prevBtn.className = "btn-prev";
    prevBtn.addEventListener("click", () => changePage(currentPage - 1));
    paginationList.appendChild(prevBtn);
  }

  // Page number buttons
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;
    if (i === currentPage) {
      pageButton.disabled = true;
      pageButton.classList.add("active");
    }
    pageButton.addEventListener("click", () => changePage(i));
    paginationList.appendChild(pageButton);
  }

  // Next button
  if (currentPage < totalPages) {
    const nextBtn = document.createElement("button");
    nextBtn.innerHTML = `Next <i class="fa-solid fa-arrow-right"></i>`;
    nextBtn.className = "btn-next";
    nextBtn.addEventListener("click", () => changePage(currentPage + 1));
    paginationList.appendChild(nextBtn);
  }
}

function changePage(page) {
  if (page < 1 || page > totalPages) return; // Prevent invalid page numbers
  currentPage = page;
  displayData(); // Update table data
  renderPagination(); // Update pagination controls
}

window.addEventListener("DOMContentLoaded", getJSONData);
