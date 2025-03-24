import React, { useState, useEffect } from "react";
import "./App.css";
import AdminDashboard from "./AdminDashboard";
import TruckDriverDashboard from "./TruckDriverDashboard";

function App() {
    const [dashboard, setDashboard] = useState("homeowner");

    const [bins, setBins] = useState([
        { id: 1, lat: 37.776, lng: -122.42, fillLevel: 60, lastCollected: null },
        { id: 2, lat: 37.775, lng: -122.418, fillLevel: 80, lastCollected: null },
        { id: 3, lat: 37.773, lng: -122.417, fillLevel: 30, lastCollected: null },
    ]);

    const [trucks, setTrucks] = useState([
        { id: 1, location: { lat: 37.7749, lng: -122.4194 }, assignedBins: [], collectedBins: [], fillLevel: 0, weight: 0 },
        { id: 2, location: { lat: 37.7700, lng: -122.4150 }, assignedBins: [], collectedBins: [], fillLevel: 0, weight: 0 }
    ]);

    const [binFill, setBinFill] = useState(45);

    useEffect(() => {
        const interval = setInterval(() => {
            setBinFill(prev => (prev < 100 ? prev + Math.floor(Math.random() * 5) : 100));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const updateBins = (newBins) => {
        setBins(newBins);
    };

    const updateTrucks = (newTrucks) => {
        setTrucks(newTrucks);
    };

    return (
        <div>
            <header>
                <h1>Waste Integration System</h1>
                <nav>
                    <button onClick={() => setDashboard("homeowner")}>Homeowner</button>
                    <button onClick={() => setDashboard("truckDriver")}>Truck Driver</button>
                    <button onClick={() => setDashboard("dispatch")}>Municipality Dispatch</button>
                    <button onClick={() => setDashboard("facility")}>Waste Facility</button>
                </nav>
            </header>

            <main>
                {/* 🏠 Homeowner Dashboard */}
                <section className={dashboard === "homeowner" ? "active" : ""}>
                    <h2>Homeowner Dashboard</h2>
                    <p>Bin Fill Level: <span>{binFill}%</span></p>
                    <p>Estimated Truck Arrival: <span>12:30 PM</span></p>
                    <p>Collection Status: <span>Scheduled</span></p>
                </section>

                {/* 🚛 Truck Driver Dashboard */}
                <section className={dashboard === "truckDriver" ? "active" : ""}>
                    <TruckDriverDashboard trucks={trucks} bins={bins} setBins={updateBins} setTrucks={updateTrucks} />
                </section>

                {/* 🏢 Municipality Dispatch Dashboard */}
                <section className={dashboard === "dispatch" ? "active" : ""}>
                    <AdminDashboard bins={bins} trucks={trucks} />
                </section>

                {/* 🏭 Waste Facility Dashboard */}
                <section className={dashboard === "facility" ? "active" : ""}>
                    <h2>Waste Facility Dashboard</h2>
                    <p>Incoming Trucks: <span>3</span></p>
                    <p>Facility Fill Level: <span>60%</span></p>
                </section>
            </main>
        </div>
    );
}

export default App;
