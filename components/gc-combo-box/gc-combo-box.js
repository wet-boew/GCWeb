document.addEventListener("DOMContentLoaded", function () {


   function updateSelected(listName, displayListId, containerId) {
    const checked = document.querySelectorAll(`input[name="${listName}"]:checked`);
    const container = document.getElementById(displayListId);
    const parentContainer = document.getElementById(containerId);
    container.innerHTML = ""; // clear list


    // Show or hide the entire section based on whether items are selected
    if (checked.length === 0) {
        parentContainer.style.display = "none";
    } else {
        parentContainer.style.display = "block";
    }


    checked.forEach(item => {
        const li = document.createElement("li");

        // Get the label text (full name) instead of the value (acronym)
        const label = document.querySelector(`label[for="${item.id}"]`);
        const displayText = label ? label.textContent.trim() : item.value;
        li.textContent = displayText;

        // Create remove button
        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = "×";
        removeBtn.setAttribute("type", "button");
        removeBtn.setAttribute("aria-label", `Remove ${displayText}`);
        removeBtn.addEventListener("click", () => {
            item.checked = false;
            updateSelected(listName, displayListId, containerId);
        });

        li.appendChild(removeBtn);
        container.appendChild(li);
    });
}


    // Listen for region changes
    document.querySelectorAll('input[name="regions"]').forEach(cb => {
        cb.addEventListener("change", () => {
            updateSelected("regions", "selectedRegionsList", "selectedRegions");
        });
    });


    // Listen for institution changes
    document.querySelectorAll('input[name="institution"]').forEach(cb => {
        cb.addEventListener("change", () => {
            updateSelected("institution", "selectedInstitutionsList", "selectedInstitutions");
        });
    });


    // Hide both sections initially
    document.getElementById("selectedRegions").style.display = "none";
    document.getElementById("selectedInstitutions").style.display = "none";
});
