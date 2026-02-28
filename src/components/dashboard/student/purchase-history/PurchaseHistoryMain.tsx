"use client";

import React, { useEffect, useState } from "react";

type PurchaseItem = {
  course: string;
  price: number;
  paymentStatus: string;
  date: string; // ISO string expected (e.g., "2026-02-28T10:00:00.000Z")
};

const PurchaseHistoryMain = () => {
  const [purchases, setPurchases] = useState<PurchaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch("/api/student/purchases");

        if (!response.ok) {
          // If user isn't logged in, don't treat as "error"
          if (response.status === 401) {
            setLoading(false);
            return;
          }
          throw new Error("Failed to fetch purchase history");
        }

        const data = await response.json();
        if (data?.success && Array.isArray(data?.purchases)) {
          setPurchases(data.purchases);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching purchase history:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const formatPrice = (value: number) => {
    return value.toLocaleString("en-US");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // If backend sends "Will update soon" or invalid date, avoid "Invalid Date"
    if (Number.isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getPaymentBadge = (paymentStatus: string) => {
    const status = (paymentStatus || "").toLowerCase();

    if (status === "completed") {
      return { className: "badge-success", text: "Verified" };
    }

    if (status === "pending") {
      return { className: "badge-warning", text: "Pending" };
    }

    if (status === "failed" || status === "cancelled") {
      return { className: "badge-danger", text: "Failed" };
    }

    return { className: "badge-secondary", text: paymentStatus };
  };

  return (
    <div className="col-xl-9 col-lg-9 col-md-8">
      <div className="bd-dashboard-inner">
        <div className="bd-dashboard-title-inner">
          <h4 className="bd-dashboard-title">Purchase History</h4>
        </div>

        <div className="bd-dashboard-table table-responsive mt-30">
          {loading ? (
            <div className="text-center py-5">
              <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
              <p className="mt-3">Loading your purchase history...</p>
            </div>
          ) : error ? (
            <div className="alert alert-warning text-center">
              <i className="fa-solid fa-exclamation-triangle"></i> Unable to
              load purchase history. Please try again later.
            </div>
          ) : purchases.length === 0 ? (
            <div className="text-center py-5">
              <i className="fa-solid fa-receipt fa-3x mb-3 text-muted"></i>
              <h5>No Purchase History Yet</h5>
              <p className="text-muted">
                Your purchases will appear here after you complete an order.
              </p>
            </div>
          ) : (
            <table className="table table-bordered table-head-bg">
              <thead>
                <tr>
                  <th style={{ minWidth: "300px" }}>Course</th>
                  <th>Price</th>
                  <th style={{ minWidth: "140px" }}>Payment Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {purchases.map((purchase, index) => {
                  const badge = getPaymentBadge(purchase.paymentStatus);

                  return (
                    <tr key={`${purchase.course}-${purchase.date}-${index}`}>
                      <td>
                        <p>{purchase.course}</p>
                      </td>
                      <td>
                        <p>{formatPrice(purchase.price)}</p>
                      </td>
                      <td>
                        <div className={`bd-badge ${badge.className}`}>
                          {badge.text}
                        </div>
                      </td>
                      <td>
                        <p>{formatDate(purchase.date)}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistoryMain;
