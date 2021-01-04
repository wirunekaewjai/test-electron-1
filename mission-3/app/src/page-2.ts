import { ipcRenderer } from 'electron';
import { Answer } from './types';

ipcRenderer.on('request-answer', async (ev, questionID: string) => {
  const el = document.getElementById('text');

  if (!el)
  {
    return;
  }

  el.innerText = 'กำลังโหลด ...';

  const st = Date.now();

  const res = await fetch(`http://localhost:3000/questions/${questionID}`);
  const data: Answer = await res.json();

  const et = Date.now();
  const usage = et - st;

  if (usage < 500)
  {
    await new Promise(r => setTimeout(r, 500 - usage));
  }

  el.innerText = data.answer;
});