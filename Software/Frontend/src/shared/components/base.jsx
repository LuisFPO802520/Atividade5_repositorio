/*
📦 shared/components/
Aqui ficam componentes reutilizáveis — coisas genéricas que podem ser usadas em várias telas

// src/shared/components/Button.jsx
export default function Button({ text, onClick, type = "button" }) {
  return (
    <button type={type} onClick={onClick} className="btn">
      {text}
    </button>
  );
}


// src/shared/components/Input.jsx
export default function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} />
    </div>
  );
}
*/