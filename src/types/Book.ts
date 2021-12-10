export default interface BookType {
  id: string;
  title?: string;
  description?: string;
  photo?: string | null;
  read?: boolean;
}