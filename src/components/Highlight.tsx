import { Highlighting } from '../types/Highlight';

const Highlight = ({ query, text }: Highlighting) => {
  const queryLength: number = query.length;
  const textLength: number = text.length;
  const firstIdx: number = text.toLowerCase().indexOf(query.toLowerCase());
  const lastIdx: number = queryLength + firstIdx;
  return (
    <>
      {text.slice(0, firstIdx)}
      {query && <mark>{text.substring(firstIdx, lastIdx)}</mark>}
      {text.slice(lastIdx, textLength)}
    </>
  );
};

export default Highlight;
