import { ipcRenderer } from 'electron';
import { Question } from './types';

const onClick = (id: string) => () =>
{
  ipcRenderer.send('request-answer', id);
};

fetch('http://localhost:3000/questions').then(async (res) => {
  const items: Question[] = await res.json();
  const parent = document.getElementById('list');

  if (!parent)
  {
    return;
  }

  for (let i = 0; i < items.length; i++)
  {
    const item = items[i];
    const element = `
    <li>
      <p>${item.title}</p>
      <button id="${item.id}">
        ดูคำตอบ
      </button>
    </li>
    `;
  
    parent.innerHTML += element;
  }

  for (let i = 0; i < items.length; i++)
  {
    const item = items[i];
    const el = document.getElementById(item.id);

    el?.addEventListener('click', onClick(item.id));
  }
});