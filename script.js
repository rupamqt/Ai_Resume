document.getElementById("resumeForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const formatName = (name) => 
      name.replace(/\b\w/g, (char) => char.toUpperCase());
  
    const name = formatName(document.getElementById("name").value.trim());
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const skills = document.getElementById("skills").value.split(",").map(skill => skill.trim());
    const experience = document.getElementById("experience").value.split("\n").map(exp => exp.trim());
    const education = document.getElementById("education").value.split("\n").map(edu => edu.trim());
  
    // Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?[0-9\s\-]+$/;
  
    if (!name || !emailPattern.test(email) || !phonePattern.test(phone) || skills.length === 0 || !experience[0] || !education[0]) {
      alert("Please fill in all the fields with valid data.");
      return;
    }
  
    // Generate Resume
    const resumeContent = `
      <h3>${name}</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
  
      <h4>Skills:</h4>
      <ul>
        ${skills.map(skill => `<li>${skill}</li>`).join("")}
      </ul>
  
      <h4>Experience:</h4>
      <ul>
        ${experience.map(exp => `<li>${exp}</li>`).join("")}
      </ul>
  
      <h4>Education:</h4>
      <ul>
        ${education.map(edu => `<li>${edu}</li>`).join("")}
      </ul>
    `;
  
    document.getElementById("resumeOutput").innerHTML = resumeContent;
    document.getElementById("generatedResume").classList.remove("hidden");
  
    // Skill Matching
    const requiredSkills = ["JavaScript", "HTML", "CSS", "React", "Node.js"];
    const matchScore = skills.filter(skill => requiredSkills.includes(skill)).length;
  
    let screeningMessage = "";
    if (matchScore === 0) {
      screeningMessage = "Resume does not match key recruiter traits. Please add relevant skills.";
    } else if (matchScore < 3) {
      screeningMessage = "Resume partially matches recruiter traits. Consider adding more relevant skills.";
    } else {
      screeningMessage = "Resume is highly relevant to recruiter traits. Great job!";
    }
  
    document.getElementById("screeningResult").innerHTML = screeningMessage;
  
    // Download Button (Avoid Multiple Listeners)
    const downloadBtn = document.getElementById("downloadResume");
    downloadBtn.replaceWith(downloadBtn.cloneNode(true));
    document.getElementById("downloadResume").addEventListener("click", () => {
      const resumeBlob = new Blob([resumeContent], { type: "text/html" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(resumeBlob);
      link.download = `${name}_resume.html`;
      link.click();
    });
  });
  