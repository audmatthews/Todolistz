window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");
    const completionSound = document.getElementById("completion-sound");
    const progressBar = document.getElementById("progress-bar");
    const progressPercent = document.getElementById("progress-percent");

    const predefinedTasks = [
        "Eat 3 meals a day",
        "Wash your face",
        "Brush your teeth 3 times a day",
        "Have a good laugh",
        "Take a deep breath",
    ];

    let totalTasks = predefinedTasks.length;
    let completedTasks = 0;

    const updateProgress = () => {
        const progress = (completedTasks / totalTasks) * 100;
        progressBar.value = progress;
        progressPercent.innerText = `${Math.round(progress)}%`;
    };

    const createTaskElement = (task) => {
        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        const task_checkbox_el = document.createElement("input");
        task_checkbox_el.type = "checkbox";
        task_checkbox_el.classList.add("checkbox");
        task_actions_el.appendChild(task_checkbox_el);

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = 'Edit';

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);
        list_el.appendChild(task_el);

        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLowerCase() === "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
            }
        });

        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
            totalTasks--;  
            updateProgress();  
        });

        task_checkbox_el.addEventListener('change', () => {
            if (task_checkbox_el.checked) {
                task_input_el.style.textDecoration = "line-through";
                completedTasks++;

                confetti({
                    particleCount: 100,   
                    spread: 70,           
                    origin: { y: 0.6 }    
                });

                completionSound.currentTime = 0; 
                completionSound.play(); 
            } else {
                task_input_el.style.textDecoration = "none";
                completedTasks--;
            }
            updateProgress();
        });
    };

    predefinedTasks.forEach(task => {
        createTaskElement(task);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;
        if (!task) {
            alert("Please enter the task");
            return;
        }

        totalTasks++; 
        createTaskElement(task);
        input.value = "";
        updateProgress();
    });

    updateProgress();  
});

window.addEventListener('mousemove', (e) => {
    createSparkle(e.pageX, e.pageY);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    document.body.appendChild(sparkle);
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    setTimeout(() => {
        sparkle.remove();  
    }, 600);  
}
