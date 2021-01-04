const onClick = (id) => () =>
{
  const { ipcRenderer } = require('electron');
  ipcRenderer.send('request-answer', id);
};

fetch('http://localhost:3000/questions').then(async (res) => {
  const items = await res.json();
  const parent = document.getElementById('list');

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

    el.addEventListener('click', onClick(item.id));
  }
});