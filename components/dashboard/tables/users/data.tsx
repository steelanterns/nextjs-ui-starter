import { CheckCircleIcon, XCircleIcon } from "lucide-react";

export const userStatuses = [
  {
    value: true,
    label: "Active",
    icon: CheckCircleIcon,
  },
  {
    value: false,
    label: "Inactive",
    icon: XCircleIcon,
  },
];

export const emailVerificationStatuses = [
  {
    value: true,
    label: "Verified",
    icon: CheckCircleIcon,
  },
  {
    value: false,
    label: "Not Verified",
    icon: XCircleIcon,
  },
];
