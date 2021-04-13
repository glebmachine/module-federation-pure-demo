import { loadRemoteEntry, loadRemoteModule } from './common';
import auth from 'auth';
import hasValue from 'has-value';

window['hasValue'] = hasValue;

function loadPaymentsMfe() {
  loadRemoteModule({
    remoteName: 'payments',
    exposedModule: './Module'
  })
  .then(m => m.bootstrap());
}

function initShell() {
  const div = document.createElement('div');
  div.innerText = 'Shell loaded';
  console.log(auth.getAuth());
  loadPaymentsMfe();
}

Promise.all([
  loadRemoteEntry('http://localhost:3001/remoteEntry.js', 'payments')
])
  .catch(err => console.error('Error loading remote entries', err))
  .then((m) => {
    initShell();
  });