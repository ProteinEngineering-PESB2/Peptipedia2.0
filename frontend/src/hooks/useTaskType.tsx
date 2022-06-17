import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { taskTypes } from "../utils/task_types";

export const useTaskType = () => {
  const [selectedTaskType, setSelectedTaskType] = useState<string>(
    taskTypes[0].value
  );

  const handleChangeSelectedTaskType = (e: SelectChangeEvent): void => {
    setSelectedTaskType(e.target.value as string);
  };

  return {
    selectedTaskType,
    handleChangeSelectedTaskType,
    taskTypes,
  };
};
