function ConfirmPopup({ message, okButton, cancelButton, onOkButtonClicked, onCancelButtonClicked, isShowed, onWhiteOverlayClicked }) {
  return (
    <>
      <div className={`white-overlay ${isShowed ? "show" : "hide"}`} onClick={onWhiteOverlayClicked}></div>
      <div className={`confirm-popup ${isShowed ? "show" : "hide"}`}>
        <p className="confirm-popup__message">{message}</p>
        <div className="btn-group">
          <button type="button" className="confirm-popup__btn-cancel" onClick={onCancelButtonClicked}>
            {cancelButton}
          </button>
          <button type="button" className="confirm-popup__btn-ok" onClick={onOkButtonClicked}>
            {okButton}
          </button>
        </div>
      </div>
    </>
  );
}

export default ConfirmPopup;
