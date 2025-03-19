// DOM Elements
const header = document.querySelector('header');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.navmenu li a');
const scrollBtn = document.querySelector('.scroll-btn');

// Add hamburger menu to the HTML
const createHamburger = () => {
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    
    for (let i = 0; i < 3; i++) {
        const bar = document.createElement('div');
        hamburger.appendChild(bar);
    }
    
    header.appendChild(hamburger);
    return hamburger;
};

// Add contact link to the navigation menu
const addContactLink = () => {
    const navMenu = document.querySelector('.navmenu');
    const contactLi = document.createElement('li');
    const contactLink = document.createElement('a');
    contactLink.href = "#";
    contactLink.id = "contact-link";
    contactLink.textContent = "Contact";
    contactLi.appendChild(contactLink);
    navMenu.appendChild(contactLi);
    
    // Add event listener to the new contact link
    contactLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
        
        // Scroll to contact section
        const targetSection = document.getElementById('contact-section');
        if (targetSection) {
            smoothScrollTo(targetSection);
        }
    });
    
    return contactLink;
};

const hamburger = createHamburger();
const contactLink = addContactLink();
const navMenu = document.querySelector('.navmenu');

// Remove the contact button from the home section
const removeContactBtn = () => {
    const contactBtn = document.getElementById('contact-btn');
    if (contactBtn) {
        contactBtn.parentNode.removeChild(contactBtn);
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the page
    removeContactBtn();
    updateActiveSection();
    showScrollButtonIfNeeded();
    
    // Add animations with a slight delay
    setTimeout(() => {
        sections.forEach(section => {
            section.classList.add('active');
        });
    }, 200);
});

window.addEventListener('scroll', () => {
    updateHeaderOnScroll();
    updateActiveSection();
    showScrollButtonIfNeeded();
});

// Navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
        
        // Scroll to the appropriate section
        const targetId = link.id.replace('-link', '-section');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            smoothScrollTo(targetSection);
        }
    });
});

// Scroll button
scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const nextSection = getNextVisibleSection();
    if (nextSection) {
        smoothScrollTo(nextSection);
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', toggleMobileMenu);

// Functions

// Update header style on scroll
function updateHeaderOnScroll() {
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}

// Update active section and navigation link
function updateActiveSection() {
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Update active nav link
            const allLinks = document.querySelectorAll('.navmenu li a');
            allLinks.forEach(link => {
                link.classList.remove('active');
                if (link.id === sectionId.replace('-section', '-link')) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Show/hide scroll button based on scroll position
function showScrollButtonIfNeeded() {
    if (window.scrollY > 300) {
        scrollBtn.classList.add('active');
    } else {
        scrollBtn.classList.remove('active');
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent scrolling when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

// Smooth scroll to target element
function smoothScrollTo(target) {
    const targetPosition = target.offsetTop;
    
    window.scrollTo({
        top: targetPosition - 80, // Offset for header
        behavior: 'smooth'
    });
}

// Get the next visible section for scroll button
function getNextVisibleSection() {
    const scrollPosition = window.scrollY;
    
    for (let i = 0; i < sections.length; i++) {
        const sectionTop = sections[i].offsetTop - 100;
        
        if (scrollPosition < sectionTop) {
            return sections[i];
        }
    }
    
    // If at the bottom, scroll to the top
    return sections[0];
}

// Add cursor parallax effect to home image
const homeImg = document.querySelector('.home-img img');
if (homeImg) {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        homeImg.style.transform = `perspective(1000px) rotateY(${mouseX * 10}deg) rotateX(${-mouseY * 10}deg)`;
    });
    
    // Reset transform when mouse leaves
    document.addEventListener('mouseleave', () => {
        homeImg.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    });
}

// Add typing effect to home heading - FIXED to display correctly
const homeHeading = document.querySelector('.home-text h2');
if (homeHeading) {
    const originalContent = homeHeading.innerHTML;
    const textContent = originalContent.replace(/<i.*<\/i>/, '').trim();
    const iconHTML = originalContent.match(/<i.*<\/i>/)[0];
    
    // Clear the heading and add the icon back
    homeHeading.innerHTML = iconHTML;
    
    // Create a span for the text
    const textSpan = document.createElement('span');
    homeHeading.prepend(textSpan);
    
    // Type the text correctly
    let i = 0;
    const typeWriter = () => {
        if (i < textContent.length) {
            textSpan.textContent += textContent.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    setTimeout(typeWriter, 500);
}

// Add hover effect to hobbies list
const hobbiesItems = document.querySelectorAll('.hobbies-content ul li');
hobbiesItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(10px)';
        item.style.color = 'var(--primary-color)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
        item.style.color = 'var(--text-color)';
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const todoLink = document.getElementById("todo-link"); // Change this ID if needed

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return; // Prevent adding empty tasks

        // Create new list item
        const li = document.createElement("li");
        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;

        // Create edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.classList.add("edit-task");
        editBtn.addEventListener("click", function () {
            editTask(taskSpan);
        });

        // Create remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "❌";
        removeBtn.classList.add("remove-task");
        removeBtn.addEventListener("click", function () {
            taskList.removeChild(li);
        });

        // Append elements to list item
        li.appendChild(taskSpan);
        li.appendChild(editBtn);
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }

    // Function to edit a task
    function editTask(taskSpan) {
        const newText = prompt("Edit your task:", taskSpan.textContent);
        if (newText !== null && newText.trim() !== "") {
            taskSpan.textContent = newText;
        }
    }

    // Event listener for add button
    addTaskBtn.addEventListener("click", addTask);

    // Allow "Enter" key to add tasks
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Smooth scroll to To-Do List section
    todoLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default anchor behavior
        document.getElementById("todo-section").scrollIntoView({ behavior: "smooth" });
    });
});


// Add icons to contact information
const contactItems = document.querySelectorAll('.contact-content p');
contactItems.forEach(item => {
    const text = item.textContent;
    item.textContent = '';
    
    if (text.includes('Email')) {
        const icon = document.createElement('i');
        icon.className = 'ph-bold ph-envelope';
        item.appendChild(icon);
    } else if (text.includes('Phone')) {
        const icon = document.createElement('i');
        icon.className = 'ph-bold ph-phone';
        item.appendChild(icon);
    } else if (text.includes('Location')) {
        const icon = document.createElement('i');
        icon.className = 'ph-bold ph-map-pin';
        item.appendChild(icon);
    }
    
    item.appendChild(document.createTextNode(text));
});

// Add scroll reveal animation
function scrollReveal() {
    const reveals = document.querySelectorAll('.about-content, .hobbies-content, .contact-content');
    
    reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < window.innerHeight - revealPoint) {
            reveal.style.opacity = '1';
            reveal.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', scrollReveal);