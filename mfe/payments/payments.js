import auth from 'auth';

export default function() {
  const div = document.createElement('div');
  div.innerText = 'payments mfe loaded';
  document.body.appendChild(div)
  console.log('payments MFE');
  console.log(auth.getAuth());
}