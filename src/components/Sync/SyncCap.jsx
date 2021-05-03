import React from 'react';

import './styles/personal-cap.scss';

const SyncCap = ({ remindedAmount, totalAmount }) => {

    return (<div className="personal-cap-wrap" style={{ padding: "15px 15px" }}>
        <div className="personal-cap" style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
            <a href="http://wiki.deus.finance/docs/limits" target="_blank" rel="noopener noreferrer" className="title" style={{ color: "#c3c3c3" }} >
                <u>Remaining Synchronizer Capacity ↗</u>
            </a>
            <div className="amounts" style={{ marginTop: "0" }}>
                <svg width={15} height={15} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <rect width={15} height={15} fill="url(#pattern0)" />
                    <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width={1} height={1}>
                            <use xlinkHref="#image0" transform="scale(0.00166667)" />
                        </pattern>
                        <image id="image0" width={600} height={600} xlinkHref="data:image/png;base64,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" />
                    </defs>
                </svg>
                <div className="reminded" style={{ marginLeft: "5px" }}> {remindedAmount.toFixed(2)}</div>
            </div>
        </div>
    </div >);
}

export default SyncCap;