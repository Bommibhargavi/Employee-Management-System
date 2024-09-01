
const { jsPDF } = window.jspdf;

let employees = [
    {id: 1, firstname: 'Harsha', lastname: 'Vardhan', gender: 'Male', dob: '1985-05-15', age: 39, designation: 'Manager', degree: 'MBA', year: 2007, college: 'ABC University', address: '123 Main St', email: 'harsha.doe@example.com', phone: '1234567890', photo: "./emp2.jpg"},
    {id: 2, firstname: 'Sushma', lastname: 'Smith', gender: 'Female', dob: '1990-07-20', age: 34, designation: 'Developer', degree: 'B.Tech', year: 2011, college: 'XYZ University', address: '456 Elm St', email: 'sushma.smith@example.com', phone: '0987654321', photo: './image5.jpg'},
    {id: 3, firstname: 'Vishnu', lastname: 'Johnson', gender: 'Male', dob: '1987-03-22', age: 37, designation: 'Analyst', degree: 'B.Sc', year: 2008, college: 'PQR University', address: '789 Oak St', email: 'vishnu.johnson@example.com', phone: '1122334455', photo: './emp3.jpg'},
    {id: 4, firstname: 'Kiran', lastname: 'Davis', gender: 'Female', dob: '1995-11-30', age: 28, designation: 'Designer', degree: 'M.Des', year: 2016, college: 'LMN University', address: '321 Pine St', email: 'kiran.davis@example.com', phone: '2233445566', photo: './emp4.jpg'},
    {id: 5, firstname: 'Mahendra', lastname: 'Brown', gender: 'Male', dob: '1989-06-25', age: 35, designation: 'Tester', degree: 'BCA', year: 2010, college: 'STU University', address: '654 Cedar St', email: 'mahendra.brown@example.com', phone: '3344556677', photo: './emp7.jpg'},
    {id: 6, firstname: 'Vasantha', lastname: 'Jones', gender: 'Female', dob: '1998-08-18', age: 25, designation: 'Intern', degree: 'BBA', year: 2020, college: 'VWX University', address: '987 Birch St', email: 'kiran.jones@example.com', phone: '4455667788', photo: './emp6.jpg'},
    {id: 7, firstname: 'Bhargavi', lastname: 'Jones', gender: 'Female', dob: '1998-08-18', age: 25, designation: 'Intern', degree: 'BBA', year: 2020, college: 'VWX University', address: '987 Birch St', email: 'bhargavi.jones@example.com', phone: '4455667788', photo: './image5.jpg'},
    {id: 1, firstname: 'Sai', lastname: 'ganesh', gender: 'Male', dob: '1985-05-15', age: 39, designation: 'Manager', degree: 'MBA', year: 2007, college: 'ABC University', address: '123 Main St', email: 'sai.ganesh@example.com', phone: '1234567890', photo: "./emp2.jpg"},
    {id: 2, firstname: 'Geetha', lastname: 'Swami', gender: 'Female', dob: '1990-07-20', age: 34, designation: 'Developer', degree: 'B.Tech', year: 2011, college: 'XYZ University', address: '456 Elm St', email: 'geetha.swami@example.com', phone: '0987654321', photo: './image5.jpg'},
    {id: 3, firstname: 'Suresh', lastname: 'kumar', gender: 'Male', dob: '1987-03-22', age: 37, designation: 'Analyst', degree: 'B.Sc', year: 2008, college: 'PQR University', address: '789 Oak St', email: 'suresh.kumar@example.com', phone: '1122334455', photo: './emp3.jpg'},
    {id: 4, firstname: 'Hamsa', lastname: 'Vardhan', gender: 'Female', dob: '1995-11-30', age: 28, designation: 'Designer', degree: 'M.Des', year: 2016, college: 'LMN University', address: '321 Pine St', email: 'hamsa.davis@example.com', phone: '2233445566', photo: './emp10.jpeg'},
];

let currentPage = 1;
const itemsPerPage = 6;

document.getElementById('click').addEventListener('click', function() {
    showContainer('formContainer');
    document.getElementById("welcome").style.display="none";
    document.body.style.backgroundImage="unset";
    document.getElementById("image").style.display="block";
});

document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addEmployee();
    document.getElementById("image").style.display="none";
    showContainer('employeeListContainer');
    displayEmployees(currentPage);
});

document.getElementById('Table').addEventListener('click', function(event) {
    showContainer('employeeListContainer');
    displayEmployees(currentPage);
    document.getElementById("image").style.display="none";
});

