//import Link from 'next/link';
import React from 'react';

const purchaseHistoryData = [
    {
        course: "Build apps with AI",
        price: "2000",
        paymentStatus: "Verified",
        // paymentMethod removed from data visualization
        date: "Will update soon",
    },
    // ... (other data items)
];

const PurchaseHistoryMain = () => {
    return (
        <div className="col-xl-9 col-lg-9 col-md-8">
            <div className="bd-dashboard-inner">
                <div className="bd-dashboard-title-inner">
                    <h4 className="bd-dashboard-title">Purchase History</h4>
                </div>
                <div className="bd-dashboard-table table-responsive mt-30">
                    <table className="table table-bordered table-head-bg">
                        {/* --- TABLE HEADERS --- */}
                        <thead>
                            <tr>
                                <th style={{ minWidth: "300px" }}>Course</th>
                                <th>Price</th>
                                <th style={{ minWidth: "140px" }}>Payment Status</th>
                                {/* REMOVED: Payment Method Header */}
                                <th>Date</th>
                                {/* REMOVED: Action Header */}
                            </tr>
                        </thead>
                        
                        {/* --- TABLE BODY --- */}
                        <tbody>
                            {purchaseHistoryData.map((purchase, index) => (
                                <tr key={index}>
                                    {/* Column 1 */}
                                    <td>
                                        <p>{purchase.course}</p>
                                    </td>
                                    {/* Column 2 */}
                                    <td>
                                        <p>{purchase.price}</p>
                                    </td>
                                    {/* Column 3 */}
                                    <td>
                                        <div className="bd-badge badge-success">{purchase.paymentStatus}</div>
                                    </td>
                                    
                                    {/* REMOVED: Payment Method Data (<td>...</td>) */}

                                    {/* Column 5 (Now becoming Column 4) */}
                                    <td>
                                        <p>{purchase.date}</p>
                                    </td>

                                    {/* REMOVED: Action Data (<td>...</td>) */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PurchaseHistoryMain;