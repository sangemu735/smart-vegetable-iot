import React from "react";

export default function Loading() {
    return (
        <div className="text-center">
            <div className="spinner-border" role="status" style={{ height: "80px", width: "80px", marginTop: "80px" }}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
