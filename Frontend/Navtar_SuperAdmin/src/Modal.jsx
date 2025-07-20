import { Loader2 } from 'lucide-react';

const Modal = ({ isOpen, title, message, onConfirm, onCancel, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-buttons">
          <button
            onClick={!isLoading ? onConfirm : null}
            className="confirm-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="spinner" />
            ) : (
              "Confirm"
            )}
          </button>
          {onCancel && (
            <button
              onClick={!isLoading ? onCancel : null}
              className="cancel-btn"
              disabled={isLoading}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;