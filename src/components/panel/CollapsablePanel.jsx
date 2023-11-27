import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const CollapsiblePanel = ({ title, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="collapsible-panel m-4">
            <div className="panel-header flex items-center justify-between bg-white py-2 px-4 rounded-sm">
                <span className="panel-title text-sm font-semibold">{title}</span>
                <button className="toggle-button" onClick={handleToggle}>
                    {isExpanded ? <FaMinus /> : <FaPlus />}
                </button>
            </div>
            {isExpanded && <div className="panel-content bg-white p-3">{children}</div>}
        </div>
    );
};

export default CollapsiblePanel;