import React from "react";

const AdminDashboard = ({ bins, trucks }) => {
    return (
        <div style={{ padding: "20px" }}>
            <h2>📊 Waste Collection Admin Dashboard</h2>
            
            <h3>🗑 Bin Status</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Bin ID</th>
                        <th>Fill Level (%)</th>
                        <th>Last Collected</th>
                        <th>Collected By</th>
                    </tr>
                </thead>
                <tbody>
                    {bins.map(bin => (
                        <tr key={bin.id}>
                            <td>{bin.id}</td>
                            <td>{bin.fillLevel}%</td>
                            <td>{bin.lastCollected || "Not collected yet"}</td>
                            <td>{bin.collectedBy ? `Truck ${bin.collectedBy}` : "Unknown"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>🚛 Truck Status</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Truck ID</th>
                        <th>Location</th>
                        <th>Collected Bins</th>
                    </tr>
                </thead>
                <tbody>
                    {trucks.map(truck => (
                        <tr key={truck.id}>
                            <td>{truck.id}</td>
                            <td>Lat: {truck.location.lat.toFixed(4)}, Lng: {truck.location.lng.toFixed(4)}</td>
                            <td>{truck.collectedBins.length > 0 
                                    ? truck.collectedBins.map(bin => `Bin ${bin}`).join(", ") 
                                    : "None"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
