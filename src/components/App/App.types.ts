export interface IImage {
  id: string;
  alt_description: string;
  urls: {
    regular: string;
    small: string;
  };
}
