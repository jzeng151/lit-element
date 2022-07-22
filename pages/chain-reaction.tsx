import { useEffect } from 'react';

function ChainReaction() {

  useEffect(() => {
    import('../litComponents/chain-reaction')
  }, []);

  return (
    <div>
      <chain-reaction></chain-reaction>
    </div>
  )
}

export default ChainReaction;
