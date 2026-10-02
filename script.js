// Інтерактивні функції інтерфейсу Weazel News

let isPlaying = false;

function toggleRadio() {
    isPlaying = !isPlaying;
    const btn = document.getElementById('radioPlayBtn');
    const status = document.getElementById('radioStatus');
    const icon = document.getElementById('radioIcon');

    if (isPlaying) {
        btn.classList.add('bg-amber-500', 'scale-105');
        icon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>'; // пауза
        status.textContent = 'Відтворення: Хвиля Weazel FM';
        status.classList.remove('text-zinc-400');
        status.classList.add('text-orange-400');
        showNotification('Радіо Weazel FM увімкнено');
    } else {
        btn.classList.remove('bg-amber-500', 'scale-105');
        icon.innerHTML = '<path d="M8 5v14l11-7z"/>'; // play
        status.textContent = 'На телеефірі / Live';
        status.classList.remove('text-orange-400');
        status.classList.add('text-zinc-400');
        showNotification('Радіо зупинено');
    }
}

function switchTab(tabName) {
    if (tabName === 'cabinet') {
        showNotification('Ви вже в головному кабінеті');
    } else {
        showNotification(`Відкрито розділ: ${tabName}`);
    }
}

function showNotification(text) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toastText');
    
    toastText.textContent = text;
    toast.classList.remove('translate-y-20', 'opacity-0');
    
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}
// --- Логіка Кабінету та Статусу ---

let isOnDuty = true;

function toggleDutyStatus() {
    isOnDuty = !isOnDuty;
    const dutyBtn = document.getElementById('dutyBtn');
    const dutyDot = document.getElementById('dutyDot');
    const dutyText = document.getElementById('dutyText');

    if (isOnDuty) {
        dutyBtn.className = "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs py-2 rounded-lg transition font-semibold flex items-center justify-center space-x-1 border border-emerald-500/30";
        dutyDot.className = "w-2 h-2 rounded-full bg-emerald-500 animate-pulse";
        dutyText.textContent = "На службі";
        showNotification("Ви заступили на зміну");
    } else {
        dutyBtn.className = "bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs py-2 rounded-lg transition font-semibold flex items-center justify-center space-x-1 border border-zinc-700";
        dutyDot.className = "w-2 h-2 rounded-full bg-zinc-500";
        dutyText.textContent = "Відпочинок";
        showNotification("Ви пішли на перерву / відпочинок");
    }
}

function openCabinetModal() {
    // Перевіряємо, чи вже створене модальне вікно, якщо ні — створюємо динамічно
    let modal = document.getElementById('cabinetModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'cabinetModal';
        modal.className = 'fixed inset-0 modal-backdrop flex items-center justify-center z-50 p-4 opacity-0 pointer-events-none transition-opacity duration-300';
        modal.innerHTML = `
            <div class="bg-[#18181b] border border-zinc-800 w-full max-w-md rounded-2xl p-6 shadow-2xl transform scale-95 transition-transform duration-300" id="modalContent">
                <div class="flex justify-between items-center pb-4 border-b border-zinc-800">
                    <h3 class="font-bold text-base text-white flex items-center space-x-2">
                        <span class="text-orange-500">⚙️</span>
                        <span>Керування кабінетом</span>
                    </h3>
                    <button onclick="closeCabinetModal()" class="text-zinc-400 hover:text-white text-lg font-bold">&times;</button>
                </div>
                <div class="py-4 space-y-4">
                    <div>
                        <label class="text-xs text-zinc-400 font-medium block mb-1">Ваше ім'я в системі (RP Nickname)</label>
                        <input type="text" id="rpNickInput" value="John Silver" class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500">
                    </div>
                    <div>
                        <label class="text-xs text-zinc-400 font-medium block mb-1">Посада / Ранг</label>
                        <input type="text" disabled value="Ранг 1 • Стажер медіа" class="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-500 cursor-not-allowed">
                    </div>
                    <div class="bg-orange-500/10 border border-orange-500/20 p-3 rounded-xl">
                        <p class="text-xs text-orange-300">💡 Зміни у профілі синхронізуються з внутрішньою базою даних фракції Weazel News.</p>
                    </div>
                </div>
                <div class="flex justify-end space-x-2 pt-4 border-t border-zinc-800">
                    <button onclick="closeCabinetModal()" class="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold rounded-lg text-zinc-300 transition">Скасувати</button>
                    <button onclick="saveCabinetChanges()" class="px-4 py-2 bg-weazel hover:bg-weazel-dark text-xs font-semibold rounded-lg text-white transition shadow-lg shadow-orange-500/20">Зберегти</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    modal.classList.remove('opacity-0', 'pointer-events-none');
    setTimeout(() => {
        document.getElementById('modalContent').classList.remove('scale-95');
        document.getElementById('modalContent').classList.add('scale-100');
    }, 10);
}

function closeCabinetModal() {
    const modal = document.getElementById('cabinetModal');
    if (modal) {
        document.getElementById('modalContent').classList.remove('scale-100');
        document.getElementById('modalContent').classList.add('scale-95');
        modal.classList.add('opacity-0', 'pointer-events-none');
    }
}

function saveCabinetChanges() {
    const newName = document.getElementById('rpNickInput').value.trim();
    if (newName !== '') {
        // Зберігаємо в пам'ять браузера, щоб ім'я не зникало після перезавантаження
        localStorage.setItem('weazel_rp_nick', newName);

        // Оновлюємо ім'я на сторінці (в сайдбарі та банері)
        const sidebarName = document.getElementById('sidebarName');
        const bannerName = document.getElementById('bannerName');

        if (sidebarName) sidebarName.textContent = newName;
        if (bannerName) bannerName.textContent = `Привіт, ${newName}!`;

        showNotification(`Дані оновлено: ${newName}`);
        closeCabinetModal();
    } else {
        showNotification("Ім'я не може бути порожнім!");
    }
}

// Автоматично завантажуємо збережене ім'я при відкритті сайту
window.addEventListener('DOMContentLoaded', () => {
    const savedName = localStorage.getItem('weazel_rp_nick');
    if (savedName) {
        const sidebarName = document.getElementById('sidebarName');
        const bannerName = document.getElementById('bannerName');
        const rpNickInput = document.getElementById('rpNickInput');

        if (sidebarName) sidebarName.textContent = savedName;
        if (bannerName) bannerName.textContent = `Привіт, ${savedName}!`;
        if (rpNickInput) rpNickInput.value = savedName;
    }
});