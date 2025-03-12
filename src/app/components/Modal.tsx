interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
  }
  
  export default function Modal({ onClose, children }: ModalProps) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">✖</button>
          {children}
        </div>
      </div>
    );
  }
  