document.getElementById('searchByName').addEventListener('input', function() {
    const name = this.value.trim().toLowerCase();
    if (name) {
        const employee = employees.find(emp => emp.firstname.toLowerCase() === name || emp.lastname.toLowerCase() === name);
        if (employee) {
            showEmployeeDetails(employee);
        }
    } else {
        showContainer('employeeListContainer');
    }
});

document.getElementById('filterButton').addEventListener('click', function() {
    currentPage = 1;
    displayEmployees(currentPage);
});

document.getElementById('backToList').addEventListener('click', function() {
    showContainer('employeeListContainer');
});

document.getElementById('downloadDetails').addEventListener('click', function() {
    const details = document.getElementById('employeeDetails').innerText;
    const doc = new jsPDF();
    doc.text(details, 10, 10);
    doc.save('employee_details.pdf');
});

document.getElementById('prevPage').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        displayEmployees(currentPage);
    }
});

document.getElementById('nextPage').addEventListener('click', function() {
    const totalPages = Math.ceil(employees.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayEmployees(currentPage);
    }
});

function showContainer(containerId) {
    document.querySelectorAll('.container').forEach(container => {
        container.classList.remove('active');
    });
    document.getElementById(containerId).classList.add('active');
}

function addEmployee() {
    const id = employees.length + 1;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const age = document.getElementById('age').value;
    const designation = document.getElementById('designation').value;
    const degree = document.getElementById('degree').value;
    const year = document.getElementById('year').value;
    const college = document.getElementById('college').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Handle the image upload
    const photoInput = document.getElementById('photo');
    let photo = 'https://via.placeholder.com/50'; // Default placeholder image

    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photo = e.target.result; // The image URL after reading the file

            // Add the employee with the uploaded photo
            employees.push({ id, firstname, lastname, gender, dob, age, designation, degree, year, college, address, email, phone, photo });
            displayEmployees(currentPage); // Refresh the employee list to show the new entry
        };
        reader.readAsDataURL(photoInput.files[0]); // Convert image to base64 URL
    } else {
        // Add the employee without photo if no file is selected
        employees.push({ id, firstname, lastname, gender, dob, age, designation, degree, year, college, address, email, phone, photo });
        displayEmployees(currentPage); // Refresh the employee list to show the new entry
    }
}

function displayEmployees(page) {
    const tableBody = document.getElementById('employeeTableBody');
    tableBody.innerHTML = '';

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const filters = {
        age: document.getElementById('filterByAge').value,
        designation: document.getElementById('filterByDesignation').value.trim().toLowerCase(),
        college: document.getElementById('filterByCollege').value.trim().toLowerCase()
    };

    const filteredEmployees = employees.filter(emp => {
        return (!filters.age || emp.age <= filters.age) &&
               (!filters.designation || emp.designation.toLowerCase().includes(filters.designation)) &&
               (!filters.college || emp.college.toLowerCase().includes(filters.college));
    });

    const paginatedEmployees = filteredEmployees.slice(start, end);

    paginatedEmployees.forEach(employee => {
        const row = document.createElement('tr');
        row.classList.add('employee-card');
        row.addEventListener('click', () => showEmployeeDetails(employee));

        row.innerHTML = `
            <td>${employee.firstname}</td>
            <td>${employee.lastname}</td>
            <td>${employee.gender}</td>
            <td>${employee.dob}</td>
            <td>${employee.age}</td>
            <td>${employee.designation}</td>
            <td>${employee.degree}</td>
            <td>${employee.year}</td>
            <td>${employee.college}</td>
            <td>${employee.address}</td>
            <td>${employee.email}</td>
            <td>${employee.phone}</td>
            <td><img id="details-img" src="${employee.photo}" alt="Employee Photo"></td>
        `;
        tableBody.appendChild(row);
    });
}

function showEmployeeDetails(employee) {
    showContainer('detailsContainer');
    const details = `
        <p><strong>First Name:</strong> ${employee.firstname}</p>
        <p><strong>Last Name:</strong> ${employee.lastname}</p>
        <p><strong>Gender:</strong> ${employee.gender}</p>
        <p><strong>Date of Birth:</strong> ${employee.dob}</p>
        <p><strong>Age:</strong> ${employee.age}</p>
        <p><strong>Designation:</strong> ${employee.designation}</p>
        <p><strong>Degree:</strong> ${employee.degree}</p>
        <p><strong>Year of Graduation:</strong> ${employee.year}</p>
        <p><strong>College:</strong> ${employee.college}</p>
        <p><strong>Address:</strong> ${employee.address}</p>
        <p><strong>Email:</strong> ${employee.email}</p>
        <p><strong>Phone:</strong> ${employee.phone}</p>
        <img id="profile-img" src="${employee.photo}" alt="Employee Photo">
    `;
    document.getElementById('employeeDetails').innerHTML = details;
}