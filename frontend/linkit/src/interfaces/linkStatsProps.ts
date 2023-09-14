export interface LinkStatProps {
  id: string;
  title: string;
  url: string;
  clicks?: number;
  initialEnabled?: boolean;
  handleDeleteLink: (id: string) => void;
  handleUpdateLink: (
    linkIdToUpdate: string,
    newTitle: string,
    newUrl: string
  ) => void;
}
