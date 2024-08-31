let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () =>{
   toggleBtn.classList.replace('fa-sun', 'fa-moon');
   body.classList.add('dark');
   localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () =>{
   toggleBtn.classList.replace('fa-moon', 'fa-sun');
   body.classList.remove('dark');
   localStorage.setItem('dark-mode', 'disabled');
}

if(darkMode === 'enabled'){
   enableDarkMode();
}

toggleBtn.onclick = (e) =>{
   darkMode = localStorage.getItem('dark-mode');
   if(darkMode === 'disabled'){
      enableDarkMode();
   }else{
      disableDarkMode();
   }
}

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () =>{
   profile.classList.toggle('active');
   search.classList.remove('active');
}

let search = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () =>{
   search.classList.toggle('active');
   profile.classList.remove('active');
}

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () =>{
   sideBar.classList.toggle('active');
   body.classList.toggle('active');
}

document.querySelector('#close-btn').onclick = () =>{
   sideBar.classList.remove('active');
   body.classList.remove('active');
}

window.onscroll = () =>{
   profile.classList.remove('active');
   search.classList.remove('active');

   if(window.innerWidth < 1200){
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }
}

document.addEventListener('DOMContentLoaded', function() {
   const datePicker = document.getElementById('date-picker');
   const subjectsContainer = document.getElementById('subjects-container');

   datePicker.addEventListener('change', function() {
       if (datePicker.value) {
           // Display the subjects container when a date is selected
           subjectsContainer.style.display = 'block';
       } else {
           // Hide the subjects container if no date is selected
           subjectsContainer.style.display = 'none';
       }
   });
});


document.addEventListener('DOMContentLoaded', function() {
   const studentListContainer = document.querySelector('#student-list tbody');
   const saveButton = document.getElementById('save-attendance');
   const selectAllButton = document.getElementById('select-all');

   async function populateStudentList() {
       // Sample student data
       const response = await fetch('http://localhost:8080/student/data/all');
       const students = await response.json();
       console.log(students);
       

       // Populate the student list
       students.forEach(student => {
           const studentRow = document.createElement('tr');
           studentRow.innerHTML = `
               <td>${student.name}</td>
               <td>${student.rollNo}</td>
               <td>
                   <label><input type="checkbox" id="checkbox" name="attendance-${student.id}" value="absent" > Absent</label>
                   
               </td>
           `;
           studentListContainer.appendChild(studentRow);
       });
   }

   function handleSaveAttendance() {
      const checkboxes = document.querySelectorAll('#student-list input[type="checkbox"]');
      const attendanceData = [];

      checkboxes.forEach(checkbox => {
          const studentId = checkbox.name.split('-')[1];
          const isAbsent = checkbox.checked;
          attendanceData.push({
              studentId: studentId,
              status: isAbsent ? 'absent' : 'present'
          });
      });

      // Process attendanceData (e.g., send to server or save locally)
      console.log(attendanceData);
      alert('Attendance saved!');
  }

  function handleSelectAll() {
      const checkboxes = document.querySelectorAll('#student-list input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
          checkbox.checked = true;
      });
  }

  populateStudentList();

  saveButton.addEventListener('click', handleSaveAttendance);
  selectAllButton.addEventListener('click', handleSelectAll);
});


const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

// Adjust canvas size to fit the container
canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;

let drawing = false;
let erasing = false;

// Start drawing
canvas.addEventListener('mousedown', () => {
    drawing = true;
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath(); // Reset the path after every stroke
});

canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;

    // Get the correct mouse position relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = erasing ? 20 : 2; // Larger line width for erasing
    ctx.lineCap = 'round';

    if (erasing) {
        ctx.globalCompositeOperation = 'destination-out'; // Erasing mode
    } else {
        ctx.globalCompositeOperation = 'source-over'; // Drawing mode
        ctx.strokeStyle = '#000'; // Black color for drawing
    }

    ctx.lineTo(x, y); // Draw or erase at the correct position
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
});

// Switch to drawing mode
document.getElementById('draw').addEventListener('click', () => {
    erasing = false;
});

// Switch to erasing mode
document.getElementById('erase').addEventListener('click', () => {
    erasing = true;
});

// Clear the canvas
document.getElementById('clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save the drawing as an image
document.getElementById('save').addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'whiteboard.png';
    link.click();
});
