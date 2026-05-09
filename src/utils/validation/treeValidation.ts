import type { TreeNode } from "../../types/tree";
import type { ValidationResult } from "../../types/validation";

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const formatPath = (path: string) => {
  return path || "root";
};

const createError = (path: string, message: string): ValidationResult<TreeNode> => {
  return {
    isValid: false,
    error: `${formatPath(path)}: ${message}`,
  };
};

const validateNode = (value: unknown, path: string): ValidationResult<TreeNode> => {
  if (!isRecord(value)) {
    return createError(path, "node must be an object");
  }

  const { name, type } = value;

  if (typeof name !== "string" || name.trim().length === 0) {
    return createError(path, "name must be a non-empty string");
  }

  if (type !== "file" && type !== "folder") {
    return createError(path, 'type must be either "file" or "folder"');
  }

  const nodePath = path ? `${path}/${name}` : name;

  if (type === "file") {
    const { size, content } = value;

    if (typeof size !== "number" || !Number.isFinite(size) || size < 0) {
      return createError(nodePath, "size must be a non-negative finite number");
    }

    if (content !== undefined && typeof content !== "string") {
      return createError(nodePath, "content must be a string when provided");
    }

    return {
      isValid: true,
      data: content === undefined ? { name, type, size } : { name, type, size, content },
    };
  }

  const { children } = value;

  if (!Array.isArray(children)) {
    return createError(nodePath, "children must be an array");
  }

  const validatedChildren: TreeNode[] = [];

  for (const [index, child] of children.entries()) {
    const result = validateNode(child, `${nodePath}/children[${index}]`);

    if (!result.isValid) {
      return result;
    }

    validatedChildren.push(result.data);
  }

  return {
    isValid: true,
    data: {
      name,
      type,
      children: validatedChildren,
    },
  };
};

export const validateTreeNode = (value: unknown): ValidationResult<TreeNode> => {
  return validateNode(value, "");
};
