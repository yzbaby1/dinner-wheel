let dinnerOptions = ["牛肉麵", "壽司", "火鍋", "炸雞", "披薩", "拉麵"];
let wheel;


function updateWheel() {
  const segments = dinnerOptions.map((item, index) => ({
    text: item,
    fillStyle: index % 2 === 0 ? "#90caf9" : "#f48fb1"
  }));

  wheel = new Winwheel({
    canvasId: 'wheelCanvas',
    numSegments: segments.length,
    segments: segments,
    outerRadius: 170,
    textFontSize: 24,
    textFillStyle: "#000000",      
    textLineWidth: 2,
    textFontFamily: 'Noto Sans TC',
    textAlignment: 'outer',
    textMargin: 12,
    animation: {
      type: "spinToStop",
      duration: 4,
      spins: 8,
      callbackFinished: showResult
    }
  });
}

// 🌀 顯示結果
function showResult(segment) {
  document.getElementById("result").innerText = `今天吃：${segment.text}`;
}

// 📃 渲染料理清單
function renderList() {
  const list = document.getElementById("itemList");
  list.innerHTML = "";
  dinnerOptions.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item}</span>
      <button class="remove-btn" onclick="removeItem(${index})">刪除</button>
    `;
    list.appendChild(li);
  });
}

// ➕ 新增項目
function addItem() {
  const input = document.getElementById("addItem");
  const newItem = input.value.trim();
  if (newItem) {
    dinnerOptions.push(newItem);
    input.value = "";
    updateWheel();
    renderList();
  }
}

// ➖ 刪除項目
function removeItem(index) {
  dinnerOptions.splice(index, 1);
  updateWheel();
  renderList();
}

updateWheel();
renderList();

// 綁定按鈕
document.getElementById("addButton").addEventListener("click", addItem);
document.getElementById("spinButton").addEventListener("click", () => {
  wheel.stopAnimation(false);
  wheel.rotationAngle = 0;
  wheel.draw();
  wheel.startAnimation();
});


// 🔃 初始化畫面
updateWheel();
renderList();
