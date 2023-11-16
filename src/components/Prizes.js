import React from 'react';
import Prize from './Prize';

const Prizes = ({ prizes }) => (
  <div className='d-flex flex-wrap gap-3'>
    {prizes?.map(prize => <Prize key={prize.year + prize.category} prize={prize} />)}
  </div>
);

export default Prizes;