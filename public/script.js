// ==========================
// LOAD PROFILE DATA
// ==========================
document.addEventListener("DOMContentLoaded", () => {
fetch('/api/profile')
.then(response => response.json())
.then(data => {

    const nameElement = document.getElementById('name');

    if(nameElement){
        nameElement.innerText = data.name;
    }

    const projectsContainer = document.querySelector("#projects .flex-column");

    if(projectsContainer && data.projects){

        projectsContainer.innerHTML = "";
        data.projects.forEach(project => {

            const projectCard = document.createElement("div");
            projectCard.classList.add("glass-card");
            projectCard.style.cursor = "pointer";

            projectCard.onclick = () => {
                window.open(project.github, "_blank");
            };

            const techTags = project.tech
                ? project.tech.map(t => `<span>${t}</span>`).join("")
                : "";

            projectCard.innerHTML = `
                <h3>${project.title}</h3>
                <span class="project-duration">${project.duration || ""}</span>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${techTags}
                </div>
            `;
            projectsContainer.appendChild(projectCard);

        });
    }
})
.catch(error => console.error("Error loading profile:", error));

/* ==========================
   STAR RATING SYSTEM
========================== */

const stars = document.querySelectorAll(".star");
const ratingInput = document.getElementById("ratingValue");

stars.forEach((star, index) => {

    star.addEventListener("click", () => {

        const rating = index + 1;
        ratingInput.value = rating;
        stars.forEach(s => s.classList.remove("active"));
        for(let i = 0; i < rating; i++){
            stars[i].classList.add("active");
        }
    });
});

/* ==========================
   FEEDBACK FORM SUBMISSION
========================== */

document.getElementById("feedbackForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const formData = {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value,
        rating: ratingInput.value
    };

    try{
        const response = await fetch("/submit-feedback",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        });
        const result = await response.json();
        alert(result.message);
        this.reset();
        stars.forEach(s => s.classList.remove("active"));
    }
    catch(error){
        console.error("Error submitting feedback:", error);
        document.getElementById("successMsg").innerText =
        "Error submitting feedback.";
    }
});

// CERTIFICATIONS DATA

const certifications = [
{title:"Software Engineering Job Simulation", issuer:"Accenture Forage", year:"2025", file:"certificates/accenture_cert1.pdf"},
{title:"Application Security Course", issuer:"Great Learning", year:"2024", file:"certificates/appsec_cert2.jpg"},
{title:"Cyber Security Internship Certification", issuer:"AICTE Edunet Foundation", year:"2025", file:"certificates/cyber_cert3.pdf"},
{title:"Introduction to Data Science course", issuer:"Infosys Springboard", year:"2024", file:"certificates/infosys_cert4.pdf"},
{title:"SDLC Fundamentals course", issuer:"Great Learning", year:"2024", file:"certificates/sdlc_cert5.png"},
{title:"Software Testing course", issuer:"Great Learning", year:"2024", file:"certificates/swtesting_cert6.jpg"}
];
const certContainer = document.getElementById("certContainer");

certifications.forEach(cert => {

const card = document.createElement("div");
card.classList.add("cert-card");

card.innerHTML = `<div class="cert-inner">
<div class="cert-front">
<h3>${cert.title}</h3>
</div>

<div class="cert-back">
<p>${cert.issuer}</p>
<p>${cert.year}</p>
<a href="${cert.file}" target="_blank">View Certificate</a>
</div>

</div>
`;
certContainer.appendChild(card);

});
});