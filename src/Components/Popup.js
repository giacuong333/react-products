function Popup({ message, isVisible }) {
  return <div className={isVisible ? "popup open" : "popup"}>{message}</div>;
}

export default Popup;
