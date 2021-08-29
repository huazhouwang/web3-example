import React, { useEffect } from 'react';
// @ts-ignore
import jazzicon from '@metamask/jazzicon';

const clearChildren = (parent: HTMLDivElement) => {
  const count = parent.children.length;

  for (let i = 0; i < count; ++i) {
    parent.removeChild(parent.children[i]);
  }
};

const JazziconAvatar = ({
  address,
  size = 45,
}: {
  address: string;
  size?: number;
}) => {
  const ref = React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (address && size && ref !== null && ref.current) {
      clearChildren(ref.current);

      const node = jazzicon(size, parseInt(address.slice(2, 10), 16));
      ref.current.appendChild(node);
    }
  }, [address, size, ref]);

  return <div ref={ref} />;
};

export default JazziconAvatar;
