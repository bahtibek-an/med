import * as path from 'node:path';


export const getStaticFilePath = () => {
  return path.join(__dirname, "..", "..", "uploads");
}