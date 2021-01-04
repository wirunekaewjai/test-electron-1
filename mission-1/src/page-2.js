const { ipcRenderer } = require('electron');

ipcRenderer.on('request-answer', async (ev, questionID) => {
  const el = document.getElementById('text');

  el.innerText = 'กำลังโหลด ...';

  const st = Date.now();

  const res = await fetch(`http://localhost:3000/questions/${questionID}`);
  const data = await res.json();

  const et = Date.now();
  const usage = et - st;

  if (usage < 500)
  {
    await new Promise(r => setTimeout(r, 500 - usage));
  }

  el.innerText = data.answer;
});