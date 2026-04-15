import * as nodes from '../../ui/domlists.js';
import { saveHistoryItem } from '../../storage/storage.js';
export function renderHistoryItem(from, to, result) {
  let conteiner = document.createElement('div');
  conteiner.classList.add('conteiner-history');
  let fromHistory = document.createElement('p');
  fromHistory.textContent = `${from} → ${to} | ${result}`;
  conteiner.appendChild(fromHistory);
  nodes.historyblock.prepend(conteiner);
  if (nodes.historyblock.children.length > 10) {
    nodes.historyblock.lastElementChild.remove();
  }
}

export function historylist(from, to, result) {
  renderHistoryItem(from, to, result);
  saveHistoryItem(from, to, result);
}
