export type FileNode = {
  name: string;
  type: "file";
  size: number;
  content?: string;
};

export type FolderNode = {
  name: string;
  type: "folder";
  children: TreeNode[];
};

export type TreeNode = FileNode | FolderNode;
