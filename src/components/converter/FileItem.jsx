// FileItem.js
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const barColor = (stage) =>
  clsx(
    "h-1 rounded-full transition-all duration-300",
    stage === "done"
      ? "bg-green-400"
      : stage === "convert"
      ? "bg-yellow-400"
      : "bg-blue-400"
  );

export const FileItem = ({ file, state, onSend, onRemove }) => {
  let label =
    state.stage === "upload"
      ? "Cargando..."
      : state.stage === "convert"
      ? "Convirtiendo..."
      : "¡Listo!";

  return (
    <li
      className={twMerge(
        "bg-white rounded-lg shadow flex items-center p-2 text-xs"
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-800 truncate text-xs">
          {file.name}
        </div>
        <div className="text-[10px] text-gray-400">
          {(file.size / 1024).toFixed(1)} KB
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
          <div
            className={barColor(state.stage)}
            style={{ width: `${state.progress || 0}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center mt-0.5">
          <span className="text-[10px] text-gray-500">{label}</span>
          <span className="text-[10px] text-gray-500">
            {state.progress || 0}%
          </span>
        </div>
      </div>
      {state.stage !== "done" && (
        <button
          className={twMerge(
            "ml-2 p-1 bg-red-100 text-red-500 rounded hover:bg-red-200 transition flex items-center justify-center"
          )}
          onClick={() => onRemove(file.name)}
          title="Eliminar archivo"
          style={{ minWidth: 28, minHeight: 28 }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z"
            />
          </svg>
        </button>
      )}
      {state.stage === "done" && (
        <div className="flex items-center space-x-1 ml-2">
          <button
            className={twMerge(
              "p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition flex items-center justify-center"
            )}
            onClick={() => onSend(file)}
            title="Validar archivo"
            style={{ minWidth: 28, minHeight: 28 }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
          <button
            className={twMerge(
              "p-1 bg-red-100 text-red-500 rounded hover:bg-red-200 transition flex items-center justify-center"
            )}
            onClick={() => onRemove(file.name)}
            title="Eliminar archivo"
            style={{ minWidth: 28, minHeight: 28 }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z"
              />
            </svg>
          </button>
        </div>
      )}
    </li>
  );
}