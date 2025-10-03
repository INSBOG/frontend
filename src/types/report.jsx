import { Check, CircleX, RefreshCcw } from "lucide-react";

const statusCodes = {
  ERROR: 0,
  PROCESSING: 1,
  DONE: 2,
};

const ReportStatus = {
  [statusCodes.PROCESSING]: {
    color: "blue",
    text: "En proceso",
    icon: <RefreshCcw className="animate-spin" size={16} />,
  },
  [statusCodes.DONE]: {
    color: "green",
    text: "Generado",
    icon: <Check size={16} />,
  },
  [statusCodes.ERROR]: {
    color: "red",
    text: "Error",
    icon: <CircleX size={16} />,
  },
};

export { ReportStatus };
