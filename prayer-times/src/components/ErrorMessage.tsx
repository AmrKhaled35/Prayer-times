import { AlertTriangleIcon } from 'lucide-react';
interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex items-center">
      <AlertTriangleIcon className="text-red-500 w-5 h-5 mr-2" />
      <p className="text-white text-sm">{message}</p>
    </div>
  );
}

export default ErrorMessage;