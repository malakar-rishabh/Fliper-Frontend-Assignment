import React from 'react';

const Prize = ({ prize }) => (
    <div className="card">
        <div className="card-header">
            {prize.year} {prize.category}
        </div>
        <div className="card-body">
            <h5 className="card-title">Laureates</h5>
            <ul>
                {prize.laureates?.map(laureate => (
                    <li key={laureate.id}>
                        {laureate.firstname} {laureate.surname}
                        {laureate.motivation && (
                            <>
                                <p>Motivation: {laureate.motivation}</p>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default Prize;