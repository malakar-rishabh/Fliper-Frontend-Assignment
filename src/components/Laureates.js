import React from 'react';

const Laureates = ({ laureates }) => (
    <div className="card mb-3">
        <div className="card-header">
            Laureates who have won more than once
        </div>
        <div className="card-body">
            <ul>
                {laureates.map(laureate => (
                    <li key={laureate.id}>{laureate.firstname} {laureate.surname}</li>
                ))}
            </ul>
        </div>
    </div>
);

export default Laureates;