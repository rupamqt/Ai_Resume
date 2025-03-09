const requiredSkills = [
    "JavaScript", "HTML", "CSS", "React", "Node.js", "Python", "SQL", "Git", "AWS", "Java"
  ];
  
  // Build resume from user input
  document.getElementById("resume-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const fullName = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const skills = document.getElementById("skills").value.split(",").map(skill => skill.trim());
    const experience = document.getElementById("experience").value;
    const education = document.getElementById("education").value;
  
    const resumeContent = `
      <h3>${fullName}</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Skills:</strong> ${skills.join(", ")}</p>
      <p><strong>Experience:</strong><br>${experience}</p>
      <p><strong>Education:</strong><br>${education}</p>
    `;
  
    document.getElementById("resume-output").innerHTML = resumeContent;
    document.getElementById("generated-resume").style.display = "block";
  });
  
  // Screen resume for missing skills
  document.getElementById("screen-resume").addEventListener("click", function () {
    const resumeSkills = document.getElementById("skills").value.split(",").map(skill => skill.trim());
    let missingSkills = [];
  
    requiredSkills.forEach(skill => {
      if (!resumeSkills.includes(skill)) {
        missingSkills.push(skill);
      }
    });
  
    const resultMessage = document.getElementById("result-message");
    const missingSkillsList = document.getElementById("missing-skills");
  
    if (missingSkills.length === 0) {
      resultMessage.textContent = "Your resume is ATS-friendly!";
      resultMessage.style.color = "green";
      missingSkillsList.innerHTML = "";
    } else {
      resultMessage.textContent = "Your resume is missing the following key skills:";
      resultMessage.style.color = "red";
      missingSkillsList.innerHTML = "";
      missingSkills.forEach(skill => {
        const listItem = document.createElement("li");
        listItem.textContent = skill;
        missingSkillsList.appendChild(listItem);
      });
    }
  
    document.getElementById("result").style.display = "block";
  });
  