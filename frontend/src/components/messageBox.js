import Alert from 'react-bootstrap/Alert';
function MessageBox({ variant, message }) {
  return (
    <Alert key={variant || 'info'} variant={variant || 'info'}>
      {message}
    </Alert>
  );
}
export default MessageBox;
