document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const roadmapModal = document.getElementById('roadmap-modal');
    const addRoadmapBtn = document.getElementById('add-roadmap-btn');
    const closeModalBtn = document.querySelector('.close');
    const roadmapForm = document.getElementById('roadmap-form');

    // Sidebar Navigation
    sidebar.addEventListener('click', (e) => {
        if (e.target.closest('li')) {
            const section = e.target.closest('li').dataset.section;

            // Remove active from all sidebar items
            sidebar.querySelectorAll('li').forEach(item => {
                item.classList.remove('active');
            });
            e.target.closest('li').classList.add('active');

            // Hide all sections
            mainContent.querySelectorAll('.section, #dashboard').forEach(sec => {
                sec.classList.remove('active-section');
            });

            // Show selected section
            document.getElementById(section) &&
            document.getElementById(section).classList.add('active-section');
        }
    });

    // Roadmap Modal Functionality
    addRoadmapBtn.addEventListener('click', () => {
        roadmapModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        roadmapModal.style.display = 'none';
    });

    roadmapForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Implement roadmap creation logic
        alert('Roadmap Created Successfully!');
        roadmapModal.style.display = 'none';
    });

    // Initial data loading functions
    function loadDashboardStats() {
        // Fetch and update dashboard statistics
    }

    function loadRoadmaps() {
        // Fetch and populate roadmaps table
        const roadmapsTable = document.querySelector('#roadmaps-table tbody');
        // Sample data generation
        const roadmaps = [
            {name: 'Software Engineering', field: 'Computer Science', complexity: 'Advanced'},
            {name: 'Data Science', field: 'Computer Science', complexity: 'Intermediate'}
        ];

        roadmapsTable.innerHTML = roadmaps.map(roadmap => `
            <tr>
                <td>${roadmap.name}</td>
                <td>${roadmap.field}</td>
                <td>${roadmap.complexity}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    // Initial load
    loadDashboardStats();
    loadRoadmaps();
});

// Additional features to implement:
// 1. User Management (list, add, delete, edit users)
// 2. Feedback Management
// 3. Analytics Dashboard
// 4. Academic Fields Management
// 5. Advanced Search and Filtering