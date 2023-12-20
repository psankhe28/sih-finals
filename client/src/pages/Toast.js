import Toast from 'react-bootstrap/Toast';

function ToastEg({msg}) {
  return (
    <Toast>
      <Toast.Body>{msg}</Toast.Body>
    </Toast>
  );
}

export default ToastEg;