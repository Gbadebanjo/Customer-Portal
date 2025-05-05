'use client'
import React from 'react';
export default function PaginationComponent(props) {

    return <center>
        <div className="join">
            <div className="join grid grid-cols-2">
                <button
                    className="join-item btn btn-outline"
                    onClick={props.onClick}
                    disabled={props.currentPage === 1}
                >
                    Previous
                </button>
            </div>
            {Array.from({length: props.length}, props.mapfn)}
            <button
                className="join-item btn"
                onClick={props.onClick1}
                disabled={props.currentPage === props.length}
            >
                Next
            </button>
        </div>
    </center>;
}
