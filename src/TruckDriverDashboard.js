import React from "react";
import MapComponent from "./MapComponent";

const TruckDriverDashboard = ({ trucks, bins, setBins, setTrucks }) => {
    return (
        <div>
            <h2>🚛 Truck Driver Dashboard</h2>
            {trucks.map(truck => (
                <div key={truck.id} style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
                    <h3>Truck {truck.id}</h3>
                    <p>Current Route: Zone A - Sector 5</p>
                    <p>Truck Weight: <strong>{truck.weight} kg</strong></p>
                    <p>Collected Bins: {truck.collectedBins.length > 0 
                        ? truck.collectedBins.map(binId => `Bin ${binId}`).join(", ")
                        : "None"}
                    </p>
                </div>
            ))}
            <MapComponent bins={bins} setBins={setBins} trucks={trucks} setTrucks={setTrucks} />
        </div>
    );
};

export default TruckDriverDashboard;
