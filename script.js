const storageKey = "checkedTasks";
const resetKey = "lastResetDate";

const saved = JSON.parse(localStorage.getItem(storageKey)) || {};

document.querySelectorAll('.todo-list li').forEach(li=>{
    const id = li.dataset.id;
    if(saved[id]){
        li.classList.add('checked');
    }
});

document.querySelectorAll('.todo-link').forEach(link=>{
    link.addEventListener('click',function(event){
        const href = link.getAttribute('href');
        if(!href || href==="#"){
            event.preventDefault();
        }

        const li = link.closest("li");
        const id = li.dataset.id;

        if(!li.classList.contains("checked")){
            li.classList.add("checked");
            saved[id] = true;
            localStorage.setItem(storageKey, JSON.stringify(saved));
        }
    });
});

function resetIfNeeded(){
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const lastReset = localStorage.getItem(resetKey);

    if(lastReset !== today){
        localStorage.removeItem(storageKey);
        localStorage.setItem(resetKey, today);

        document.querySelectorAll('.todo-list li').forEach(li=>{
            li.classList.remove("checked");
        });
    }
}

setInterval(resetIfNeeded, 60 * 1000);